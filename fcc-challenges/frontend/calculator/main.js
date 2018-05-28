// JS for Calculator

$(document).ready(function(){
 
  var inputs = []; //Stores inputs from a user 
  var totalString; //Stores current values
  var operators = ["+","-","/","*"]; //Validation operators
  var result = ""; //String to store results
  
  
  
 // Adds value to the inputs array and starts validating 
  function getValue(input){
// If we've already got the dot and the user adds one more, stop it
    if(inputs[inputs.length - 1] === "." && input === "."){
      return;
    }
// If we've already got the dot and the user adds "+,-,/,*", stop it    
    else if(inputs[inputs.length - 1] === "." && operators.includes(input) === true){
      return;
    }
// If there is nothing in the inputs and in the result, and the user adds "+,-,/,*" || the last character in the inputs is "+,-,/,*" and the user adds "+,-,/,*", stop it.  
    else if(
      (inputs.length === 0 && operators.includes(input) === true && result === "") || (operators.includes(inputs[inputs.length - 1]) === true && operators.includes(input))
    ){
      return;
    }
    
  
   else if(/((\+|\-|\*|\/)\d+)$/g.test(inputs.join("")) === true && input === "."){
     inputs.push(input);
   }
     
 else{
   inputs.push(input);
 }

 update(result);
    
 }
  
  
  
// Updates and displays the results when the user inputs numerals and operators  
  function update(x){
    totalString = inputs.join("");
    $(".display").html(x + totalString);
  }
  
// Caclulates and displays the results 
  function getTotal(){
    totalString = inputs.join("");
    $(".display").html(eval(result + totalString));
    result = $(".display").text();
  }
  
  
  
  
   $(".key").on("click", function() {
// If press the "C" button, clears results and updates it 
    if (this.id === "clear") {
      inputs = [];
      result = "";
      update(result);
// If press the "=" button, performs calculations and clears results      
    } else if (this.id === "equals") {
      getTotal();
      inputs = [];
    }
 // If the user just presses other buttons, it gets values    
     else {
      getValue(this.id);
    }
  });
  
  
  
  
  
  
  
});


// Function to use keyboard to perform calculations

function keyboard(e) {
  var buttonMap = {".": ".", "1": "1", "2": "2", "3": "3", "4": "4", "5": "5", "6": "6", "7": "7", "8": "8", "9": "9", "0": "0", "+": "+", "-": "-", x: "*", "*": "*", "/": "/", Enter: "equals", "=": "equals", Backspace: "clear", Delete: "clear"};
  var id = buttonMap[e.key];
  if (id) document.getElementById(id).click();
}

window.addEventListener("keydown", keyboard);