define([ 'jquery', 
    'underscore', 
    'backbone', 
    'models/league/LeagueModel' 
    ],function($, _, Backbone, LeagueModel) {

        var LeagueCollection = Backbone.PageableCollection.extend({
            model : LeagueModel,
            initialize : function(models, options) {},

            url: '/api/admin/leagues',

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


        return LeagueCollection;
    });
