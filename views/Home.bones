view = views.Main.extend({

	template: 'Home',

	initialize: function (options) {
		_.bindAll(this, 'render');
		if (Bones.server) return
		Bones.home = this;
		var self = this;
		var prod = new models.Products
		console.log('options',options.state.get('user'));
		if (options.state.get('user')) {
			this.user = new models.User(options.state.get('user'))
			this.reg = true
		}
		else {
			this.user = new models.User({
				firstName: 'Guest'
			})
			this.reg = false
		}


//		prod.fetch({
////			filter: {
////				title: 'Салат из курицы с овощами'
////			},
//            skip: 100,
//			success: function() {
//			        prod.each(function(pr) {
//                        pr.save({
//                            necessarily: false
//                        })
//			        })
//			}
//		})

		var mas = []
		var unmas = ['sdfvaefawe']
//
		var data = {}
		data.products = mas;
		data.exproducts = unmas;

//		console.log(data);
		$.ajax({
			type: "POST",
			url: "/DishesReq",
			dataType: 'json',
			data: data,
			success: function(msg){
				console.log('AAA', msg);
			},
			error: function() {
				console.log('error', arguments);

			}

		})
	},

	events: {

	},

	attach: function() {
		this.header = new views.Header({
			el: $('#header', this.el),
		});
		this.header.render().attach();
		return this;
	},


	render: function () {
		$(this.el).html(templates[this.template]);
		return this;
	}


});

