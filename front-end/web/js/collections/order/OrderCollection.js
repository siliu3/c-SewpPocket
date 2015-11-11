define([ 'jquery', 
         'underscore', 
         'backbone', 
         'models/order/OrderModel' 
],function($, _, Backbone, OrderModel) {
	var OrderCollection = Backbone.Collection.extend({
		model : OrderModel,
	
		initialize : function(models, options) {},
		
		url: '/api/orders',
	    
	});

	return OrderCollection;
});
