// JS for Local Weather App

$(document).ready(function () {


  // Request IP address from user to get location and store coordinates

  $.getJSON("https://ipapi.co/json", function (data2) {
    var latitude = data2.latitude;
    var longitude = data2.longitude;
    var api = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=ba44537daee87ffd41cd4424dbd1b30d";


    // Get weather information

    $.getJSON(api, function (data) {
      var tempSwap = true;
      var tempSwap1 = true;
      var city = data.name;
      var country = data.sys.country;
      var weatherDescription = data.weather[0].description;
      var weather = data.weather[0].main;

      // Store temperatures (celsius and fahrenheit)
      var kTemp = data.main.temp;
      var fTemp = ((kTemp * 9 / 5) - 459.67).toFixed(1);
      var cTemp = ((fTemp - 32) * 5 / 9).toFixed(1);
      var windSpeed = data.wind.speed;


      // Insert weather information into HTML

      $("#city").html(city + "," + country);
      $("#weatherDescription").html(weatherDescription);
      $("#fTemp").html(cTemp + "<span class='tempIcon'> &#8451;</span>");
      $("#fTemp").click(function () {
        if (tempSwap === false) {
          $("#fTemp").html(fTemp + "<span class='tempIcon'> &#8457;</span>");
          tempSwap = true;
        } else {
          $("#fTemp").html(cTemp + "<span class='tempIcon'> &#8451;</span>");
          tempSwap = false;
        }
      });


      // Displaying wind speed (mps and mph)   
      windSpeed = (2.237 * windSpeed).toFixed(1);
      var mps = (windSpeed / 2.24).toFixed(1);
      $("#windSpeed").html(mps + "<span class='windIcon'> m/s</span>");
      $("#windSpeed").click(function () {
        if (tempSwap1 === false) {
          $("#windSpeed").html(mps + "<span class='windIcon'> m/s</span>");
          tempSwap1 = true;
        } else {
          $("#windSpeed").html(windSpeed + "<span class='windIcon'> mph</span>");
          tempSwap1 = false;
        }

      });


      // Change icon depending on weather conditions      

      $("#desc").text(weather);
      IconGen(weather);

      function IconGen(desc) {
        var desc = desc.toLowerCase()
        switch (desc) {
          case 'drizzle':
            addIcon(desc)
            break;
          case 'clouds':
            addIcon(desc)
            break;
          case 'rain':
            addIcon(desc)
            break;
          case 'snow':
            addIcon(desc)
            break;
          case 'clear':
            addIcon(desc)
            break;
          case 'thunderstom':
            addIcon(desc)
            break;
          default:
            $('div.clouds').removeClass('hide');
        }
      }

      function addIcon(desc) {
        $('div.' + desc).removeClass('hide');
        $("#desc").text(weather).hide();
      }

    });
  });

});