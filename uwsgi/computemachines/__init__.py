from flask import Flask, render_template, redirect, url_for
app = Flask(__name__)

@app.route('/')
def index():
    return redirect(url_for("show_projects"))

@app.route('/projects')
def show_projects():
    return render_template("projects/elasticity.html")

@app.context_processor
def inject_debug():
    return dict(debug=app.debug)
