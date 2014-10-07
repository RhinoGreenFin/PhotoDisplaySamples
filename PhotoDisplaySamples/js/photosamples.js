
      // This is called with the results from from FB.getLoginStatus().
      function statusChangeCallback(response) {
          console.log('statusChangeCallback');
          console.log(response);
          // The response object is returned with a status field that lets the
          // app know the current login status of the person.
          // Full docs on the response object can be found in the documentation
          // for FB.getLoginStatus().
          if (response.status === 'connected') {
               
              //Load Images
              loadImageGallery();

              //load slide show
              loadSlideShowImages();
          } else if (response.status === 'not_authorized') {
              // The person is logged into Facebook, but not your app.
              document.getElementById('status').innerHTML = 'Please log ' +
                'into this app.';
          } else {
              // The person is not logged into Facebook, so we're not sure if
              // they are logged into this app or not.
              document.getElementById('status').innerHTML = 'Please log ' +
                'into Facebook.';
          }
      }

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function () {
    FB.init({
        //AP - To secure this. I would put it in the Webconfig.
        //http://billpatrianakos.me/blog/2013/09/12/securing-api-keys-in-a-client-side-javascript-app/
        appId: '',
        cookie: true,  // enable cookies to allow the server to access
        // the session
        xfbml: true,  // parse social plugins on this page
        version: 'v2.1' // use version 2.1
    });

    // Now that we've initialized the JavaScript SDK, we call
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });

};

// Load the SDK asynchronously
(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


//******************AP load Image Gallery Image data..************* */
function loadImageGallery(){
    FB.api('/me/photos', function (response) {
               
        //loading Json Data and loop through for images.
        var pictures = response.data;

        //create one call of container
        var $container = $('#photogallery');

        //since where going to have 20 images. 
        // I will split it up to 5 images each row to start. Creating 4 rows. 

        //Then added media quieries 
        for (var i = 0; i < 20; i++) {

            var photo = pictures[i];                  
                   
            $container.append(' <div  class="img" data-source="' + photo.source + '" style="background-image:url(' + photo.source + ');" ></div>');
        }
    });
}

//AP sample event click to display image on page. 
$('#photogallery').on("click", 'div', function (event) {

    event.stopPropagation();
    var self = this;
    //set the image to the location of current page. 
    window.location = $(self).attr('data-source');
});
/*END*/

/******************SLIDE SHOW DATA  ***************/
//AP load slide show data
function loadSlideShowImages() {
    FB.api('/me/photos', function (response) {

        //loading Json Data and loop through for images.
        var pictures = response.data;

        //create one call of container
        var $container = $('#imageshow');

        for (var i = 0; i <= 4; i++) {

            var photo = pictures[i];

            var active = i == 0 ? 'activeImage' : '';
            $container.append(' <img src=' + photo.source + ' class="' + active + ' slideImage"> ');
        }
    });
}

function runImageShow() {

    //get all images
    var $images = $('div#imageshow IMG');

    //get current active image
    var $active = $('div#imageshow IMG.activeImage');

    //next grabs the immediate sibling inside the  container.
    var $next = $active.next();

    //check to see if we need to start loop over.
    $next = $next.length == 0 ? $images.first() : $next;

    // make this active image
    $next.addClass('activeImage');

    //remove the current active image
    $active.removeClass('activeImage');
}

//this calls the method on load.
//Calls it every 3 seconds.
$(function () {
    setInterval("runImageShow()", 3000);
});

/*END*/