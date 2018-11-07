from flask import Flask, render_template, jsonify
import random


app = Flask(__name__)

test_purposes = 1

# routes
@app.route('/', methods=["GET"])
def index():
    return render_template('testcharts.html')

    # serve this when template is done
    # return render_template('index.html')


# apis - put some apis here
@app.route('/usercommits', methods=["GET", "POST"])
def usercommits():
    if test_purposes == 1:
        test_return_json = {}
        names = ["john", "ben", "adams", "mason", "white", "sleepy",
                "hills", "quinn", "sean", "moose", "emma", "olivia",
                "harper", "mia", "pineapples", "apples", "bananas",
                "pears", "durians", "vegetables", "brocollis"]

        for name in names:
            test_return_json[name] = random.randint(1, 20)

        return jsonify(test_return_json)
    else:
        return None


@app.route('/commitsovertime', methods=["GET", "POST"])
def commitsovertime():
    '''
    x = [array of time]
    y = [value at x time]
    '''

    if test_purposes == 1:
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
    else:
        return None


@app.route('/additionsovertime', methods=["GET", "POST"])
def additionsovertime():
    '''
    x = [array of time]
    y = [value at x time]
    '''

    if test_purposes == 1:
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
    else:
        return None


@app.route('/deletionsovertime', methods=["GET", "POST"])
def deletionsovertime():
    '''
    x = [array of time]
    y = [value at x time]
    '''

    if test_purposes == 1:
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
    else:
        return None


@app.route('/locovertime', methods=["GET", "POST"])
def locovertime():
    '''
    x = [array of time]
    y = [value at x time]
    '''

    if test_purposes == 1:
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
    else:
        return None

@app.route('/loclangovertime', methods=["GET", "POST"])
def loclangovertime():
    '''
    x = [array of time]
    y = [value at x time]
    '''

    if test_purposes == 1:
        test_return_json = {
            'time': ['9:00', '10:00', '11:00', '12:00', '13.00', '14.00', '15.00'],
            'language': {
                'python': [1200, 1300, 1800, 4600, 7000],
                'java': [600, 1000, 5000, 6500, 8000],
                'c': [100, 800, 6800, 9100, 12000],
                'c++': [0, 0, 1200, 2700, 3000],
                'clojure': [100, 400, 700, 900, 4000],
                'c#': [0, 3000, 8000, 14000, 18000]
            }
        }

        return jsonify(test_return_json)
    else:
        return None

if __name__ == '__main__':
    app.run(debug=True, port=5000)
