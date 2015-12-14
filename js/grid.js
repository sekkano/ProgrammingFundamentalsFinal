/* This will create a grid on the screen
using "." as markers for each spot.
Created on 12.8.2015.
Current Issues: N/A!
*/


var App = {};

App.barrier  = [0,0];
App.location = [0,0];

App.grid = [
           ["@","#",".",".",".",".",".",".",".",".",".",".",".",".","."], //0
           [".",".",".",".",".",".",".",".",".",".",".",".",".",".","."], //1
           [".",".",".",".",".",".",".",".",".",".",".",".",".",".","."], //2
           [".",".",".",".",".",".",".",".",".",".",".",".",".",".","."], //3
           [".",".",".",".",".",".",".",".",".",".",".",".",".",".","."], //4
           [".",".",".",".",".",".",".",".",".",".",".",".",".",".","."], //5
           [".",".",".",".",".",".",".",".",".",".",".",".",".",".","."], //6
           [".",".",".",".",".",".",".",".",".",".",".",".",".",".","."], //7
           [".",".",".",".",".",".",".",".",".",".",".",".",".",".","."], //8
           [".",".",".",".",".",".",".",".",".",".",".",".",".",".","."], //9
           [".",".",".",".",".",".",".",".",".",".",".",".",".",".","."], //10
           [".",".",".",".",".",".",".",".",".",".",".",".",".",".","."], //11
           [".",".",".",".",".",".",".",".",".",".",".",".",".",".","."], //12
           [".",".",".",".",".",".",".",".",".",".",".",".",".",".","."], //13
           [".",".",".",".",".",".",".",".",".",".",".",".",".",".","."]  //14
           ];


function render(){
  var output = "";
  for (var x = 0; x < App.grid.length; x++){
      output += ("\n");
    for (var y = 0; y < App.grid.length; y++){
      output += (App.grid[x][y]);
    }
  }
  document.getElementById("board").innerHTML = output;
}


createBarrier();
randomSpawn();
render();


function randomSpawn(){
  var characterX = App.location[0];
  var characterY = App.location[1];
  
  //creates a random X,Y coordinates, -1 for off by one errors
  App.location[0] = Math.random() * App.grid.length - 1;
  App.location[1] = Math.random() * App.grid.length - 1;

  //rounds coordinates to a whole number
  App.location[0] = Math.ceil(App.location[0]);
  App.location[1] = Math.ceil(App.location[1]);
  
  if (characterX === App.location[0] && characterY === App.location[1]){
    //Picks new location if the createBarrier() and randomSpawn() pick the
    //same coordinates
    App.location[0] = Math.random() * App.grid.length - 1;
    App.location[1] = Math.random() * App.grid.length - 1;
    
    App.location[0] = Math.ceil(App.location[0]);
    App.location[1] = Math.ceil(App.location[1]);
    
    App.grid[App.location[0]][App.location[1]] = App.grid[0][0];
    App.grid[0][0] = ".";
    
   //If random picks 0,0 it will display the correct symbol
  }else if(App.location[0] === 0 && App.location[1] === 0){
    App.grid[App.location[0]][App.location[1]] = App.grid[0][0];
    App.grid[0][0] = "@";
  }else{
    //updates the position of the "@" and replaces old position with "."
    App.grid[App.location[0]][App.location[1]] = App.grid[0][0];
    App.grid[0][0] = ".";
  } 
}
function createBarrier(){
  //Selects a random location for the barrier and accounts for off by 1 errors
  App.location[0] = Math.random() * App.grid.length - 1;
  App.location[1] = Math.random() * App.grid.length - 1;
  
  //Rounds the random for a nice number
  App.location[0] = Math.ceil(App.location[0]);
  App.location[1] = Math.ceil(App.location[1]);
  
  //Checks if random location is 0,1 and makes sure to display the "#"
  if (App.location[0] === 0 && App.location[1] == 1){
    App.grid[App.location[0]][App.location[1]] = App.grid[0][1];
    App.grid[0][1] = "#";
    
    //Stores barrier location for use with collision
    App.barrier[0] = App.location[0];
    App.barrier[1] = App.location[1];
  }else{
    //Else it displays the "."
    App.grid[App.location[0]][App.location[1]] = App.grid[0][1];
    App.grid[0][1] = ".";
  }
  //Stores barrier location for sue with collision
  App.barrier[0] = App.location[0];
  App.barrier[1] = App.location[1];
}

function playerMovement(event){
  var test  = 0;
  var test2 = 0;
  if(event) {
    var key = event.keyCode;    
    switch(key){
      //UP Key
      case 38:
        //subtracts 1 from the X postion of location
        test  = App.location[0] - 1;
        test2 = App.location[1];
        
        //Checks if "@" goes off board or hits "#"
        if (test <= -1){
          console.log("Can't go any further.");  
        }else if (test === App.barrier[0] && test2 === App.barrier[1]){
          App.grid[App.location[0]][App.location[1]] = "@";
          console.log("Can't go any further.");
        }else{
          //Overwrites current location of "@" with "."
          App.grid[App.location[0]][App.location[1]] = ".";
          //Draws the "@" at new location
          App.location[0] = test;
          App.grid[App.location[0]][App.location[1]] = "@";
        }
        render();
        break;
        
      //DOWN key
      case 40:
        //adds 1 to the X position
        test  = App.location[0] + 1;
        test2 = App.location[1];
        
        //Checking if "@" goes off board or hits "#"
        if (test >= App.grid.length){
          console.log("Can't go any further.");          
        }else if (test === App.barrier[0] && test2 === App.barrier[1]){
          App.grid[App.location[0]][App.location[1]] = "@";
          console.log("Can't go any further.");
        }else{
          //Overwrites current location of "@" with "."
          App.grid[App.location[0]][App.location[1]] = ".";
          //Draws the "@" at new location
          App.location[0] = test;
          App.grid[App.location[0]][App.location[1]] = "@";
        }
        render();
        break;
        
      //LEFT Key
      case 37:
      
        //Subtracts 1 to Y position
        test  = App.location[1] - 1;
        test2 = App.location[0];
        
        //Checking if "@" goes off the board or hits "#"
        if (test <= -1){
          console.log("Can't go any further.");          
        }else if (test === App.barrier[1] && test2 === App.barrier[0]){
          App.grid[App.location[0]][App.location[1]] = "@";
          console.log("Can't go any further.");
        }else{
          //Overwrites "@" with "."
          App.grid[App.location[0]][App.location[1]] = ".";
          App.location[1] = test;
          //Draws "@" at new location
          App.grid[App.location[0]][App.location[1]] = "@";
        }
        render();
        break;
      
      //RIGHT Key
      case 39:
      
        //Adds 1 to Y position
        test  = App.location[1] + 1;
        test2 = App.location[0];
        
        //Checking if "@" goes off the board or hits "#"
        if (test >= App.grid.length){
          console.log("Can't go any further.");
        }else if (test === App.barrier[1] && test2 === App.barrier[0]){
          App.grid[App.location[0]][App.location[1]] = "@";
          console.log("Can't go any further.");
        }else{
          //Overwrites "@" with "."
          App.grid[App.location[0]][App.location[1]] = ".";
          App.location[1] = test;
          //Draws "@" at new location
          App.grid[App.location[0]][App.location[1]] = "@";
        }
        render();
        break;
      
    } 
  }
}

window.addEventListener("keydown", playerMovement);

    
    
    
    
    
    
    
    
    
    
    
    
    

