// JS for Twitch TV 

$(document).ready(function () {

  // Stores channels names
  var users1 = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

  // Loops through all channels to fetch the data
  for (var i = 0; i < users1.length; i++) {
    ajax1(users1[i]);
  }

  // Gets the data for all channels
  function ajax1(user1) {
    $.ajax({
      url: "https://api.twitch.tv/helix/search/channels/" + user1,
      type: "GET",
      async: false,
      headers: {
        'Client-ID': 'c5m7bh23wta20firvrtyrmamue346y'
      },
      success: function (data1) {
        var displayName = data1.display_name;
        var logo = data1.logo;
        var status = data1.status;
        var url = data1.url;

        // Creates a new div for every channel online

        $("#channels").prepend(
          "<div class='wrap'>" +

          "<a href='" +

          url +

          "' target='_blank'>" +

          "<div>" +

          "<img class='logo' src=" +

          logo +

          " alt='alt' /></div>" +

          "<p class='text-center'>" + displayName +
          "</p>" +

          "<p style='margin-top:20px;' class='on" +

          user1 +

          "'><span class='statOn'><i class='fa fa-microphone'></i> </span>&nbsp;" +

          status +

          "</p></div>" +

          "</a>"


        );
      },
      // If a channel is closed,the error function'll let users know about it     
      error: function () {

        $("#channels").prepend("<div class='wrap'>" + "<img src='http://res.cloudinary.com/dwxepusiu/image/upload/v1523503494/closed-sign_utrm1x.png' style='width:200px;height:130px'/>" + "<p class='off'></p>" + "<p class='text-center'>" + this.url.substr(this.url.lastIndexOf("/") + 1).charAt(0).toUpperCase() + this.url.substr(this.url.lastIndexOf("/") + 1).slice(1) + "</p></div>");

      }

    });
  }

  // Stores channels names for the second ajax

  var users2 = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
  // Loops through all streams for data again
  for (var i = 0; i < users2.length; i++) {
    ajax2(users2[i]);
  }
  // One more ajax request to find out which channels are currently offline 
  function ajax2(user2) {
    $.ajax({
      url: "https://wind-bow.glitch.me/twitch-api/streams/" + user2,
      type: "GET",
      async: false,
      success: function (data2) {
        // Create new div for every channel offline       
        if (data2.stream === null) {
          $(".on" + user2).replaceWith("<p style='margin-top:20px;' class='off text-center'><span class='statOff'><i class='fa fa-microphone-slash'></i></span>&nbsp; Offline</p>");

        }
      }
    });
  }

  // Clicking on any of the navigation buttons shows the streams  corresponding
  // Toggle between all, online, and off streams upon click 
  
  $("#all").on("click", function () {
    $(".wrap").each(function () {
      $(".off").parentsUntil("#channels").show();
      $("p:has(span)").parentsUntil("#channels").show();
    });
  });

  $("#online").on("click", function () {
    $(".wrap").each(function () {
      $(".off").parentsUntil("#channels").hide();
      $("p:has(span.statOn)").parentsUntil("#channels").show();
    });
  });

  $("#offline").on("click", function () {
    $(".wrap").each(function () {
      $(".off").parentsUntil("#channels").show();
      $("p:has(span.statOn)").parentsUntil("#channels").hide();
    });
  });

});

$(window).on("load", function () {
  $(".loader_inner").fadeOut();
  $(".loader").delay(400).fadeOut("slow");
});
