// This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
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
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
  FB.init({
    appId      : '365847820269945',
    cookie     : true,  // enable cookies to allow the server to access 
                        // the session
    xfbml      : true,  // parse social plugins on this page
    version    : 'v2.2' // use version 2.2
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

  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "http://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('me/posts?fields=id,likes{name},comments{like_count,likes,message}&limit=200', function(response) {
      // console.log('Successful login for: ' + response.name);
      // document.getElementById('status').innerHTML =
      //   'Thanks for logging in, ' + response.name + '!' + response.;
      console.log(response);
      console.log(response.data);


      for(var index in response.data){
        //console.log('post ' + index + ' id:' + response.data[index].id);
        console.log('Post ' + index + ' created on:' + response.data[index].created_time);

        $('<div id="post' + i + '" />').text(

          'Post ' + i + 
          '\n Created on: ' + response.data[index].created_time

        ).appendTo('#posts-container');

        $('<div id="likes' + i + '" />').appendTo('#post' + i);

        if(response.data[index].likes != undefined){
          console.log('    with ' + response.data[index].likes.data.length + ' likes by:');

          $('<div id="likes' + i + '" />').append('with ' + response.data[index].likes.data.length + ' likes by:');

          for(var likesIndex in response.data[index].likes.data){
            console.log('         ' + response.data[index].likes.data[likesIndex].name);
            $('<div id="likes' + i + '" />').append('\n' + response.data[index].likes.data[likesIndex].name);
          }
        }
        else{
          $('<div id="likes' + i + '" />').append('with 0 likes');
        }
      }
      

    });
  }