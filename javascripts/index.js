((root) => {
  /**
   * text color: #5b6870
   * bar color : #efedef
   * background: #f9f7f9
   * @class Collection
   */

  function calculate() {
    if(!arguments.length) return null;

    const slice = Array.prototype.slice;

    arguments = slice.call(arguments)
                .map(value => new FixNumber(value));
    
    let result = [...Object.keys(arguments[0])];

    result = result.map(item => arguments.reduce((v1, v2) => v1[item] * v2[item]));

    return result[0] / result[1];

  }

  class FixNumber {

    constructor(value) {
      this.value = value;

      this.toInteger();
    }

    isInteger(value) {
      const { floor } = Math;
      
      return floor(value) === value;
    }

    toInteger() {
      let { value, isInteger } = this;

      if(isInteger(value)) {
        return value;
      }

      value     = value.toLocaleString();
      let array = value.split('.');
      const len = array[1].length;

      this.times = Math.pow(10, len);
      this.value *= this.times;
    }
  }

  class Collection {

    constructor() {
      this.cas = document.getElementById('cas');
      this.ctx = this.cas.getContext('2d');
      // this.init();
    }

    init(src) {
      // this.cas.height = 770;
      // this.cas.width  = 400;
      this.loadImage(src);

    }

    onLoad(img) {
      const { cas, ctx } = this;
      this.image = this.image || img;

      let iwidth = this.image.width, iheight = this.image.height;
      let cwidth = cas.width, cheight = 540;
      let scale  = cheight / iheight;

      this.img   = {
        width : scale * iwidth,
        height: scale * iheight,
        scale : scale
      }

      cas.width  = this.img.width;
      cas.height = this.img.height;

      ctx.drawImage(this.image, 0, 0, this.img.width, cheight);

      // this.next();
    }

    loadImage(src) {
      const { onLoad } = this;
      let img = new Image();
      
      img.onload = onLoad.bind(this, img);
      
      img.src = src;
    }

    next() {
      this.copyImage(...arguments);
      this.fillDialog();

      this.fillAppreciate();
    }

    copyImage(startY, endY) {
      const { cas, ctx } = this;

      this.dialog = {
        startY: startY || 239,
        endY  : endY   || this.image.height
      }
      let pixes = ctx.getImageData(0, this.dialog.startY, this.img.width, this.dialog.endY);

      ctx.putImageData(pixes, 0, this.dialog.endY);

    }

    fillDialog() {
      const { cas, ctx, img } = this;
      const { startY, endY }  = this.dialog;
      const shift             = img.height - startY;
      const { width }         = img;
      
      const crd = [calculate(width, 0.17), startY, calculate(width, 0.8), shift];
      this.crd  = [...crd];

      ctx.clearRect(0, startY, width, shift);

      ctx.fillStyle = '#f9f7f9';
      ctx.fillRect(0, startY, width, shift);
      // 描绘三角图标
      ctx.fillStyle = '#efedef';
      ctx.beginPath();
      ctx.moveTo(crd[0] + 10, crd[1]);
      ctx.lineTo(crd[0] + 20, crd[1]);
      ctx.lineTo(crd[0] + 15, crd[1] - 5);
      ctx.closePath();
      ctx.fill();
      // 填充点赞矩形
      ctx.fillStyle = '#efedef';
      ctx.fillRect(...crd);
    }

    fillAppreciate() {
      // 画心形
      let img   = new Image();
      const { ctx, crd } = this;
      const { scale } = this.img;

      img.onload = function() {
        ctx.drawImage(img, crd[0] + 8, crd[1] + 8, img.width * scale, img.height * scale);
      }

      img.src = 'resources/images/heart.png';

      // 写文字
      ctx.font      = '10px Microsoft YaHei';
      ctx.fillStyle = '#637b9d';
      // ctx.fillText('我的名字', crd[0] + 25, crd[1] + 18);
      this.fillText();
    }

    fillText() {
      const { ctx, crd }      = this;
      const { random, floor } = Math;

      let base  = 170,
          total = base + floor(random() * 30);
      
      const people = this.nameDeploy(total);

      for(let i = 0;i < total;i ++) {
        ctx.fillText(people[i].name, people[i].x, people[i].y);
      }
    }

    nameDeploy(length) {
      const { ctx, crd } = this;
      const people  = [];
      let object, initY = 1;

      for(let i = 0;i < length;i ++) {
        object = Object.create({});
        object.name = ChineseName.random() + ', ';
        object.length = ctx.measureText(object.name).width;

        if(people[i - 1]) {
          let prev = people[i - 1];

          object.x = prev.x + prev.length;

          if(prev.minus) {
            object.x -= prev.minus;
          }
        } else if(!people[i - 1]){
          object.x = crd[0] + 25;
        }

        if(object.x > crd[2]) {
          this.explode(object, people[i - 1]);

          object.x = crd[0] + 8;
          initY ++;
        }
        object.y = crd[1] + 18 * initY;
        // console.log(+crd[1] + 18 * initY)
        
        people.push(object);
      }

      return people;
    }

    explode(object, prev) {
      const { ctx, crd } = this;
      let count = -1;

      while(prev.x + ctx.measureText(object.name.slice(0, count)).width > crd[2]) --count;

      if(object.name.slice(count, count + 1).match(/,/g)) {
        count ++;
      }

      // object.minus = ctx.measureText(object.name.slice(0, count)).width;

      prev.name += object.name.slice(0, count);

      let name = object.name.slice(count);
      if(!name) {

        object.name = name;
      }
    }

    reinit() {
      this.onLoad();
    }

  }

  root.col = new Collection();
})(window);