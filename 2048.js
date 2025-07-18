var board = [];
var rows = 4;
var cols = 4;
var score = 0;
var lost = false;

window.onload = function () {
  setGame();
};

function setGame() {
  //   board = [
  //     [0, 0, 0, 0],
  //     [0, 0, 0, 0],
  //     [0, 0, 0, 0],
  //     [0, 0, 0, 0],
  //   ];
  //   board = [
  //     [2, 2, 2, 2],
  //     [2, 2, 2, 2],
  //     [4, 4, 8, 8],
  //     [4, 4, 8, 8],
  //   ];
  document.getElementById("board").innerHTML = "";
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < cols; j++) {
      board[i][j] = 0;
      let tile = document.createElement("div");
      tile.id = `${i}-${j}`;
      let num = board[i][j];
      updateTile(tile, num);
      document.getElementById("board").append(tile);
    }
  }

  setTwo();
  setTwo();
}

function setTwo() {
  if (!hasEmptyTile()) {
    return;
  }
  let found = false;
  while (!found) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * cols);

    if (board[r][c] == 0) {
      board[r][c] = 2;
      let tile = document.getElementById(`${r}-${c}`);
      tile.innerText = 2;
      tile.classList.add("x2");
      found = true;
    }
  }
}

function hasEmptyTile() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] == 0) {
        return true;
      }
    }
  }
}

function updateTile(tile, num) {
  tile.innerText = "";
  tile.classList.value = ""; //clear classlist
  tile.classList.add("tile");
  if (num > 0) {
    tile.innerText = num;
    if (num <= 4096) {
      tile.classList.add(`x${num}`);
    } else {
      tile.classList.add(`x8192`);
    }
  }
}

function checkIfLost() {
  if (hasEmptyTile()) {
    return false; // Game is not lost if there are empty tiles
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols - 1; c++) {
      if (board[r][c] == board[r][c + 1]) {
        return false; // Move is possible, game not lost
      }
    }
  }

  for (let r = 0; r < rows - 1; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] == board[r + 1][c]) {
        return false; // Move is possible, game not lost
      }
    }
  }

  return true;
}

function resetGame() {
  score = 0;
  board = [];
  lost = false;
  setGame();
}

document.addEventListener("keyup", (e) => {
  if (lost) {
    return;
  }

  if (e.code == "ArrowLeft") {
    slideLeft();
    setTwo();
  } else if (e.code === "ArrowRight") {
    slideRight();
    setTwo();
  } else if (e.code === "ArrowUp") {
    slideUp();
    setTwo();
  } else if (e.code === "ArrowDown") {
    slideDown();
    setTwo();
  } else if (e.code === "Space") {
    resetGame();
  }

  if (checkIfLost()) {
    alert("Game Over! No more moves possible.");
    lost = true;
  }
  document.getElementById("score").innerText = score;
});

function filterZero(row) {
  return row.filter((num) => num != 0);
}

function slide(row) {
  row = filterZero(row);
  for (let r = 0; r < row.length - 1; r++) {
    if (row[r] == row[r + 1]) {
      row[r] *= 2;
      row[r + 1] = 0;
      score += row[r];
    }
  }
  row = filterZero(row);
  while (row.length < cols) {
    row.push(0);
  }
  return row;
}

function slideLeft() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row = slide(row);
    board[r] = row;

    for (let c = 0; c < rows; c++) {
      let tile = document.getElementById(`${r}-${c}`);
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideRight() {
  for (let r = 0; r < rows; r++) {
    let row = board[r];
    row.reverse();
    row = slide(row);
    row.reverse();
    board[r] = row;

    for (let c = 0; c < rows; c++) {
      let tile = document.getElementById(`${r}-${c}`);
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideUp() {
  for (let c = 0; c < rows; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row = slide(row);
    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(`${r}-${c}`);
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}

function slideDown() {
  for (let c = 0; c < rows; c++) {
    let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
    row.reverse();
    row = slide(row);
    row.reverse();
    for (let r = 0; r < rows; r++) {
      board[r][c] = row[r];
      let tile = document.getElementById(`${r}-${c}`);
      let num = board[r][c];
      updateTile(tile, num);
    }
  }
}
