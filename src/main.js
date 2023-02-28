var cell = document.getElementsByClassName('cell');
var message = document.getElementById('message');
var userInputBlock = document.getElementsByClassName('elem_input')[0];
var empty_cell = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

function arrayRandElement(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}

function inputUserEl(){
  var user_input = document.getElementById('selectelem').value;
  userInputBlock.style.visibility = "hidden";
  if(user_input != "O") {
    el_user = `<p>X</p>`
    el_ai = `<p>O</p>`
  } else {
    el_user = `<p>O</p>`
    el_ai = `<p>X</p>`
  }
}

function gameLogic(elem) {
  inputUserEl()
  if (!elem.firstChild){  
  var id_cell = empty_cell.indexOf(elem.id);
   empty_cell.splice(id_cell, 1)
   elem.innerHTML = el_user
   message.innerHTML = ''
   checkWinner()
   var el_comp = document.getElementById(arrayRandElement(empty_cell));
   var id_cell_2 = empty_cell.indexOf(el_comp.id)
   empty_cell.splice(id_cell_2, 1)
   el_comp.innerHTML = el_ai;

  }else {
    message.innerHTML = 'Клетка занята'
  }
  console.log(empty_cell)
  
}

function checkWinner(){
  if (empty_cell.length != 0){
    message.innerHTML = 'Игра идет!'
  } else {
    message.innerHTML = 'Игра завершена'
  }
}

///массив выиграшных комбинаций для определения выигравшего
///ниже выводится результат игры
