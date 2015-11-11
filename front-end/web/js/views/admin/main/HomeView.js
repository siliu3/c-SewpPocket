define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/base/MainView',
  'text!templates/admin/main/homeTemplate.html',

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
        $(document).attr("title","管理员主面板");

        // $('.nav li').removeClass('active');
        // $('.nav li a[href=""]').addClass('active');

        this.$el.html(homeTemplate);    
      }
    });

    return HomeView;

  });