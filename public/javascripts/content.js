function notebook(book, i) {
  //console.log(i);
  if (i === 0) {
    $(".nav-tabs").append(
      "<li role='presentation' class='active' id='" + book._id +
      "'><a href='#' class='notebook' onclick='active_tab(\"#" + book
      ._id +
      "\")'>" +
      book.name + "</a></li>"
    );
  } else {
    $(".nav-tabs").append(
      "<li role='presentation' class='' id='" + book._id +
      "'><a href='#' class='notebook' onclick='active_tab(\"#" + book
      ._id +
      "\")'>" +
      book.name + "</a></li>"
    );
  }
}


$("li").on('click', function() {
  id = $(this).id;
  console.log("Client.....");
  $.ajax({
    type: 'GET',
    url: '/notebook/' + id,
    success: function(articles) {
      $.each(articles, function(i, article) {
        console.log(article);
      });
    },
    error: function() {
      alert('Error loading orders');
    }
  });
});
