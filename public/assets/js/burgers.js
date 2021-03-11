$(function() {

$(".devourBtn").on("click", event => {
    event.preventDefault();

    const id = $(this).data("id");
    let nDevoured = $(this).data("nDevoured");
    console.log(nDevoured);
    let devoured = {
      devoured: true
    };

    $.ajax(("/api/burgers/" + id, {
      type: "PUT",
      data: devoured
    }).then(() => location.reload()));
});


$(".submitBtn").on("click", event => {
    event.preventDefault();
  
    const name = $("#burgerName").val().trim();
  
    $.ajax("/api/burgers", {

      type: "POST",
      data: name
      })
      .then(() => location.reload());
  });

});