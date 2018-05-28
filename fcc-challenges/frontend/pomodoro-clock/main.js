// JS for Pomodoro Clock


$(document).ready(function(){
 
// Declare main variables 
  var sessTime;
  var breakTime;
  var counter;
  var startBreak;
 // Variables to store sounds 
  var bell1 = $("#bell1")[0];
  var bell2 = $("#bell2")[0];

// When the page is loaded, hide the stop button
  $("#stop").hide();
  
// Get only numbers from "sessTime" and "breakTime" in the range slider  
  sessTime = parseInt($("#sessTime").html());
  breakTime = parseInt($("#breakTime").html());
  
  
  
////////////////////RANGE SLIDERS///////////////////////
  
// Get value from the range slider
var slider = document.getElementById("sessRange");
var output = document.getElementById("sessTime");
output.innerHTML = slider.value + " min";
// If a user changes the value, display it on the screen
  slider.oninput = function() {
  output.innerHTML = this.value + " min";
// If a user changes session time, get it and assign to "sessTime"      
  sessTime = parseInt($("#sessTime").html());
  }

var slider1 = document.getElementById("breakRange");
var output1 = document.getElementById("breakTime");
output1.innerHTML = slider1.value + " min";

   slider1.oninput = function() {
   output1.innerHTML = this.value + " min";
   breakTime = parseInt($("#breakTime").html());
}

 
  
//////////////////////START BUTTON//////////////////////
    
 $("#start").on("click",function(){
   
// If a user clicked on the start button, disable the range sliders  
  document.getElementById("sessRange").disabled = true;
    document.getElementById("breakRange").disabled = true;
// Hide the start button, show the stop button, prepare "sessTime" and "breakTime" values for converting into minutes and seconds 
   $(this).hide();
   $("#stop").show();
   sessTime*=60;
   breakTime*=60; 
// Run the timer function every second   
   counter = setInterval(timer,1000);
   
   
 //////////////////////TIMER FUNCTION//////////////////////  
   
   function timer(){
// Substract from "sessTime" one     
     sessTime-=1;
     
// Display remaining values of "sessTime" in "remTime"     
     $("#remTime").html(sessTime);
// Converting into minutes and seconds     
     if(sessTime%60>=10){
       $("#remTime").html(Math.floor(sessTime/60)+" : "+sessTime%60);
      }
      else{
        $("#remTime").html(Math.floor(sessTime/60)+" : "+"0"+sessTime%60);
      }
     
// If time is up, change text, clear the interval, play the sound and start "breakTimer" function which will be executed every second     
     if(sessTime === 0){
       $("#time").html("Break");
        clearInterval(counter);
         bell1.play();
          startBreak = setInterval(breakTimer,1000);
       }
     
      
 //////////////////////BREAKTIMER FUNCTION//////////////////////  
     
     function breakTimer(){
       breakTime-=1;
       $("#remTime").html(breakTime);
       
        if(breakTime%60>=10){
       $("#remTime").html(Math.floor(breakTime/60)+" : "+breakTime%60);
      }
      
      else{
   $("#remTime").html(Math.floor(breakTime/60)+" : "+"0"+breakTime%60);
      } 
       
       if(breakTime === 0){
       clearInterval(startBreak);
         
         $("#time").html("Session");
         $("#stop").hide();
         $("#start").show();
         
// Get current values from sessTime and breakTime in range sliders   
    sessTime = parseInt($("#sessTime").html());
    breakTime = parseInt($("#breakTime").html());
// Clear "remTime"         
         document.getElementById("remTime").innerHTML = "";
// Play the sound         
         bell2.play();
         
// Enable range sliders         
         document.getElementById("sessRange").disabled = false;
document.getElementById("breakRange").disabled = false;
         
     }
      }
       }
        }); 
  
  
 //////////////////////STOP BUTTON////////////////////// 
  $("#stop").on("click", function(){
    
// If a user clicked on the stop button, clear the intervals, show the start button, hide the stop button     
    clearInterval(counter);
    clearInterval(breakTime);
    $("#start").show();
    $(this).hide();
// Clear "remTime"   
    document.getElementById("remTime").innerHTML = "";
// Get current values from range sliders
          sessTime = parseInt($("#sessTime").html());
        breakTime = parseInt($("#breakTime").html());
// Enable range sliders    
      document.getElementById("sessRange").disabled = false;
    document.getElementById("breakRange").disabled = false;
    
  });
  
  
 














  });