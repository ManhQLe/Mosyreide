const fs = require('fs')
const path = require('path')
const liveServer = require("live-server");
const less = require('less');
const gulp = require('gulp')
const lessMap = require('./lessmap.json')

function translate(from,to){
	fs.readFile(from, 'utf8', function (err, data) {
		if(err)
			console.log(err)
		else
			less.render(data, (e, out) => {
				if (e)
					console.log(e);
				else
					fs.writeFile(to,out.css,'utf-8',()=>{})
			})	
	});
}

lessMap.forEach(p=>{
	translate(p.less,p.css);
	gulp.watch(p.less).on("change", d => {
		translate(p.less,p.css);
	})	
})

gulp.watch('./src/public/app/less/*.less').on("change", d => {
	let p = d.path.split("\\");
	let filename = p[p.length - 1].split(".")[0];

	fs.readFile(d.path, 'utf8', function (err, data) {
		if(err)
			console.log(err)
		else
			less.render(data, (e, out) => {
				if (e)
					console.log(e);
				else {				
					fs.writeFile(path.join(__dirname, "src/public/app/css", filename + ".css")
					,out.css,'utf-8',()=>{})
				}
			})

	});
})

var params = {
    port: 8181, // Set the server port. Defaults to 8080.
    host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
    root: "./src", // Set root directory that's being served. Defaults to cwd.
    open: false, // When false, it won't load your browser by default.
    ignore: 'scss,my/templates', // comma-separated string for paths to ignore
    file: "index.html", // When set, serve this file for every 404 (useful for single-page applications)
    wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
    mount: [['/components', './node_modules']], // Mount a directory to a route.
    logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
    middleware: [function(req, res, next) { next(); }] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
};
liveServer.start(params);