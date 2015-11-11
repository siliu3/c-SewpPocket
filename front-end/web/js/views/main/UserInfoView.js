define([
  'jquery',
  'underscore',
  'backbone',
  'views/base/MainView',
  'models/user/UserModel',
  'text!templates/main/userInfoTemplate.html',

], function ($, _, Backbone,
  MainView,
  UserModel,
  userInfoTemplate) {

    var UserInfoView = Backbone.View.extend({
      tagName: "div",
      id: "userinfo-view",

      initialize: function () {
        $("body").html(this.el);
        this.baseView = new MainView({pageView:this});
        
        this.user = new UserModel();
        this.user.bind('change', _.bind(this.render, this));
        this.user.fetch();
        
        this.render();
      },
      render: function(){
        var that = this;
        $(document).attr("title","User Information");
        var templateObject = _.template(userInfoTemplate); 
        this.$el.html(templateObject(
        {
          _:_,
          user: that.user
        }
        ));
        
        $('.nav li a').removeClass('active');
        // $('#new-user-form').formValidation();
      }
    });

    return UserInfoView;
  });