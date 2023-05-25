const gameBoard = document.querySelector(".gameBoard");
const info = document.getElementById("info");
const createSquare = ["", "", "", "", "", "", "", "", ""];

let gamer = "circle";
info.textContent = "Circle goes first!";
let filledSquare = 0;

function createBoard() {
	createSquare.forEach((_cell, index) => {
		let square = document.createElement("div");
		square.classList.add("square");
		square.id = index;
		square.addEventListener("click", addGo);
		gameBoard.append(square);
	});
}

createBoard();

function addGo(event) {
	const go = document.createElement("div");
	go.classList.add(gamer);
	event.target.append(go);
	gamer = gamer === "circle" ? "cross" : "circle";
	info.textContent = "it's " + gamer + "'s turn!";
	if (event) {
		filledSquare++;
		console.log(filledSquare);
	}
	event.target.removeEventListener("click", addGo);
	checkScore();
}

function checkScore() {
	const winningCombos = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	let allSquares = document.querySelectorAll(".square");

	if (filledSquare === 9) {
		info.textContent = "Game over! It was tie! Try again! Circle goes first!";
        gameBoard.innerHTML = '';
		createBoard();
	} else {
		winningCombos.forEach((array) => {
			let circleWins = array.every((cell) =>
				allSquares[cell].firstChild?.classList.contains("circle")
			);
			if (circleWins) {
				info.textContent = "Circle win's!";
				allSquares.forEach((square) => {
					square.replaceWith(square.cloneNode(true));
				});
			}
			return;
		});

		winningCombos.forEach((array) => {
			let crossWins = array.every((cell) =>
				allSquares[cell].firstChild?.classList.contains("cross")
			);
			if (crossWins) {
				info.textContent = "Cross win's!";
				allSquares.forEach((square) => {
					square.replaceWith(square.cloneNode(true));
				});
			}
			return;
		});
	}
}
