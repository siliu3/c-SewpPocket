define([ 'jquery', 
    'underscore', 
    'backbone', 
    'models/devices/DeviceModel' 
    ],function($, _, Backbone, DeviceModel) {

        var TestDeviceCollection = Backbone.PageableCollection.extend({
            model : DeviceModel,
            initialize : function(models, options) {},

            url: '/api/devices',

            state: {

                firstPage: 1,
                pageSize:2,
                currentPage: 1,
                totalRecords: null
            },

			
			gettoken:function(){
			var json_token=JSON.parse($.cookie('login'));
			var access_token=json_token.token.access_token;
			var bearer_token_str="Bearer "+access_token;
			return bearer_token_str;
			},
			
			fetch: function(options) {
				options = options ? _.clone(options) : {};
				var bearer_token_str=this.gettoken();
				options = _.extend({headers:{"Authorization":bearer_token_str}}, options);
				return Backbone.PageableCollection.prototype.fetch.call(this,options);
			},
		
			
            queryParams: {
                offset: function () { return (this.state.currentPage -1) * this.state.pageSize; },
                currentPage: null,
                totalPages: null,
                totalRecords: null,
                pageSize: 'limit'
            },

            parseRecords: function (resp) {
                return resp.rows;
            },
            
            parseState: function (resp, queryParams, state, options) {

                return {
                    totalRecords: resp.total,

                };
            }

        });


        return TestDeviceCollection;
    });
