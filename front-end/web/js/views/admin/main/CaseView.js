define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/base/MainView',
  'models/cases/CaseModel',
  'collections/cases/CaseCollection',
  'text!templates/admin/main/caseTemplate.html',
  
], function($, _, Backbone, MainView,CaseModel,CaseCollection,caseTemplate){

  var CaseView = Backbone.View.extend({
    tagName : "div",
    id      : "case-view",
    title   : $("title"),
    
    initialize : function() {
    	this.page = 1;
    	this.collection = new CaseCollection([]);
    	this.collection.bind('reset',this.addAllSuccess,this);
    	this.collection.bind('change',this.saveSuccess,this);
    	this.render();
        this.baseView = new MainView({pageView:this});
        this.collection.getPage(this.page);
    },
    
    addAllSuccess : function(){
      	this.render();
      	this.renderPagine();
    },
    
    events:{
    	'click #btn-edit-case-commit ' : 'editCase',
		'click #set-commit-1 ' : 'commitpass',
		'click #set-commit-0 ' : 'commitng'
    },
    
    saveSuccess : function(){
    	var that = this;
    	this.collection.getPage(1).done(function(){
    		if(that.collection.state.totalPages<that.page)
				that.page=that.collection.state.totalPages;
			that.collection.getPage(that.page);
    	});
	},
	
    commitpass:function(e){
    	e.preventDefault();
    	var ID = e.currentTarget.getAttribute('value');
    	this.commitinfo(ID,1,'');
    },
    
    commitng:function(e){
		e.preventDefault();
    	var ID = e.currentTarget.getAttribute('value');
    	$("#modal-case-context").modal('show');
    	$("#case-id").val(ID);
    	$("#case-comment").val("");
    },
    
    editCase:function(){
    	this.commitinfo($("#case-id").val(),0,$("#case-comment").val());
    },
    
    commitinfo:function(ID,status,comment){
    	var that = this;
	    $('#set-commit-'+status).attr("disabled",true);
		var caseModel= this.collection.get(parseInt(ID));
	    if(status==1)
	    	caseModel.set({comment:comment,status:'同意'});
	    else
	    	caseModel.set({comment:comment,status:'驳回'});

		caseModel.save(caseModel.toJSON(), {
			success: function(data) {  
				alert("修改成功");
			},
			error: function (data) {
			    alert("修改失败");
	        }});
	        
	    $('#set-commit-'+status).attr("disabled",false);
    },
	
	renderPagine : function() {
		if(this.collection.state.totalPages<this.page)
			this.page=this.collection.state.totalPages;
		$("#case-page").val(this.page);
        this.$('#page-selection').bootpag({
            total: this.collection.state.totalPages,
            page: this.page
      });
    },
	
    render: function(){
    	var that = this;
        $(document).attr("title","待办事项管理");

    	var caseTemplateObject = _.template(caseTemplate);
    	
    	this.$el.html(caseTemplateObject({
            _:_,
            cases: this.collection.models
          }
        ));  
        
        this.$('#page-selection').bootpag().on("page", function(event, num){
            that.page = num;
            that.collection.getPage(that.page);
        });  
    }

  });

  return CaseView;
  
});
