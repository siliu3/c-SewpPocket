define([ 'jquery', 
         'underscore', 
         'backbone', 
         'models/cases/CaseModel' 
],function($, _, Backbone,CaseModel) {
	
	var CaseCollection = Backbone.PageableCollection.extend({
		model : CaseModel,
		
		initialize : function(models, options) {},
		
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
		
		url: '/api/cases',
		
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
	return CaseCollection;
});
