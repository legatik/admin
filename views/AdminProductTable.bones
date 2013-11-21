view = views.Main.extend({
    tagName : 'tr',
    className: 'oneProduct',

	template: 'AdminProductTable',

	initialize: function (options) {
		_.bindAll(this, 'render');
		var self = this;
        this.model=options.model;
        this.catMas = []
        this.parrent = options.parrent
        this.model.bind('change', this.render, this);
        this.user = options.user





	},



	events: {
        'click .add-approved': 'addNess',
        'click .remove-approved': 'removeNess',
        'click .species-cont': 'changeSpecies',
    	'click div.title': 'showTitle',
    	'blur input.title': 'hideTitle',
    	'click .species-ok': 'hideSpecies',
    	'click .delete-dish': 'deleteProduct'
	},

    deleteProduct: function() {
	    var self=this;
	    this.model.destroy()
	    this.remove()
	    setTimeout(function() {
	        self.parrent.attachAfterLoad()
	    },500)


    },

	showTitle: function(e) {
		$(e.target).addClass('hide')
		$('input.title', this.el).removeClass('hide')
		$('input.title', this.el).focus()
	},

	hideTitle: function() {
		this.model.save({
			title: $('input.title', this.el).val()
		})
		$('input.title', this.el).addClass('hide')
		$('div.title', this.el).removeClass('hide')
	},


	changeSpecies: function() {
	    $('.spe', this.el).removeClass('hide')
	    $('.species-cont', this.el).addClass('hide')

	},

	hideSpecies: function() {
		this.model.save({
			species: $('.species', this.el).val()
		})
        $('.spe', this.el).addClass('hide')
	    $('.species-cont', this.el).removeClass('hide')
	},

	addNess: function() {
	    this.model.save({
	        necessarily: true
	    })
	    this.remove()
	},

    removeNess: function() {
	    this.model.save({
	        necessarily: false
	    })
	    this.remove()
    },


	attach: function() {
	    var self=this;

		return this;
	},


	render: function () {
	    var self=this;
	    var json = this.model.toJSON()
	    json.role = this.user.role
		$(this.el).html(templates[this.template](json));
//		var pro = new models.Products;
//        pro.fetch({
//            success: function() {
//                pro.models.forEach(function(one) {
//                    self.catMas.push(one.get('species'))
//                })
//                self.catMas = _.uniq(self.catMas)
//	            self.catMas.forEach(function(one) {
//	                var t = '<option>'+one+'</option>'
//	                    $('.species', self.el).append(t)
//	                })
//            },
//
//        })


		return this;
	}


});

