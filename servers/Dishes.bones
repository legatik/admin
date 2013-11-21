var fs = require('fs');

var server = Bones.Server.extend({
	options: {},
	initialize: function (app) {
		var self = this;
		this.post('/DishesReq', function (req, res) {
			var ProductsList = []
			var ExProductsList = []
			var res2=res;
			var mas = req.body.products;
			if (req.body.products) {
				ProductsList = req.body.products
			}
			if (req.body.exproducts) {
				ExProductsList = req.body.exproducts
			}
			var filter = {}
			if (ProductsList.length!=0 && ExProductsList.length!=0) {
				filter.ing_list = {
					$all: ProductsList,
					$nin: ExProductsList
				}
			}
			else if (ProductsList.length!=0) {
				filter.ing_list = {
					$all: ProductsList,
				}
			}
			else if (ExProductsList.length!=0) {
				filter.ing_list = {
					$nin: ExProductsList
				}
			}
			var dishes = new models.Dishs
			dishes.fetch({
				filter: filter,
				success: function() {
					var result = dishes.models.sort(function(a, b) {
						var x = _.intersection(req.body.products, a.get('ing_list')).length
						var y = _.intersection(req.body.products, b.get('ing_list')).length
						return (x > y) ? -1 : ( (x == y) ? 0 : 1 )
					})
					res2.send(result)

				},
				error: function() {
					console.log('dishes error', arguments);
					res2.send({error: arguments})
				}
			})
		});
	}

});

