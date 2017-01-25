from flask import Flask, request, session, g, redirect, url_for, abort, \
    render_template, flash, Markup
from flask_pymongo import PyMongo
from util import rst2html

app = Flask(__name__)
mongo = PyMongo(app)

app.config.from_object(__name__)

app.config.update(dict(
    USERNAME='admin'
))
app.config.from_envvar('APP_SETTINGS', silent=True)

@app.route('/')
def show_last_post():
    return redirect(url_for('login'))
    return render_template('show_post.html', post_id=0)

@app.route('/post/new')
def new_post(post_id):
    mongo.db.posts.insert({'_id': post_id, 'content': 'hello worlds' })
    return redirect(url_for('show_post', post_id=post_id))

@app.route('/post/<int:post_id>')
def show_post(post_id):
    post = mongo.db.posts.find_one_or_404({'_id': post_id})
    post_content_html = rst2html(post['content'])
    return render_template('show_post.html', post_content_html=Markup(post_content_html))

@app.route('/post/')
def show_posts():
    posts = mongo.db.posts.find()
    return render_template('show_posts.html',
                           posts=[rst2html(post['content']) for post in posts])

@app.route('/projects/')
def list_projects():
    return render_template('projects.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return
    else:
        return render_template('login.html')

if __name__=='__main__':
    app.run(debug=True)
