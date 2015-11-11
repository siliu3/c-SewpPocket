define([ 'jquery', 'underscore', 'backbone', 'views/base/MainView',
		'models/devices/DeviceModel', 'collections/devices/DeviceCollection',
		'text!templates/main/deviceTemplate.html',
		'models/devicePrices/DevicePriceModel',
		'collections/devicePrices/DevicePriceCollection',
		'collections/dictionary/DictionaryCollection',

], function($, _, Backbone, MainView, DeviceModel, DeviceCollection,
		deviceTemplate, DevicePriceModel, DevicePriceCollection,
		DictionaryCollection) {

	var DeviceView = Backbone.View.extend({
		tagName : "div",
		id : "device-view",
		title : $("title"),

		initialize : function() {
			this.page = 1;
			this.collection = new DeviceCollection([]);
			this.collection.bind('reset', this.addAllSuccess, this);
			this.collection.bind('add', this.newDeviceSuccess, this);

			this.devicePriceCollection = new DevicePriceCollection([]);
			this.devicePriceCollection.fetch();
			this.devicePriceCollection.bind('reset', this.render, this);

			this.cnsntypeCollection = new DictionaryCollection([]);
			this.cnsntypeCollection.fetch({
				data : {
					dtype : 1
				},
				wait : true
			});
			this.cnsntypeCollection.bind('reset', this.render, this);

			this.frbdadsCollection = new DictionaryCollection([]);
			this.frbdadsCollection.fetch({
				data : {
					dtype : 2
				}
			});
			this.frbdadsCollection.bind('reset', this.render, this);

			this.render();
			this.baseView = new MainView({
				pageView : this
			});

			this.collection.getPage(this.page, {
				data : this.fetch_data()
			});

			$('#newForm').bootstrapValidator({
				message : '输入的值不正确',
				feedbackIcons : {
					valid : 'glyphicon glyphicon-ok',
					invalid : 'glyphicon glyphicon-remove',
					validating : 'glyphicon glyphicon-refresh'
				},
				fields : {
					newdevccode : {
						message : '名称必须要输入',
						validators : {
							notEmpty : {
								message : '名称必须要输入！'
							}
						}
					}
				}
			});

		},

		fetch_data : function() {
			var status = $("#table-select-status-id").val();
			var cnsntype = new Number($("#table-select-cnsntype-id").val());
			var devccode = $("#table-search-devccode").val();
			var data = {};
			if (status != '-1') {
				data.status = status;
			}

			if (cnsntype != -1) {
				data.cnsntype = cnsntype;
			}

			if (devccode != '') {
				data.devccode = devccode;
			}

			return data;
		},

		events : {
			'click #btn-new-device-commit ' : 'newDevice',
			'click .btn-device-edit' : 'editDeviceClick',
			'click .btn-device-detail' : 'deviceDetailClick',
			'click #btn-table-search' : 'tableSearch',
			'change #table-select-cnsntype-id' : 'cnsntypeChange',
			'change #table-select-status-id' : 'statusChange',

		},

		addAllSuccess : function() {
			this.renderTable();
			this.renderPagine();

		},

		deviceDetailClick : function(e) {
			e.preventDefault();
			Backbone.history.navigate(e.currentTarget.getAttribute('href'), {
				trigger : true
			});
		},
		editDeviceClick : function(e) {
			$("#modal-edit-device").modal('show');
			$("#idvalue").val($(e.currentTarget).val());
		},

		tableSearch : function() {
			this.page = 1;
			this.collection.getPage(this.page, {
				data : this.fetch_data()
			});
		},

		statusChange : function() {
			this.page = 1;
			this.collection.getPage(this.page, {
				data : this.fetch_data()
			});
		},

		cnsntypeChange : function() {
			this.page = 1;
			this.collection.getPage(this.page, {
				data : this.fetch_data()
			});
		},

		renderTable : function() {
			var tableDom = $("<div></div").html(deviceTemplate);
			var devicesTableTemplateObject = _.template(tableDom.find(
					"#devices_table_tmpl").html());
			this.$('tbody').html(devicesTableTemplateObject({
				devices : this.collection.models,
				cnsntypes : this.cnsntypeCollection,
				_ : _,
			}));
		},

		renderPagine : function() {
			this.$('#page-selection').bootpag({
				total : this.collection.state.totalPages,
				page : this.page,

			});
		},

		render : function() {
			var that = this;
			$(document).attr("title", "设备管理");

			$('.nav li').removeClass('active');
			$('.nav li a[href="device"]').addClass('active');

			var devicesTemplateObject = _.template(deviceTemplate);
			this.$el.html(devicesTemplateObject({
				_ : _,
				devices : [],
				frbdads : this.frbdadsCollection,
				cnsntypes : this.cnsntypeCollection,
				devicePrices : this.devicePriceCollection
			}));

			this.$('#page-selection').bootpag().on("page",
					function(event, num) {
						that.page = num;
						that.collection.getPage(that.page, {
							data : that.fetch_data()
						});
					});
		},

		newDeviceSuccess : function() {
			$("#modal-new-device").modal('hide');
			this.renderTable();
			this.renderPagine();
		},
		newDevice : function() {
			var that = this;
			$('#btn-new-device-commit').attr("disabled", true);

			var newDeviceModel = new DeviceModel({
				devccode : $("#new-device-devccode").val(),
				vol : 0,
				section : $("#new-device-section").val(),
				location : $("#new-device-location").val(),
				cnsntype : new Number($("#new-device-cnsntype").val()),
				frbdads : new Number($("#new-device-frbdads").val()),
				excncorps : $("#new-device-excncorps").val().split(','),
				restfloor : new Number($("#new-device-restfloor").val()),
				nomaskfloor : $("#new-device-nomaskfloor").val().split(',')
			});
			newDeviceModel.save(newDeviceModel.toJSON(), {
				url : '/api/devices',
				success : function(data) {
					that.collection.add(newDeviceModel);
					$('#btn-new-device-commit').attr("disabled", false);
				},
				error : function(data) {
					$('#btn-new-device-commit').attr("disabled", false);
				}
			});
			return false;
		},

	});

	return DeviceView;
});