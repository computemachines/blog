from flask import Flask, request, session, g, redirect, url_for, abort, \
    render_template, flash
from werkzeug.contrib.fixers import LighttpdCGIRootFix

app = Flask(__name__)
app.wsgi_app = LighttpdCGIRootFix(app.wsgi_app)
app.config.from_object(__name__)

app.config.update(dict(
    USERNAME='admin'
))
app.config.from_envvar('APP_SETTINGS', silent=True)

@app.route('/')
def show_last_post():
    return render_template('show_post.html', post_id=-1)

@app.route('/post/<int:post_id>')
def show_post(post_id):
    return render_template('show_post.html', post_id=post_id)

@app.route('/projects/')
def list_projects():
    return render_template('projects.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        pass
    else:
        return render_template('login.html')
