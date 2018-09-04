#! /bin/bash

docker build -t bhs/ios-course-movies-server -t registry.yink.dk/bhs/ios-course-movies-server .
docker push registry.yink.dk/bhs/ios-course-movies-server
