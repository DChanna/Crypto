#!/bin/bash

TIMEOUT=300  # 5 minutes
ELAPSED=0
INTERVAL=2

echo "Waiting for the crawler to finish..."
while [ ! -f /tmp/crawler_done ]; do
  sleep $INTERVAL
  ELAPSED=$((ELAPSED + INTERVAL))
  if [ $ELAPSED -ge $TIMEOUT ]; then
    echo "Timeout reached. Crawler did not finish in time."
    exit 1
  fi
done

echo "Crawler finished. Starting the backend..."
exec "$@"
