// JS for Wikipedia Viewer 

$(document).ready(function () {

  // Opens random article

  $("#random").on("click", function () {
    window.open("https://en.wikipedia.org/wiki/Special:Random");
  });

  // Clears the input field

  $("#searchclear").on("click", function () {
    $("#searchinput").val(" ");
  });

  // Gets data from Wikipedia
  $("#magnifier").click(function () {

    var searchTerm = $("#searchinput").val();
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + searchTerm + "&format=json&callback=?";

    $.ajax({
      type: "GET",
      url: url,
      async: false,
      dataType: "json",
      success: function (data) {
        $("#output").html("");
        for (var i = 0; i < data[1].length; i++) {
          $("#output").prepend("<li><a href=" + data[3][i] + ">" + data[1][i] + "</a><p>" + data[2][i] + "</p></li>");
        }
        $("#searchinput").val("");
      },

      error: function (errorMessage) {
        alert("Error");
      }
    });

  });

  // Enter button 
  $("#searchinput").keypress(function (e) {
    if (e.which == 13) {
      $("#magnifier").click();
    }
  });

});