define([
  'jquery',
  'underscore',
  'backbone',
  'views/base/MainView',
  'models/devicePrices/DevicePriceModel',
  'collections/devicePrices/DevicePriceCollection',
  'text!templates/main/devicePriceTemplate.html',
  
], function($, _, Backbone,MainView,DevicePriceModel,DevicePriceCollection,devicePriceTemplate){

  var DevicePriceView = Backbone.View.extend({
    tagName : "div",
    id      : "deviceprice-view",
    title   : $("title"),
    
    initialize : function() {
    	this.collection = new DevicePriceCollection([]);
    	this.collection.bind('reset',this.addAllSuccess,this);
    	this.render();
    	this.baseView = new MainView({pageView:this});
    	this.collection.fetch();
    },
    
    events:{
    	'click #set-commit-Price ' : 'commitinfo'
    },
    addAllSuccess:function(){
    	this.render();
    },
    
	refresh : function(){
    	this.load();
		this.render();
	},
    commitinfo:function(){
    	var that = this;
    	
    	$("#error-低").html('');
    	$("#error-中").html('');
    	$("#error-高").html('');
		
		
		if (isNaN($('#price-低').val())){
			$("#error-低").empty().html("价格必须为数字");
			return false;
		}
		else if (isNaN($('#price-中').val())){
			$("#error-中").empty().html("价格必须为数字");
			return false;
		}	
		else if (isNaN($('#price-高').val())){
			$("#error-高").empty().html("价格必须为数字");
			return false;
		}
		
		var devicePricecollection =new Backbone.Collection([
			{"id": $("#level-低").val(), "price": $("#price-低").val()},
			{"id": $("#level-中").val(), "price": $("#price-中").val()},
			{"id": $("#level-高").val(), "price": $("#price-高").val()}
		]);
		
		$('#set-commit-Price').attr("disabled",true);
		
		this.collection.fetch({
			data:JSON.stringify(devicePricecollection),
			dataType : "json",
			async:false,
			type:"PUT",
			success: function(data) {  
				alert("修改成功");
				that.refresh();
			},
			error: function (model, response) {
			    errorInfo = JSON.parse(response.responseText);
          		switch (errorInfo['error_code']) {
          				case 'DEVICE_PRICE_DATA_ERROR':
          					$("#error-"+errorInfo['message']).empty().html("价格必须为数字");
              				break;
            			case 'DEVICE_PRICE_ERROR':
            				$("#error-"+errorInfo['message']).empty().html("修改价格不能小于原始价格");
              				break;
            			case 'DEVICE_PRICE_DAY_ERROR':
              				$("#error-"+errorInfo['message']).empty().html("需3个月后才能修改");
              				break;
          		}
	        }
		});
		
	    $('#set-commit-Price').attr("disabled",false);
    },
    
    load:function(){
		var that = this;
		var onDataHandler = function(collection) {
			that.data = {
				devicePrices : that.collection.models,
				_ : _,
			};
			
		};
		
		this.collection.fetch({
			success : onDataHandler,
			dataType : "json",
			async:false
		});
	},
	
    render: function(){
    	var that = this;
        $(document).attr("title","终端价格等级管理");
    	
    	var devicePriceTemplateObject = _.template(devicePriceTemplate);
    	
    	this.$el.html(devicePriceTemplateObject({
    				_:_,
                    deviceprices: that.collection.models
                }));     
    }

  });

  return DevicePriceView;
  
});
