define([
  'jquery',
  'underscore',
  'backbone',
  'views/base/MainView',
  'collections/post/PostCollection',
  'text!templates/main/homeTemplate.html',

  ], function($, _, Backbone,MainView,
    PostCollection,
    homeTemplate){
    

    var HomeView = Backbone.View.extend({
      tagName: "div",
      id: "home-view",

      initialize : function() {
        
        this.postCollection = new PostCollection([]);
        this.postCollection.bind('reset', this.render, this);
        this.postCollection.bind('add', this.render, this);
        this.postCollection.fetch();
        
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

        var templateObject = _.template(homeTemplate);
        this.$el.html(templateObject(
          {
            _: _,
            errorMessage: this.errorMessage,
            posts: this.postCollection.models
          }
          ));		
      }
    });

    return HomeView;

  });