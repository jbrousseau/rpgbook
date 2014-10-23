/* global Package */
Package.describe({
  summary: "Add dice in 3D >0.9.0",
  "version": "1.0.0",
  "git": "https://github.com/jbrousseau/meteor-dice-roll-3d.git",
  "name": "dice-roll-3d"
});

var both = ["client", "server"];

Package.on_use(function (api, where) {
  if(api.versionsFrom) {
    api.versionsFrom('METEOR@0.9.0');
  }
  api.use([
  ], both);

  api.add_files([
      "client/teal.js",
      "client/three.min.js",
      "client/cannon.min.js",
      "client/dice.js",
      "client/main.js"
  ], "client");
  //api.export("CollectionBehaviours");
});
/*Package.on_test(function(api) {
  api.use('tinytest');
  api.use('meteor-collection-behaviours');
  api.addFiles('collection-behaviours_tests.js');
});*/
