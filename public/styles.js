$(".btn").click( function () {
  let idDiv = $(this).index(".btn"); // Return the index of the button that was pressed

  let currentButton = $(".btn").eq(idDiv);

  currentButton.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...')
});

$(".plusBox").click( function () {
  let idDiv = $(this).index(".plusBox"); // Return the index of the button that was pressed

  let plusDiv = $(".plusBox").eq(idDiv);
  let minusDiv = $(".minusBox").eq(idDiv);
  console.log(plusDiv.text());
  console.log(minusDiv.text());


  plusDiv.removeClass("cardThere").addClass("cardGone");
  minusDiv.removeClass("cardGone").addClass("cardThere");
});

$(".minusBox").click( function () {
  let idDiv = $(this).index(".minusBox"); // Return the index of the button that was pressed

  let plusDiv = $(".plusBox").eq(idDiv);
  let minusDiv = $(".minusBox").eq(idDiv);

  minusDiv.removeClass("cardThere").addClass("cardGone");
  plusDiv.removeClass("cardGone").addClass("cardThere");

});
