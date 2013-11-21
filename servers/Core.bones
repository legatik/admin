var io = require('socket.io');




servers.Core.prototype.start = function (callback) {
	var self = this;
	//this.port && this.listen(this.port, callback);
	if (this.port) {
		var server = this.listen(this.port, callback);
		io = io.listen(server);
	}
	io.sockets.on('connection', function (socket) {

	
	});

	return this;
}




