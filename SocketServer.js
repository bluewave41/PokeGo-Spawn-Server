const server = require('http').createServer();
const io = require('socket.io')(server);

io.on('connection', function(client) {
	
});

server.listen(4000);

module.exports = io;