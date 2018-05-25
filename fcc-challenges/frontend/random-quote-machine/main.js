// Declare variables to store quotations, authors and colors

var quotes = ["It does not matter how slowly you go as long as you do not stop." , "I hear and I forget. I see and I remember. I do and I understand." , "Quality is not an act, it is a habit." , "A friend to all is a friend to none."];

var famous = ["Confucius", "Aristotle"];
var colors = ["#00BFFF", "#FA6900", "#588C73", "#00CCD6"];
      

// Triggers button to fetch new quote

var btn = document.getElementById("newQuote");
btn.addEventListener("click", function(){
   
// Gets random quote and colors
  
  var randomNumber = Math.floor(Math.random() * (quotes.length));
  var m = quotes[randomNumber];
  var randomColor = Math.floor(Math.random() * (colors.length));
  var n = colors[randomColor];
  
  
  
// Conditions to select authors
  
  if(randomNumber < 2){
    document.getElementById("quoteDisplay").innerHTML = m;
    document.getElementById("manDisplay").innerHTML = famous[0];
    document.getElementById("twitterShare").href="https://twitter.com/intent/tweet/?text="  + m + " — " + famous[0];
    }
  else {
    document.getElementById("quoteDisplay").innerHTML = m;
    document.getElementById("manDisplay").innerHTML = famous[1];
    
 // Share button
    document.getElementById("twitterShare").href="https://twitter.com/intent/tweet/?text=" + m + " — " + famous[1];
  }
  
               
// Changing colors  
 $("#quoteDisplay, #manDisplay").animate({color: n}, 1000);
 $("#share, #newQuote, body").animate({backgroundColor:n}, 1000);

  
                
 
  
  
  
  
  
});
