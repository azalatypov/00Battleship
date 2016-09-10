var flag = true;
var compHit = false;
var comp1Hit = 0;
var compNextHit = 0;
var way = 1; //1-up, 2-down, 3-right, 4-left.
var rightWay = false;
var firstMove = false;

var basis = {
	boardSize: 10,
	numShips: 10,
	ownShipsSunk: 0,
	compShipsSunk: 0,
	ownField: [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199],

	ownShips: [ //our ships //наши корабли
		{sizes: 4, locations: [-1, -1, -1,-1], hits: ["", "", "", ""] },
		{sizes: 3, locations: [-1, -1, -1], hits: ["", "", ""] },
		{sizes: 3, locations: [-1, -1, -1], hits: ["", "", ""] },
		{sizes: 2, locations: [-1, -1], hits: ["", ""] },
		{sizes: 2, locations: [-1, -1], hits: ["", ""] },
		{sizes: 2, locations: [-1, -1], hits: ["", ""] },
		{sizes: 1, locations: [-1], hits: [""] },
		{sizes: 1, locations: [-1], hits: [""] },
		{sizes: 1, locations: [-1], hits: [""] },
		{sizes: 1, locations: [-1], hits: [""] },
	],
	enemyShips : [ //computer's ships //корабли компьютера
		{sizes: 4, locations: [-1, -1, -1,-1], hits: ["", "", "", ""] },
		{sizes: 3, locations: [-1, -1, -1], hits: ["", "", ""] },
		{sizes: 3, locations: [-1, -1, -1], hits: ["", "", ""] },
		{sizes: 2, locations: [-1, -1], hits: ["", ""] },
		{sizes: 2, locations: [-1, -1], hits: ["", ""] },
		{sizes: 2, locations: [-1, -1], hits: ["", ""] },
		{sizes: 1, locations: [-1], hits: [""] },
		{sizes: 1, locations: [-1], hits: [""] },
		{sizes: 1, locations: [-1], hits: [""] },
		{sizes: 1, locations: [-1], hits: [""] },
	],

	//place ships on the field //размещение кораблей на поле
	generateShipLocations: function(whose, whosenum) {
		var locations,
			whoseShip = whose;
		for (var i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip(i, whoseShip);
			} while (this.collision(locations, whoseShip));
			whoseShip[i].locations = locations;
			// console.log(whoseShip[i].locations);

			for (var j = 0; j < whoseShip[i].sizes; j++) {
				var shipID = whosenum + locations[j];
				var cell = document.getElementById(shipID);
				// cell.setAttribute("class", "ship");
				cell.className += " ship ";
			};
		};	
	},

	//ship creation //создание корабля
	generateShip: function(num, whose) {
		var direction = Math.floor(Math.random() * 2),//horizontal or vertical
			row, col,
			whoseShip = whose;

		if (direction === 1) { // horizontal
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - whoseShip[num].sizes + 1));
		} else { // vertical
			row = Math.floor(Math.random() * (this.boardSize - whoseShip[num].sizes + 1));
			col = Math.floor(Math.random() * this.boardSize);
		};

		var newShipLocations = [];
		for (var i = 0; i < whoseShip[num].sizes; i++) {
			if (direction === 1) {
				newShipLocations.push(row + "" + (col + i));
			} else {
				newShipLocations.push((row + i) + "" + col);
			};
		};
		return newShipLocations;
	},

	//ship collision checking //проверка столкновения кораблей
	collision: function(locations, whose) {
		var whoseShip = whose;
		for (var i = 0; i < this.numShips; i++) {
			var ship = whoseShip[i];
			for (var j = 0; j < locations.length; j++) {
				var cen = "" +  parseInt(locations[j]), //center
					n = "" +  (parseInt(locations[j]) - 10), //north
					ne = "" +  (parseInt(locations[j]) - 9), //north-east
					e = "" +  (parseInt(locations[j]) + 1), // east
					se = "" +  (parseInt(locations[j]) + 11), //south-east
					s = "" +  (parseInt(locations[j]) + 10), //south
					sw = "" +  (parseInt(locations[j]) + 9), //south-west
					w = "" +  (parseInt(locations[j]) - 1), //west
					nw = "" +  (parseInt(locations[j]) - 11); //north-west
					// console.log(cen,n,ne,e,se,s,sw,w,nw);

				if ( parseInt(cen) < 10 ){ 
					cen = "0" +  cen;
					e = "0" +  e;
					w = "0" +  w;
				};
				if ( parseInt(n) < 10 ){ n = "0" +  n; };
				if ( parseInt(ne) < 10 ){ ne = "0" +  ne; };
				if ( parseInt(nw) < 10 ){ nw = "0" +  nw; };

				if ( (ship.locations.indexOf(cen) >= 0) || 
					 (ship.locations.indexOf(n) >= 0) || 
					 (ship.locations.indexOf(ne) >= 0) || 
					 (ship.locations.indexOf(e) >= 0) || 
					 (ship.locations.indexOf(se) >= 0) || 
					 (ship.locations.indexOf(s) >= 0) || 
					 (ship.locations.indexOf(sw) >= 0) || 
					 (ship.locations.indexOf(w) >= 0) || 
					 (ship.locations.indexOf(nw) >= 0) ) {
					return true;
				};
			};
		};
		return false;
	},

};
//information output //вывод информации
var view = {
	displayMessage: function(msg) {
		// console.log(msg);
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},
	displayHit: function(location) {
		var cell = document.getElementById(location);
		cell.className += " hit ";
	},

	displayMiss: function(location) {
		var cell = document.getElementById(location);
		cell.className += " miss ";
	},
	displaySunk: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", " sunk ");
		// cell.className += " sunk ";
	}
};

var act = {
	//your shoot  //ваш выстрел
	ourShoot: function() {
		$(".compField").click(function(event) {
			// console.log(event.target.id);
			var ourShootId = event.target.id;
			var ourShootIdSub = ("" + event.target.id).substring(1);
			var cell = document.getElementById(ourShootId);

			if ((basis.compShipsSunk == 10) || (basis.ownShipsSunk == 10)){
				return true;			
			};

			for (var i = 0; i < basis.numShips; i++) {
				var ship = basis.enemyShips[i];
				var sizeShip = ship.sizes;
				var index = ship.locations.indexOf(ourShootIdSub);

				if ((ship.hits[index] === "hit") || (cell.classList.contains('miss')) ) {
					// console.log("you 1 already hit that location");
					return true;
				} else if (index >= 0) {
					ship.hits[index] = "hit";
					view.displayHit('2' + ourShootIdSub);
					view.displayMessage("Вы попали");
					// console.log("you 2 HIT");

					if (act.isSunk(ship, sizeShip, '2')) {
						view.displayMessage("Вы потопили вражеский корабль!");
						// console.log("You 3 sank comp battleship");
						basis.compShipsSunk++;
						var userSunkShip = document.getElementById("userSunkShip");
						userSunkShip.innerHTML = basis.compShipsSunk;
						// console.log("compShipsSunk " + basis.compShipsSunk);

						if (basis.compShipsSunk == 10) {
							alert("Вы выиграли!");
							return true;
						};
					};
					flag = true; //our shoot
					return act.whoseShoot();
				};
			};
			view.displayMiss('2' + ourShootIdSub);
			view.displayMessage("Мимо");
			// console.log("You 4 missed");
			flag = false; //comp shoot
			return act.whoseShoot();
		});

	},	

	//computer's shoot //выстрел компьютера
	compShoot: function(){

		if (basis.ownShipsSunk == 10){
			return true;
		};

		if (compHit) {//AI
			var temp = comp1Hit;
			var temp2 = compNextHit;
			var indexField;

			if (rightWay) { //после второго попадания в определенном направлении
				if (way == 1){ //up
					comp2Hit = parseInt(temp2) - 10;
					if (parseInt(comp2Hit) < 10) {
						comp2Hit = '0' + parseInt(comp2Hit);
					} else {
						comp2Hit = "" + parseInt(comp2Hit);
					};
					var longvar = parseInt("1" + comp2Hit);
					var indexField = basis.ownField.indexOf(longvar);
					// console.log(comp2Hit, longvar, indexField);
					if (indexField >= 0) {						
						compTargetIdSub = comp2Hit;
						basis.ownField.splice(indexField, 1);
						// console.log("right way 1");
					} else {
						// console.log("right way 1 wrong");
						rightWay = false;
						firstMove = false;
						// return true;
						flag = false; //comp shoot
						return act.whoseShoot();
					};
				} else if (way == 2) {//down
					comp2Hit = parseInt(temp2) + 10;
					if (parseInt(comp2Hit) < 10) {
						comp2Hit = '0' + parseInt(comp2Hit);
					} else {
						comp2Hit = "" + parseInt(comp2Hit);
					};
					var longvar = parseInt("1" + comp2Hit);
					var indexField = basis.ownField.indexOf(longvar);
					// console.log(comp2Hit, longvar, indexField);
					if (indexField >= 0) {						
						compTargetIdSub = comp2Hit;
						basis.ownField.splice(indexField, 1);
						// console.log("right way 2");
					} else {
						// console.log("right way 2 wrong");
						rightWay = false;
						firstMove = false;
						// return true;
						flag = false; //comp shoot
						return act.whoseShoot();
					};
				} else if (way == 3) {//right
					if ( (parseInt(temp2)%10) == 9 ) {
						rightWay = false;
						firstMove = false;
						// return true;
						flag = false; //comp shoot
						return act.whoseShoot();
					} else {
						comp2Hit = parseInt(temp2) + 1;
						if (parseInt(comp2Hit) < 10) {
							// console.log("right way 3 close wall");
							comp2Hit = '0' + parseInt(comp2Hit);
						} else {
							comp2Hit = "" + parseInt(comp2Hit);
						};
						var longvar = parseInt("1" + comp2Hit);
						var indexField = basis.ownField.indexOf(longvar);
						// console.log(comp2Hit, longvar, indexField);
						if (indexField >= 0) {						
							compTargetIdSub = comp2Hit;
							basis.ownField.splice(indexField, 1);
							// console.log("right way 3");
						} else {
							rightWay = false;
							firstMove = false;
							// console.log("right way 3 wrong");
							// return true;
							flag = false; //comp shoot
							return act.whoseShoot();
						};
					};
				} else if (way == 4) {//left
					if ( (parseInt(temp2)%10) == 0 ) {
						rightWay = false;
						firstMove = false;
						// console.log("right way 4 close wall");
						// return true;
						flag = false; //comp shoot
						return act.whoseShoot();
					} else {
						comp2Hit = parseInt(temp2) - 1;
						if (parseInt(comp2Hit) < 10) {
							comp2Hit = '0' + parseInt(comp2Hit);
						} else {
							comp2Hit = "" + parseInt(comp2Hit);
						};
						var longvar = parseInt("1" + comp2Hit);
						var indexField = basis.ownField.indexOf(longvar);
						// console.log(comp2Hit, longvar, indexField);
						if (indexField >= 0) {						
							compTargetIdSub = comp2Hit;
							basis.ownField.splice(indexField, 1);
							// console.log("right way 4");
						} else {
							// console.log("right way 4 wrong");
							alert('error AI');
							// return true;
							flag = false; //comp shoot
							return act.whoseShoot();
						};
					};					

				};

			} else { //отсчет от первого попадания
				// console.log(basis.ownField);
				firstMove = true;
				if (way == 1){ //up
					comp2Hit = parseInt(temp) - 10;
					if (parseInt(comp2Hit) < 10) {
						comp2Hit = '0' + parseInt(comp2Hit);
					} else {
						comp2Hit = "" + parseInt(comp2Hit);
					};
					var longvar = parseInt("1" + comp2Hit);
					var indexField = basis.ownField.indexOf(longvar);
					// console.log(comp2Hit, longvar, indexField);
					if (indexField >= 0) {						
						compTargetIdSub = comp2Hit;
						basis.ownField.splice(indexField, 1);
						// console.log("way 1");
					} else {
						// console.log("way 1 wrong");
						way++;
						// return true;
						flag = false; //comp shoot
						return act.whoseShoot();
					};
				} else if (way == 2) {//down
					comp2Hit = parseInt(temp) + 10;
					if (parseInt(comp2Hit) < 10) {
						comp2Hit = '0' + parseInt(comp2Hit);
					} else {
						comp2Hit = "" + parseInt(comp2Hit);
					};
					var longvar = parseInt("1" + comp2Hit);
					var indexField = basis.ownField.indexOf(longvar);
					// console.log(comp2Hit, longvar, indexField);
					if (indexField >= 0) {						
						compTargetIdSub = comp2Hit;
						basis.ownField.splice(indexField, 1);
						// console.log("way 2");
					} else {
						// console.log("way 2 wrong");
						way++;
						// return true;
						flag = false; //comp shoot
						return act.whoseShoot();
					};
				} else if (way == 3) {//right
					if ( (parseInt(temp)%10) == 9 ) {
						// console.log("way 3 close wall");
						// return true;
						flag = false; //comp shoot
						return act.whoseShoot();
					} else {
						comp2Hit = parseInt(temp) + 1;
						if (parseInt(comp2Hit) < 10) {
							comp2Hit = '0' + parseInt(comp2Hit);
						} else {
							comp2Hit = "" + parseInt(comp2Hit);
						};
						var longvar = parseInt("1" + comp2Hit);
						var indexField = basis.ownField.indexOf(longvar);
						// console.log(comp2Hit, longvar, indexField);
						if (indexField >= 0) {						
							compTargetIdSub = comp2Hit;
							basis.ownField.splice(indexField, 1);
							// console.log("way 3");
						} else {
							// console.log("way 3 wrong");
							way++;
							// return true;
							flag = false; //comp shoot
							return act.whoseShoot();
						};
					};
				} else if (way == 4) {//left
					if ( (parseInt(temp)%10) == 0 ) {
						// console.log("way 4 close wall");
						// return true;
						flag = false; //comp shoot
						return act.whoseShoot();
					} else {
						comp2Hit = parseInt(temp) - 1;
						if (parseInt(comp2Hit) < 10) {
							comp2Hit = '0' + parseInt(comp2Hit);
						} else {
							comp2Hit = "" + parseInt(comp2Hit);
						};
						var longvar = parseInt("1" + comp2Hit);
						var indexField = basis.ownField.indexOf(longvar);
						// console.log(comp2Hit, longvar, indexField);
						if (indexField >= 0) {						
							compTargetIdSub = comp2Hit;
							basis.ownField.splice(indexField, 1);
							// console.log("way 4");
						} else {
							// console.log("way 4 wrong");
							alert('error AI');
							return true;
						};
					};					

				};
			};

		} else {//random cell
			var rand = Math.floor(Math.random()*basis.ownField.length);
			var compTargetId = basis.ownField[rand];
			var compTargetIdSub = ("" + compTargetId).substring(1);
			// var cell = document.getElementById(compTargetId);
			basis.ownField.splice(rand, 1);			
		};

		for (var i = 0; i < basis.numShips; i++) {
			var ship = basis.ownShips[i];
			var sizeShip = ship.sizes;
			var index = ship.locations.indexOf(compTargetIdSub);

			if (index >= 0) {
				ship.hits[index] = "hit";
				view.displayHit('1' + compTargetIdSub);
				view.displayMessage("Противник попал");
				console.log("comp 2 HIT: " + compTargetIdSub);
				////////////for AI
				if (compHit == false) {
					compHit = true; //есть попадание
					comp1Hit = compTargetIdSub; //координаты первого попадания
				};

				if ((rightWay == false) && (firstMove == true)) {
					rightWay = true;
				};
				compNextHit = compTargetIdSub;
				/////////////
				if (act.isSunk(ship, sizeShip, '1')) {
					view.displayMessage("Противник потопил ваш корабль!");				
					// console.log("comp 3 sank your battleship");
					basis.ownShipsSunk ++;
					var compSunkShip = document.getElementById("compSunkShip");
					compSunkShip.innerHTML = basis.ownShipsSunk;
					// console.log("ownShipsSunk " + basis.ownShipsSunk);
					//////////////for AI
					compHit = false;
					comp1Hit = 0;
					comp2Hit = 0;
					way = 1; //1-up, 2-down, 3-right, 4-left
					rightWay = false;
					firstMove = false;
					////////////
					if (basis.ownShipsSunk == 10) {
						alert("Вы проиграли!");
						return true;
					};
				};
				flag = false; //comp shoot
				return act.whoseShoot();
			};

		};

		view.displayMiss('1' + compTargetIdSub);
		view.displayMessage("Противник промахнулся");
		// console.log("comp 4 missed");
		///////for AI
		rightWay = false;
		firstMove = false;
		/////////
		flag = true; //our shoot
		return act.whoseShoot();

		/*if (cell.classList.contains('ship')){
			cell.className += " hit ";
			flag = false; //comp shoot
			return act.whoseShoot();			
		} else {
			cell.className += " miss ";
			flag = true; //our shoot
			return act.whoseShoot();
		};*/

	},

	//whose shoot //чей выстрел
	whoseShoot: function(){
		if (flag) {
			act.ourShoot();
		} else {
			setTimeout('act.compShoot()', 500);//задержка перед ходом компьютера
			// act.compShoot();
		};
	},

	//is ship sunk? //потоплен ли корабль?
	isSunk: function(ship, sizeShip, num) {
		for (var i = 0; i < sizeShip; i++)  {
			if (ship.hits[i] !== "hit") {
				return false;
			};
		};
		for (var i = 0; i < sizeShip; i++) {
			// console.log(ship.locations[i]);
			view.displaySunk(num + ship.locations[i]);
		};
	    return true;
	},

	//меньше десяти?
	/*isLessTen: function (coord) {
		if ( parseInt(coord) < 10 ) { 
			coord = "0" +  parseInt(coord);
		} else {
			coord = "" + parseInt(coord); 
		};		
	},*/

};

$(document).ready(function() {
    $('#newGame').click(function() {
      location.reload();
    });
});

window.onload = main;

//main function //главная функция
function main(){
	var yourName = prompt("Введите Ваше имя", "Фукс");
	var userName = document.getElementById("userName");
	if (yourName == null) {yourName = "Лом";};
	userName.innerHTML = yourName;

	basis.generateShipLocations(basis.ownShips, '1');
	basis.generateShipLocations(basis.enemyShips, '2');

	act.whoseShoot();
};
	
