/**
 * Created by 贺小雷 on 2017-07-17.
 */
(function(global, factory){
	if(typeof require === 'function' && require.amd) {
		define(factory);
	}else if(typeof exports === 'object'){
		modules.exports = factory();
	}else {
		global.Progress = factory();
	}
})(this, function(){
	var def = {
		bgColor: '#f3f3f3',
		drawColor: '#f134a5',
		lineWidth: 15,
		radius: 100
	};
	var Progress = function($canvas, percent, opt){
		this.$canvas = $canvas;
		this.percent = percent;
		this.opt = extend(def, opt);
		this.ctx = this.$canvas.getContext('2d');
	};

	Progress.prototype.init = function(){
		this.width = this.$canvas.innerWidth;
		this.height = this.$canvas.innerHeight;
		this.$canvas.width = this.width;
		this.$canvas.height = this.height;
		this.ctx.beginPath();
		this.ctx.arc(this.width / 2, this.height / 2, this.opt.radius, 0, 2*Math.PI);
		this.ctx.lineWidth = this.opt.lineWidth;
		this.ctx.lineCap = 'round';
		this.ctx.strokeStyle = this.opt.bgColor;
		this.ctx.stroke();
		this.ctx.closePath();
		this.ctx.beginPath();
		this.ctx.font = 'bolder 60px Arial';
		this.ctx.fillStyle = '#666';
		this.ctx.textAlign = "center";
		this.ctx.fillText("0", 200, 225);
		this.ctx.closePath();
	};

	Progress.prototype.draw = function(){

	};

	function extend(dist, source){
		for(var key in dist) {
			dist[key] = source && source[key] || dist[key];
		}
		return dist;
	}
	return Progress;
});