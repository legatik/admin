view = views.Main.extend({
    template: 'Header',

    initialize: function (options) {
        _.bindAll(this, 'render');


    },

    render: function () {
		var json = {
			name: Bones.home.user.get('firstName'),
			reg: Bones.home.reg
		}
        $(this.el).html(templates[this.template](json));
        return this;
    },
    attach: function () {

        return this;
    },

    events: {

    }

});

