
var middleEarth=["Bilbo Baggins", "Legolas", "Boromir", "Gandalf","Thranduil","Thorin", "Smaug"];

function getGifs(){

  var character=$(this).attr("data-search");

  console.log(character);
   var queryURL="https://api.giphy.com/v1/gifs/search?q="+character+"&api_key=Rb2Nqo10mYqon3hZCOBgm8jm3uvLugCJ&limit=10&offset=0&rating=PG&lang=en";

   console.log(queryURL);

   $.ajax({
     url:queryURL,
     method:"GET"
   }).then(function(response){
      console.log(response);
      $(".gif-holder").empty();

      var results=response.data;

      for (var i=0; i< results.length; i++){
        var gifDiv=$("<div class='item'>");
        var rating=results[i].rating;
        var p=$("<p class='rated'>").text("Rated: "+rating);


        var gifImage=$("<img>");
        gifImage.attr("src", results[i].images.fixed_height_still.url);
        gifImage.attr("data-still", results[i].images.fixed_height_still.url);
        gifImage.attr("data-animate",results[i].images.fixed_height.url)
        gifImage.attr("data-state", "still");
        gifImage.attr("class", "gif");
        gifDiv.append(gifImage);
        gifDiv.append(p);

        $(".gif-holder").prepend(gifDiv);

        // function animateGif(){
        //   $(".gif").on('click', function(){
        //
        //       var state=$(this).attr("src", results[i].images.fixed_height.url);
        //
        //
        //     // gifImage.attr("src", results[i].images.fixed_height.url);
        //
        //   })
        // }
      }



   });

}

function animateGifs() {

            var state = $(this).attr("data-state");
            var animateImage = $(this).attr("data-animate");
            var stillImage = $(this).attr("data-still");

            if(state === "still") {
                $(this).attr("src", animateImage);
                $(this).attr("data-state", "animate");
            }

            else if(state === "animate") {
                $(this).attr("src", stillImage);
                $(this).attr("data-state", "still");
            }
        }



function renderButtons(){
  $(".button-holder").empty();

  for(var i=0; i<middleEarth.length; i++){

    var characterBtn=$("<button class='character'>");
    characterBtn.attr("data-search", middleEarth[i]);
    characterBtn.text(middleEarth[i]);
    $(".button-holder").append(characterBtn);
  }
}

$(".addNewButton").on('click', function(event){
  event.preventDefault();

  var newCharacter=$("#newDweller").val().trim();

  middleEarth.push(newCharacter);
  renderButtons();
  $(".form-control").val('');
});

 $(document).on("click", ".character", getGifs);
 $(document).on("click", ".gif", animateGifs);
renderButtons();
