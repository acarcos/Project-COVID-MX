# == Flask application ==

# Libraries
from flask import Flask, render_template

# Instance of Flask
app = Flask(__name__)

@app.route("/")
def covid_data():
    return render_template("base.html")

@app.route("/plots/")
def test():
    return render_template("plots.html")

@app.route("/map/")
def maps():
    return render_template("map.html")

if __name__ == "__main__":
    app.run(debug=True)