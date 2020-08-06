/*
 * @Function: cps浮标组件，可以在可视区域拖拽
 * @Author: lpf
 * @Date: 2020-08-06 11:13:13
 * @Last Modified by: lpf
 * @Last Modified time: 2020-08-06 11:13:56
 */

<template>
  <div class="cpsblock" id="cps" v-show="cpsImg">
    <img :src="cpsImg" alt=""/>
  </div>
</template>

<script>
export default {
  name: 'cps',
  props: {},
  data() {
    return {
      cpsImg: ''
    };
  },
  methods: {
    moveBtn (obj) {
      var self = this;
      obj.addEventListener('touchstart', function(event){
        if (event.touches.length > 0) {
          var X = event.targetTouches[0].pageX;
          var Y = event.targetTouches[0].pageY;
          var disX = X - (document.body.scrollLeft + this.offsetLeft);
          var disY = Y - (document.body.scrollTop + this.offsetTop);
          var btnWidth = this.offsetWidth;
          var btnHeight = this.offsetHeight;
          var domTouchmove = function (event) {
            event.preventDefault();
            var left = event.targetTouches[0].pageX - disX -document.body.scrollLeft;
            var top = event.targetTouches[0].pageY - disY -document.body.scrollTop;
            if (top > document.documentElement.clientHeight - btnHeight) {
              top = document.documentElement.clientHeight - btnHeight;
            }
            if (top < 0 ) { top = 0 };
            if (left > document.documentElement.clientWidth - btnWidth) {
              left = document.documentElement.clientWidth - btnWidth;
            }
            left = left < 0 ? 0 : left;
            this.style.left = left + 'px';
            this.style.top = top + 'px';
          };
          var domTouchend = function (event) {
            var endX = event.changedTouches[0].pageX;
            var endY = event.changedTouches[0].pageY;
            var dis = 5;
            if (Math.abs(endX - X) < dis && Math.abs(endY - Y) < dis) {
              self.cpsClick();
            }
            this.removeEventListener('touchmove', domTouchmove, false);
            this.removeEventListener('touchend', domTouchend, false);
          };
          this.addEventListener('touchmove', domTouchmove, false);
          this.addEventListener('touchend', domTouchend, false);
        }
        event.preventDefault();
      })
    },
    cpsClick () {
      console.log('asdada');
    }
  },
  created: function () {
    if (sessionStorage.cpsImg) {
      this.cpsImg = sessionStorage.cpsImg;
    }
  },
  mounted: function () {
    if ( this.cpsImg ) {
      this.moveBtn(document.getElementById('cps'));
    }
  }
}
</script>

<style lang="scss" scoped>
.cpsblock{
  position: fixed;
  right: 5px;
  top: 8rem;
  width: 1.3rem;
  z-index: 10;
  img{
    width: 100%;
  }
}
</style>