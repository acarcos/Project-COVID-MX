# == Flask application ==

# Libraries
from flask import Flask, render_template

# Instance of Flask
app = Flask(__name__)

@app.route("/")
def covid_data():
    return render_template("base.html")

@app.route("/genre/")
def test():
    return render_template("genre.html")

@app.route("/states/")
def states():
    return render_template("states.html")

@app.route("/map/")
def maps():
    return render_template("map.html")

@app.route("/age/")
def age():
    return render_template("age.html")

if __name__ == "__main__":
    app.run(debug=True)