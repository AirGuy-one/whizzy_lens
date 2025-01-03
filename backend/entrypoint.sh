#!/bin/sh

if [ "$DATABASE" = "postgres" ]
then
    echo "Waiting for postgres..."

    while ! nc -z $SQL_HOST $SQL_PORT; do
      sleep 0.1
    done

    echo "PostgreSQL started"
fi

# Erases all data from DB
# python manage.py flush --no-input
python manage.py collectstatic --no-input
python manage.py migrate --no-input

exec "$@"
