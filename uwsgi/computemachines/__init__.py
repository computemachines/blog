from flask import Flask, render_template, redirect, url_for
app = Flask(__name__)

def get_resource_as_string(name, charset='utf-8'):
    with app.open_resource(name) as f:
        return f.read().decode(charset)

app.jinja_env.globals['get_resource_as_string'] = get_resource_as_string


@app.context_processor
def inject_debug():
    return dict(debug=app.debug)


@app.route('/')
def index():
    return redirect(url_for("show_projects"))

@app.route('/projects')
def show_projects():
    return render_template("projects/elasticity.html")
