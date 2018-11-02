from flask import Flask, render_template


app = Flask(__name__)


# routes
@app.route('/', methods=["GET"])
def index():
    return render_template('index.html')


# apis - put some apis here

if __name__ == '__main__':
    app.run(debug=True, port=5000)
