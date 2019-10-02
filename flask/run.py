from main import app

@app.route('/test', methods=['GET'])
def test():
    return "Test is working"

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)