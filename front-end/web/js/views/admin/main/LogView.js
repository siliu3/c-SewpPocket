define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/base/MainView',
  'models/logs/LogModel',
  'collections/logs/LogCollection',
  'text!templates/admin/main/logTemplate.html',
  
], function($, _, Backbone,MainView,LogModel,LogCollection,logTemplate){

  var LogView = Backbone.View.extend({
    tagName : "div",
    id      : "log-view",
    title   : $("title"),
    
    initialize : function() {
		this.page = 1;
    	this.collection = new LogCollection([]);
    	this.collection.bind('reset',this.addAllSuccess,this);
    	this.render();
        this.baseView = new MainView({pageView:this});
        this.collection.getPage(this.page);
    },
    
    addAllSuccess : function(){
      	this.render();
      	this.renderPagine();
    },
    
    events:{
    },
	
	renderPagine : function() {
		if(this.collection.state.totalPages<this.page)
			this.page=this.collection.state.totalPages;
        this.$('#page-selection').bootpag({
            total: this.collection.state.totalPages,
            page: this.page
      });
    },
    
    render: function(){
    	var that = this;
    	
        $(document).attr("title","日志管理");
        
        var logTemplateObject = _.template(logTemplate);
        
		this.$el.html(logTemplateObject({
            _:_,
            logs: this.collection.models
          }
        ));
    	
    	this.$('#page-selection').bootpag().on("page", function(event, num){
            that.page = num;
            that.collection.getPage(that.page);
        });     
    }

  });

  return LogView;
  
});
