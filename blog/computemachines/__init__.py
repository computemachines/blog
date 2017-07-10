from flask import Flask, render_template, redirect, url_for
app = Flask(__name__)

@app.route('/')
def index():
    return "Hello worlds"

@app.route('/hello/<name>')
def hello(name="Stranger"):
    return render_template('hello.html', name=name)
