define([ 'jquery', 
    'underscore', 
    'backbone', 
    'models/user/UserModel' 
    ],function($, _, Backbone, UserModel) {

        var UserCollection = Backbone.PageableCollection.extend({
            model : UserModel,
            initialize : function(models, options) {},

            url: '/api/admin/users',

            state: {

                firstPage: 1,
                pageSize:2,
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

                return {
                    totalRecords: resp.total,

                };
            }

        });


        return UserCollection;
    });
