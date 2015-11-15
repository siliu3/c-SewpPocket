define([
  'jquery',
  'underscore',
  'backbone',
  'views/base/MainView',
  'models/request/RequestModel',
  'models/post/PostModel',
  'collections/post/PostCollection',
  'text!templates/main/postTemplate.html',

  ], function($, _, Backbone,MainView,
    RequestModel,
    PostModel,
    PostCollection,
    postTemplate){
    

    var PostView = Backbone.View.extend({
      tagName: "div",
      id: "home-view",

      initialize : function() {
        this.baseView = new MainView({pageView:this});
        
        this.postCollection = new PostCollection([]);
        this.postCollection.bind('reset', this.render, this);
        this.postCollection.bind('add', this.render, this);
        this.postCollection.bind('change', this.render, this);
        this.postCollection.fetch({url : "/api/contributor/posts"});
        
        this.render();
        
      },

      events:{
          'click .request-agree' : 'request_agree',
          'click .request-refuse' : 'request_refuse',
          'submit #post-form'         : 'new_post',
          'click #btn-post-commit' : 'new_post',
          'click .request-comment' : 'go_to_comment'
      },
      
      go_to_comment: function(e) {
        var post_id = $(e.target).val();
        Backbone.history.navigate("contributor/post/"+post_id+"/deal_request/comments", { trigger: true });
      },
      
      new_post : function(e){
        e.preventDefault();
        var that = this;
        $('#btn-post-commit').attr("disabled",true);

        var newPostModel = new PostModel({
          name      : $("#post-name").val(),
          category  : $("#post-category").val(),
          price     : $("#post-price").val(),
          description     : $("#post-description").val()

        });
        newPostModel.urlRoot = '/api/contributor/posts';
        
        var reg_num = /^[0-9]*$/;
        var exist_empty_val=false;
        var json_form_data = newPostModel.toJSON()
        that.errorMessage = "";
        $.each(json_form_data,function(key,val){if(val==""){exist_empty_val=true;return;}});
        if(exist_empty_val){
          //check empty
          var empty_val="";
          $.each(json_form_data,function(key,val){if(val==""){empty_val+=key+" ";}});
          that.errorMessage = "Please input "+empty_val;
        }else if(!reg_num.test(json_form_data.price)){
          that.errorMessage = "Please input integer price, can be 0";
        }else if(-1==$.inArray(json_form_data.category,["chager","hair_drier","drill","vacuum_cleaner","iron","juicer","camera","usbdisk","cardreader","cable"])){
          //in case of wrong category
          that.errorMessage = "Please select given category";
        }
        //显示异常！！！
        if(that.errorMessage!=""){
          //that.render();
          $('#error-modal').modal('show');
          $('#new-post-modal').modal('show');
          $('#btn-post-commit').attr("disabled",false);
          //$('.btn-primary').click();
          return;
        }
        
        newPostModel.save(newPostModel.toJSON(), {
          success: function(model, response) {  
            
            $('#success-modal').on('hidden.bs.modal', function (e) {
              $('#new-post-modal').on('hidden.bs.modal', function (e) {
                that.postCollection.add(newPostModel);
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
        var theRequestModel  = new RequestModel({});
        theRequestModel.set('id', request_id);
        theRequestModel.save({ agree: agree},{
          url: "/api/contributor/post/"+post_id+"/request/"+request_id,
          success: function(model, response) {  
            $('#success-modal').modal('show');
            $('#success-modal').on('hidden.bs.modal', function (e) {
              that.postCollection.fetch({url : "/api/contributor/posts"});
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

        var templateObject = _.template(postTemplate);
        this.$el.html(templateObject(
          {
            _: _,
            errorMessage: this.errorMessage,
            posts: this.postCollection.models
          }
          ));		
      }
    });

    return PostView;

  });