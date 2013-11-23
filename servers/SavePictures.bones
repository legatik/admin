var fs = require('fs');
var _  = require('underscore')

var server = Bones.Server.extend({
	options: {},
	initialize: function (app) {
		var self = this;
		
		var obj = {
		  "image/jpeg": ".jpg",
		  "image/gif": ".gif",
		  "image/png": ".png"
		}
		
		this.post('/savePucture', function (req, res) {
        var id = req.body.id
        _.each(req.files, function(file, field) {
            
      	fs.readFile(file.path, function (err, data) {
				   if (err) {
				    console.log('readFile',err);
				   }
				  fs.mkdir('assets/pictures/'+id, function(err) {
				   if (err) {
				    console.log('mkdir',err);
				   }
				  fs.writeFile('assets/pictures/'+id+'/'+field+obj[file.type], data, function (err) {
					  if (err) throw err;
					  console.log('It\'s saved!');
				  });				   
				   
				  
				  })
				  

			  });        
        
        
        
        })
        

//      	fs.readFile(req.files.file.path, function (err, data) {
//				  if (err) throw err;
//				  fs.writeFile(req.body.link, data, function (err) {
//					  if (err) throw err;
//					  console.log('It\'s saved!');
//				  });
//			  });
        
        res.send(200)
		});
	}

});

