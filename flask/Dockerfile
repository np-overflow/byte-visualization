FROM python:3.7

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# This copies react build folders as well
COPY . .
COPY ./main ./main

# CMD ["python", "run.py"]
# CMD ["uwsgi", "--socket", "0.0.0.0:5000", "--protocol=http", "-w", "run:app"]
CMD ["uwsgi", "app.ini"]