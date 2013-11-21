view = views.Main.extend({

	template: 'adminDishesListView',

	initialize: function (options) {
	    var self = this;
		_.bindAll(this, 'render');
		this.currentPage = 1;
		this.elOnPage = 20;
		this.filter = {}
		this.sort_range = -1
		this.selectedDishes = []
		this.collection = new models.Dishs;
		this.user = options.state.get('user')
		this.collection.fetch({
			success: function () {
				self.attachAfterLoad()
			}
		})
		this.t = "<div class='close'></div>\
		<h1><%= title %></h1><br/>\
    <h2>Категория: <span><%= species %></span></h2>\
    <h2>Время пригтоовления: <span><%= time_cooking %> мин</span></h2>\
    <h2>Ингириденты: </h2>\
        <% for (var i=0;i<composition.length;i++) {%>\
        <h3><%= composition[i].ing %> <span><%= composition[i].col %></span></h3> <br/><%} %>\
    <h2>Рецепт: </h2><br/>\
    <div class='rec'><%= recipe %></div>"
//        this.t="<a>sas</a>"
	    if (Bones.server) return
        $(window).keyup(function(e) {
			self.checkKey(e);
		})


	},


    checkKey: function(e) {
        console.log('sadsdas');

		if (e.which==27) {
//			$(window ).unbind('keyup');
			this.close();
		}
    },

	events: {
	    'click .close': 'close'

	},

	close: function() {
	    $('#recipe-cont',this.el).addClass('hide')

	},

	attachAfterLoad: function() {
		this.countPage = Math.ceil(this.collection.length/this.elOnPage)
		$('.displaying-num', this.el).text(this.collection.length+' items')
		$('.total-pages', this.el).text(this.countPage)
		this.renderDishes()
	},

	renderDishes: function() {
    	var self=this;
    	this.selectedDishes = []
    	var count = this.currentPage-1
    	var renderMas = _.toArray(this.collection).slice(count*self.elOnPage, (count*self.elOnPage)+self.elOnPage)
    	$('.oneDish',this.el).remove()
    	_.each(renderMas, function(model) {
    		var dishView = new views.AdminDishTable({model:model, parrent:self, user: self.user})
//			self.bindVideo(dishView)
    		$('.admin-content',self.el).append(dishView.render().attach().el)
    	})
	},





	attach: function() {

		return this;
	},


	render: function () {
		$(this.el).html(templates[this.template]);
		return this;
	}


});

