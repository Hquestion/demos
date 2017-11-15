var TransitionCanvas = function(size, position, container){
    this.width = size.width;
    this.height = size.height;
    this.x = position.x;
    this.y = position.y;
    this.$container = container;
    this.init();
};

TransitionCanvas.prototype = {
    init: function(){
        this.$container.style.position = 'relative';
        this.$canvas = document.createElement('canvas');
        this.$canvas.width = this.$container.offsetWidth;
        this.$canvas.height = this.$container.offsetHeight;
        this.$container.appendChild(this.$canvas);

        this.ctx = this.$canvas.getContext('2d');
        this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.stroke();
        this.ctx.restore();

        this.updateMaskPosition();
        this.addEventOnMask();
    },
    updateMaskPosition: function(ox, oy){
        if(!this.$mask) {
            this.$mask = document.createElement('div');
            this.$mask.style.position = 'absolute';
            this.$mask.style.cursor = 'se-resize';
            this.$mask.style.width = '20px';
            this.$mask.style.height = '20px';
            this.$container.appendChild(this.$mask);
            this.$mask.ol = this.x + this.width - 20;
            this.$mask.ot = this.y + this.height - 20;
        }else {
            this.$mask.ol = ox;
            this.$mask.ot = oy;
        }
        this.$mask.style.top = this.$mask.ot + 'px';
        this.$mask.style.left = this.$mask.ol + 'px';
    },
    addEventOnMask: function(){
        var self = this;
        var isMouseDown = false, mdx = 0, mdy = 0;
        this.$mask.addEventListener('mousedown', function(e){
            isMouseDown = true;
            mdx = e.clientX;
            mdy = e.clientY;
        });
        this.$container.addEventListener('mouseup', function(){
            isMouseDown = false;
        });
        this.$container.addEventListener('mouseleave', function(){
            isMouseDown = false;
        });
        this.$container.addEventListener('mousemove', function(e){
            if(!isMouseDown) {
                return;
            }
            var mmx = e.clientX;
            var mmy = e.clientY;
            var moveX = mmx - mdx, moveY = mmy - mdy;
            mdx = mmx;
            mdy = mmy;
            self.updateMaskPosition(self.$mask.ol + moveX, self.$mask.ot + moveY);
            self.updateRectSize(moveX, moveY);
        });
    },
    updateRectSize: function(moveX, moveY){
        this.width = this.width + moveX;
        this.height = this.height + moveY;
        this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.width, this.height);
        this.ctx.stroke();
    }
};