from main import app
# from main.worker import start_worker

if __name__ == "__main__":
    # Note : start the worker when in production
    # This is what fills up the db
    # start_worker()
    app.run(debug=False)