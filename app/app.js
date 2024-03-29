define(['app/jquery-private','underscore','backbone','handlebars', 'app/tabs', 'app/tipr.min', 'text!templates/flights.html', 'text!css/fids-flights-min.css'], 
function ($fids, _, Backbone, Handlebars, tabs, tipr, flightsTemplate, css) {

  'use strict';

  // Fids widget options passed from client
  var options = JSON.parse($fids('#fids-flights-script').attr('data-options'));

  // setup baseUrl used for json flight feed and airlines images
  var baseUrl = "https://webfids.symbiant.co.nz/";
  // if we pass in a baseurl from widget instatiation, use this
  if (options.baseUrl !== undefined) {
    baseUrl = options.baseurl;
  }

  // flights json feed URL
  var flightsURL = baseUrl + "sites/" + options.airportCode + ".json";
  if (options.mode === 'dev') {
    // test data for running locally, add json file in same directory as webpage
    flightsURL = options.airportCode + ".json";
  }

  // airline logo colour
  var airlineLogoColour = 'dark';
  if (options.airlineLogoColour !== 'dark') {
    airlineLogoColour = 'light';
  }

  // used to determine if marquee shoudl run
  var windowWidth = window.innerWidth;

  var app = {
    init: function () {

      var $style = $fids("<style></style>", {type: "text/css"});
      $style.text(css);
      $fids("head").append($style);

      var template = Handlebars.compile(flightsTemplate);

      var that = this;

      var flight = new Flight();

      flight.fetch({
        success: function (flightData) {

          var depSort = that.sortArray(flightData.attributes.departures, 'sorting_datetime', 'asc');
          var arrSort = that.sortArray(flightData.attributes.arrivals, 'sorting_datetime', 'asc');
          flightData.attributes.departures = depSort;
          flightData.attributes.arrivals = arrSort;
          flightData.attributes.options = options;
          var flightHTML = template(flightData.attributes);
          $fids('.fids-flights').html(flightHTML);

          $fids(".fids-flights img").error(function () { 
            $fids(this).hide();
          });

          $fids('.fids-info').tipr();

          tabs.init();
        },
        error: function(flightData) {
          flightData.attributes.error = true;
          flightData.attributes.options = options;
          var flightHTML = template(flightData.attributes);
          $fids('.fids-flights').html(flightHTML);
        }
      });

    },
    sortArray: function(array, sortKey, order) {
      if (order === undefined) {
        order = "asc";
      }
      var sortedArray = _.sortBy(array, function(item) {
        return item[sortKey];
      });

      if (order === 'dsc') {
        sortedArray = sortedArray.reverse();
      }

      return sortedArray;
    }
  },

  Flight = Backbone.Model.extend({
    urlRoot: flightsURL,
    initialize: function () {
      this.reports = new FlightCollection();
    }
  }),

  FlightCollection = Backbone.Collection.extend({
    model: Flight,
    url: flightsURL
  }),

  originalSync = Backbone.sync;


  /**
   * Handlebars helpers
   */
  Handlebars.registerHelper('airlineImage', function(options) {
    var myNav = navigator.userAgent.toLowerCase();
    var ie = (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
    var baseUrl = options.data.root.base_image_url + "/";
    var imageName = this.airline_short_name + "_badge_" + airlineLogoColour;
    if (ie && ie < 9 || this.airline_img_svg === null) {
      return baseUrl + imageName + ".png";
    } else {
      return baseUrl + imageName + ".svg";
    }
  });

  Handlebars.registerHelper('marquee', function(options) {
    if ((options.data.root.options.marquee && this.codeshares.length && windowWidth <= 320) || options.data.root.options.marqueeForce && this.codeshares.length) { // iphone 5 and under
      return "marquee";
    }
  });

  Handlebars.registerHelper('produced', function(options) {
    var producedString = this.produced;
    var sep = " ";
    var dateStr = producedString.substring(0, producedString.indexOf(sep));
    var timeStr = producedString.substring(producedString.indexOf(sep) + 1, producedString.lastIndexOf(":"));
    var dateMod = "";
    var date = new Date(dateStr);
    if (!isNaN(date.getTime())) {
        // Months use 0 index.
        dateMod = date.getDate() + '/' + parseInt(date.getMonth() + 1) + '/' + date.getFullYear();
    }
    return dateMod + sep + timeStr;
  });

  Handlebars.registerHelper('getActualTime', function () {
    var row = this;
    if (row.actual_time !== "" && row.actual_time !== undefined) {
      return row.actual_time;
    }
  
    if (row.est_time !== "" && row.est_time !== undefined) {
      return row.est_time;
    }
  
    if (row.sched_time !== "" && row.sched_time !== undefined) {
      return row.sched_time;
    }
  
    return "";
  });

  Handlebars.registerHelper({
    eq: (v1, v2) => v1 === v2,
    ne: (v1, v2) => v1 !== v2,
    lt: (v1, v2) => v1 < v2,
    gt: (v1, v2) => v1 > v2,
    lte: (v1, v2) => v1 <= v2,
    gte: (v1, v2) => v1 >= v2,
    and() {
        return Array.prototype.every.call(arguments, Boolean);
    },
    or() {
        return Array.prototype.slice.call(arguments, 0, -1).some(Boolean);
    }
});

// special helpers to support multistop cities 

Handlebars.registerHelper('citiesEnglish', function () {
  var context = this;
  var returnString = "";

  if (context.cities === undefined) {
    return returnString;
  }

  if (context.citieslength === 0) {
    return context.cities[0];
  } else {
    return context.cities.join(" / ")
  }

});

  Handlebars.registerHelper('citiesTereo', function () {
    var context = this;
    var returnString = "";

    if (context.cities_tereo === undefined) {
      return returnString;
    }

    if (context.cities_tereo.length === 0) {
      return context.cities_tereo[0];
    } else {
      return context.cities_tereo.join(" / ")
    }

  });

  /* HANDLEBARS HELPERS - END */

  Backbone.sync = function (method, model, options) {
    if (method === "read") {
      options.dataType = "json";
      //options.jsonpCallback = "jsonpCallback";
      return originalSync.apply(Backbone, arguments);
    }
  };



  return app;

});

/**
 * This is just for the Symbiant Systems tooltip at the bottom of the table
 */
(function($){$.fn.tipr=function(options){var set=$.extend({'speed':200,'mode':'bottom'},options);return this.each(function(){var tipr_cont='.tipr_container_'+set.mode;$(this).hover(function()
{var d_m=set.mode;if($(this).attr('data-mode'))
{d_m=$(this).attr('data-mode')
tipr_cont='.tipr_container_'+d_m;}
var out='<div class="tipr_container_'+d_m+'"><div class="tipr_point_'+d_m+'"><div class="tipr_content">'+$(this).attr('data-tip')+'</div></div></div>';$(this).append(out);var w_t=$(tipr_cont).outerWidth();var w_e=$(this).width();var m_l=(w_e / 2)-(w_t / 2);$(tipr_cont).css('margin-left',m_l+'px');$(this).removeAttr('title alt');$(tipr_cont).fadeIn(set.speed);},function()
{$(tipr_cont).remove();});});};})(jQuery);