define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/base/MainView',
  'models/league/LeagueModel',
  'collections/league/LeagueCollection',
  'text!templates/admin/main/leagueTemplate.html',

  ], function($, _, Backbone,MainView,LeagueModel,LeagueCollection,
    leagueTemplate){


    var LeagueView = Backbone.View.extend({
      tagName: "div",
      id: "league-view",
      title   : $("title"),

      initialize : function() {
        this.page = 1;
        this.collection = new LeagueCollection([]);
        this.collection.bind('reset',   this.addAllSuccess,     this);
        this.collection.bind('sync',   this.addAllSuccess,     this);
        this.collection.bind('add',   this.addAllSuccess,     this);

        this.render();
        this.baseView = new MainView({pageView:this});

        
        this.collection.getPage(this.page);
      },

      events:{
        'click #btn-disable-league'         : 'leagueDisableClick',
        'click #btn-enable-league'          : 'leagueEnableClick',
        'click #btn-new-league-commit'      : 'newLeague'
      },

      newLeague : function(e) {
        var that = this;
        var newLeagueModel = new LeagueModel({
          uname           : $("#new-league-uname").val(),
          corpname        : $("#new-league-corpname").val(),
          addr            : $("#new-league-addr").val(),
          district        : $("#new-league-district").val(),
          mobile          : $("#new-league-mobile").val(),
          account         : {
                              acctname  : $("#new-league-username").val(),
                              pwd       : $("#new-league-password").val()
                            }
        });
        $('#btn-new-league-commit').attr("disabled",true);
        newLeagueModel.save(newLeagueModel.toJSON(), {
          url             :'/api/admin/leagues',
          success         : function(model, response) {  
                              that.collection.add(newLeagueModel);
                              $('#btn-new-league-commit').attr("disabled",false);
                              $('#modal-new-league').modal('hide');
                            },
          error           : function (model, response) {
                              errorInfo = JSON.parse(response.responseText);
                              switch (errorInfo['error_code']) {
                                case 'USERNAME_HAS_EXIST':
                                  alert("用户名已存在");break;
                                default:
                                  alert("服务器未知错误");break;
                              }
                              $('#btn-new-league-commit').attr("disabled",false);
                            }
        });
      },


      leagueEnableClick : function(e){
        var that = this;
        var leagueID = new Number(this.$(e.currentTarget).val());
        leagueModel = this.collection.get(leagueID);
        leagueModel.save({
            account: {
              status : 0
            }
          }, { 
            error : function (model, response, options){
              alert("启用失败");
            }
        });
      },

      leagueDisableClick : function(e){
        var that = this;
        var leagueID = new Number(this.$(e.currentTarget).val());
        leagueModel = this.collection.get(leagueID);
        leagueModel.save({
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
        var tableDom = $("<div></div").html(leagueTemplate);
        var leaguesTableTemplateObject = _.template(tableDom.find("#leagues_table_tmpl").html());   
        this.$('tbody').html(
          leaguesTableTemplateObject({
            leagues : this.collection.models,
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
        $(document).attr("title","加盟商管理");

        var leagueTemplateObject = _.template(leagueTemplate); 
        this.$el.html(leagueTemplateObject(
        {
          _:_,
          leagues: []
        }
        ));

        this.$('#page-selection').bootpag().on("page", function(event, num){
          that.page = num;
          that.collection.getPage(that.page);
        });
      },

    });

return LeagueView;

});