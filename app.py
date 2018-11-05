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


@app.route('/commitsovertime', methods=["GET", "POST"])
def commitsovertime():
    '''
    x = [array of time]
    y = [value at x time]
    '''

    test_return_json = {
        'time': ['11:00', '12:00', '13.00', '14.00'],
        'users': {
            'john': [1, 3, 10, 14],
            'ben': [3, 5, 6, 18],
            'adams': [2, 9, 16, 17],
            'mason': [8, 12, 13, 21],
            'red': [4, 6, 21, 22]
        }
    }

    return jsonify(test_return_json)


@app.route('/additionsovertime', methods=["GET", "POST"])
def additionsovertime():
    '''
    x = [array of time]
    y = [value at x time]
    '''

    test_return_json = {
        'time': ['11:00', '12:00', '13.00', '14.00'],
        'users': {
            'john': [1, 3, 10, 14],
            'ben': [3, 5, 6, 18],
            'adams': [2, 9, 16, 17],
            'mason': [8, 12, 13, 21],
            'red': [4, 6, 21, 22]
        }
    }

    return jsonify(test_return_json)


@app.route('/deletionsovertime', methods=["GET", "POST"])
def deletionsovertime():
    '''
    x = [array of time]
    y = [value at x time]
    '''

    test_return_json = {
        'time': ['11:00', '12:00', '13.00', '14.00'],
        'users': {
            'john': [1, 3, 10, 14],
            'ben': [3, 5, 6, 18],
            'adams': [2, 9, 16, 17],
            'mason': [8, 12, 13, 21],
            'red': [4, 6, 21, 22]
        }
    }

    return jsonify(test_return_json)


@app.route('/locovertime', methods=["GET", "POST"])
def locovertime():
    '''
    x = [array of time]
    y = [value at x time]
    '''

    test_return_json = {
        'time': ['11:00', '12:00', '13.00', '14.00'],
        'users': {
            'john': [1, 3, 10, 14],
            'ben': [3, 5, 6, 18],
            'adams': [2, 9, 16, 17],
            'mason': [8, 12, 13, 21],
            'red': [4, 6, 21, 22]
        }
    }

    return jsonify(test_return_json)


if __name__ == '__main__':
    app.run(debug=True, port=5000)
