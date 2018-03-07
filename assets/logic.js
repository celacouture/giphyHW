
var middleEarth=["Bilbo Baggins", "Legolas", "Boromir", "Gandalf","Thranduil","Thorin", "Dwalin"];

$(this).on("click", function(){

  var character=$(this).attr("data-search");

  console.log(character);
   var queryURL="https://api.giphy.com/v1/gifs/search?q="+character+"&api_key=Rb2Nqo10mYqon3hZCOBgm8jm3uvLugCJ&limit=10&offset=0&rating=PG&lang=en";

   console.log(queryURL);

   $.ajax({
     url:queryURL,
     method:"GET"
   }).then(function(response){
      console.log(response);

   });

})


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
});


renderButtons();
