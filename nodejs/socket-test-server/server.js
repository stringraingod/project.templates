var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.argv[2];
var count = 0;
var ping_count = 0;


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/html/main.html');
});

app.get('/ping', function(req, res) {
	console.log('ping_count : ', ping_count);
	if (ping_count++ <= 100) {
		res.json(port + '//////');
	}
});

io.on('connection', function(socket) {
	socket.on('/ctos', function(msg) {
		setInterval(function() {
			socket.emit('/stoc', count++ + port);
		}, 20);
	});
});


http.listen(port, function() {
	console.log('listening on ', port);
});
