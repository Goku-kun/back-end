const readable = require('stream').Readable;
const rs = readable();

let c = 96;

rs._read = function() {
	if ( c>='z'.charCodeAt(0)){
		c++;
		return rs.push(null);
	}

	setTimeout(function(){
		rs.push(String.fromCharCode(++c));
	}, 100);
}

rs.pipe(process.stdout);

process.on('exit', function() {
	console.error(`\n _read() called ${c-97} times.`);
});
process.stdout.on('error', process.exit);

