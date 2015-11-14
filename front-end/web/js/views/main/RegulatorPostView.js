define([
  'jquery',
  'underscore',
  'backbone',
  'views/base/MainView',
  'models/request/RequestModel',
  'collections/post/PostCollection',
  'text!templates/main/regulatorPostTemplate.html',

  ], function($, _, Backbone,MainView,
    RequestModel,
    PostCollection,
    regulatorPostTemplate){
    

    var RegulatorPostView = Backbone.View.extend({
      tagName: "div",
      id: "regulator-post-view",

      initialize : function() {
        this.baseView = new MainView({pageView:this});
        
        this.postCollection = new PostCollection([]);
        this.postCollection.bind('reset', this.render, this);
        this.postCollection.bind('add', this.render, this);
        this.postCollection.bind('update', this.render, this);
        this.postCollection.fetch();
        
        this.render();
        
      },

      events:{
          'click .delete-post' : 'delete_post'

      },
      delete_post:function(e){
        var that = this;
        var post_id = $(e.target).val();
		    var postModel = this.postCollection.get(post_id);
        postModel.urlRoot = "/api/post/";
        
        postModel.destroy({
          success: function(model, response) {  
            
            $('#success-modal').on('hidden.bs.modal', function (e) {
              $('#new-post-modal').on('hidden.bs.modal', function (e) {
                that.postCollection.remove(that.postCollection.get(post_id));
              });
              $('#new-post-modal').modal('hide');
            });
            
            $('#success-modal').modal('show');
            
            
          },
          error: function (model, response) {
            var errorInfo = JSON.parse(response.responseText);
            console.log(errorInfo);
            
            that.errorMessage = errorInfo.message;
             $('#error-modal').modal('show');

            $('#btn-post-commit').attr("disabled",false);
          }
        });
      },

      render: function(){
        $(document).attr("title","Dashboard");

        var templateObject = _.template(regulatorPostTemplate);
        this.$el.html(templateObject(
          {
            _: _,
            errorMessage: this.errorMessage,
            posts: this.postCollection.models
          }
          ));		
      }
    });

    return RegulatorPostView;

  });