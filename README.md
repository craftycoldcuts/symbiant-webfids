# FIDS flights JS widget

Embeddabled widget which can be dropped into any website. Widget displays arrival and departure flights for the specified airport.  

To allow cross site orgin connection, approved hosts are managed via nginx CORS headers.

---

## Building the minified widget

### Building the widget - With local Node

Assuming Node is installed, then install RequireJs like so:

`npm install requirejs -g`

Then run:

`runbuildtasks.bat`

OR manually

`r.js.cmd -o cssIn=fids-flights.css out=fids-flights-min.css` (optimises CSS)
Note: drop the .cmd if using mac

`r.js.cmd -o fids-flights.build.js` (optimises JS)


### Building the widget - using Docker Node

Paths assume unix
With Docker machine running:

`./build-widget.sh`

Note: for this, needs files: Dockerfile and package.json (required by the official Node image)

## Installing

Embedding the widget on any external site.

1. Host the `fids-flights.min.js` file on your site
2. Copy the following script content `include-script-all-browser.js` on your site, making sure to update the `script.src` with your hosted file ^^.
3. Add the following tag anywhere on your site, `<div class="fids-flights"></div>`

### Example
Example below (change script.src to hosted script, example .src below is for local dev)

```javascript
(function (window, document) {

  var columns = {
    arrivals: {
      date: {'label' : 'Date'}
      ,est: {'label' : 'Est'}
    }
    ,departures: {
      date: {'label' : 'Date'}
      ,est: {'label' : 'Est'}
    }
  }
  var loader = function () {
    // Fids widget options
    var options = {
      airportCode: 'nsn', // mandatory, , add your airport code here
      fontSize: 14, // optional, font pixel(px) size, defaults to 12
      skin: 'fids-flat', // optional, leave blank for no skin
      airlineLogoColour: 'dark', //optional, 'light' or 'dark' defaults to dark, light maybe required when serving up the flight table on a dark background
      tabs: true, // optional, if true converts flight list into tabbed 'arrival/departure' tabs, otherwise tables display in list
      marquee: true, // optional, if true, and device width < 320px, codeshares scroll
      marqueeForce: false, // optional, if true, marquee iasalways on
      columns: columns
    };
    var script = document.createElement("script"), tag = document.getElementsByTagName("script")[0];
    script.src = "./../fids-flights.min.js";
    script.id = "fids-flights-script";
    script.setAttribute("data-options",JSON.stringify(options));
    tag.parentNode.insertBefore(script, tag);
  };
  window.addEventListener ? window.addEventListener("load", loader, false) : window.attachEvent("onload", loader);
})(window, document);
```
## Built With

* [backbone.js](https://backbonejs.org/) - The web framework used
* [RequireJs](https://requirejs.org/) - Web module loader and optimiser
* [Handlebars](https://handlebarsjs.com/) - HTML Templating
* [Node/NPM] - build tools

## Authors

* **Brad Owen**

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2016 - Brad Owen


