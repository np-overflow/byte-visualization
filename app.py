from flask import Flask, render_template, jsonify
import random


app = Flask(__name__)


# routes
@app.route('/', methods=["GET"])
def index():
    return render_template('testcharts.html')

    # serve this when template is done
    # return render_template('index.html')


# apis - put some apis here
@app.route('/usercommits', methods=["GET", "POST"])
def usercommits():
    test_return_json = {}
    names = ["john", "ben", "adams", "mason", "white", "sleepy",
             "hills", "quinn", "sean", "moose", "emma", "olivia",
             "harper", "mia", "pineapples", "apples", "bananas",
             "pears", "durians", "vegetables", "brocollis"]

    for name in names:
        test_return_json[name] = random.randint(1, 20)

    return jsonify(test_return_json)


if __name__ == '__main__':
    app.run(debug=True, port=5000)
