#!/bin/bash
export USER_SERVICE_PORT=4002
export CHAT_SERVICE_PORT=4004
export DATABASE_OUT_PORT=5555
export DATABASE_IN_PORT=5432
docker compose down
docker volume rm zaloservices_database_data