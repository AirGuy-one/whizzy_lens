FROM python:3.11-slim

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY entrypoint.sh .
RUN chmod +x /app/entrypoint.sh

COPY . .

ENTRYPOINT ["/app/entrypoint.sh"]