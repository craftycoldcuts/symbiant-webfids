# FIDS flights JS widget

Embeddabled widget which can be dropped into any approved host (hosts managed via nginx CORS headers).

Widget displays arrival and departure flights for the specified airport.

## Building the widget - With local Node

Assuming Node is installed, then install RequireJs like so:

npm install requirejs -g

Then run:

runbuildtasks.bat

OR manually

r.js.cmd -o cssIn=fids-flights.css out=fids-flights-min.css (optimises CSS)
(drop the .cmd if using mac)

r.js.cmd -o fids-flights.build.js (optimises JS)


## Building the widget - useing Docker Node

Paths assume unix
With Docker machine running:

./build-widget.sh

Note: for this, needs files: Dockerfile and package.json (required by the official Node image)
