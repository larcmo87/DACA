// SETUP VARIABLES
// ==========================================================

// This variable will be pre-programmed with our authentication key
// (the one we received when we registered)
var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

// These variables will hold the results we get from the user's inputs via HTML
var searchTerm = "";
var numResults = 0;
var startYear = 0;
var endYear = 0;
var numArticles = 10;
var alreadyLoggedIn = false;

var beingDate = new Date();

var newUserId = $("#new-user-id");
  var newPassword = $("#new-password");

  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  var url = window.location.search;
  var postId;
  
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In '?post_id=1', postId is 1
  if (url.indexOf("?post_id=") !== -1) {
    postId = url.split("=")[1];
    getPostData(postId, "post");
  }

beingDate = moment(beingDate).format("YYYYMMDD");

console.log("beginDate" + moment(beingDate).format("YYYYMMDD"));

// queryURLBase is the start of our API endpoint. The searchTerm will be appended to this when
// the user hits the search button

// var  queryURLBase = "https://newsapi.org/v1/articles?source=cnn&articles=DACA&apiKey=" + authKey;
var queryURLBase ="https://api.nytimes.com/svc/search/v2/articlesearch.json";
queryURLBase += '?' + $.param({
  'api-key': authKey,
  'q': "DACA",
  'page': 0
  // 'begin_date': beingDate
});

/*var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  authKey + "&q=" + "DACA";
*/

 
// Counter to keep track of article numbers as they come in
var articleCounter = 0;

// FUNCTIONS
// ==========================================================

// This runQuery function expects two parameters:
// (the number of articles to show and the final URL to download data from)
function runQuery(numArticles, queryURLBase) {

  // The AJAX function uses the queryURL and GETS the JSON data associated with it.
  // The data then gets stored in the variable called: "NYTData"

  $.ajax({
    url: queryURLBase,
    method: "GET"
  }).done(function(NYTData) {

    // Logging the URL so we have access to it for troubleshooting
    console.log("------------------------------------");
    console.log("URL: " + queryURLBase);
    console.log("------------------------------------");

    // Log the NYTData to console, where it will show up as an object
    console.log(NYTData);

    console.log(JSON.stringify(numArticles));
    console.log("------------------------------------");

    console.log("HeadLine = " + NYTData.response.docs[0].headline.main);

    for(var i = 0; i < NYTData.response.docs.length; i++){
        // var imageSource = "https://www.nytimes.com/" + NYTData.response.docs[i].multimedia[0].url;
        var imageCount = i + 1;
      console.log(i);
      $('.slides').append(
        "<li>" + 
          "<a href='" + NYTData.response.docs[i].web_url + "' style='text-decoration:none;color:black'>" +
            "<div class='row' style='height:100%'>" +
                "<div class='col s12 m6'>" +
                  "<div class='card  z-depth-4' style='height:390px'>" +                     
                    "<div class='card-image'>" + 
                      "<img src='images/daca" + imageCount + ".jpg' class='responsive-img' style='height:250px'>" +
                     
                    "</div>" +
                    "<div class='card-content'>" +
                       "<span class='card-title'>" + NYTData.response.docs[i].headline.main + "</span>" +
                      "<p>" + NYTData.response.docs[i].snippet + "</p>" +
                    "</div>" +
                  "</div>" +
               "</div>" + 
            "</div>" +
          "</a>" + 
        "</li>");        
    }


         $('.slider').slider({full_width: true});
        
  });

 
}

$(document).on("submit", "#new-user-form", handleNewUserFormSubmit);

/*Create Post button on click event*/
$("#post-btn").on("click",function(){
   var sessionValue = sessionStorage.getItem("LoggedIn");
   console.log("post btn clicked. sessionValue = "+ sessionValue);

        if(sessionValue){
          console.log("sesion Open");
        }else{
          console.log("session closed");
          $("#loggin-form").css("display", "inline-block");
        }
/*
  if(alreadyLoggedIn){
    window.location.href = "/post";
  }else{
   window.location.href = "/login";
  }*/
  

});

// Initialize collapse button
  $(".button-collapse").sideNav({
     edge: 'right'
  });
  // Initialize collapsible (uncomment the line below if you use the dropdown variation)
  $('.collapsible').collapsible();

// $("#new-btn").on("submit",function(){
//   handleFormSubmit(post);

// });

 // A function for handling what happens when the form to create a new post is submitted
  function handleNewUserFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body, title, or author
    if (!$("#new-user-id").val().trim()){
      
      $("#new-user-id").focus();
      return Materialize.toast('User Id field is required', 3000, 'rounded');
      
    }

    if(!$("#new-password").val().trim()) {
      $("#new-password").focus();
      return Materialize.toast('Password field is required', 3000, 'rounded');

    }
    // Constructing a newPost object to hand to the database
    var newUser = {
      userId: newUserId
        .val()
        .trim(),
      userPW: newPassword
        .val()
        .trim()
    };

    // If we're updating a post run updatePost to update a post
    // Otherwise run submitPost to create a whole new post
    if (updating) {
      newPost.id = postId;
      updatePost(newPost);
    }
    else {
      // Clear sessionStorage
      sessionStorage.clear();

      // Store clients logged is "true" into sessionStorage.
      //This will keep the user logged in as long as their session is open
      sessionStorage.setItem("LoggedIn", true);
      submitNewUser(newUser);
    }
  }

  // Submits a new post and brings user to blog page upon completion
  function submitNewUser(post) {
    $.post("/api/users", post, function() {
      window.location.href = "/";
    });
  }


  /*$("#post-btn").on("click", function(){
        var sessionValue = sessionStorage.getItem("LoggedIn");

        if(sessionValue){
          console.log("sesion Open");
        }else{
          console.log("session closed");
        }

  });*/
        
runQuery(numArticles, queryURLBase);

/*$(document).ready(function(){
         $('.slider').slider({full_width: true});
        });*/
 
