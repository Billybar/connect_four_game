var playerColor = "red"

//////////////////////////////////////
//**    *    SHORT SYNTAX     *   **//
const docGet = function (id) {
  return document.getElementById(id);
};



// FIRST FUNCTION TO RUN, ONCE PLAYER CLICK ON A BUTTON!
function pressBtn(id) {
  id = parseInt(id);
  id = checkLowestPoint(id);
  boardEffects()
  docGet('playerTurn').style.backgroundColor = playerColor
  if (playerColor == "red") playerColor = "blue";
  else if (playerColor == "blue") playerColor = "red";
  docGet(id).style.backgroundColor = playerColor;
  docGet(id).disabled = true

  checkHorizontal(id);
  checkVertical(id);
  checkDiagonal(id);
}


// Check lowest point at the same culomn the player clicked - that's how we make sure the piece will be at the lowest 'td' on same culomn. 
function checkLowestPoint(id) {
  if (id >= 61 && id <= 67) return id
  var arrayBgc = createVarsPlus(id, 'arrayBgc', 10, 50, 10)
  if (docGet(arrayBgc[0]).disabled) return id
  for (let x = 4; x >= 0; x--) {
    if (docGet(arrayBgc[x]) && !docGet(arrayBgc[x]).disabled) {
      id = arrayBgc[x]
      return id
    }
  }
}


// Check if we have same 4 backgroud-colors in a row  
function checkHorizontal(id) {
  var arrayBgc = createVarsPlus(id, 'arrayBgc', 1, 3, 1)
  arrayBgc = createVarsMinus(id, arrayBgc, 1, 3, 1)
  arrayBgc = getIdBgc(arrayBgc, 5)
  checkMatch(id, arrayBgc, 5)
}


// Check if we have same 4 backgroud-colors in a column  
function checkVertical(id) {
  var arrayBgc = createVarsPlus(id, 'arrayBgc', 10, 30, 10)
  arrayBgc = createVarsMinus(id, arrayBgc, 10, 30, 10)
  arrayBgc = getIdBgc(arrayBgc, 5)
  checkMatch(id, arrayBgc, 5)
}


// Check if we have same 4 backgroud-colors in each diagonal direction  
function checkDiagonal(id) {
  var arrayBgc = createVarsPlus(id, 'arrayBgc', 11, 33, 11)
  arrayBgc = createVarsMinus(id, arrayBgc, 11, 33, 11)
  arrayBgc = createVarsPlus(id, arrayBgc, 9, 27, 9, false)
  arrayBgc = createVarsMinus(id, arrayBgc, 9, 27, 9)
  arrayBgc = getIdBgc(arrayBgc, 11)
  checkMatch(id, arrayBgc, 11, true)
}


// Create array of id's based on the button-id that was clicked. with a PLUS opretor - (below the id row). 
function createVarsPlus(id, array, num, until, plus, a = true) {
  if (a) var array = []
  for (let x = num; x <= until; x = x + plus) {
    array.push(id + x)
  }
  return array
}


// Create array of id's based on the button-id that was clicked. with a MINUS opretor - (above the id row). 
function createVarsMinus(id, array, num, until, minus) {
  for (let x = num; x <= until; x = x + minus) {
    array.push(id - x)
  }
  return array
}


// Get id's background-colors
function getIdBgc(array, until) {
  for (let x = 0; x <= until; x++) {
    if (docGet(array[x])) {
      array[x] = docGet(array[x]).style.backgroundColor
    }
  }
  return array
}


// Check if have matching colors around the id  
function checkMatch(id, array, diagonal = false) {
  let idBgc = docGet(id).style.backgroundColor
  if (idBgc == array[0] && idBgc == array[1] && idBgc == array[2]) {
    gameOver();
  } else if (idBgc == array[3] && idBgc == array[4] && idBgc == array[5]) {
    gameOver();
  } else if (idBgc == array[0] && idBgc == array[3] && idBgc == array[4]) {
    gameOver();
  } else if (idBgc == array[0] && idBgc == array[1] && idBgc == array[3]) {
    gameOver();
  }
  if (diagonal) {
    if (idBgc == array[6] && idBgc == array[7] && idBgc == array[8]) {
      gameOver();
    } else if (idBgc == array[9] && idBgc == array[10] && idBgc == array[11]) {
      gameOver();
    } else if (idBgc == array[6] && idBgc == array[7] && idBgc == array[9]) {
      gameOver();
    } else if (idBgc == array[6] && idBgc == array[9] && idBgc == array[10]) {
      gameOver();
    }
  }
}


// GAME-OVER!
function gameOver() {
  $(':button').prop('disabled', true);
  endEffects()
  docGet('myAlert').style.backgroundColor = playerColor;
  setTimeout(function () {
    location = location
  }, 6000)
}




//////////////////
/**   EFFECTS  **/
//////////////////


// Game-over Effects
function endEffects() {
  $("#divAlert").fadeToggle('slow');
  setTimeout(function () {
    $("#myAlert").fadeOut(4000);
    $("#divAlert").slideToggle(4000);
  }, 2000)
}


// Table-Board Effects
function boardEffects() {
  $("#playerTurn").slideToggle(100);
  $("#playerTurn").slideToggle(0050);
  $("#playerTurn").css('transform', 'scale(1.8,2.7)')
  setTimeout(function () {
    $("#playerTurn").css('transform', 'scale(1.7,1.7)')
  }, 100)
}


// Buttons Effects
$("button").hover(function () {
  $(this).css("background-color", "");
}, function () {
  $(this).css("background-color", "white");
});