define([
  'jquery',
  'underscore',
  'backbone',
  'views/base/MainView',
  'models/user/UserModel',
  'models/comment/CommentModel',
  'collections/comment/CommentCollection',
  'text!templates/main/consumerCommentTemplate.html',

  ], function($, _, Backbone,MainView,
    UserModel,
    CommentModel,
    CommentCollection,
    consumerCommentTemplate){
    

    var ConsumerCommentView = Backbone.View.extend({
      tagName: "div",
      id: "consumer-comment-view",

      initialize : function(options) {
        this.baseView = new MainView({pageView:this});
        
        this.request_id = options.request_id;
        
        this.user = new UserModel();
        this.user.fetch({async:false});
        
        this.commentCollection = new CommentCollection([]);
        this.commentCollection.bind('reset', this.render, this);
        this.commentCollection.bind('add', this.render, this);
        this.commentCollection.bind('change', this.render, this);
        this.commentCollection.fetch({url : "/api/consumer/request/"+this.request_id+"/comments"});
        
        this.commentCollection.comparator = function(model) {
            return -Date.parse(model.get('time'));
        }
         
        this.render();
        
      },

      events:{
          'click .request-agree'    : 'request_agree',
          'click .request-refuse'   : 'request_refuse',
          'submit #comment-form'    : 'new_comment',
          'click #btn-comment-commit' : 'new_comment'
      },
      new_comment : function(e){
        e.preventDefault();
        var that = this;
        $('#btn-comment-commit').attr("disabled",true);

        var newCommentModel = new CommentModel({
          content      : $("#comment-content").val(),
        });
        
        if(""==$("#comment-content").val()){
          that.errorMessage = "Please input comment";
          //that.render();
          //$('#error-modal').modal('show');
          $("#error-modal .modal-body").html(that.errorMessage);
          $("#error-modal").addClass("in");
          $("#error-modal").css("display","block");
          $("#error-modal button[aria-label=Close]").on("click",function(){
            $("#error-modal").removeClass("in");
            $("#error-modal").css("display","none");
            $("#error-modal button[aria-label=Close]").unbind();
          });
          $('#btn-comment-commit').attr("disabled",false);
          return;
        }
        
        newCommentModel.urlRoot = "/api/consumer/request/"+this.request_id+"/comments";
        newCommentModel.save(newCommentModel.toJSON(), {
          success: function(model, response) {  
            
            $('#success-modal').on('hidden.bs.modal', function (e) {
              $('#new-comment-modal').on('hidden.bs.modal', function (e) {
                that.commentCollection.add(newCommentModel);
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
      request_agree:function(e){
        var the_id_array = $(e.target).val().split(' ');
        this.request_action(the_id_array,1);
      },
      request_refuse:function(e){
        var the_id_array = $(e.target).val().split(' ');
        this.request_action(the_id_array,0);
      },
      request_action:function(id_array,agree){
        var that = this;
        
        var post_id = id_array[0];
        var request_id = id_array[1];
        var theCommentModel  = new CommentModel({});
        theCommentModel.set('id', request_id);
        theCommentModel.save({ agree: agree},{
          url: "/api/contributor/post/"+post_id+"/request/"+request_id,
          success: function(model, response) {  
            $('#success-modal').modal('show');
            $('#success-modal').on('hidden.bs.modal', function (e) {
              that.commentCollection.fetch({url : "/api/contributor/posts"});
            });
            
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

        this.commentCollection.sort();
        
        var templateObject = _.template(consumerCommentTemplate);
        this.$el.html(templateObject(
          {
            _: _,
            errorMessage: this.errorMessage,
            comments: this.commentCollection.models
          }
          ));		
      }
    });

    return ConsumerCommentView;

  });
