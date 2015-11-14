define([
  'jquery',
  'underscore',
  'backbone',
  'views/base/MainView',
  'models/request/RequestModel',
  'collections/comment/CommentCollection',
  'text!templates/main/regulatorCommentTemplate.html',

  ], function($, _, Backbone,MainView,
    RequestModel,
    CommentCollection,
    regulatorCommentTemplate){
    

    var RegulatorCommentView = Backbone.View.extend({
      tagName: "div",
      id: "regulator-comment-view",

      initialize : function() {
        this.baseView = new MainView({pageView:this});
        
        this.commentCollection = new CommentCollection([]);

        this.commentCollection.bind('reset', this.render, this);
        this.commentCollection.bind('add', this.render, this);
        this.commentCollection.bind('update', this.render, this);
        this.commentCollection.fetch({url:"/api/comments"});
        
        this.render();
        
      },

      events:{
          'click .delete-comment' : 'delete_comment'

      },
      delete_comment:function(e){
        var that = this;
        var comment_id = $(e.target).val();
		    var commentModel = this.commentCollection.get(comment_id);
        commentModel.urlRoot = "/api/comment/";
        
        commentModel.destroy({
          success: function(model, response) {  
            
            $('#success-modal').on('hidden.bs.modal', function (e) {
              $('#new-comment-modal').on('hidden.bs.modal', function (e) {
                that.commentCollection.remove(that.commentCollection.get(comment_id));
              });
              $('#new-comment-modal').modal('hide');
            });
            
            $('#success-modal').modal('show');
            
            
          },
          error: function (model, response) {
            var errorInfo = JSON.parse(response.responseText);
            console.log(errorInfo);
            
            that.errorMessage = errorInfo.message;
             $('#error-modal').modal('show');

            $('#btn-comment-commit').attr("disabled",false);
          }
        });
      },

      render: function(){
        $(document).attr("title","Dashboard");

        var templateObject = _.template(regulatorCommentTemplate);
        this.$el.html(templateObject(
          {
            _: _,
            errorMessage: this.errorMessage,
            comments: this.commentCollection.models
          }
          ));		
      }
    });

    return RegulatorCommentView;

  });