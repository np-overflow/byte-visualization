FROM python:3.7

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .
COPY ./main ./main

# CMD ["python", "worker.py"]
CMD ["sh", "run.sh"]