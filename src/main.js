const playAreaContent = document.querySelector(".play_area");
const cell = document.querySelectorAll(".cell");
const messageInfo = document.querySelector("#message");
const userInputBlock = document.querySelector(".elem_input");
const emptyCell = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
const winerCellCombinate = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["1", "4", "7"],
  ["2", "5", "8"],
  ["3", "6", "9"],
  ["1", "5", "9"],
  ["3", "5", "7"],
];
const gameStatus = {
  /// Прогресс игры
  gameProgress: true,
  ///Шаблоны для вывода пользователю
  statusGame: "Игра идет!",
  statusGameWin: "Победил ",
  statusDraw: "Ничья!",
  statusTaken: "Клетка занята",
  ///Массивы с ходами игроков
  emptyCellX: [],
  emptyCellO: [],
};

///Массовая отрисовка "игрового поля"
emptyCell.forEach((elem) => {
  let playAreaElement = document.createElement("div");
  playAreaElement.className = "cell";
  playAreaElement.id = elem;
  playAreaContent.append(playAreaElement);
});

///Делегирование события onclick на все "игровое поле", ход - клик по ячейке и вызов ф-ции с отрабатыванием всей логики
playAreaContent.addEventListener("click", function (event) {
  /// Проверка статуса игры и активности поля (если ничья или победа - то поле gameStatus.gameProgress = false)
  if (gameStatus.gameProgress) {
    gameLogic(event.target);
  }
});

///Определение выбранных элементов игроков
function inputUserEl() {
  let userInput = document.querySelector("#selectelem").value;
  ///Скрытие панель с выбором элемента
  userInputBlock.style.visibility = "hidden";
  switch (userInput) {
    case "X":
      elemUser = `<p>X</p>`;
      elemAi = `<p>O</p>`;
      break;
    case "O":
      elemUser = `<p>O</p>`;
      elemAi = `<p>X</p>`;
      break;
  }
}

///Простая логика хода ИИ: рандом число умноженное на длинну массива с округлением
function arrayRandElement(arr) {
  let randIndex = Math.floor(Math.random() * arr.length);
  return arr[randIndex];
}

///Основная логика
function gameLogic(elem) {
  inputUserEl();
  ///Совершение хода, в ином случае вывод инфы о том, что поле занято
  if (!elem.firstChild) {
    messageInfo.innerHTML = gameStatus.statusGame;
    let idCell = emptyCell.indexOf(elem.id);
    emptyCell.splice(idCell, 1);
    elem.innerHTML = elemUser;
    gameStatus.emptyCellX.push(elem.id);
    /// В случае выигрыша игрока - вывод победителя, а также игровое поле становится неактивно
    winCheckGlobal(gameStatus.emptyCellX, elemUser);
    /// ход ИИ, если игровое поле активно
    if (gameStatus.gameProgress) {
      let elemComputer = document.getElementById(arrayRandElement(emptyCell));
      let idCellTwo = emptyCell.indexOf(elemComputer.id);
      gameStatus.emptyCellO.push(elemComputer.id);
      emptyCell.splice(idCellTwo, 1);
      elemComputer.innerHTML = elemAi;
      /// В случае выигрыша ИИ - вывод победителя, а также игровое поле становится неактивно
      winCheckGlobal(gameStatus.emptyCellO, elemAi);
    }
    checkGameDraw();
  } else {
    messageInfo.innerHTML = statusTaken;
  }
}
///Ф-ции проверки выигрыша
function winCheckGlobal(gamerSteps, gamerElement) {
  if (gamerSteps.length >= 3) {
    ///Проверка каждой комбинации в отдельной ф-ции, получение статуса игры после проверки
    for (let arr of winerCellCombinate) {
      if (winnerCheck(arr, gamerSteps) == gameStatus.statusGameWin) {
        /// В случае выигрыша игрока - вывод победителя, а также игровое поле становится неактивно
        messageInfo.innerHTML = `${gameStatus.statusGameWin} ${gamerElement}`;
        gameStatus.gameProgress = false;
      }
    }
  }
}
///Ф-ция проверки выиграшных комбинаций поочередно
function winnerCheck(winerCombinate, inputCell) {
  let count = 0;
  for (let n = 0; n < inputCell.length; n++) {
    if (winerCombinate.indexOf(inputCell[n]) != -1) {
      count++;
    }
  }
  let resultGameInfo =
    count < 3 ? gameStatus.statusGame : gameStatus.statusGameWin;
  return resultGameInfo;
}
///Ф-ция проверки ничьи
function checkGameDraw() {
  if (emptyCell.length == 1) {
    gameStatus.gameProgress = false;
    messageInfo.innerHTML = gameStatus.statusDraw;
  }
}
