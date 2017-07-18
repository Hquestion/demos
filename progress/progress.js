/**
 * Created by 贺小雷 on 2017-07-17.
 */
(function(global, factory){
	if(typeof require === 'function') {
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
		textColor: '#666',
		lineWidth: 15,
		radius: 100,
		fontSize: 50
	};
	var Progress = function($canvas, percent, opt){
		this.$canvas = $canvas;
		this.$box = this.$canvas.querySelectorAll('canvas')[0];
		this.percent = percent;
		this.opt = extend(def, opt);
		this.ctx = this.$box.getContext('2d');
		this.$loading = document.createElement('p');
		this.$canvas.appendChild(this.$loading);
	};

	Progress.prototype.init = function(){
		this.width = this.$box.offsetWidth;
		this.height = this.$box.offsetHeight;
		this.$box.width = this.width;
		this.$box.height = this.height;
		setStyle(this.$canvas, {
			position: 'relative',
			width: this.width + 'px',
			height: this.height + 'px',
			display: 'inline-block'
		});
		setStyle(this.$loading, {
			position: 'absolute',
			width: '100%',
			left: '0',
			top: '50%',
			textAlign: 'center',
			transform: 'translateY(-50%)',
			margin: '0',
			fontSize: this.opt.fontSize + 'px',
			color: this.opt.textColor + 'px',
			fontFamily: 'Arial'
		});
		this.ctx.beginPath();
		this.ctx.arc(this.width / 2, this.height / 2, this.opt.radius, 0, 2*Math.PI);
		this.ctx.lineWidth = this.opt.lineWidth;
		this.ctx.strokeStyle = this.opt.bgColor;
		this.ctx.stroke();
		this.ctx.closePath();
		this.$loading.innerText = (0 + '%');
		return this;
	};

	Progress.prototype.draw = function(){
		var startAngle = 0 - 0.5 * Math.PI;
		var distAngle = (this.percent / 100) * 2 * Math.PI + startAngle;
		var step = 1 / this.percent * (distAngle - startAngle);
		var startIndicator = 0;
		var endAngle = startAngle;
		var self = this, afId = null;
		(function doDraw(){
			if(endAngle < distAngle) {
				startIndicator += 1;
				startAngle = endAngle;
				endAngle += step;
				self.ctx.beginPath();
				self.ctx.arc(self.width / 2, self.height / 2, self.opt.radius, startAngle, endAngle);
				self.ctx.strokeStyle = self.opt.drawColor;
				self.ctx.lineWidth = self.opt.lineWidth;
				self.ctx.stroke();
				self.ctx.closePath();
				self.$loading.innerText = (startIndicator + '%');
				cancelAnimationFrame(afId);
				afId = requestAnimationFrame(doDraw);
			}else {
				cancelAnimationFrame(afId);
			}
		})();
		return this;
	};

	Progress.prototype.clear = function(){
		this.ctx.clearRect(0,0, this.width, this.height);
		this.$loading.innerText = '';
	};

	Progress.prototype.rePaint = function(){
		this.clear();
		this.init();
		this.draw();
	};

	function setStyle($node, styles){
		for(var key in styles) {
			$node.style[key] = styles[key];
		}
		return $node;
	}

	function extend(dist, source){
		for(var key in dist) {
			dist[key] = source && source[key] || dist[key];
		}
		return dist;
	}
	return Progress;
});