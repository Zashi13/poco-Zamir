
// Set this constant to true to debug the placement of bombs without
// having to click on all cells to reveal them.
const CHEAT_REVEAL_ALL = true;
let timer = 0;
let finalTime = 0;
setInterval(getTimer, 1000);
const ROWS_COUNT = 5;
const COLS_COUNT = 5;

const BOMBS_COUNT = 1;

const totalCellsToClear = ROWS_COUNT * COLS_COUNT - BOMBS_COUNT;


var defeat = false;
var victory = false;

// Cell constructor
function Cell() {
  this.discovered = false;
  this.isBomb = false;
  this.hasBeenFlagged = false;
}

// Initialize cells
var cells = Array(ROWS_COUNT);
for (var row = 0; row < ROWS_COUNT; row++) {
  cells[row] = Array(COLS_COUNT);
  for (var col = 0; col < COLS_COUNT; col++) {
    cells[row][col] = new Cell();
  }
}



//
// TODO: Task 1 - add some bombs at fixed positions.
//cells[0][1].isBomb = true;
//cells[5][4].isBomb = true;
//cells[9][9].isBomb = true;

//
// TODO: Task 2 - Comment out the code of task 1. Instead of adding bombs in fixed places, add 10 of them in random places.
//                Add a BOMBS_COUNT constant so that you can easily change the amount of bombs placed. Put it next to the
//                other constants.
//


for (i = 0; i < BOMBS_COUNT; i++){
  let ranRow = Math.floor(Math.random() * ROWS_COUNT);
  let ranCol = Math.floor(Math.random() * COLS_COUNT);

if (cells[ranRow][ranCol].isBomb != true){
  cells[ranRow][ranCol].isBomb = true;
}
else {
  ranRow += 1;
  ranCol += 1;
  cells[ranRow][ranCol].isBomb = true;
}
}


// Once the game has been initialized, we "render" it.
render();


//
// Game functions definitions
//

function discoverCell(row, col) {
  //
  // TODO: Task 5 - Reveal cells when clicked.
  cells[row][col].discovered = true;

  if (cells[row][col].isBomb == true) {
    defeat = true;
  };
  checkSuroundingCells(row, col);
  

  


  function checkSuroundingCells (row, col){
    let cleanedROW = [];
    let cleanedCOL = [];
  
    let dirtyROW = [row -1, row, row + 1];
    let dirtyCOL = [col -1, col, col + 1];
  
  
    dirtyROW.forEach((element, index) => {
    
  
  
        if(element >= ROWS_COUNT || element < 0){
          dirtyROW.splice(index, 1);
        };
      }
    );
  
    cleanedROW = dirtyROW;

    dirtyCOL.forEach((element, index) => {
    
      if(element >= COLS_COUNT || element < 0){
        dirtyCOL.splice(index, 1);
      };
    }
  );
  
  cleanedCOL = dirtyCOL;


  cleanedROW.forEach((element) => {
    let elementROW = element;
  
    cleanedCOL.forEach((elementCOL) => {

      let adjBombs = countAdjacentBombs(elementROW, elementCOL);
  
      console.log("The ROW is " + elementROW);
      console.log("The COL is " + elementCOL);
      console.log("There are " + adjBombs + " adjacient Bombs");
      

      if (adjBombs == 0){
        cells[elementROW][elementCOL].discovered = true;
        console.log("Cell cleard succesfully");
        console.log("--------------------------");
      }
      else {
  
      }
    });
  });

    }
  

  //
  // TODO: Task 6 - Discover neighbor cells recursively, as long as there are no adjacent bombs to the current cell.
  //

  //
  // TODO: Task 8 - Implement defeat. If the player "discovers" a bomb (clicks on it without holding shift), set the variable defeat to true.
  //



}


function flagCell(row, col) {
  
  if(cells[row][col].hasBeenFlagged == false){
  cells[row][col].hasBeenFlagged = true;
}
else{
  cells[row][col].hasBeenFlagged = false;
}
  //
  // TODO: Task 7 - Implement flags. Flags allow the player to mark cells that they think contain a bomb.
  //                When clicking a cell and holding shift, function flagCell() will be called for you.
  //
}

// This function is called once for each cell when rendering the game. The row and col of the current cell is
// passed to the functionn
function countAdjacentBombs(row, col) {
  //
  // TODO: Task 4 - Adjacent bombs are bombs in cells touching our cell (also diagonally). Implement this function
  //                so that it returns the count of adjacent cells with bombs in them. 
  //
  var adjBombsCount = 0;
  let elementROW;

  let cleanedROW = [];
  let cleanedCOL = [];

  let dirtyROW = [row -1, row, row + 1];
  let dirtyCOL = [col -1, col, col + 1];


  dirtyROW.forEach((element, index) => {
  


      if(element >= ROWS_COUNT || element < 0){
        dirtyROW.splice(index, 1);
      };
    }
  );

  cleanedROW = dirtyROW;



  dirtyCOL.forEach((element, index) => {
  
    if(element >= COLS_COUNT || element < 0){
      dirtyCOL.splice(index, 1);
    };
  }
);

cleanedCOL = dirtyCOL;

cleanedROW.forEach((element) => {
  elementROW = element;

  cleanedCOL.forEach((elementCOL) => {

      /*console.log("the row is " + elementROW);
      console.log("the col is " + elementCOL);
      console.log("---------------------------------------------------");
*/
    if (cells[elementROW][elementCOL].isBomb == true){
      adjBombsCount += 1;
    }
  });
});

  return adjBombsCount;
}

function getBombsCount() {
  
  
  //
  // TODO: Task 9 - Implement stats: the counters currently always display 0, calculate and return the relevant values.
  //
  return BOMBS_COUNT;
}

function getClearedCells() {
  //
  // TODO: Task 9 - Implement stats: the counters currently always display 0, calculate and return the relevant values.
  //
let score = 0;
  for(let iROW = 0; iROW < ROWS_COUNT; iROW++){
    for(let iCOL = 0; iCOL < COLS_COUNT; iCOL++){
      if(cells[iROW][iCOL].discovered == true){
        score++;
      }
    }
  }
  return score;
}

function getTotalCellsToClear() {
  
  //
  // TODO: Task 9 - Implement stats: the counters currently always display 0, calculate and return the relevant values.
  //
  return totalCellsToClear;
}

function checkForVictory() {
  
  let cellsCleard = getClearedCells();

  if(totalCellsToClear == cellsCleard){
    victory = true;
    finalTime = timer;
    leaderboard(finalTime);
  }
  //
  // TODO: Task 10 - Implement victory. If the player has revealed as many cells as they must (every cell that isn't a
  //                 bomb), set variable victory to true.
  //
  return 0;
}

//
// Rendering functions
//
function getMessage() {
  if (victory == true) {
    return "Well done! 👏🏼<br><br>Refresh the page to start again.";
  } else if (defeat) {
    return "Boom! 💥<br><br>Refresh the page to try again.";
  }
  return "";
}

// "Render" the game. Update the content of the page to reflect any changes to the game state.
function render() {
  var playfield = document.getElementById("playfield");
  var html = "";
  for (var row = 0; row < ROWS_COUNT; row++) {
    html += '<div class="row">';
    for (var col = 0; col < COLS_COUNT; col++) {
      var cell = cells[row][col];
      var cellText = "";
      var cssClass = "";
      var textColor = "";
      if (cell.discovered || CHEAT_REVEAL_ALL || defeat) {
        cssClass = "discovered";
        if (cell.isBomb) {
          cellText = "💣";
        } else {
          var adjBombs = countAdjacentBombs(row, col);
          if (adjBombs > 0) {
            cellText = adjBombs.toString();
            if (adjBombs == 1) {
              textColor = "blue";
            } else if (adjBombs == 2) {
              textColor = "green";
            } else if (adjBombs == 3) {
              textColor = "red";
            } else if (adjBombs == 4) {
              textColor = "black";
            }
          }
        }
      } else {
        if (cell.hasBeenFlagged) {
          cellText = "🚩"
        }
      }
      html += `<div class="cell ${cssClass}" style="color:${textColor}" onclick="onCellClicked(${row}, ${col}, event)">${cellText}</div>`;
    }
    html += "</div>"
  }
  playfield.innerHTML = html;

  // Defeat screen
  var body = document.getElementsByTagName("body")[0];
  if (defeat) {
    body.classList.add("defeat")
  }

  // Victory screen
  if (victory) {
    body.classList.add("victory")
  }


  // Update stats
  document.getElementById("bombs-count").innerText = getBombsCount().toString();
  document.getElementById("cleared-cells-count").innerText = getClearedCells().toString();
  document.getElementById("total-cells-to-clear").innerText = getTotalCellsToClear().toString();
 

  // Update message
  document.getElementById("message").innerHTML = getMessage();
}

// This function gets called each time a cell is clicked. Arguments "row" and "col" will be set to the relevant
// values. Argument "event" is used to check if the shift key was held during the click.
function onCellClicked(row, col, event) {
  if (event.shiftKey) {
    flagCell(row, col);
  } else {
    discoverCell(row, col);
  }
  checkForVictory();
  render();
}


function getTimer(){
  timer++;
  document.getElementById("timer").innerText = timer + " sec";
  return timer;
}

let scores = [];



function leaderboard(finalTime){
  scores.push(finalTime);
  const str = localStorage.getItem('scr');
  scores = JSON.parse(str);
  console.log(scores);
scores.forEach((score, index) => {
  var list = document.getElementById("highscores")
  var listelement = document.createElement('li');
  listelement.appendChild(document.createTextNode(score));
  list.appendChild(listelement);
});
localStorage.setItem("scores", scores);
const jsonScores = JSON.stringify(scores);
localStorage.setItem('scr', jsonScores);
};