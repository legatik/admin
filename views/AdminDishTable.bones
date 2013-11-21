view = views.Main.extend({
    tagName : 'tr',
    className: 'oneDish',

	template: 'AdminDishTable',

	initialize: function (options) {
		_.bindAll(this, 'render');
		var self = this;
        this.model=options.model;
        this.parrent = options.parrent
        this.model.bind('change', this.render, this);
        this.ingridients = ''
        this.user = options.user
        console.log('this.user', this.user);

        this.model.get('composition').forEach(function(one, index) {
//            console.log('composition', arguments);
            if (index==0) {
                self.ingridients=one
            }
            else {
                self.ingridients=self.ingridients+'\n '+one

            }
        })
//        console.log('this.ingridients',this.ingridients);




	},



	events: {
		'click .add-approved': 'addAproved',
		'click .remove-approved': 'removeAproved',
		'click .add-question': 'addQuestion',
		'click .showRecipe': 'showRecipe',
		'click .delete-dish': 'deleteDish'
	},

	showRecipe: function() {
	    var self=this;
	    var template = this.parrent.t
        console.log('template',template);
        var b = _.template(this.parrent.t, this.model.toJSON());
    	$('#recipe-cont',this.parrent.el).removeClass('hide').html(b)
	},

	addAproved: function() {
	    this.model.save({
	        status: 'approved'
	    })
	},

	removeAproved: function() {
	    this.model.save({
	        status: 'not_approved'
	    })
	},

	addQuestion: function() {
	    this.model.save({
	        status: 'in_question'
	    })
	},

	deleteDish: function() {
	    this.model.destroy()
	    this.remove()
	},



	attach: function() {
	    var self=this;
	    var now = new Date()
	    var lastDate = new Date(this.model.get('dateAdding'))
	    var day = 1000*60*60*24
		if (Math.round((now-lastDate)/1000/60/60/24/30/12)==0) {
			if (Math.round((now-lastDate)/1000/60/60/24/30)==0) {
				if (Math.round((now-lastDate)/1000/60/60/24)==0) {
					if (Math.round((now-lastDate)/1000/60/60)==0) {
						var lastLog = Math.round((now-lastDate)/1000/60) + ' minutes ago'
					}
					else {
						var lastLog = Math.round((now-lastDate)/1000/60/60) + ' hours ago'
					}
				}
				else {
				    var lastLog
				    var d = Math.round((now-lastDate)/1000/60/60/24)
				    if (d==1) lastLog = d + ' day ago'
				    else lastLog = d + ' days ago'
				}
			}
			else {
				var lastLog = Math.round((now-lastDate)/1000/60/60/24/30) + ' months ago'
			}
		}
		else {
			var lastLog = Math.round((now-lastDate)/1000/60/60/24/30/12) + ' years ago'
		}
		$('.date-adding', this.el).text(lastLog)
        return this;


		return this;
	},


	render: function () {
		var json = this.model.toJSON()
		json.role = this.user.role
		json.name = this.user.email
		$(this.el).html(templates[this.template](json));
        if (this.model.get('status')=='approved') {
            $(this.el).addClass('odobreno')
            $(this.el).removeClass('neodobreno')
            $(this.el).removeClass('in-question')

        }
        else if (this.model.get('status')=='not_approved') {
            $(this.el).addClass('neodobreno')
            $(this.el).removeClass('odobreno')
            $(this.el).removeClass('in-question')
        }
        else {
            $(this.el).addClass('in-question')
            $(this.el).removeClass('odobreno')
            $(this.el).removeClass('neodobreno')
        }


		return this;
	}


});

