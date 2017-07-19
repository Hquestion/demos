/**
 * Created by 贺小雷 on 2017-07-19.
 */
(function(window, $){
	$.fn.dragsort = function(option){
		var defaults = {
			ele: 'li',
			container: 'ul',
			handler: '.handler',
			dragstartCb: $.noop(),
			ondragCb: $.noop(),
			dragendCb: $.noop()
		};
		$.extend(defaults, option);

		var $container = $(this);

		var isDragging = false;
		var $dragItem = null;
		var dy = 0, dx = 0;
		var mx = 0, my = 0;
		var moveY = 0;
		var originalOffset;
		$(this).delegate(defaults.ele + ' ' + defaults.handler, 'mousedown', function(e){
			dy = e.clientY;

			var $item = $dragItem = $(this).parents(defaults.ele);
			originalOffset = $item.offset();
			$item.addClass('is-dragging');
			isDragging = true;
			$item.on('dragstart', function(e){

			});
			//支持拖放
			$container.on('dragover', function(e){
				e.preventDefault();
			});

		});

		$(window).off('mousemove.drag').on('mousemove.drag', function(e){
			isDragging && $dragItem.attr('draggable', 'true');
		});

		$(this).delegate(defaults.ele, 'drop', function(e){
			e.preventDefault();
			$(this).after($dragItem);
			isDragging && $dragItem.attr('draggable', 'false');
			isDragging = false;
		});
	};
})(this, $);