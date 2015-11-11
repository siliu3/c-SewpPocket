define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/base/MainView',
  'models/subadmin/SubadminModel',
  'collections/subadmin/SubadminCollection',
  'text!templates/admin/main/subadminTemplate.html',

  ], function($, _, Backbone,MainView,SubadminModel,SubadminCollection,
    subadminTemplate){
    

    var SubadminView = Backbone.View.extend({
      tagName: "div",
      id: "subadmin-view",

      initialize : function() {
        this.page = 1;
        this.collection = new SubadminCollection([]);
        this.collection.bind('reset',   this.addAllSuccess,     this);
        this.collection.bind('sync',   this.addAllSuccess,     this);
        this.collection.bind('destroy',   this.addAllSuccess,     this);
        this.collection.bind('add',   this.addAllSuccess,     this);

        this.render();
        this.baseView = new MainView({pageView:this});

        
        this.collection.getPage(this.page);
      },

      events:{
        'click #btn-delete-subadmin'          : 'deleteSubadminClick',
        'click #btn-delete-subadmin-commit'   : 'deleteSubadmin',
        'click #btn-new-subadmin-commit'      : 'newSubadmin'

      },

      newSubadmin : function(e) {
        var that = this;
        var newSubadminModel = new SubadminModel({
          aname           : $("#new-subadmin-aname").val(),
          account         : {
                              acctname  : $("#new-subadmin-username").val(),
                              pwd       : $("#new-subadmin-password").val()
                            }
        });
        $('#btn-new-subadmin-commit').attr("disabled",true);
        newSubadminModel.save(newSubadminModel.toJSON(), {
          url             :'/api/admin/subadmins',
          success         : function(data) {  
                              that.collection.add(newSubadminModel);
                              $('#btn-new-subadmin-commit').attr("disabled",false);
                              $('#modal-new-subadmin').modal('hide');
                            },
          error           : function (data) {
                              alert("添加失败");
                              $('#btn-new-subadmin-commit').attr("disabled",false);
                            }
        });
      },

      deleteSubadminClick : function(e) {
        var subadminID = new Number($(e.currentTarget).val());
        this.$("#delete-subadmin-id").val(subadminID);
        this.$("#modal-delete-subadmin-commit").modal('show');
      },

      deleteSubadmin : function(e){
        var that = this;
        this.$("#modal-delete-subadmin-commit").modal('hide');
        var subadminID = new Number(this.$("#delete-subadmin-id").val());
        subadminModel = this.collection.get(subadminID);
        subadminModel.destroy({
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
        var tableDom = $("<div></div").html(subadminTemplate);
        var subadminsTableTemplateObject = _.template(tableDom.find("#subadmins_table_tmpl").html());   
        this.$('tbody').html(
          subadminsTableTemplateObject({
            subadmins : this.collection.models,
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
        $(document).attr("title","子管理员管理");

        var subadminTemplateObject = _.template(subadminTemplate); 
        this.$el.html(subadminTemplateObject(
        {
          _:_,
          subadmins: []
        }
        ));

        this.$('#page-selection').bootpag().on("page", function(event, num){
          that.page = num;
          that.collection.getPage(that.page);
        });
      },

    });

    return SubadminView;

  });