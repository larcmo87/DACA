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

var beingDate = new Date();

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
                  "<div class='card  z-depth-4' style='height:375px'>" +                     
                    "<div class='card-image'>" + 
                      "<img src='images/daca" + imageCount + ".jpg' style='height:250px'>" +
                     
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

   /* // Loop through and provide the correct number of articles
    for (var i = 0; i < numArticles; i++) {

      // Add to the Article Counter (to make sure we show the right number)
      articleCounter++;

      // Create the HTML well (section) and add the article content for each
      var wellSection = $("<div>");
      wellSection.addClass("well");
      wellSection.attr("id", "article-well-" + articleCounter);
      $("#well-section").append(wellSection);

      // Confirm that the specific JSON for the article isn't missing any details
      // If the article has a headline include the headline in the HTML
      if (NYTData.response.docs[i].headline !== "null") {
        $("#article-well-" + articleCounter)
          .append(
            "<h3 class='articleHeadline'><span class='label label-primary'>" +
            articleCounter + "</span><strong> " +
            NYTData.response.docs[i].headline.main + "</strong></h3>"
          );

        // Log the first article's headline to console
        console.log(NYTData.response.docs[i].headline.main);
      }

      // If the article has a byline include the headline in the HTML
      if (NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.original) {
        $("#article-well-" + articleCounter)
          .append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");

        // Log the first article's Author to console.
        console.log(NYTData.response.docs[i].byline.original);
      }

      // Then display the remaining fields in the HTML (Section Name, Date, URL)
      $("#articleWell-" + articleCounter)
        .append("<h5>Section: " + NYTData.response.docs[i].section_name + "</h5>");
      $("#articleWell-" + articleCounter)
        .append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");
      $("#articleWell-" + articleCounter)
        .append(
          "<a href='" + NYTData.response.docs[i].web_url + "'>" +
          NYTData.response.docs[i].web_url + "</a>"
        );

      // Log the remaining fields to console as well
      console.log(NYTData.response.docs[i].pub_date);
      console.log(NYTData.response.docs[i].section_name);
      console.log(NYTData.response.docs[i].web_url);
    }
  });*/
 
}

        
runQuery(numArticles, queryURLBase);

/*$(document).ready(function(){
         $('.slider').slider({full_width: true});
        });*/
 
