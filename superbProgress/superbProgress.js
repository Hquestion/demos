/**
 * Created by 贺小雷 on 2017-07-24.
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
		startIndicator: '0',
		endIndicator: '100',
		total: 100,
		current: 0,
		width: 240,
		height: 240,
		totalSelector: '.total',
		indicatorContainer: '.indicator',
		step: 1
	};
	var SuperbProgress = function($container, opt){
		this.$container = $container;
		this.opt = extend(def, opt);
	};

	SuperbProgress.prototype = {
		/**
		 * 初始化方法，绘制进度条背景和底色,基础信息等
		 */
		init: function(fn){
			this.width = this.opt.width || this.$container.offsetWidth;
			this.height = this.opt.height || this.opt.width || this.$container.offsetHeight;
			this.$canvas = this.$container.querySelector('canvas');
			this.$indicatorContainer = this.$container.querySelector(this.opt.indicatorContainer);
			this.$total = this.$container.querySelector(this.opt.totalSelector);
			this.$total.innerText = this.opt.current;
			this.$canvas.width = this.width;
			this.$canvas.height = this.height;
			this.radius = this.width / 2 - 20;

			setStyle(this.$container, {
				position: 'relative',
				width: this.width + 'px',
				height: this.height + 'px'
			});
			setStyle(this.$indicatorContainer, {
				position: 'absolute',
				left: '50%',
				top: '50%',
				transform: 'translate3d(-50%, -50%, 0)',
				width: this.width / 2 + 'px',
				height: this.width / 2 + 'px',
				borderRadius: this.width / 2 + 'px',
				background: '#fff',
				zIndex: 1
			});

			this.$startIndicator = document.createElement('div');
			this.$endIndicator = document.createElement('div');
			setStyle(this.$startIndicator, {
				position: 'absolute',
				width: '40px',
				height: 'auto',
				textAlign: 'center',
				left: '-60px',
				top: this.width / 4 + 'px'
			});
			setStyle(this.$endIndicator, {
				position: 'absolute',
				width: '40px',
				height: 'auto',
				textAlign: 'center',
				right: '-60px',
				top: this.width / 4 + 'px'
			});
			this.$indicatorContainer.appendChild(this.$startIndicator);
			this.$indicatorContainer.appendChild(this.$endIndicator);
			this.$startIndicator.innerText = this.opt.startIndicator;
			this.$endIndicator.innerText = this.opt.endIndicator;

			this.ctx = this.$canvas.getContext('2d');

			var bgImg = document.createElement('img');
			var self = this;
			bgImg.onload = function(){
				self.ctx.drawImage(bgImg, 0, 0, self.width, self.height);
				self.ctx.beginPath();
				self.ctx.arc(self.width / 2, self.height / 2, self.radius ,-1*Math.PI, 0);
				self.ctx.strokeStyle = '#d4f1ec';
				self.ctx.lineWidth = 5;
				self.ctx.stroke();
				self.ctx.closePath();
				fn && typeof fn === 'function' && fn.call(self);
			};
			bgImg.setAttribute('src', '../img/progress-bg.png');
		},
		draw: function(){
			var startAngle = -1 * Math.PI;
			var distAngle = (this.opt.current / 100) * (Math.PI) + startAngle;
			var stepAngle = (this.opt.step / this.opt.current) * (distAngle - startAngle);
			var startIndicator = 0;
			var endAngle = startAngle;
			var self = this, afId = null;
			(function doDraw(){
				if(startIndicator < self.opt.current) {
					startIndicator += self.opt.step;
					// startAngle = endAngle;
					endAngle += stepAngle;
					self.ctx.restore();

					self.ctx.beginPath();
					self.ctx.arc(self.width / 2, self.height / 2, self.radius, startAngle, endAngle);
					var gradient = self.ctx.createLinearGradient(0,0,endAngle - startAngle,0);
					gradient.addColorStop(0, "#4eb878");
					gradient.addColorStop(1,"#88f6b4");
					self.ctx.strokeStyle = gradient;
					self.ctx.lineWidth = 5;
					self.ctx.stroke();
					self.ctx.save();
					self.$total.innerText = (startIndicator);
					cancelAnimationFrame(afId);
					afId = requestAnimationFrame(doDraw);
				}else {
					self.ctx.save();
					self.ctx.lineTo(self.width / 2, self.height / 2);
					self.ctx.lineWidth = 1;
					self.ctx.stroke();
					self.ctx.closePath();
					self.ctx.restore();
					cancelAnimationFrame(afId);
				}
			})();
		}
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

	function emptyNode (node){
		var childrens = node.children;
		for(var i = 0, len = childrens.length; i < len; i++) {
			node.removeChild(node);
		}
	}

	return SuperbProgress;
});