/**
 * requirejs config
 */
 requirejs.config({
   baseUrl: './resources/libs',
   paths: {
     vconsole: 'vconsole/vconsole.min',
     uri     : 'urijs/URI.min'
   }
 });

(() => {

 const uri = URI(location.href);
 if(uri.hasQuery('debug')) {

   require(['vconsole']);
 }
})()