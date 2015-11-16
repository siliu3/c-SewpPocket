define([
  'jquery',
  'underscore',
  'backbone',
  'models/token/TokenModel',
  'text!templates/main/loginTemplate.html',

  ], function($, _, Backbone,
    TokenModel,
    loginTemplate){

    var LoginView = Backbone.View.extend({
      tagName: "div",
      id: "login-view",

      initialize : function() {
        $("body").html(this.el);
        this.render();
      },

      events:{
        'click #btn-login-commit'    : 'login',
        'submit #login-form'                : 'login',
        'click #btn-goto-regist' : 'goto_regist'
      },
      goto_regist: function(e){
        Backbone.history.navigate('regist', {trigger:true});
      },

      login : function(e){
        e.preventDefault();  
        var that = this;
        // var loginType = $(".login-method .active").val();

        var email = $('#login-email').val();
        var password = $('#login-pwd').val();
        var base64Str = email +':'+ password;
        
        var reg_email = /\w+[@]{1}\w+[.]\w+/;
        that.errorMessage = "";
        if(email==""){
            that.errorMessage = "Please input username!";
        }else if(!reg_email.test(email)){
            that.errorMessage = "Please input correct username(An Email address)!";
        }else if(password==""){
            that.errorMessage = "Please input password!";
        }
        if(that.errorMessage!=""){
            that.render();
            $('#error-modal').modal('show');
            $('#btn-login-commit').attr("disabled",false);
            return;
        }

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
            }),{ path: '/' }
            );

            Backbone.history.navigate('', {trigger:true});
            

          },
          error: function(model, response) {
            var errorInfo = JSON.parse(response.responseText);
            console.log(errorInfo);
            that.errorMessage = errorInfo.message;
            that.render();
            
            $('#error-modal').modal('show');
            $('#btn-login-commit').attr("disabled",false);
          },
        });

      },


      render: function(){
        $(document).attr("title","Login");
        var templateObject = _.template(loginTemplate);
        this.$el.html(templateObject(
          {
            _: _,
            errorMessage: this.errorMessage
          }
          ));
        
        // $('#new-user-form').formValidation();
      }
      });

      return LoginView;
});
