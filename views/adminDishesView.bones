view = views.Main.extend({

	template: 'adminDishesView',

	initialize: function (options) {
	    if (Bones.server){return}
	    this.fileTitle
	    this.fileStep = []
	    var self = this;
		_.bindAll(this, 'render','changeTitlePic',"changeStepPics","addRmFact","addRmWishList");
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
        'click #delStepRec' : 'delStepRec',
        'change #title-picture':"changeTitlePic",
        'change #step-pictures':"changeStepPics",
        'click #cancelTitle' : "cancelTitlePic",
        'click #cancelStep' : "cancelStepPics",
        'click #addRmWish' : "addRmWishList",
        'click #addRmFact' : "addRmFact"
        
        
	},

    addRmFact :function(){
      var status = $(".fact",this.el).css("display")
      if(status == "none"){
        $(".fact",this.el).css("display","block")
        $("#addRmFact",this.el).text("Удалить интересный факт")
      }else{
        $(".fact",this.el).css("display","none")
        $(".fact",this.el).val("")
        $("#addRmFact",this.el).text("Добавить интересный факт")
      }
    },


    addRmWishList :function(){
      var status = $(".wishlist").css("display")
      if(status == "none"){
        $(".wishlist").css("display","block")
        $("#addRmWish").text("Удалить заметку")
      }else{
        $(".wishlist").css("display","none")
        $(".wishlist").val("")
        $("#addRmWish").text("Добавить заметку")
      }
    },

    cancelStepPics:function(){
      var confirm = window.confirm("Вы уверенны что хотите отменить загруженне файлы?")
      if(confirm){
        $("#step-pictures",this.el).val("")
        this.fileStep = []
        console.log("this.fileStep",this.fileStep)
      }
    },

    cancelTitlePic:function(){
      var confirm = window.confirm("Вы уверенны что хотите отменить загруженный файл?")
      if(confirm){
        $("#title-picture",this.el).val("")
        $("#title-picture").val("")
        this.fileTitle = false
      }
    
    },

    changeStepPics:function(e){
        this.fileStep.push(e.target.files[0])
        $("#picLength",this.el).text(this.fileStep.length)
        
    },
    
    changeTitlePic:function(e){
        this.fileTitle = e.target.files[0]
        this.hideError()
    },

    addStepRec:function(e){
      var arrRecipe = $("#rec-area-cont").find(".recipe")
      $("#rec-area-cont").append('<div class="item-recipe"><div>Шаг'+(arrRecipe.length+1)+'</div><textarea class="recipe textareaDish"/></div>')
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
	    var self = this
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
      
      ingmasSend = []
      
	    _.each(ingmas,function(el, index) {
        ingmasSend.push(el)
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
	    if (!$('.serving',this.el).val()) {
	        $('.serving-error', this.el).removeClass('hide')
	        error=true
	    }

	    if (!$('.complexity',this.el).val()) {
	        $('.complexity-error', this.el).removeClass('hide')
	        error=true
	    }

	    if (!$('.kremling-diet',this.el).val()) {
	        $('.kremling-diet-error', this.el).removeClass('hide')
	        error=true
	    }
      
      if(!this.fileTitle){
        error = true
        $(".picture-title-error",this.el).removeClass('hide')
      }
      
	    if (!$('#keyDish',this.el).val()) {
	        $('.key-title-error', this.el).removeClass('hide')
	        error=true
	    }
      
	    if (!$('#descriptionDish',this.el).val()) {
	        $('.desc-title-error', this.el).removeClass('hide')
	        error=true
	    }
	    
	    if (!$('#title-key',this.el).val()) {
	        $('.title-key-error', this.el).removeClass('hide')
	        error=true
	    }
	    
      console.log("error",error)
	    if (!error) {
	        var id = Bones.utils.guid()
	        var dish = new models.Dish
	        var data = {
	              id_picture    : id,
	              id            : id,
	              title         : $('.title',this.el).val(),
	              composition   : mas,
	              recipe        : recipe,
	              species       : $('.category',this.el).val(),
	              time_cooking  : $('.time',this.el).val()*1,
	              status        : 'in_question',
	              dateAdding    : new Date(),
	              who_added     : this.user.id,
	              comments      : [],
	              kitchen       : $('.kitchen',this.el).val(),
	              serving       : $('.serving',this.el).val(),
	              complexity    : $('.complexity',this.el).val(),
	              kremling_diet : $('.kremling-diet',this.el).val(),
	              cost          : $("#cost",this.el).val(),
	              fact          : $(".fact",this.el).val(),
	              wish          : $(".wishlist",this.el).val(),
	              key           : $("#keyDish",this.el).val(),
	              description   : $("#descriptionDish",this.el).val(),
	              title_key     : $('#title-key',this.el).val(),
	              ingredients   : ingmasSend
	        }
	        
	        
 	        
	        
	        var newForm = new FormData()
	        newForm.append("title",this.fileTitle)
	        
	        console.log("this.fileStep",this.fileStep)
	        
	        this.fileStep.forEach(function(file,index){
	          console.log("index",index)
	          console.log("file")
  	        newForm.append("p"+index,file)
	        })
	        
	        
	        
	        newForm.append("id_picture",id)
	        
	        
	            
			    $.ajax({
				    url: "/savePucture",
				    data: newForm,
				    cache: false,
				    contentType: false,
				    processData: false,
				    type: 'POST',
				    success: function(status){
				      self.fileStep = []
				      $("#picLength",self.el).text(0)
				      console.log("status",status)
				      self.fileTitle = false
				      dish.save(data, {
				        complete: function() {
				          console.log('complete', arguments)
				        
				        }
				      
				      })
				    }
			    });

          var statusF = $(".fact",this.el).css("display")
          if(statusF == "block"){
            this.addRmFact()
          }

          var statusW = $(".wishlist").css("display")
          if(statusW == "block"){
             this.addRmWishList()
          }
          
	        $('.success',this.el).removeClass('hide')
	        $('input').val('')
	        $('textarea').val('')
	        $('.ing', this.el).each(function(index, one) {
	            console.log('eeee',arguments);
	            if (!$(one).hasClass('first')) {
	                $(one).remove()
	                $('.inglist br', this.el).remove()
	            }
	        })
	        $('.col', this.el).each(function(index, one) {
	            if (!$(one).hasClass('first')) {
	                $(one).remove()
	            }
	        })
	        $('.item-recipe', this.el).each(function(index, one) {
	            if (!$(one).hasClass('first')) {
	                $(one).remove()
	            }
	        })
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

