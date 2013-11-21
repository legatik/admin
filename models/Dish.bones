model = Backbone.Model.extend({
    url: function () {
        return '/api/Dish/' + this.id;
    },
    defaults: {  
    	title: '',
//    	method_cooking: [],
        who_added: 'moderator',
    	composition: [],
    	recipe: '',
//    	difficulty: '',
    	species: '',
    	time_cooking: 0,
    	cost: 0,
    	rating: 0,
//    	availability: false,
    	status: 'in_question'
//    	picture: ''
    },

    initialize: function () {
  
    }
})
    
  

