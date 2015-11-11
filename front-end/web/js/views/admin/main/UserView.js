define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/base/MainView',
  'collections/user/UserCollection',
  'text!templates/admin/main/userTemplate.html',

  ], function($, _, Backbone,MainView,UserCollection,
    userTemplate){


    var UserView = Backbone.View.extend({
      tagName: "div",
      id: "user-view",
      title   : $("title"),

      initialize : function() {
        this.page = 1;
        this.collection = new UserCollection([]);
        this.collection.bind('reset',   this.addAllSuccess,     this);
        this.collection.bind('sync',   this.addAllSuccess,     this);

        this.render();
        this.baseView = new MainView({pageView:this});

        
        this.collection.getPage(this.page);
      },

      events:{
        'click #btn-disable-user'         : 'userDisableClick',
        'click #btn-enable-user'         : 'userEnableClick',

      },


      userEnableClick : function(e){
        var that = this;
        var userID = new Number(this.$(e.currentTarget).val());
        userModel = this.collection.get(userID);
        userModel.save({
            account: {
              status : 0
            }
          }, { 
            error : function (model, response, options){
              alert("启用失败");
            }
        });
      },

      userDisableClick : function(e){
        var that = this;
        var userID = new Number(this.$(e.currentTarget).val());
        userModel = this.collection.get(userID);
        userModel.save({
            account: {
              status : 1
            }
          }, { 
            error : function (model, response, options){
              alert("停用失败");
            }
        });
      },

      addAllSuccess : function(){
        this.renderTable();
        this.renderPagine();

      },
      renderTable: function(){
        var tableDom = $("<div></div").html(userTemplate);
        var usersTableTemplateObject = _.template(tableDom.find("#users_table_tmpl").html());   
        this.$('tbody').html(
          usersTableTemplateObject({
            users : this.collection.models,
            _ : _,
          }
          ) 
          );
      },

      renderPagine : function() {
        this.$('#page-selection').bootpag({
          total: this.collection.state.totalPages,
          page: this.page,

        });
      },

      render: function(){
        var that = this;
        $(document).attr("title","普通用户管理");

        var userTemplateObject = _.template(userTemplate); 
        this.$el.html(userTemplateObject(
        {
          _:_,
          users: []
        }
        ));

        this.$('#page-selection').bootpag().on("page", function(event, num){
          that.page = num;
          that.collection.getPage(that.page);
        });
      },

    });

return UserView;

});