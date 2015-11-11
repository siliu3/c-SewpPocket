define([
  'jquery',
  'underscore',
  'backbone',
  'views/admin/base/MainView',
  'models/devices/DeviceModel',
  'collections/devices/DeviceCollection',
  'text!templates/admin/main/deviceDetailTemplate.html',
  
  ], function($, _, Backbone,MainView, DeviceModel,DeviceCollection,deviceDetailTemplate){

    var DeviceDetailView = Backbone.View.extend({
      tagName : "div",
	  id      : "deviceDetail-view",
	  title   : $("title"),

      initialize : function(options) {
      	this.deviceID = options.deviceID;
      	this.model = new DeviceModel({id: this.deviceID});
      	this.model.bind('change',this.render,this);
      	this.render();
        this.baseView = new MainView({pageView:this});
        this.model.fetch({data : {dtype : 1}});
      },

      events:{
		'click #btn-back-case ' : 'rback'
      },
      
 	  rback:function(){
 	  	Backbone.history.navigate('admin/case', {trigger:true});
 	  },
 	  
      render: function(){
      	  var that=this;
	      $(document).attr("title","设备详情");
	      
		  var deviceDetailTemlateObject = _.template(deviceDetailTemplate);
                
          this.$el.html(deviceDetailTemlateObject({
                 device: that.model
          })); 
          return this;     
      }
    });

    return DeviceDetailView;

  });