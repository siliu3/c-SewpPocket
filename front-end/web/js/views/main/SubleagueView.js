define([
  'jquery',
  'underscore',
  'backbone',
  'views/base/MainView',
  'models/subleague/SubleagueModel',
  'collections/subleague/SubleagueCollection',
  'text!templates/main/subleagueTemplate.html',

  ], function($, _, Backbone,MainView,SubleagueModel,SubleagueCollection,
    subleagueTemplate){
    

    var SubleagueView = Backbone.View.extend({
      tagName: "div",
      id: "subleague-view",

      initialize : function() {
        this.page = 1;
        this.collection = new SubleagueCollection([]);
        this.collection.bind('reset',   this.addAllSuccess,     this);
        this.collection.bind('sync',   this.addAllSuccess,     this);
        this.collection.bind('destroy',   this.addAllSuccess,     this);
        this.collection.bind('add',   this.addAllSuccess,     this);

        this.render();
        this.baseView = new MainView({pageView:this});

        
        this.collection.getPage(this.page);
      },

      events:{
        'click #btn-delete-subleague'         : 'deleteSubleagueClick',
        'click #btn-delete-subleague-commit'  : 'deleteSubleague',
        'click #btn-new-subleague-commit'  : 'newSubleague'

      },
      newSubleague : function(e) {
        var that = this;
        var newSubleagueModel = new SubleagueModel({
          uname           : $("#new-subleague-uname").val(),
          district        : $("#new-subleague-district").val(),
          mobile          : $("#new-subleague-mobile").val(),
          account         : {
                              acctname  : $("#new-subleague-username").val(),
                              pwd       : $("#new-subleague-password").val()
                            }
        });
        $('#btn-new-subleague-commit').attr("disabled",true);
        newSubleagueModel.save(newSubleagueModel.toJSON(), {
          url             :'/api/subleagues',
          success         : function(data) {  
                              that.collection.add(newSubleagueModel);
                              $('#btn-new-subleague-commit').attr("disabled",false);
                              $('#modal-new-subleague').modal('hide');
                            },
          error           : function (data) {
                              alert("添加失败");
                              $('#btn-new-subleague-commit').attr("disabled",false);
                            }
        });
      },

      deleteSubleagueClick : function(e) {
        var subleagueID = new Number($(e.currentTarget).val());
        this.$("#delete-subleague-id").val(subleagueID);
        this.$("#modal-delete-subleague-commit").modal('show');
      },

      deleteSubleague : function(e){
        var that = this;
        this.$("#modal-delete-subleague-commit").modal('hide');
        var subleagueID = new Number(this.$("#delete-subleague-id").val());
        subleagueModel = this.collection.get(subleagueID);
        subleagueModel.destroy({
            error : function (model, response, options){

              alert("删除失败");
            },
            wait: true
        });
      },


      addAllSuccess : function(){
        this.renderTable();
        this.renderPagine();

      },
      renderTable: function(){
        var tableDom = $("<div></div").html(subleagueTemplate);
        var subleaguesTableTemplateObject = _.template(tableDom.find("#subleagues_table_tmpl").html());   
        this.$('tbody').html(
          subleaguesTableTemplateObject({
            subleagues : this.collection.models,
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
        $(document).attr("title","子加盟商管理");

        var subleagueTemplateObject = _.template(subleagueTemplate); 
        this.$el.html(subleagueTemplateObject(
        {
          _:_,
          subleagues: []
        }
        ));

        this.$('#page-selection').bootpag().on("page", function(event, num){
          that.page = num;
          that.collection.getPage(that.page);
        });
      },

    });

    return SubleagueView;

  });