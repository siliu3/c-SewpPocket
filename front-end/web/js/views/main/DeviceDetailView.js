define([
    'jquery',
    'underscore',
    'backbone',
    'views/base/MainView',
    'models/devices/DeviceModel',
    'collections/devices/DeviceCollection',
    'text!templates/main/deviceDetailTemplate.html',

    ], function($, _, Backbone, MainView,
        DeviceModel,DeviceCollection,
        deviceDetailTemplate){

        var DeviceDetailView = Backbone.View.extend({
            tagName : "div",
            id      : "device-detail-view",
            title: $("title"),

            initialize : function(options) {
                this.deviceID = options.deviceID;
                this.model = new DeviceModel({id: this.deviceID});

                this.model.bind('change',   this.render,     this);

                this.render();
                this.baseView = new MainView({pageView:this});

                this.model.fetch();
            },
			
			refresh :function(){
				this.render();
			},

            events:{
                'click #btn-edit-device-commit '    : 'editDevice',
                'click #set-commit'	                : 'setSection',
                'click #btn-del-device-commit'	    : 'deleteDevice',
            },

            editDevice: function(){
                var that = this;
                $('#btn-edit-device-commit').attr("disabled",true);

                var ID = $("#idvalue").val();
                deviceModel = new DeviceModel({id: ID});
                deviceModel.set({
                    devccode        : $("#new-device-devccode").val(),
                    vol             : 0,
                    section         : $("#new-device-section").val(),
                    location        : $("#new-device-location").val(),
                    cnsntype        : new Number($("#new-device-cnsntype").val()),
                    frbdads         : new Number($("#new-device-frbdads").val()),
                    excncorps       : $("#new-device-excncorps").val().split(','),
                    restfloor       : new Number($("#new-device-restfloor").val()),
                    nomaskfloor     : $("#new-device-nomaskfloor").val().split(',')
                });
                deviceModel.save(deviceModel.toJSON(), {
                    success: function(data) {  
                        $("#modal-edit-device").modal('hide');
                        this.refresh();
                        $('#btn-edit-device-commit').attr("disabled",false);
                    },
                    error: function (data) {
                        $('#btn-edit-device-commit').attr("disabled",false);
                    }});
            },
			
            setSection: function(){
                var that = this;
                $('#set-commit').attr("disabled",true);

                var ID = $("#idvalue").val();
                deviceModel = new DeviceModel({id: ID});
                deviceModel.set({vol:$("#set-section-id").val(),status:0});
                deviceModel.save(deviceModel.toJSON(), {
                    success: function(data) {  
                        $("#modal-set").modal('hide');

                        $('#set-commit').attr("disabled",false);
                    },
                    error: function (data) {
                        $('#set-commit').attr("disabled",false);
                    }});
            },

            deleteDevice: function(e){
                var ID = $("#idvalue").val();
                deviceModel = new DeviceModel({id: ID});
                deviceModel.set({status:2,vol:0});
                deviceModel.save(deviceModel.toJSON(), {
                    success: function(data) {  
                        location.href = '/device';
                    },
                    error: function (data) {
                        alert("删除失败");
                    }});

                Backbone.history.navigate('device', {trigger:true});
            },
            render: function(){
                $(document).attr("title","设备详情");

                var deviceDetailTemlateObject = _.template(deviceDetailTemplate);
                
                this.$el.html(deviceDetailTemlateObject({
                    device: this.model
                }));      
            }
        });

return DeviceDetailView;

});