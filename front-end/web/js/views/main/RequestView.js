define([
  'jquery',
  'underscore',
  'backbone',
  'views/base/MainView',
  'models/request/RequestModel',
  'collections/request/RequestCollection',
  'text!templates/main/requestTemplate.html',

], function ($, _, Backbone, MainView,
  RequestModel,
  RequestCollection,
  requestTemplate) {


    var RequestView = Backbone.View.extend({
      tagName: "div",
      id: "home-view",

      initialize: function () {
        this.baseView = new MainView({ pageView: this });
        
        this.requestCollection = new RequestCollection([]);
        this.requestCollection.bind('reset', this.render, this);
        this.requestCollection.bind('add', this.render, this);
        this.requestCollection.fetch();

        this.render();
        
      },

      events: {
        'click .make-request': 'make_request',
        'click .request-comment': 'go_to_comment'

      },
      
      go_to_comment: function(e) {
        var request_id = $(e.target).val();
        Backbone.history.navigate("consumer/request/"+request_id+"/comments", { trigger: true });
      },
      
      make_request: function (e) {
        var that = this;
        var post_id = $(e.target).val();
        var newRequestModel = new RequestModel({ post_id: post_id });
        newRequestModel.save({}, {
          success: function (model, response) {
            $('#success-modal').modal('show');
          },
          error: function (model, response) {
            var errorInfo = JSON.parse(response.responseText);
            console.log(errorInfo);
            that.errorMessage = errorInfo.message;
            that.render();

            $('#error-modal').modal('show');

          }
        });
      },

      render: function () {
        $(document).attr("title", "My Requests");

        var templateObject = _.template(requestTemplate);
        this.$el.html(templateObject(
          {
            _: _,
            errorMessage: this.errorMessage,
            requests: this.requestCollection.models
          }
          ));

      }
    });

    return RequestView;

  });