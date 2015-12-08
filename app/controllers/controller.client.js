'use strict';

(function () {
    
    $('#photo-url').keypress(function(e){
        if(e.keyCode == 13) { 
            $('#save-photo').click(); 
        }
    });
    
    $("document").ready(function () {
        $.get(window.location.origin + '/api/:id', function (user) {
            $('#login').hide();
            $('#fb-login').hide();
            $('#logout').show();
            $('#my-photos').show();
            $('#add-photo').show();
            $(".user-photo").attr("src", user.photo);
        });

        // recommended fix for facebook authentication bug
        if (window.location.hash && window.location.hash === "#_=_") {
            if (window.history && window.history.pushState) {
                window.history.pushState("", document.title, window.location.pathname);
            } else {
                location.hash = "";
            }
        }        
        
        setTimeout(function() { $('#recent-photos').click(); }, 200);
    });

    function initialiseMode (menu) {
        $("li").removeClass("active");
        $(menu).addClass("active");
    }
    
    function displayPhotos (photos) {
        $('.grid-holder').empty();
        $('.grid-holder').append('<div class="grid"><div class="grid-sizer"></div></div>');
        for(var i = photos.length - 1; i >= 0; i--) {
            var gridItem = '<div class="grid-item"><a href="' + photos[i].url + 
                '" target = "_blank"><img class="small-photo" src="' + photos[i].url + '"></img></a>';
            
            if( $('#my-photos').hasClass("active") ) {
                gridItem += '<button class="btn remove-photo" id="' + photos[i]._id + '"><i class="fa fa-times"></i> Remove</button>';
            } else { 
                gridItem += '<a href="#"><img class="specific-user" id="' + photos[i].user.id + '" title="' + 
                    photos[i].user.displayName + '" src="' + photos[i].user.photo + '"></img></a>';
            }
            $('.grid').append(gridItem + '</div>');
        }

        $('.specific-user').click( function () {
            $("li").removeClass("active");
            $.get(window.location.origin + '/api/photo/user/' + this.id, function (results) { displayPhotos(results); });            
        });
        
        $('.remove-photo').click( function () {
            var url = window.location.origin + '/api/photo/my?photoid=' + this.id;
            $.ajax({url: url, type: 'DELETE', success: function (results) { 
                $('#my-photos').click();
            }});            
        });
        
        var $grid = $('.grid').masonry({
            itemSelector: '.grid-item',
            percentPosition: true,
            columnWidth: '.grid-sizer',
            gutter: 10
        });
        $grid.imagesLoaded().progress( function() {
            $grid.masonry();
        });         
    }

    $('#recent-photos').click( function () {
        initialiseMode(this);
        $.get(window.location.origin + '/api/photo/all', function (results) { displayPhotos(results); });
    });

    $('#my-photos').click( function () {
        initialiseMode(this);
        $.get(window.location.origin + '/api/photo/my', function (results) { displayPhotos(results); });
    });
   
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
        var url = window.location.origin + '/api/photo/my?url=' + encodeURIComponent($('#photo-url').val().replace(/["'><]/g, ''));
        $.post(url, function (result) {
            $('#photo-modal').modal('toggle');
            $('.active').click();
        });
    });
})();

var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentList">
        &nbsp;
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);