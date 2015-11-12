define([
  'jquery',
  'underscore',
  'backbone',
  'views/base/MainView',
  'models/request/RequestModel',
  'collections/post/PostCollection',
  'text!templates/main/homeTemplate.html',

  ], function($, _, Backbone,MainView,
    RequestModel,
    PostCollection,
    homeTemplate){
    

    var HomeView = Backbone.View.extend({
      tagName: "div",
      id: "home-view",

      initialize : function() {
        this.baseView = new MainView({pageView:this});
        
        this.postCollection = new PostCollection([]);
        this.postCollection.bind('reset', this.render, this);
        this.postCollection.bind('add', this.render, this);
        this.postCollection.fetch();
        
        this.render();
        
      },

      events:{
          'click .make-request' : 'make_request'

      },
      make_request:function(e){
        var that = this;
        var post_id = $(e.target).val();
        var newRequestModel  = new RequestModel({ post_id : post_id});
        newRequestModel.save({},{
          success: function(model, response) {  
            $('#success-modal').modal('show');
          },
          error: function(model, response) {
            var errorInfo = JSON.parse(response.responseText);
            console.log(errorInfo);
            that.errorMessage = errorInfo.message;
            that.render();
            
            $('#error-modal').modal('show');

          }
        });
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