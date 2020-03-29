define(['app/jquery-private'], 
function ($fids) {

  'use strict';

  // Fids widget options passed from client
  var options = JSON.parse($fids('#fids-flights-script').attr('data-options'));

  // setup baseUrl used for json flight feed and airlines images
  var baseUrl = "https://webfids.symbiant.co.nz/";
  // if we pass in a baseurl from widget instatiation, use this
  if (options.baseUrl !== undefined) {
    baseUrl = options.baseurl;
  }

  var tabsClass      = 'fids-tabs';
  var tabClass       = 'fids-tab';
  var tabButtonClass = 'fids-tab-button';
  var activeClass    = 'fids-active';


  var tabs = {
    init: function () {

      var that = this;

      /* Initialize each tabbed container */
      var tabbedContainers = document.body.querySelectorAll('.'+tabsClass)
      for (var tc = 0; tc < tabbedContainers.length; tc++) {
        var tabbedContainer = tabbedContainers[tc]

        /* List of tabs for this tabbed container */
        var tabList = tabbedContainer.querySelectorAll('.'+tabClass)

        /* Make the first tab active when the page loads */
        this.activateTab(tabList[0])

        /* Activate a tab when you click its button */
        for (var i = 0; i < tabList.length; i++) {
          var tabElement = tabList[i]
          var tabButton = tabElement.querySelector('.'+tabButtonClass)
          tabButton.addEventListener('click', function(event) {
            event.preventDefault()
            that.activateTab(event.target.parentNode);
          })
        }

      }

    },

    activateTab: function(chosenTabElement) {
      var tabList = chosenTabElement.parentNode.querySelectorAll('.'+tabClass)
      for (var i = 0; i < tabList.length; i++) {
        var tabElement = tabList[i]
        if (tabElement.isEqualNode(chosenTabElement)) {
          // FIDS-96, previous pure JS selectors were not working, replaced with jquery.
          $fids(tabElement).addClass(activeClass);
        } else {
          $fids(tabElement).removeClass(activeClass);
        }
      }
    }
  }

  return tabs;

});
