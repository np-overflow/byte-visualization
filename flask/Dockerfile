FROM python:3.7

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# This copies react build folders as well
COPY . .
COPY ./main .
COPY ./build .

CMD ["python", "run.py"]
