/**
 * Created by 贺小雷 on 2017-07-18.
 */
define(function(require){
	var Progress = require('./progress');

	var progress = new Progress(document.querySelectorAll('#progress')[0], 99, {
		drawColor: '#6ff'
	});
	progress.init();
	progress.draw();
});