define([ 'underscore', 
         'backbone', 
         ], function(_, Backbone) {

	var OrderModel = Backbone.Model.extend({
		idAttribute: "id",
		urlRoot:'/api/order',
		defaults : {
			id			: null,
			datetime   	: null,
		}

	});

	return OrderModel;

});
