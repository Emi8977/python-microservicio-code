FROM python:3.9-slim-buster

WORKDIR /app

COPY . /app

# ✅ Instalás Flask directamente
RUN pip install Flask
RUN pip install Flask flask_pymongo
RUN pip install Flask flask_cors

EXPOSE 5001

ENV FLASK_APP=app-register.py
ENV FLASK_RUN_HOST=0.0.0.0

CMD ["flask", "run"]
