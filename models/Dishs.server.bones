models.Dishs.prototype.sync = function (method, model, options) {
//    var allow = false;
	Backbone.mongosync.apply(this, arguments);
    //console.log('method', method, options.isClient, Bones.router.state.get('user'));
    //console.log('method', method);
//    if (Bones.router.state.get('user')==null) {
//        allow = false;
//        if (method=="read") {
//        	allow = true;
//        }
//    }
//    else {
//    	allow = true;
//    
//    }
//	if (allow) {
//	   Backbone.mongosync.apply(this, arguments);
//	} else {
//		options.error('access denied');
//	}
}

