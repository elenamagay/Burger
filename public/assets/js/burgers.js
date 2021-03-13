$(document).ready(function() {
$(".devourBtn").on("click", function (event) {
    event.preventDefault();
    
    const id = $(this).attr("data-id");
    console.log(id);
    $.ajax( {
      method: "PUT",
      url: "/api/burgers/" + id,
      data: { devoured: 1 }
    }).then(result => {
      console.log(result);
      location.reload()
    });
});


$(".submitBtn").on("click", function (event) {
    event.preventDefault();
   
    const name = $("#burgerName").val().trim();
    const myBurger = {
      burger_name: name,
      devoured: 0
    }
    console.log(name);
    $.ajax( {

      method: "POST",
      url: "/api/burgers",
      data: myBurger
      }).then(result => {
        console.log(result);
        location.reload()
      });
  });
});