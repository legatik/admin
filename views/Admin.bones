view = views.Main.extend({

	template: 'Admin',

	initialize: function (options) {
		_.bindAll(this, 'render', 'addProduct');
		Bones.home = this;
		var self = this;


	},
	
	




	
	events: {
		'click .addProduct': 'addProduct'
	},
	
	addProduct: function() {
		var title= $('.title',this.el).val()
		var species = $('.species', this.el).val()
        if ($('.ness', this.el).val()=="Обязательно") {
            var nes = true;
        }
        else {
            var nes = false;
        }
		var pro = new models.Product
		pro.save({
		    id: Bones.utils.guid(),
			title: title,
            necessarily: nes, 
            species: species
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
