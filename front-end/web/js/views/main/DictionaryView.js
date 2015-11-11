define([ 'jquery', 'underscore', 'backbone', 'views/base/MainView',
		'models/dictionary/DictionaryModel',
		'collections/dictionary/DictionaryCollection',
		'text!templates/main/dictionaryTemplate.html',

], function($, _, Backbone, MainView, DictionaryModel, DictionaryCollection,
		dictionaryTemplate) {

	var HomeView = Backbone.View.extend({
		tagName : "div",
		id : "dictionary-view",
		title : $("title"),

		initialize : function() {

			this.collection = new DictionaryCollection([]);
			this.collection.bind('reset', this.locadDatasSuccess, this);
			this.collection.bind('add', this.newSuccess, this);
			this.collection.bind('change', this.editSuccess, this);
			this.collection.bind('remove', this.deleteSuccess, this);

			this.render();
			this.baseView = new MainView({
				pageView : this
			});

			this.renderTable();

			$('#newForm').bootstrapValidator({
				message : '输入的值不正确',
				feedbackIcons : {
					valid : 'glyphicon glyphicon-ok',
					invalid : 'glyphicon glyphicon-remove',
					validating : 'glyphicon glyphicon-refresh'
				},
				fields : {
					newdname : {
						message : '名称必须要输入',
						validators : {
							notEmpty : {
								message : '名称必须要输入！'
							}
						}
					},
					newcode : {
						message : '请输入合法的数字',
						validators : {
							notEmpty : {
								message : '请输入合法的数字！'
							},
							digits : {
								message : '请输入合法的数字！'
							}
						}
					},
					newdsort : {
						validators : {
							notEmpty : {
								message : '请输入合法的数字！'
							},
							digits : {
								message : '请输入合法的数字！'
							}
						/*
						 * lessThan: { value: 10000, inclusive: true, message:
						 * '请输入合法的数字' },
						 */
						/*
						 * greaterThan: { value: 0, inclusive: false, message:
						 * '请输入合法的数字' }
						 */
						}
					}
				}
			});

		},

		events : {
			'click #btn-new-commit ' : 'newDictionary',
			'click .btn-danger' : 'deleteDictionary',
			'click #btn-edit-commit' : 'editDictionary',
			'click .btn-edit' : 'editClick',
			'change #dict-dtype' : 'onchangeDType'
		},

		locadDatasSuccess : function() {
			this.renderTable();
		},

		fetchTypeDatas : function(type) {
			var that = this;
			// alert(selVal);
			var onDataHandler = function(collection) {
				that.data = {
					dicts : that.collection.models,
					_ : _,
				};
			};
			this.collection.fetch({
				success : onDataHandler,
				dataType : "json",
				// beforeSend: setHeader,
				data : {
					dtype : type
				},
				async : false
			});
		},

		onchangeDType : function(e) {
			var that = this;
			obj = $(e.currentTarget);
			this.fetchTypeDatas(obj.val());

		},

		editClick : function(e) {

			console.log($(e.currentTarget).val());
			$("#modal-edit").modal('show');
			$("#idvalue").val($(e.currentTarget).val());
		},

		renderTable : function() {
			var tableDom = $("<div></div").html(dictionaryTemplate);
			var templateObject = _
					.template(tableDom.find("#table_tmpl").html());
			this.$('tbody').html(templateObject({
				dicts : this.collection.models,
				_ : _,
			}));
		},

		render : function() {
			$(document).attr("title", "数据字典管理");
			var that = this;
			var templateObject = _.template(dictionaryTemplate);
			this.$el.html(templateObject({
				_ : _,
				dicts : this.collection.models
			}));

			this.fetchTypeDatas(1);
			// this.renderTable();
		},

		newSuccess : function() {
			$("#modal-new").modal('hide');
			this.renderTable();
		},

		newDictionary : function() {
			var that = this;
			// $('#btn-new-commit').attr("disabled", true);
			var newModel = new DictionaryModel({
				pid : $("#new-pid").val(),
				code : parseInt($("#new-code").val()),
				dname : $("#new-dname").val(),
				dsort : parseInt($("#new-dsort").val()),
				dtype : parseInt($("#dict-dtype").val())
			});
			console.log(newModel.toJSON());
			newModel.save(newModel.toJSON(), {
				url : '/api/dictionarys',
				success : function(data) {
					that.collection.add(newModel);
					// $('#btn-new-commit').attr("disabled", false);
				},
				error : function(data) {
					// $('#btn-new-commit').attr("disabled", false);
				}
			});
			return false;
		},

		editSuccess : function() {
			$("#modal-edit").modal('hide');
			this.refresh();
		},

		editDictionary : function() {
			var that = this;
			$('#btn-edit-commit').attr("disabled", true);

			var ID = $("#idvalue").val();
			dictModel = this.collection.get(ID);
			dictModel.set({
				pid : $("#edit-pid").val(),
				code : $("#edit-code").val(),
				dname : $("#edit-dname").val(),
				dsort : $("#edit-dsort").val()
			});
			dictModel.save(dictModel.toJSON(), {
				success : function(data) {

					$('#btn-edit-commit').attr("disabled", false);
				},
				error : function(data) {
					$('#btn-edit-commit').attr("disabled", false);
				}
			});
		},

		deleteSuccess : function(e) {
			this.renderTable();
		},

		deleteDictionary : function(e) {
			// $('[data-toggle="confirmation"]').confirmation({
			// onConfirm : function() {
			// var ID = $(e.currentTarget).attr("value");
			// dictModel = this.collection.get(ID);
			// dictModel.destroy();
			// this.collection.remove(dictModel);
			// }
			// });

			var ID = $(e.currentTarget).attr("value");
			dictModel = this.collection.get(ID);
			dictModel.destroy();
			this.collection.remove(dictModel);
		},

	});

	return HomeView;

});
