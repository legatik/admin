view = views.Main.extend({

	template: 'adminDishesView',

	initialize: function (options) {
	    var self = this;
		_.bindAll(this, 'render');
		this.prodMas = []
		this.catMas = []
//		Bones.home = this;
		this.ingCol = 1;
        var pro = new models.Products;
        this.user = options.state.get('user')
        pro.fetch({
            success: function() {
                pro.models.forEach(function(one) {
                    self.prodMas.push(one.get('title'))
                    self.catMas.push(one.get('species'))

                })
                self.catMas = _.uniq(self.catMas)
//                console.log('self.prodMas',self.prodMas);
//                console.log('self.catMas',self.catMas);
//                self.addCaT()
                self.addProd()
            },

        })

	},


	events: {
        'keypress .ing': 'addIngr',
        'keypress': 'hideError',
        'click #cans-addIng': 'cansAddIng',
        'click #agree-addIng': 'agreeAddIng',
        'click .addDish': 'addDish',
        'keyup .col': 'controlCol',
        'click #addStep' : 'addStepRec',
        'click #delStepRec' : 'delStepRec'
	},

    addStepRec:function(e){
      var arrRecipe = $("#rec-area-cont").find(".recipe")
      $("#rec-area-cont").append('<div class="item-recipe"><div>Шаг'+(arrRecipe.length+1)+'</div><textarea class="recipe"/></div>')
    },
    
    delStepRec:function(e){
        lastRecipe = $("#rec-area-cont").find(".item-recipe:last")
        $(lastRecipe).remove()
    },

	controlCol: function(e) {
	    var self=this;
	    if ($(e.target).val==0) {
	        $(e.target).addClass('clear')
	    }
	    else {
	        $(e.target).removeClass('clear')
	    }
	    if (e.keyCode==13) {
           if ($('.clear',self.el).length==0) {
                var div = '<br /><input class="ing clear"/><input class="col clear"/>'
                $('.inglist',self.el).append(div)
                self.addProd()
            }

	    }

	},



	hideError: function() {
	    $('.error', this.el).addClass('hide')

	},

	addDish: function() {
	    var error=false
//	    $('.ing', this.el).each(function(index, one) {
//	        console.log('eeee',arguments);
//	        if ($(one).hasClass('clear')&&!$(one).hasClass('first')) {
//	            $(one).remove()
//	        }
//	    })
	    var ingmas = $('.ing', this.el).map(function(index, one) {
	        return $(one).val()
	    })
	    var colmas = $('.col', this.el).map(function(index, one) {
	        return $(one).val()
	    })
      
      var recipe  = []   
        $('.recipe', this.el).map(function(index, one) {
	        if (!$(one).val()) {
	            $('.recipe-error', this.el).removeClass('hide')
	            error=true
	            return
	        }else{
	            recipe.push($(one).val())
	        }
	    })
      
      
      
	    var mas = []
	    _.each(ingmas,function(el, index) {
	        _.each(colmas,function(el2,index2) {
	            if (index2==index) {
	                var c = {}
	                c.ing = el
	                c.col = el2
	                mas.push(c)
	            }
	        })
	    })
	    _.each(mas, function(el, index) {
	        console.log('el.ing',el.ing);

	        if (!el.ing||el.ing=="") {
	            mas.splice(index,1)
	        }
	    })
      
      
      
	    if (mas.length==0) {
	        $('.ing-error', this.el).removeClass('hide')
	        error=true
	    }
	    if (!$('.title',this.el).val()) {
	        $('.title-error', this.el).removeClass('hide')
	        error=true
	    }
	    if (!$('.time',this.el).val()) {
	        $('.time-error', this.el).removeClass('hide')
	        error=true
	    }
//	    if (!$('.recipe',this.el).val()) {
//	        $('.recipe-error', this.el).removeClass('hide')
//	        error=true
//	    }
	    if (!error) {
	        var id = Bones.utils.guid()
	        var dish = new models.Dish
	        data = {
	            id: id,
	            title: $('.title',this.el).val(),
	            composition: mas,
	            recipe: recipe,
	            species: $('.category',this.el).val(),
	            time_cooking: $('.time',this.el).val()*1,
	            status: 'in_question',
	            dateAdding: new Date(),
	            who_added: this.user.id,
	            arr_comments:[]
	        }
          console.log("data",data)
//	        dish.save({
//	            id: id,
//	            title: $('.title',this.el).val(),
//	            composition: mas,
//	            recipe: $('.recipe',this.el).val(),
//	            species: $('.category',this.el).val(),
//	            time_cooking: $('.time',this.el).val()*1,
//	            status: 'in_question',
//	            method_cooking: $('.method-cooking',this.el).val(),
//	            dateAdding: new Date(),
//	            who_added: this.user.email,
//	            ing_list: m2,
//	            arr_comments:[]
//	        })
//	        $('.success',this.el).removeClass('hide')
//	        $('input').val('')
//	        $('textarea').val('')
//	        $('.ing', this.el).each(function(index, one) {
//	            console.log('eeee',arguments);
//	            if (!$(one).hasClass('first')) {
//	                $(one).remove()
//	                $('.inglist br', this.el).remove()
//	            }
//	        })
//	        $('.col', this.el).each(function(index, one) {
//	            console.log('eeee',arguments);
//	            if (!$(one).hasClass('first')) {
//	                $(one).remove()
//	            }
//	        })
	    }
	},


	addIngr: function(e) {
	    var self = this;
	    $(e.target).removeClass('clear')
	    console.log(e.keyCode);
	    if (e.keyCode==13) {
                var prodsearch = $(e.target).val()
                var prod = new models.Products
                prod.fetch({
                    filter: {
                        title: prodsearch
                    },
                    success: function() {
                        var p = prod.first()
                        if (p) {

                        }
                        else {
//                            self.newingmas.push($(e.target).val())
                            $('#modal-addIng', self.el).show()
                            $('#fix-cont', self.el).show()
                            self.okno = $(e.target)
                            self.addIngtoModal(prodsearch)
                        }
                        if ($('.clear',self.el).length==0) {
                            var div = '<br /><input class="ing clear"/><input class="col clear"/>'
                            $('.inglist',self.el).append(div)
                            self.addProd()
                        }
                    }
	            })
	        }
	},

    addIngtoModal: function(product) {
        $('.prodname', this.el).val(product)


    },

    cansAddIng: function() {
        this.okno.val('')
        $('.prodname').val('')
        $('#modal-addIng', self.el).hide()
        $('#fix-cont', this.el).hide()

    },

    agreeAddIng: function() {
        var pro = new models.Product
        if ($('.ness', this.el).val()=="Обязательно") {
            var nes = true;
        }
        else {
            var nes = false;
        }


        pro.save({
            id: Bones.utils.guid(),
            title: $('.prodname', this.el).val(),
            species: $('.species', this.el).val(),
            aviability: true,
            necessarily: nes
        })
        this.okno.val($('.prodname', this.el).val())
        this.prodMas.push($('.prodname', this.el).val());
        this.addProd()
        $('#modal-addIng', self.el).hide()
        $('#fix-cont', this.el).hide()
    },

	addCaT: function() {
	    var self=this
	    this.catMas.forEach(function(one) {
	        var t = '<option>'+one+'</option>'
	        $('.species', self.el).append(t)
	    })

	},


	addProd: function() {
	    var self = this;
        var availableTags = this.prodMas;
        if (Bones.server) return
        $(".ing", this.el).autocomplete({
            source: availableTags,
            appendTo: $('.inglist', this.el)
        });
	},






	attach: function() {
	    $('#modal-addIng', this.el).hide()
        $('#fix-cont', this.el).hide()
		return this;
	},


	render: function () {
	    var json={}
		$(this.el).html(templates[this.template]);
		return this;
	}


});

