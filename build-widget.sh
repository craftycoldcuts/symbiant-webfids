#!/bin/bash -e

# Create a local node image based off the official image but with requirejs installed
docker build --rm=true -t node1 .

# Optimise the css
docker run --rm -v "$(pwd)":/usr/src/app -w /usr/src/app/css node1 r.js -o cssIn=fids-flights.css out=fids-flights-min.css
# Optimise the js
docker run --rm -v "$(pwd)":/usr/src/app -w /usr/src/app  node1 r.js -o fids-flights.build.js

# Now remove the docker image and we should be left with just our new files
docker rmi node1

echo
echo "Done"
echo "Upload fids-flights.min.js"

