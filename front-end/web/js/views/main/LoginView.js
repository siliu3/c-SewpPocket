define([
  'jquery',
  'underscore',
  'backbone',
  'models/token/TokenModel',
  // 'models/user/UserModel',
  'text!templates/main/loginTemplate.html',

  ], function($, _, Backbone,
    TokenModel,
    // UserModel,
    loginTemplate){

    var LoginView = Backbone.View.extend({
      tagName: "div",
      id: "login-view",

      initialize : function() {
        $("body").html(this.el);
        this.render();
      },

      events:{
        // 'click .login-method button' : 'loginMethodClick',
        'click #btn-login-commit'    : 'login',
        // 'click #btn-new-user-commit' : 'regist',
      },

      // regist : function(e){
      //   var that = this;
      //   $('#btn-new-user-commit').attr("disabled",true);

      //   var newUserModel = new UserModel({
      //     uname     : $("#new-user-uname").val(),
      //     mobile    : $("#new-user-username").val(),
      //     corpname  : $("#new-user-corpname").val(),
      //     addr      : $("#new-user-addr").val(),
      //     district  : $("#new-user-district").val(),

      //     cnttman   : $("#new-user-cnttman").val(),
      //     cntttel   : $("#new-user-cntttel").val(),

      //     email     : $("#new-user-email").val(),
      //     scope     : new Number($("#new-user-scope").val()),

      //     account   : {
      //       acctname  : $("#new-user-username").val(),
      //       pwd       : $("#new-user-password").val(),
      //     },
      //   });
      //   newUserModel.save(newUserModel.toJSON(), {
      //     url:'/api/admin/users',

      //     success: function(model, response) {  
      //       alert("注册成功");
      //       $('#btn-new-user-commit').attr("disabled",false);
      //       $("#modal-new-user").modal('hide');
      //     },
      //     error: function (model, response) {
      //       errorInfo = JSON.parse(response.responseText);
      //       switch (errorInfo['error_code']) {
      //         case 'USERNAME_HAS_EXIST':
      //         alert("用户名已存在");break;
      //         default:
      //         alert("服务器未知错误");break;
      //       }
      //       $('#btn-new-user-commit').attr("disabled",false);
      //     }
      //   });
      // },

      login : function(e){
        var that = this;
        // var loginType = $(".login-method .active").val();

        var email = $('#login-email').val();
        var password = $('#login-pwd').val();
        var base64Str = email +':'+ password;


        this.tokenModel = new TokenModel();


        $('#btn-login-commit').attr("disabled",true);

        var tokenURL = 'api/token';

        this.tokenModel.save({},{
          url: tokenURL,
          headers: {
            "Authorization": "Basic " + window.btoa(base64Str),
          },
          success: function(model, response) {  
            $('#btn-login-commit').attr("disabled",false);
            $.cookie("login", JSON.stringify({
              token: that.tokenModel.toJSON()
            })
            );

            Backbone.history.navigate('', {trigger:true});
            

          },
          error: function(model, response) {
            var errorInfo = JSON.parse(response.responseText);
            console.log(errorInfo);
            alert(errorInfo.message);
            $('#btn-login-commit').attr("disabled",false);
          },
        });

      },

      // loginMethodClick : function(e){
      //   $(".login-method button").removeClass("active");
      //   $(".login-method button").addClass("reverse-option");
      //   $(e.currentTarget).addClass("active");
      // },
      render: function(){
        $(document).attr("title","Login");
        this.$el.html(loginTemplate);
        
        // $('#new-user-form').formValidation();
      }
      });

      return LoginView;
});