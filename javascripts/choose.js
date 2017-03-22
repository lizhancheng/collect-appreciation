(() => {


  const bindTouch = () => {
    let $body = document.body;
    let cas = document.getElementById('cas');
    const [ width, height ] = [ `${cas.width}px`, `${cas.height}px` ];

    const mask = (() => {
      let instance;

      function init() {
        let $body = document.body;
        let $mask = document.createElement('div');
        
        $mask.className = 'ui-mask';
        Object.assign($mask.style, { width, height });

        return {
          show() {
            $body.appendChild($mask);
          },

          hide() {
            $body.removeChild($mask);
          }
        }
      }

      return {
        get() {

          if(!instance) {
            instance = init();
          }

          return instance;
        }
      }
    })()

    cas.addEventListener('touchend', (e) => {
      // mask.get().show();
      col.reinit();
      col.next(e.changedTouches[0].pageY - e.target.offsetTop);
    });

  }

  window.addEventListener('DOMContentLoaded', bindTouch, false);
})();