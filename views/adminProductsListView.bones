view = views.Main.extend({

	template: 'adminProductsListView',

	initialize: function (options) {
	    var self = this;
		_.bindAll(this, 'render');
		this.ob = options.obaz
		console.log('this.ob',this.ob);
		this.user = options.state.get('user')
		this.currentPage = 1;
		this.elOnPage = 20;
		this.filter = {}
		this.sort_range = -1
		this.collection = new models.Products;
		this.collection.fetch({
		    filter: {
		        necessarily: self.ob
		    },
			success: function () {
			console.log('this.collection',self.collection);

				self.attachAfterLoad()
			}
		})



	},




	events: {
		'click .next-page': 'nextPage',
		'click .prev-page': 'prevPage',
		'click .last-page': 'lastPage',
		'keyup .current-page': 'goPage',
		'click .first-page': 'firstPage'
	},

	firstPage: function() {
		if (this.currentPage==1) return
		this.currentPage=1
		$('.current-page', this.el).val(this.currentPage)
		this.renderDishes()
	},

	nextPage: function() {
		if (this.currentPage==this.countPage) return
		this.currentPage++
		$('.current-page', this.el).val(this.currentPage)
		this.renderDishes()
	},

	prevPage: function() {
		if (this.currentPage==1) return
		this.currentPage--
		$('.current-page', this.el).val(this.currentPage)
		this.renderDishes()
	},

	lastPage: function() {
		if (this.currentPage==this.countPage) return
		this.currentPage=this.countPage
		$('.current-page', this.el).val(this.currentPage)
		this.renderDishes()
	},


	attachAfterLoad: function() {
		this.countPage = Math.ceil(this.collection.length/this.elOnPage)
		$('.displaying-num', this.el).text(this.collection.length+' items')
		$('.total-pages', this.el).text(this.countPage)
		this.renderDishes()
	},

	goPage: function(e) {
		if (e.keyCode==13) {
			var val = $(e.target).val()
			if (val>=1 && val<= this.countPage) {
				this.currentPage=val
				this.renderDishes()
			}
		}
	},

	renderDishes: function() {
    	var self=this;
    	this.selectedDishes = []
    	var count = this.currentPage-1
    	var renderMas = _.toArray(this.collection).slice(count*self.elOnPage, (count*self.elOnPage)+self.elOnPage)
    	$('.oneProduct',this.el).remove()
    	_.each(renderMas, function(model) {
    		var prodView = new views.AdminProductTable({model:model, parrent:self, user:self.user})
//			self.bindVideo(dishView)
    		$('.admin-content',self.el).append(prodView.render().attach().el)
    	})
	},





	attach: function() {

		return this;
	},


	render: function () {
	    var json={};
	    json.ob = this.ob;
		$(this.el).html(templates[this.template](json));
		return this;
	}


});

