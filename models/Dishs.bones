model = Backbone.Collection.extend({
    url: '/api/Dish',
    model: models.Dish
});


/*model.augment({
    fetch: function(parent, options) {
        console.log('fetching..... options is', options, parent);
        return $.when(parent.apply(this, [options]))
            .pipe(_.f.functionize(this));
    }
});*/

