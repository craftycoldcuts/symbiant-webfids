/** optimise css (do first):
*   r.js.cmd -o cssIn=fids-flights.css out=fids-flights-min.css
*
** optmise js (do second):
*   r.js.cmd -o fids-flights.build.js
*/

({
  baseUrl: ".",
  mainConfigFile: "config.js",
  name: "bower_components/almond/almond", // assumes a production build using almond
  include: ['fids-flights'],
  out: "fids-flights.min.js",
  optimizeCss: "standard",
  // uncomment when in development
	// optimize: "none",
  stubModules: ['text']
})