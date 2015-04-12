var likesPerPost = [];
var likesPerUser = [];


//Converts fb created_time to human understandable time ago
function timeAgo(time){
var date = new Date((time || "").replace(/-/g,"/").replace(/[TZ]/g," ")),
  diff = (((new Date()).getTime() - date.getTime()) / 1000),
  day_diff = Math.floor(diff / 86400);

  if ( isNaN(day_diff) || day_diff < 0 || day_diff >= 31 )
    return;

  return day_diff == 0 && (
    diff < 60 && "just now" ||
    diff < 120 && "1 minute ago" ||
    diff < 3600 && Math.floor( diff / 60 ) + " minutes ago" ||
    diff < 7200 && "1 hour ago" ||
    diff < 86400 && Math.floor( diff / 3600 ) + " hours ago") ||
    day_diff == 1 && "Yesterday" ||
    day_diff < 7 && day_diff + " days ago" ||
    day_diff < 31 && Math.ceil( day_diff / 7 ) + " weeks ago";
}

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

  $('#index-banner').hide();

  FB.api('me/?fields=name', function(response) {
    $('<h1>' + response.name + '</h1>').appendTo('#user-info');
  });

  FB.api('me/picture?type=large&redirect=false', function(response) {
    $('<img src="' + response.data[1] + '" class="profile-picture">').appendTo('#user-info');
  });

  FB.api('me/posts?fields=id,likes{name},comments{like_count,likes,message},message,story&limit=200', function(response) {
     //console.log('Successful login for: ' + response.name);
     document.getElementById('status').innerHTML =
       'Thanks for logging in!';
    //document.getElementsByTagName('fb:login-button').style.visibility = "hidden";
    console.log(response);
    console.log(response.data);


    for(var index in response.data){
      //console.log('post ' + index + ' id:' + response.data[index].id);
      console.log('Post ' + index + ' created on:' + response.data[index].created_time);

      $('<li id="post' + index + '" ></li>').appendTo('#posts-container');

      //$('<span class="card-title"> Post '+ index + ' Created on: ' + response.data[index].created_time + '</span>').appendTo('#post' + index);

      if(response.data[index].message == undefined) {
        $('<div class="collapsible-header" id="post' + index + 'header">' + response.data[index].story + '</div>').appendTo('#post' + index);
      }
      else {
        $('<div class="collapsible-header id="post' + index + 'header">' + response.data[index].message + '</div>').appendTo('#post' + index);
      }

      $('<div class="collapsible-body" id="likes' + index + '"></div>').appendTo('#post' + index);



      var node = new Object;
      node['x'] = index;
      node['y'] = 0;

      if(response.data[index].likes != undefined){
        console.log('    with ' + response.data[index].likes.data.length + ' likes by:');

        node['y'] = response.data[index].likes.data.length;

        $('#post' + index + 'header').append(response.data[index].likes.data.length + 'likes');

        for(var likesIndex in response.data[index].likes.data){
          console.log('         ' + response.data[index].likes.data[likesIndex].name);
          $('#likes' + index).append('<br>' + response.data[index].likes.data[likesIndex].name);

          var userExists = false;

          for(var lfIndex in likesPerUser){
            if(likesPerUser[lfIndex].name == response.data[index].likes.data[likesIndex].name){
              likesPerUser[lfIndex].likes++;
              userExists = true;
            }
          }

          if(userExists == false){
            var user = new Object;
            user['name'] = response.data[index].likes.data[likesIndex].name;
            user['likes'] = 1;

            likesPerUser.push(user);
          }

        }
      }
      else{
        $('#post' + index + 'header').append(' 0 likes');
      }

      console.log('node: ' + node);
      likesPerPost.push(node);
    }
    
    console.log(likesPerPost);
    graphLine(likesPerPost);

    likesPerUser.sort(function(a,b){return b.likes - a.likes});
    console.log(likesPerUser);
    graphBar(likesPerUser.slice(0,12));
  });
}

