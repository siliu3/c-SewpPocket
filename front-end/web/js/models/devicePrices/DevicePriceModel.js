define([ 'underscore', 
         'backbone', 
         ], function(_, Backbone) {

	var DevicePriceModel = Backbone.Model.extend({
		idAttribute: "id",
		urlRoot:'/api/deviceprice',
		defaults : {

            uname       : null,
            mobile      : null,
            district    : null,

            account     : {},
        },
		toTime:function(dtime){
			var d=new Date(dtime);
			var yyyy=d.getFullYear(); 
			var MM=(d.getMonth()+1)<10?"0"+(d.getMonth()+1):d.getMonth()+1; 
			var dd=d.getDate()<10?"0"+d.getDate():d.getDate(); 
			var hh=d.getHours()<10?"0"+d.getHours():d.getHours(); 
			var mm=d.getMinutes()<10?"0"+d.getMinutes():d.getMinutes(); 
			var ss=d.getSeconds()<10?"0"+d.getSeconds():d.getSeconds();  
			return yyyy+'-'+MM+'-'+dd+' '+hh+':'+mm+':'+ss;
		}
	});
	return DevicePriceModel;
});
