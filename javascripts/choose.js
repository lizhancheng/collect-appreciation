(() => {

  function getImage(dataUrl) {

    function base64Img2Blob(code){
      var parts = code.split(';base64,');
      var contentType = parts[0].split(':')[1];
      var raw = window.atob(parts[1]);
      var rawLength = raw.length;
      var uInt8Array = new Uint8Array(rawLength);

      for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }

      return new Blob([uInt8Array], {type: contentType}); 
    }

    const $aLink = document.createElement('a');
    let blob     = base64Img2Blob(dataUrl);
    let evt      = document.createEvent('HTMLEvents');

    evt.initEvent('click', false, false);

    $aLink.setAttribute('download', `${(+new Date).toString(16)}.png`);
    $aLink.setAttribute('href', URL.createObjectURL(blob));

    $aLink.dispatchEvent(evt);
  }

  const bindTouch = () => {
    let $body = document.body;
    let $wrapper = $body.querySelector('.ui-wrapper');
    let $modal = $body.querySelector('.ui-modal');
    let $upload = $body.querySelector('#userfile');

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
      e.stopPropagation();

      col.reinit();
      col.next(e.changedTouches[0].pageY - e.target.offsetTop);
    });


    let time = {};
    $wrapper.addEventListener('touchstart', (e) => {
      time.start = +new Date;
    });

    $wrapper.addEventListener('touchend', (e) => {
      time.end = +new Date;

      if(time.end - time.start >= 1500) {
        $modal.classList.remove('hidden');
      }
    });

    $modal.addEventListener('click', (e) => {
      const className = e.target.className;

      switch(className) {
        case 'upload-repeat':
          $upload.click();
          break;
        case 'save-image':
          getImage(cas.toDataURL('image/png'));
          break;
        default:
          $modal.classList.add('hidden');
      }
    });
  }

  window.addEventListener('DOMContentLoaded', bindTouch, false);
})();
