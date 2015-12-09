'use strict';

var PhotosGrid = React.createClass({
  render: function() {
    var user_link = function(photo) {
        if( $('#my-photos').hasClass("active") ) {
            return(
                <button className="btn remove-photo" id={photo._id}>
                    <i className="fa fa-times"></i> Remove
                </button>
            );
        } else { 
            return(
                <a href="#">
                    <img className="specific-user" id={photo.user.id} title={photo.user.displayName} src={photo.user.photo}></img>
                </a>
            );
        }
    }
    
    var grid_items = this.props.photos.map(function(photo) {
      return (
        <div className="grid-item">
            <a target = "_blank" href={photo.url}>
                <img className="small-photo" src={photo.url}></img>
            </a>
            {user_link(photo)}
        </div>
      );
    });
    
    return (
      <div className="grid">
        <div className="grid-sizer"></div>
        {grid_items}
      </div>
    );
  }
});

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
        ReactDOM.render(
            <PhotosGrid photos={photos} />,
            document.getElementById('grid-holder')
        );

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
