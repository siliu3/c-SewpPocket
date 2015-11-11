define([
  'jquery',
  'underscore',
  'backbone',
  'text!templates/main/404Template.html'
], function($, _, Backbone, nofoundTemplate){
  var NofoundView = Backbone.View.extend({
    tagName: "div",
    id: "nofound-view",

    initialize : function() {
        $("body").html(this.el);
        this.render();
    },
    render: function(){
    	$(document).attr("title","404 no found");
    	
      $('.nav li').removeClass('active');
      this.$el.html(nofoundTemplate);
 
    }

  });

  return NofoundView;
  
});