define([ 'jquery', 
         'underscore', 
         'backbone', 
         'models/logs/LogModel' 
],function($, _, Backbone,LogModel) {
	var LogCollection = Backbone.PageableCollection.extend({
		model : LogModel,
		
		initialize : function(models, options) {},
		
		url: '/api/logs',
		
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
		
		url: '/api/logs',
		
		state: {
            firstPage: 1,
            pageSize:10,
            currentPage: 1,
            totalRecords: null
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
             return {totalRecords: resp.total};
        }
	});
	return LogCollection;
});
