define([
  'jquery',
  'underscore',
  'backbone',
  'views/base/MainView',
  'text!templates/main/homeTemplate.html',

  ], function($, _, Backbone,MainView,
    homeTemplate){
    

    var HomeView = Backbone.View.extend({
      tagName: "div",
      id: "home-view",

      initialize : function() {
        this.render();
        this.baseView = new MainView({pageView:this});
      },

      events:{


      },
      h1click:function(){
        alert("!!!!");
      },

      render: function(){
        $(document).attr("title","Dashboard");

        // $('.nav li').removeClass('active');
        // $('.nav li a[href=""]').addClass('active');

        this.$el.html(homeTemplate);		
      }
    });

    return HomeView;

  });