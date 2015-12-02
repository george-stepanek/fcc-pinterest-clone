'use strict';

(function () {
   
   $("document").ready($.get(window.location.origin + '/api/:id', function (user) {
      $('#profile-photo').html("<img src='" + user.photo + "'></img>");
      $('#login').hide();
      $('#logout').show();

   }));
})();