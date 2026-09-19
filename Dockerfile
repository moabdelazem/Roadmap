FROM python:3.13-alpine

RUN apk add --no-cache git \
 && adduser -D -u 1000 roadmap \
 && mkdir /data && chown roadmap /data

USER roadmap
WORKDIR /app
COPY server/app.py .

ENV DATA_DIR=/data \
    PORT=8080 \
    PYTHONUNBUFFERED=1

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
  CMD wget -q -O /dev/null http://127.0.0.1:8080/api/status || exit 1

CMD ["python", "app.py"]
