model = Backbone.Model.extend({
    url: function () {
        return '/api/Product/' + this.id;
    },
    defaults: {
    	title: '',
    	species: '',
    	necessarily: true
//    	caloric_content: 0,
//    	image: '',
//    	price: 0,
//    	proteins: 0,
//    	fats: 0,
//    	carbs: 0
    },

    initialize: function () {
  
    }
})
    
  

