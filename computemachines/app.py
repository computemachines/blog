from flask import Flask, request, session, g, redirect, url_for, abort, \
    render_template, flash, Markup
from flask_pymongo import PyMongo
from util import rst2html

app = Flask(__name__)
mongo = PyMongo(app)

app.config.from_object(__name__)
# not currently used
# app.config.from_envvar('APP_SETTINGS', silent=True)

# expose rst2html function from jinja template
app.jinja_env.globals.update(rst2html=rst2html)

@app.route('/')
def show_last_post():
    return redirect(url_for('show_posts'))

@app.route('/post/new')
def new_post(post_id):
    mongo.db.posts.insert({'_id': post_id, 'content': 'hello worlds' })
    return redirect(url_for('show_post', post_id=post_id))

@app.route('/post/<int:post_id>')
def show_post(post_id):
    post = mongo.db.posts.find_one_or_404({'_id': post_id})
    return render_template('show_post.html', post=post)

@app.route('/post/')
def show_posts():
    # for now there is only one post, so renders identically to show_post
    posts = mongo.db.posts.find()
    return render_template('show_posts.html',
                           posts=posts)

# @app.route('/projects/')
# def list_projects():
#     return render_template('projects.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        # TODO: process login form POST
        return
    else:
        return render_template('login.html')

if __name__=='__main__':
    app.run(debug=True)
