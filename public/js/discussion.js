// $(document).on("submit", "#submit-new-discussion", handleNewDiscussionSubmit);
/*$(document).on("submit", "#submit-new-discussion", handleNewDiscussionSubmit);*/

/*Create Post button on click event*/
$("#submit-new-discussion").on("click",function(){
       event.preventDefault();

      //get the user web token and user id from local storage
      var localToken = localStorage.getItem("token");
      var userId = localStorage.getItem("userId");
      console.log("localstorage userId = " + userId);

      var post = {
        token: localToken,
        title: $("#new-discussion-title").val(),
        discussion: $("#new-discussion").val(),
        userId: userId
      }
      if($("#new-discussion").val() !== ""){

       $.post("/api/posts", post, function(res) {
          
        
        if(!res.success){
          console.log("post res = " + JSON.stringify(res.body));

        }else{

          console.log("post res = " + JSON.stringify(res.body));
        }
       /* window.location.href = "/";*/
      });
    }else{
      $("#new-discussion").focus();
    }

});

// Initialize collapse button
  $(".button-collapse").sideNav({
     edge: 'right'
  });
  // Initialize collapsible (uncomment the line below if you use the dropdown variation)
  $('.collapsible').collapsible();



function getSelectedDiscussion(postedId){

  console.log("postedId = " + postedId);
    if(postedId !== null){
      var postId = {
        postId: postedId
      } 

      console.log("postedId object = " + postId.postId);
       $.get("/api/selectedPost",postId, function(res) {
          $("#selected_discussion-title").val(res.title);
          $("#selected-discussion").val(res.body);
      console.log("get res value = " + JSON.stringify(res.title,null,2));
      

      });
   }
      

}

getSelectedDiscussion(localStorage.getItem("postId"));