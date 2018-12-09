const rand = function(num) {
	return Math.floor(Math.random() * num - 1);
};

const xArr = [250, 350, 450];
const yArr = [80, 150, 120];
const xgArr = [350, 450]

alert("Press OK to Start")

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
colorArray = ['red', 'green', 'orange', 'blue', 'white', 'yellow', 'grey', 'brown', 'purple']

const leftKey = 37;
const rightKey = 39;

const playerImg = new Image();
playerImg.src = "http://www.clker.com/cliparts/J/W/v/e/2/z/vertical-top-view-of-car.svg"
const carImg = new Image();
carImg.src = "http://cars80.com/images/8-luxury-car-nice-picture.jpg"
const goldImg = new Image();
goldImg.src = "https://vignette.wikia.nocookie.net/miitopia/images/1/1f/Gold_Coin.png/revision/latest?cb=20180707040616"

const player = {
			x: 345,
			y: 650,
			xDelta : 0,
			width: 30,
			height: 30,
			speed: 6,
			color: "blue",
			lives: 100,
			score: 0,
			image: playerImg,
			draw: function() {
				context.fillStyle = this.color;
				context.fillRect(this.x, this.y, this.width, this.height);
				context.drawImage(this.image, this.x-52, this.y-35, 130, 115);
			},
			update: function() {
				
				if(this.x + this.width <= 500 && this.x >= 210){
					this.x += this.xDelta;
				}
				else if(this.x + this.width >= 500){
					this.x = 470;
	
				}
				else{
					this.x = 210;
				}
				this.xCenter = this.x + this.width/2;
				this.yCenter = this.y + this.height/2;

			}

};

let carArr = [];
let goldArr = [];
const generateCars = function(count){
	for (let i = 0; i < count; i++){
		carArr[i] = {
			x: xArr[rand(5)],
			y: 0 - yArr[rand(3)],
			yDelta: 4,
			width: 30,
    		height: 50,
    		color: 'red',
    		image: carImg,
   			draw: function(){
    			context.fillStyle = this.color;
				context.fillRect(this.x, this.y, this.width, this.height);
				context.drawImage(this.image, this.x, this.y, 40, 65);

    		},
    		update: function(){
    			this.y += this.yDelta;
    			this.xCenter = this.x + this.width/2;
				this.yCenter = this.y + this.height/2;
    		}
		};
	};
};
generateCars(4)
setInterval(function(){ generateCars(4) }, 4000);

const generateGold = function(count){
	for (let i = 0; i < count; i++){
		goldArr[i] = {
			x: xgArr[rand(2)],
			y: 0 - yArr[rand(3)],
			yDelta: 3,
			width: 25,
    		height: 25,
    		color: 'red',
    		image: goldImg,
   			draw: function(){
    			context.fillStyle = this.color;
				context.fillRect(this.x, this.y, this.width, this.height);
				context.drawImage(this.image, this.x - 15, this.y - 15, 45, 45);

    		},
    		update: function(){
    			this.y += this.yDelta;
    			this.xCenter = this.x + this.width/2;
				this.yCenter = this.y + this.height/2;
    		}
		};
	};
};
generateGold(2)
setInterval(function(){ generateGold(4) }, 7000);

document.addEventListener('keydown', function (event) {
                if (event.keyCode === leftKey && (player.x - player.xDelta) >= 0) {
                    player.xDelta = -1 * player.speed;
                }
                if (event.keyCode === rightKey && (player.x + player.width + player.xDelta) <= canvas.width) {
                    player.xDelta = 1 * player.speed;
                }
            }, false);
            document.addEventListener('keyup', function (event) {
                if (event.keyCode === leftKey || event.keyCode === rightKey) {
                    player.xDelta = 0;
                }
}, false);

const draw = function() {
	
	context.fillStyle = 'black';
	context.fillRect(0, 0, canvas.width, canvas.height);

	context.fillStyle = 'white';
	context.fillRect(200, 0, 10, 800);

	context.fillStyle = 'white';
	context.fillRect(400, 0, 10, 800);

	context.fillStyle = 'white';
	context.fillRect(300, 0, 10, 800);

	context.fillStyle = 'white';
	context.fillRect(500, 0, 10, 800);

	context.fillStyle = 'green';
	context.fillRect(0, 0, 200, 800);

	context.fillStyle = 'green';
	context.fillRect(510, 0, 300, 800);

	context.fillStyle = 'red';
	context.fillRect(505, 0, 5, 800);

	context.fillStyle = 'red';
	context.fillRect(200, 0, 5, 800);

	
	context.font = "30px Arial";
	context.strokeText("Lives: " + player.lives,10,50);

	context.font = "30px Arial";
	context.strokeText("Score: " + player.score,10,100);

	player.draw();
	}

const collisionDetection = function(a, b){
	return a.x < b.x + b.width &&
		   a.x + a.width > b.x &&
		   a.y < b.y + b.height &&
		   a.y + a.height > b.y;
}


const update = function() {
		player.update();
		if(collisionDetection(carArr[0], player) || collisionDetection(carArr[1], player) || collisionDetection(carArr[2], player || collisionDetection(carArr[3], player))){
			player.lives -= 1;
		}
		if(collisionDetection(goldArr[0], player) || collisionDetection(goldArr[1], player)){
			player.score += 1;
		}
		}
		

const liveCount = function(){
	if(player.color = "white"){
		player.lives += 1;
	}
};

const scoreCount = function(){
	if(player.color = "white"){
		player.score += 1;
	}
};

const loop = function() {
	
	draw();

	update();

	for(let i = 0; i < carArr.length; i++){
		carArr[i].draw();
		carArr[i].update();
	}

	for(let i = 0; i < goldArr.length; i++){
		goldArr[i].draw();
		goldArr[i].update();
	}

	if(player.lives <= 0){
			alert("Game Over")
		}

	if(player.score >= 200){
			alert("YOU WON!!!")
		}
	
	requestAnimationFrame(loop);
};

loop();