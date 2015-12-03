'use strict';

(function () {

   $("document").ready($.get(window.location.origin + '/api/:id', function (user) {
      $('#login').hide();
      $('#logout').show();
      $('#my-photos').show();
      $('#add-photo').show();
      $(".user-photo").attr("src", user.photo);
   }));
   
    $('#add-photo').click( function () {
        $('#photo-url').val("");
        $('#photo-placeholder').attr("src", "https://www.mikkis.co.uk/themes/responsive/images/placeholder-500.png");
        $('#photo-modal').modal();
        setTimeout(function() { $('#photo-url').focus(); }, 500);
    });
    
    var showPhoto = function () {
        if($('#photo-url').val().length > 0) {
            $('#photo-placeholder').attr("src", $('#photo-url').val());
        }
    };
    $('#photo-url').change(showPhoto);
    $('#photo-url').bind('paste', function() { setTimeout(function() { showPhoto(); }, 100); });
    
    $('#save-photo').click( function () {
        var url = window.location.origin + '/api/photo?url=' + encodeURIComponent($('#photo-url').val());
        $.post(url, function (result) {
            $('#photo-modal').modal('toggle');
        });
    });   

})();