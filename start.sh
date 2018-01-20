#!/bin/sh

SOURCES_PATH="./src"

installPackets() {
    (cd $SOURCES_PATH && npm i)
}

runDocker() {
    docker-compose up --build
}

installPackets
runDocker