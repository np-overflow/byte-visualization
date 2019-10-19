FROM python:3.7

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# This copies react build folders as well
COPY . .
COPY ./main ./main

# RUN ["chmod +x", "run.sh"]

# Initialise database schemas
# RUN ["python init.py"]

CMD ["sh", "run.sh"]
# CMD ["uwsgi", "app.ini"]
# CMD ["python" ,"init.py", "-r", "-d"]