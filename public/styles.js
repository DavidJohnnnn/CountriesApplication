$(".btn").click( function () {
  let idDiv = $(this).index(".btn"); // Return the index of the button that was pressed

  let currentButton = $(".btn").eq(idDiv);

  currentButton.html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Loading...')
});
