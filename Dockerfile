FROM python:3.13-alpine

WORKDIR /app
COPY server/app.py .

ENV ROOT=/srv/roadmap \
    PORT=8080 \
    PYTHONUNBUFFERED=1

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/api/progress || exit 1

CMD ["python", "app.py"]
