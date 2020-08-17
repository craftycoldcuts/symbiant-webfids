<script>
(function (window, document) {
    var columns = {
      arrivals: {
        est: {'label' : 'Est'}
      }
      ,departures: {
        est: {'label' : 'Est'}
      }
    }
    var loader = function () {
      // Fids widget options
      var options = {
        airportCode: 'dud', // mandatory, , add your airport code here
        fontSize: 14, // optional, font pixel(px) size, defaults to 12
        skin: 'fids-flat', // optional, leave blank for no skin
        airlineLogoColour: 'dark', //optional, 'light' or 'dark' defaults to dark, light maybe required when serving up the flight table on a dark background
        tabs: true, // optional, if true converts flight list into tabbed 'arrival/departure' tabs, otherwise tables display in list
        activeTab: 0, //optional, will default to first tab (0 = departures) if not set 
        marquee: true, // optional, if true, and device width < 320px, codeshares scroll
        marqueeForce: false, // optional, if true, marquee iasalways on
        columns: columns
      };
  var loader = function () {
    var script = document.createElement("script"), tag = document.getElementsByTagName("script")[0];
    script.src = "<path_to_your_hosted_file>";
    script.id = "fids-flights-script";
    tag.parentNode.insertBefore(script, tag);
  };
  window.addEventListener ? window.addEventListener("load", loader, false) : window.attachEvent("onload", loader);
})(window, document);
</script>