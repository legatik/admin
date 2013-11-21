/**
 * Initialize underscore mixins for f_.
 *
 * We are doing this here (for now) because the bones library
 * doesn't (yet) easily allow us to set up our own global stack.
 */
_.mixin({
    f: Bones.server ? require('f_underscore') : f_,
    // Lazy evaluate a value.
    lazy: function (v) {
        return _.isFunction(v) ? v() : v;
    }
});

if (Bones.server) {
	var redis = require('redis');
	var client = redis.createClient();

}


/**
 * The main application router.
 */
router = Backbone.Router.extend({

    /*
    initialize: function (options) {
        console.log('INIT ROUTER');
        //Backbone.Router.prototype.initialize.call(this, options);
        this.initialize.call(this, options);
    },
*/


    routes: {
        '/': 'home',
        '/admin': 'adminka',
        '/adminAddDishes': 'adminAddDishes',
        '/adminDishesList': 'adminDishesList',
        '/adminProductsList': 'adminProductsList',
        '/adminProductsListNoness': 'adminProductsListNeobaz',
        '/register': 'registration',
        '/login': 'login'
    },





    initializeState: function (app) {
        //console.log('initializeState', app);
        Backbone.Router.prototype.initializeState.call(this, app);
        Bones.router = this;

//        Bones.router.res.alerts

        // We only want to load the glossary once for the entire application,
        // which is why we init it the model here, and not in a view somewhere.

        var self = this;
//		this.state = new models.State()
		if (Bones.server && this.req.user) {
			this.state = new models.State({
				user: true
			});
			var user = new models.User(this.req.user)
			this.state.set({
				user: user,
			});
			user.loadUser();
		} else {
			this.state = new models.State({
				user: false
			});
		}

        this.interface = new views.Interface({
            model: this.state
        });

        this.interface.bind('sync', this.syncView, this);

        /*
        // TODO: we are inadvertently initializing the schema twice here.
        this.schemas = new models.Schemas();
        this.schemas.fetch()
            .then(function(schemas) {
                that.schemas = schemas;
            });
       */
    },


	registration: function() {
        $.when(this.state.isLoaded()).then(_.bind(function(state) {
			this.send(views.Register, {state: state});
        }, this));
	},

	login: function() {
        $.when(this.state.isLoaded()).then(_.bind(function(state) {
			this.send(views.Login, {state: state});
        }, this));
	},




    home: function () {
        $.when(this.state.isLoaded()).then(_.bind(function(state) {
			this.send(views.Home, {state: state});
        }, this));
    },

    adminka: function() {
        $.when(this.state.isLoaded()).then(_.bind(function(state) {
        	if (this.state.get('user')) {
        		this.send(views.Admin, {state: state});
        	}
        	else {
        		this.res.redirect('/login')
        	}
        }, this));
    },

    adminAddDishes: function() {
        $.when(this.state.isLoaded()).then(_.bind(function(state) {
        	if (this.state.get('user')) {
        		this.send(views.adminDishesView, {state: state});
        	}
        	else {
        		this.res.redirect('/login')
        	}

        }, this));
    },

    adminDishesList: function() {
        $.when(this.state.isLoaded()).then(_.bind(function(state) {
        	if (this.state.get('user')) {
        		this.send(views.adminDishesListView, {state: state});
        	}
        	else {
        		this.res.redirect('/login')
        	}
        }, this));
    },

    adminProductsList: function() {
        $.when(this.state.isLoaded()).then(_.bind(function(state) {
        	if (this.state.get('user')) {
        		this.send(views.adminProductsListView, {state: state, obaz: true});
        	}
        	else {
        		this.res.redirect('/login')
        	}
        }, this));
    },

    adminProductsListNeobaz: function() {
        $.when(this.state.isLoaded()).then(_.bind(function(state) {
        	if (this.state.get('user')) {
        		this.send(views.adminProductsListView, {state: state, obaz: false});
        	}
        	else {
        		this.res.redirect('/login')
        	}
        }, this));
    },



    // Helper to assemble the page title.
    pageTitle: function (view) {
        var title = 'готовить - это просто';
        return (view.pageTitle ? view.pageTitle + ' | ' + title : title);
    },

    // The send method is...
    send: function (view) {
        var options = (arguments.length > 1 ? arguments[1] : {});
        var v = new view(options);

        // Populate the #page div with the main view.
        $('#page').empty().append(v.el);

        // TODO explain this!
        v.render().attach().activeLinks().scrollTop();

        // Set the page title.
        document.title = this.pageTitle(v);
    },

    // Generic error handling for our Router.
    error: function (error) {
        this.send(views.Error, _.isArray(error) ? error.shift() : error);
    },

    // Helper to fetch a set of models/collections in parrellel.
    fetcher: function () {
        var models = [];

        return {
            push: function (item) {
                models.push(item)
            },
            fetch: function (callback) {
                if (!models.length) return callback();
                var errors = [];
                var _done = _.after(models.length, function () {
                    callback(errors.length ? errors : null);
                });
                _.each(models, function (model) {
                    model.fetch({
                        success: _done,
                        error: function (error) {
                            errors.push(error);
                            _done();
                        }
                    });
                });
            }
        }
    }
});

