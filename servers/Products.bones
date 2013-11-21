var fs = require('fs');



var server = Bones.Server.extend({

	options: {},
	initialize: function (app) {
		var self = this;
		this.all('/ProductsReq', function (req, res) {
			var res2 = res
			var filter = {}
			if (req.body) {
				var title = req.body.title;
				var species = req.body.species;			
				if (title)  filter.title = {$in: req.body.title};
				if (species)  filter.species = req.body.species;			
			}
			console.log('filter',filter);
			var prod = new models.Products;
			var otv = {}
			prod.fetch({
				filter: filter,
				success: function() {
					if (prod.length!=0) {
						otv.error = null
						otv.data = prod
						res2.send(otv)
					}
					else {
						otv.error = "not found"
						res2.send(otv)
					}
				},
				error: function() {
					res2.send(arguments)
				
				}
			})
		
		
		
		});
	

	}

});
