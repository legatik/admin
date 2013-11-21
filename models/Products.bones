model = Backbone.Collection.extend({
    url: '/api/Product',
    model: models.Product
});


/*model.augment({
    fetch: function(parent, options) {
        console.log('fetching..... options is', options, parent);
        return $.when(parent.apply(this, [options]))
            .pipe(_.f.functionize(this));
    }
});*/

