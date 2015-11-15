define([
  'jquery',
  'underscore',
  'backbone',
  'models/account/AccountModel',
  'text!templates/main/registTemplate.html',

  ], function($, _, Backbone,
    AccountModel,
    registTemplate){

    var RegistView = Backbone.View.extend({
      tagName: "div",
      id: "regist-view",

      initialize : function() {
        $("body").html(this.el);
        this.errorMessage = "Loading";
        this.render();
      },

      events:{
        'submit #regist-form'         : 'regist',
        'click #btn-regist-commit' : 'regist',
        'click #btn-goto-login' : 'goto_login'
      },
      goto_login: function(e){
        Backbone.history.navigate('login', {trigger:true});
      },
      
      regist : function(e){
        e.preventDefault();
        var that = this;
        $('#btn-regist-commit').attr("disabled",true);

        var newAccountModel = new AccountModel({
          username  : $("#regist-email").val(),
          password  : $("#regist-password").val(),
          email     : $("#regist-email").val(),
          nickname     : $("#regist-nickname").val(),
          phone     : $("#regist-phone").val(),
          name      : $("#regist-name").val(),
          eid       : $("#regist-eid").val(),
          secret    : $("#regist-secret").val()

        });
        
        var reg_email = /\w+[@]{1}\w+[.]\w+/;
        var reg_num = /^[0-9]*$/;
        var exist_empty_val=false;
        var json_form_data = newAccountModel.toJSON()
        that.errorMessage = "";
        $.each(json_form_data,function(key,val){if(val==""){exist_empty_val=true;return;}});
        if(exist_empty_val){
          //check empty
          var empty_val="";
          $.each(json_form_data,function(key,val){if(val==""){empty_val+=key+" ";}});
          that.errorMessage = "Please input "+empty_val;
        }else if(!reg_email.test(json_form_data.email)){
          //check email format
          that.errorMessage = "Please input correct Email";
        }else if($("#regist-password2").val()!=json_form_data.password){
          that.errorMessage = "Please input same password";
        }else if(!reg_num.test(json_form_data.phone)){
          that.errorMessage = "Please input correct phone";
        }else if(json_form_data.phone.length!="8"){
          that.errorMessage = "Please input 8 digits phone";
        }else if(!reg_num.test(json_form_data.eid)){
          that.errorMessage = "Please input correct eid";
        }
        
        if(that.errorMessage!=""){
          that.render();
          $('#error-modal').modal('show');
          return;
        }
        
        
        newAccountModel.save(newAccountModel.toJSON(), {
          url:'/api/account',

          success: function(model, response) {  
            
            $('#success-modal').on('hidden.bs.modal', function (e) {
              Backbone.history.navigate('login', {trigger:true});
            });
            $('#success-modal').modal('show');
            
          },
          error: function (model, response) {
            var errorInfo = JSON.parse(response.responseText);
            console.log(errorInfo);
            
            that.errorMessage = errorInfo.message;
            that.render();
            
            $('#error-modal').modal('show');
            
            
            $('#btn-regist-commit').attr("disabled",false);
          }
        });
      },

      render: function () {
        $(document).attr("title", "Regist");
        var templateObject = _.template(registTemplate);
        this.$el.html(templateObject(
          {
            _: _,
            errorMessage: this.errorMessage
          }
          ));
        // $('#new-user-form').formValidation();
      }
      });

      return RegistView;
});