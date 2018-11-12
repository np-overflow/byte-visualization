from flask import Flask, render_template, jsonify
import random
# import scripts.mainapi as mainapi
import scripts.old.dummydata as dummydata
from scripts.old.separatescripts import get_diff_per_element

# import proper thinsg here
# from [location] import [script]


app = Flask(__name__)

# change this to 0 
test_purposes = 1

# routes
@app.route('/', methods=["GET"])
def index():
    # serve this when template is done
    #return render_template('testcharts.html')
    return render_template('index.html')


@app.route('/getallovertimecumulative', methods=["GET", "POST"])
def getallovertimecumulative():

    if test_purposes == 0:
        return jsonify(location.function())
    elif test_purposes == 1:
        return jsonify(dummydata.test_get_changes_dummy())
    elif test_purposes == 2:
        # more test data
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

@app.route('/getgroupsovertimedifference', methods=["GET", "POST"])
def getgroupovertimedifference():

    if test_purposes == 0:
        return jsonify(location.function())
    elif test_purposes == 1:
        return jsonify(dummydata.groups_difference())
    elif test_purposes == 2:
        # more test data
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

@app.route('/getmultiovertimedifference', methods=["GET", "POST"])
def getmultiovertimedifference():

    if test_purposes == 0:
        return jsonify(location.function())
    if test_purposes == 1:
        return jsonify(dummydata.users_difference())
    elif test_purposes == 2:
        # more test data
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

# shows all the languages in a line chart first
@app.route('/getlangovertime', methods=["GET", "POST"])
def getlangovertime():

    if test_purposes == 0:
        return(location.function())
    elif test_purposes == 1:
        return jsonify(dummydata.lang_changes())
    elif test_purposes == 2:
        # more test data
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
    # app.run(debug=True, port=5000)
    app.run(host='0.0.0.0')