<script>
(function (window, document) {
  var loader = function () {
    var script = document.createElement("script"), tag = document.getElementsByTagName("script")[0];
    script.src = "http://www.kelf.co.nz/fids/flightswidget/fids-flights.min.js";
    script.id = "fids-flights-script";
    script.setAttribute("data-skins",'flat');
    tag.parentNode.insertBefore(script, tag);
  };
  window.addEventListener ? window.addEventListener("load", loader, false) : window.attachEvent("onload", loader);
})(window, document);
</script>