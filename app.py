from flask import Flask, render_template, request, jsonify, redirect, url_for, flash, g
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
import os
from datetime import datetime
import json
import requests
from functools import wraps

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(24)
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CLERK_SECRET_KEY = os.getenv('CLERK_SECRET_KEY')
CLERK_PUBLISHABLE_KEY = os.getenv('CLERK_PUBLISHABLE_KEY')

db = SQLAlchemy(app)

# Models
class User(UserMixin, db.Model):
    id = db.Column(db.String(50), primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(120))
    role = db.Column(db.String(20), default='USER')
    projects = db.relationship('Project', backref='author', lazy=True)

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    tech_stack = db.Column(db.JSON)
    repo_urls = db.Column(db.JSON)
    image_url = db.Column(db.String(500))
    documentation = db.Column(db.Text)
    youtube_url = db.Column(db.String(500))
    author_id = db.Column(db.String(50), db.ForeignKey('user.id'), nullable=False)
    stages = db.relationship('ProjectStage', backref='project', lazy=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class ProjectStage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200))
    description = db.Column(db.Text)
    tech_stack = db.Column(db.JSON)
    image_url = db.Column(db.String(500))
    documentation = db.Column(db.Text)
    youtube_url = db.Column(db.String(500))
    project_id = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

def verify_clerk_token():
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return None
    
    token = auth_header.split(' ')[1]
    try:
        response = requests.get(
            'https://api.clerk.dev/v1/session',
            headers={
                'Authorization': f'Bearer {token}',
                'Content-Type': 'application/json'
            }
        )
        if response.status_code == 200:
            return response.json()
        return None
    except:
        return None

def clerk_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        session = verify_clerk_token()
        if not session:
            return jsonify({'error': 'Unauthorized'}), 401
        g.user_id = session.get('user_id')
        return f(*args, **kwargs)
    return decorated_function

# Routes
@app.route('/')
def index():
    projects = Project.query.all()
    return render_template('index.html', 
                         projects=projects, 
                         CLERK_PUBLISHABLE_KEY=CLERK_PUBLISHABLE_KEY)

@app.route('/projects', methods=['POST'])
@clerk_required
def create_project():
    data = request.json
    project = Project(
        title=data['title'],
        description=data['description'],
        tech_stack=data['techStack'],
        repo_urls=data['repoUrls'],
        image_url=data['imageUrl'],
        documentation=data['documentation'],
        youtube_url=data.get('youtubeUrl'),
        author_id=g.user_id
    )
    db.session.add(project)
    
    if 'stages' in data:
        for stage_data in data['stages']:
            stage = ProjectStage(
                title=stage_data['title'],
                description=stage_data['description'],
                tech_stack=stage_data['techStack'],
                image_url=stage_data['imageUrl'],
                documentation=stage_data['documentation'],
                youtube_url=stage_data.get('youtubeUrl'),
                project=project
            )
            db.session.add(stage)
    
    db.session.commit()
    return jsonify({"message": "Project created successfully"}), 201

@app.route('/projects/<int:id>', methods=['PUT'])
@clerk_required
def update_project(id):
    project = Project.query.get_or_404(id)
    if project.author_id != g.user_id:
        return jsonify({"error": "Unauthorized"}), 403
    
    data = request.json
    project.title = data['title']
    project.description = data['description']
    project.tech_stack = data['techStack']
    project.repo_urls = data['repoUrls']
    project.image_url = data['imageUrl']
    project.documentation = data['documentation']
    project.youtube_url = data.get('youtubeUrl')
    
    # Update stages
    ProjectStage.query.filter_by(project_id=id).delete()
    for stage_data in data.get('stages', []):
        stage = ProjectStage(
            title=stage_data['title'],
            description=stage_data['description'],
            tech_stack=stage_data['techStack'],
            image_url=stage_data['imageUrl'],
            documentation=stage_data['documentation'],
            youtube_url=stage_data.get('youtubeUrl'),
            project=project
        )
        db.session.add(stage)
    
    db.session.commit()
    return jsonify({"message": "Project updated successfully"})

@app.route('/projects/<int:id>', methods=['DELETE'])
@clerk_required
def delete_project(id):
    project = Project.query.get_or_404(id)
    if project.author_id != g.user_id:
        return jsonify({"error": "Unauthorized"}), 403
    
    db.session.delete(project)
    db.session.commit()
    return jsonify({"message": "Project deleted successfully"})

@app.route('/admin')
@clerk_required
def admin():
    user = User.query.get(g.user_id)
    if not user or user.role != 'ADMIN':
        return redirect(url_for('index'))
    users = User.query.all()
    return render_template('admin.html', users=users)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)