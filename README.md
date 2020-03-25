# RETROCOOP API

## Requirements
* [docker](https://docs.docker.com/)
* [Robo 3T](https://www.robomongo.org/download)

## How to install

* clone repository `git clone https://github.com/deeem/retrocoop-api.git .` and `cd retrocoop-api` in to it
* check **.env** file and change `APP_HOST` and `APP_PORT` if needed
* spin up environment `docker-compose up -d`
* copy **games.json** and **images** folder in to **public** folder
* seed db:
  * `docker-compose exec api node seeders/usersSeeders -i`
  * `docker-compose exec api node seeders/platformSeeders -i`
  * `docker-compose exec api node seeders/gamesSeeders -i`
  * `docker-compose exec api node seeders/coopsSeeders -i`

## How to connect
### API
API available at host and port which provided in **.env** file

### DB
connect using Robo3T on localhost with data from **.env** file: `localhost`, `DB_PORT`, `MONGO_USERNAME`, `MONGO_PASSWORD`

### container
`docker-compose exec api sh`

## Managing containers
* stop all containers `docker-composer stop`
* down all containers `docker-composer down`
* start all containers `docker-composer up -d`
* recreate all containers `docker-compose up --force-recreate`
