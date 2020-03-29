var requirejs = {
    paths: {
        text : "bower_components/requirejs-text/text",
        jquery: "bower_components/jquery/dist/jquery.2.1.4.min",
        backbone: "bower_components/backbone/backbone-min",
        handlebars: "bower_components/handlebars/handlebars.amd.min",
        underscore: "bower_components/underscore/underscore-min"
    }
};

requirejs.config({
    // Add this map config in addition to any baseUrl or
    // paths config you may already have in the project.
    map: {
      // '*' means all modules will get 'jquery-private'
      // for their 'jquery' dependency.
      '*': { 'jquery': 'jquery-private' },

      // 'jquery-private' wants the real jQuery module
      // though. If this line was not here, there would
      // be an unresolvable cyclic dependency.
      'jquery-private': { 'jquery': 'jquery' }
    }
});