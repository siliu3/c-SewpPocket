define([
  'backbone',
  'router', 
], function(Backbone, Router){
  var App = function(){
    this.router = null;
    this.initialize = function () {
        this.router = new Router();
        Backbone.history.start({
            pushState : true
        });
    };
  };
  return App;
});