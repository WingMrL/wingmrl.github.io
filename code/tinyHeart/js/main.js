/**
 * 
 * @authors WingUNO (you@example.org)
 * @date    2016-07-14 11:54:00
 * @version $Id$
 */
var audioEat;

var can1;
var can2;

var ctx1;
var ctx2;

var canWidth;
var canHeight;

//由于用到window.requestAnimationFrame,
//这个api会根据机器的性能，来判断间隔多长时间绘制下一帧
//每帧之间的时间间隔不一样，这样会导致画面的非匀速绘制，
//为了达到匀速的效果，需要用一个变量deltaTime来记住时间间隔
var deltaTime; 
var lastTime;

var bg;
var ane;
var fruit;
var data;
var wave;
var halo;

var baby;
var babyTail = [];
var babyEye = [];
var babyBody = [];

var mom;
var momTail = [];
var momEye = [];
var momBodyOra = [];
var momBodyBlue = [];

var dust;
var dustPic = [];

var mousex;
var mousey;

var URL = "http://7xs0cm.com1.z0.glb.clouddn.com/tinyHeart/";

window.onload = game;

function game() {
	start();
}

//游戏初始化
function init() {
	//获得canvas context
	can1 = document.getElementById("canvas1"); //fishes, dust, UI, circle
	can1.addEventListener('mousemove', onMouseMove, false);
	ctx1 = can1.getContext("2d");
	ctx1.font = "30px Verdana";
	ctx1.textAlign = "center";

	can2 = document.getElementById("canvas2"); //background, ane, fruits
	ctx2 = can2.getContext("2d");

	audioEat = document.getElementById("audio-eat");
	audioEat.src = URL + 'audio/eat.mp3';
	var bgmAudio = document.getElementById("audio-bgm");
	bgmAudio.src = URL + 'audio/bgm.mp3';
	bgmAudio.loop = true;
	bgmAudio.play();

	canWidth = can1.width;
	canHeight = can1.height;

	mousex = canWidth >> 1; // canWidth * 0.5
	mousey = canHeight >> 1;

	bg = new bgObj();
	bg.init();

	ane = new aneObj();
	ane.init();

	fruit = new fruitObj();
	fruit.init();

	mom = new momObj();
	mom.init();

	baby = new babyObj();
	baby.init();

	wave = new waveObj();
	wave.init();

	halo = new haloObj();
	halo.init();

	dust = new dustObj();
	dust.init();

	data = new dataObj();
	data.init();

	for(var i = 0; i < 2; i++) {
		babyEye[i] = new Image();
		momEye[i] = new Image();
		babyEye[i].src = URL + 'imgs/babyEye' + i + '.png';
		momEye[i].src = URL + 'imgs/bigEye' + i + '.png';
	}
	for(var i = 0; i < 8; i++) {
		babyTail[i] = new Image();
		momTail[i] = new Image();
		momBodyOra[i] = new Image();
		momBodyBlue[i] = new Image();
		babyTail[i].src = URL + 'imgs/babyTail' + i + '.png';
		momTail[i].src = URL + 'imgs/bigTail' + i + '.png';
		momBodyOra[i].src = URL + 'imgs/bigSwim' + i + '.png';
		momBodyBlue[i].src = URL + 'imgs/bigSwimBlue' + i + '.png';
	}
	for(var i = 0; i < 7; i++) {
		dustPic[i] = new Image();
		dustPic[i].src = URL + 'imgs/dust' + i + '.png';
	}
	for(var i = 0; i < 20; i++) {
		babyBody[i] = new Image();
		babyBody[i].src = URL + 'imgs/babyFade' + i + '.png';
	}	

	lastTime = Date.now();
	deltaTime = 0;
}

//游戏开始界面
function start() {
	var oA = document.getElementById('play');
	oA.addEventListener('click', click, false);

	function click(e) {
		e.preventDefault();
		init(); //游戏初始化
		gameloop(); //游戏开始
		this.removeEventListener('click', click, false);
		this.className += ' hidden';
	}

}

//游戏帧的循环
function gameloop() {

	updateDeltaTime();

	//每次绘制之前，先把一帧绘制的清空
	ctx1.clearRect(0, 0, canWidth, canHeight);
	ctx2.clearRect(0, 0, canWidth, canHeight);

	bg.draw();
	ane.draw();
	fruit.draw();
	mom.draw();
	baby.draw();
	data.draw();
	wave.draw();
	halo.draw();
	dust.draw();

	monFruitCollision();
	momBabyCollision();

	window.requestAnimFrame(gameloop);
}

//更新deltaTime, 得到上一帧所用的时间
function updateDeltaTime() {
	var now = Date.now();
	deltaTime = now - lastTime;
	lastTime = now;
	if(deltaTime > 40) {
		deltaTime = 40;
	}
}

//获取鼠标的x, y坐标
function onMouseMove(e) {
	if(!data.gameOver) {
		if(e.offSetX) {
			mousex = e.offSetX;
			mousey = e.offSetY;
		} else if(e.layerX) {
			mousex = e.layerX;
			mousey = e.layerY;
		}
	}
}



/*
* 定义背景的类
*/
var bgObj = function() {
	this.bg;
}

bgObj.prototype.init = function() {
	this.bg = new Image();
	this.bg.src = URL + "imgs/background.jpg";
}

bgObj.prototype.draw = function() {
	ctx2.drawImage(this.bg, 0, 0, canWidth, canHeight);
}




/*
* 定义海葵的类
*/
var aneObj = function() {
	//start point, control point, end point;
	this.rootx = []; //海葵的根部 x
	this.headx = []; //海葵的顶部 x
	this.heady = []; //海葵的顶部 y
	this.amp = []; //振幅，摆动的幅度
	this.alpha = 0; //阿尔法，角度
}

//海葵的数量
aneObj.prototype.num = 50;

//海葵的初始化函数
aneObj.prototype.init = function() {
	for(var i = 0; i < this.num; i++) {
		this.rootx[i] = (i << 4) + Math.random() * 20;
		this.headx[i] = this.rootx[i];
		this.heady[i] = canHeight - 250 + Math.random() * 50;
		this.amp[i] = Math.random() * 50 + 40;
	}
}

//海葵的draw方法
aneObj.prototype.draw = function() {
	this.alpha += deltaTime * 0.0008;  //角度随着时间的变大而变大
	var l = Math.sin(this.alpha); //[-1, 1]
	ctx2.save();
	ctx2.globalAlpha = 0.6; //透明度0.6
	ctx2.lineWidth = 20;
	ctx2.lineCap = "round";
	ctx2.strokeStyle = "#3b1542";
	for(var i = 0; i < this.num; i++) {
		var rootx = this.rootx[i];
		ctx2.beginPath();
		ctx2.moveTo(rootx, canHeight);
		this.headx[i] = rootx + l * this.amp[i];
		ctx2.quadraticCurveTo(this.rootx[i], canHeight - 100, this.headx[i], this.heady[i]);
		ctx2.stroke();
	}
	ctx2.restore();
}




/*
* 定义小鱼baby的类
*/
var babyObj = function() {
	this.x;
	this.y;
	this.angle;
	this.babyBody;

	this.babyTailTimer = 0;
	this.babyTailCount = 0;

	this.babyEyeTimer = 0;
	this.babyEyeCount = 0;
	this.babyEyeInterval = 1000;

	this.babyBodyTimer = 0;
	this.babyBodyCount = 0;
}

//小鱼baby初始化的方法
babyObj.prototype.init = function() {
	this.x = (canWidth >> 1) - 50;
	this.y = (canHeight >> 1) + 50;
	this.angle = 0;
}

//小鱼baby的draw方法
babyObj.prototype.draw = function() {

	var momX = mom.x;
	var momY = mom.y;

	//lerp x, y 即使一个值趋向一个目标值
	this.x = lerpDistance(momX, this.x, 0.99);
	this.y = lerpDistance(momY, this.y, 0.99);

	var deltaY = momY - this.y;
	var deltaX = momX- this.x;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI;
	this.angle = lerpAngle(beta, this.angle, 0.6);

	//尾巴轮播
	this.babyTailTimer += deltaTime;
	if(this.babyTailTimer > 50) {
		this.babyTailCount = (this.babyTailCount + 1) % 8;
		this.babyTailTimer %= 50;
	}

	//眼睛轮播
	this.babyEyeTimer += deltaTime;
	if(this.babyEyeTimer > this.babyEyeInterval) {
		this.babyEyeCount = (this.babyEyeCount + 1) % 2;
		this.babyEyeTimer %= this.babyEyeInterval;
		if(this.babyEyeCount == 0) {
			this.babyEyeInterval = Math.random() * 1500 + 2000;
		} else {
			this.babyEyeInterval = 200;
		}
	}

	//身体
	this.babyBodyTimer += (deltaTime + data.level); //data.level
	if(this.babyBodyTimer > 300) {
		this.babyBodyCount ++;
		this.babyBodyTimer %= 300;
		if(this.babyBodyCount > 19) {
			this.babyBodyCount = 19;
			//game over
			data.gameOver = true;
			if(data.score > getCookie('score')) {
				setCookie('score', data.score, 30);
			}
			var oA = document.getElementById('play');
			var oAClass = oA.className;
			oA.className = oAClass.replace(/ hidden/, '');
		}
	}

	ctx1.save();
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);

	var babyTailCount = this.babyTailCount;
	var babyTailImg = babyTail[babyTailCount];
	ctx1.drawImage(babyTailImg, - (babyTailImg.width >> 1) + 23, - (babyTailImg.height >> 1));

	var babyBodyCount = this.babyBodyCount;
	var babyBodyImg = babyBody[babyBodyCount];
	ctx1.drawImage(babyBodyImg, - (babyBodyImg.width >> 1), - (babyBodyImg.height >> 1));

	var babyEyeCount = this.babyEyeCount;
	var babyEyeImg = babyEye[babyEyeCount];
	ctx1.drawImage(babyEyeImg, - (babyEyeImg.width >> 1), - (babyEyeImg.height >> 1));
	ctx1.restore();
}




/*
* 定义大鱼mom的类
*/
var momObj = function() {
	this.x;
	this.y;
	this.angle;

	this.momTailTimer = 0;
	this.momTailCount = 0;

	this.momEyeTimer = 0;
	this.momEyeCount = 0;
	this.momEyeInterval = 1000;

	this.momBodyCount = 0;
}

//大鱼的初始化方法
momObj.prototype.init = function () {
	this.x = canWidth >> 1;
	this.y = canHeight >> 1;
	this.angle = 0;
}

//大鱼的draw方法
momObj.prototype.draw = function() {

	// var lev = data.level < 10 ? data.level : 10;
	// var ratio = data.level * 0.0005 + 0.98;

	//lerp x, y 即使一个值趋向一个目标值
	this.x = lerpDistance(mousex, this.x, 0.98);
	this.y = lerpDistance(mousey, this.y, 0.98);

	//delta angle
	var deltaY = mousey - this.y;
	var deltaX = mousex - this.x;
	var beta = Math.atan2(deltaY, deltaX) + Math.PI; //the value returned in [-PI, PI], so, + Math.PI

	//lerp angle
	this.angle = lerpAngle(beta, this.angle, 0.9);

	//Tail
	this.momTailTimer += deltaTime;
	if(this.momTailTimer > 50) {
		this.momTailCount = (this.momTailCount + 1) % 8;
		this.momTailTimer %= 50;
	}

	//Eye
	this.momEyeTimer += deltaTime;
	if(this.momEyeTimer > this.momEyeInterval) {
		this.momEyeCount = (this.momEyeCount + 1) % 2;
		this.momEyeTimer %= this.momEyeInterval;
		if(this.momEyeCount == 0) {
			this.momEyeInterval = Math.random() * 1500 + 2000;
		} else {
			this.momEyeInterval = 200;
		}
	}


	ctx1.save();
	ctx1.translate(this.x, this.y);
	ctx1.rotate(this.angle);

	var momTailCount = this.momTailCount;
	var momTailImg = momTail[momTailCount];
	ctx1.drawImage(momTailImg,  - (momTailImg.width >> 1) + 30, - (momTailImg.height >> 1));

	var momBodyCount = this.momBodyCount;
	if(data.double == 1)  {//orange
		var momBodyImg = momBodyOra[momBodyCount];
	} else {
		var momBodyImg = momBodyBlue[momBodyCount];
	}
	ctx1.drawImage(momBodyImg,  - (momBodyImg.width >> 1), - (momBodyImg.height >> 1));
	

	var momEyeCount = this.momEyeCount;
	var momEyeImg = momEye[momEyeCount];
	ctx1.drawImage(momEyeImg, - (momEyeImg.width >> 1), - (momEyeImg.height >> 1));
	ctx1.restore();
}



/*
* 定义数据的类, 记录相关数据
*/
var dataObj = function() {
	this.fruitNum;
	this.double;
	this.score;
	this.gameOver;
	this.alpha;
	this.level;
	this.bestScore;
}

//数据重置方法
dataObj.prototype.reset = function() {
	this.fruitNum = 0;
	this.double = 1;
}

//数据的初始化方法
dataObj.prototype.init = function() {
	this.fruitNum = 0;
	this.double = 1;
	this.score = 0;
	this.gameOver = false;
	this.alpha = 0;
	this.level = 1;
	var bestScore = getCookie('score');
	if(bestScore != '') {
		this.bestScore = bestScore;
	} else {
		this.bestScore = 0;
	}
}

//数据的draw方法
dataObj.prototype.draw = function() {
	ctx1.save();
	ctx1.fillStyle = 'white';
	ctx1.shadowBlur = 10;
	ctx1.shadowColor = 'white';
	ctx1.fillText("SCORE: " + this.score, canWidth >> 1, canHeight - 50);
	ctx1.fillText("LEVEL: " + this.level, canWidth >> 1, 40);
	ctx1.fillText("BEST SCORE: " + (this.bestScore > this.score ? this.bestScore : this.score), canWidth >> 1, canHeight - 15);
	if(data.gameOver) {
		this.alpha += deltaTime * 0.0005;
		if(this.alpha > 1) {
			this.alpha = 1;
		}
		ctx1.fillStyle = "rgba(255, 255, 255, " + this.alpha + ")";
		ctx1.fillText("GAME OVER", canWidth >> 1, canHeight >> 1);
	}
	ctx1.restore();
}

//数据增加分数的方法
dataObj.prototype.addScore = function() {
	this.score += this.fruitNum * 100 * this.double;
	var level = Math.floor(this.score / 1000) + 1;
	this.setLevel(level);
	this.reset();
}

dataObj.prototype.setLevel = function(level) {
	this.level = level;
}



/*
* 定义果实的类，即橙色和蓝色的食物
*/
var fruitObj = function() {
	this.alive = []; //bool
	this.x = [];
	this.y = [];
	this.l = [];
	this.aneNO = [];
	this.spd = [];
	this.fruitType = [];
	this.orange;
	this.blue;
}

//果实的数量
fruitObj.prototype.num = 15;

//果实的初始化方法
fruitObj.prototype.init = function() {
	this.orange = new Image();
	this.blue = new Image();
	this.orange.src = URL + "imgs/fruit.png";
	this.blue.src = URL + "imgs/blue.png";
	for(var i = 0; i < this.num; i++) {
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.l[i] = 0;
		this.aneNO[i] = 0;
		this.spd[i] = 0;
		this.fruitType[i] = '';
		this.born(i);
	}
}

//果实的draw方法
fruitObj.prototype.draw = function() {
	// fruitMonitor();
	for(var i = 0; i < this.num; i++) {
		//find an ane, grow up, fly up
		if(this.alive[i]) {
			if(this.fruitType[i] == 'blue') {
				var pic = this.blue;
			} else {
				var pic = this.orange;
			}
			if(this.l[i] <= 14) {
				var NO = this.aneNO[i];
				this.x[i] = ane.headx[NO];
				this.y[i] = ane.heady[NO];
				this.l[i] += this.spd[i] * deltaTime;	
			} else {
				this.y[i] -= this.spd[i] * 5 * deltaTime;
			}
			ctx2.drawImage(pic, this.x[i] - (this.l[i] >> 1), this.y[i] - (this.l[i] >> 1), this.l[i], this.l[i]);
			if(this.y[i] < 10) {
				this.dead(i);
			}
		}
	}
}

//果实的产生方法
fruitObj.prototype.born = function(i) {
	this.aneNO[i] = Math.floor(Math.random() * ane.num);
	this.l[i] = 0;
	this.spd[i] = Math.random() * 0.017 + 0.003;
	this.alive[i] = true;

	var ran = Math.random();
	if(ran < 0.2) {
		this.fruitType[i] = "blue";
	} else {
		this.fruitType[i] = "orange";
	}
}

//果实的被吃掉后执行的方法
fruitObj.prototype.dead = function(i) {
	this.alive[i] = false;
	this.born(i);
}


//大鱼和果实的碰撞检测
function monFruitCollision() {
	if(!data.gameOver) {
		for(var i = 0; i < fruit.num; i++) {
			if(fruit.alive[i]) {
				//calculate distance
				var l = calLength2(fruit.x[i], fruit.y[i], mom.x, mom.y);
				if(l < 600) {
					audioEat.play();
					data.fruitNum ++;
					mom.momBodyCount ++;
					if(mom.momBodyCount > 7) {
						mom.momBodyCount = 7;
					}
					if(fruit.fruitType[i] == 'blue') {
						data.double = 2;
					}
					wave.born(fruit.x[i], fruit.y[i]);
					fruit.dead(i);
				}
			}
		}
	}
	
}

//大鱼和小鱼的碰撞检测
function momBabyCollision() {
	if(data.fruitNum > 0 && !data.gameOver) {
		var l = calLength2(mom.x, mom.y, baby.x, baby.y);
		if(l < 900) {
			audioEat.play();
			baby.babyBodyCount = 0;
			mom.momBodyCount = 0;
			data.addScore();
			halo.born(baby.x, baby.y);
		}
	}
}



/*
* 定义波浪的类，即大鱼和果实的碰撞，会产生波浪
*/
var waveObj = function() {
	this.x = [];
	this.y = [];
	this.alive = [];
	this.r = [];
}

//波浪的数量
waveObj.prototype.num = 5;

//波浪初始化的方法
waveObj.prototype.init = function() {
	for(var i = 0; i < this.num; i++) {
		this.alive[i] = false;
		this.r[i] = 0;
	}
}

//波浪的draw方法
waveObj.prototype.draw = function() {
	for(var i = 0; i < this.num; i++) {
		if(this.alive[i]) {
			ctx1.save();
			ctx1.lineWidth = 2;
			ctx1.shadowBlur = 10;
			ctx1.shadowColor = "white";
			this.r[i] += deltaTime * 0.04;
			if(this.r[i] > 50) {
				this.alive[i] = false;
				break;
			}
			var alpha = 1 - this.r[i] / 50;
			ctx1.beginPath();
			ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI << 1);
			ctx1.closePath();
			ctx1.strokeStyle = "rgba(255, 255, 255, " + alpha + ")";
			ctx1.stroke();
			ctx1.restore();
		}
	}
}

//波浪的出生方法
waveObj.prototype.born = function(x, y) {
	for(var i = 0; i < this.num; i++) {
		if(!this.alive[i]) {
			this.alive[i] = true;
			this.x[i] = x;
			this.y[i] = y; 
			this.r[i] = 10;
			return ;
		}
	}
}





/*
* 定义光环的类，即大鱼喂小鱼，小鱼会产生光环
*/
var haloObj = function() {
	this.x = [];
	this.y = [];
	this.alive = [];
	this.r = [];
}

//光环的数量
haloObj.prototype.num = 2;

//光环的初始化方法
haloObj.prototype.init = function() {
	for(var i = 0; i < this.num; i++) {
		this.x[i] = 0;
		this.y[i] = 0;
		this.alive[i] = false;
		this.r[i] = 0;
	}
}

//光环的draw方法
haloObj.prototype.draw = function() {
	ctx1.save();
	ctx1.lineWidth = 2;
	ctx1.shadowBlur = 10;
	ctx1.shadowColor = "rgba(203, 91, 0, 1)";
	for(var i = 0; i < this.num; i++) {
		if(this.alive[i]) {
			//draw
			this.r[i] += deltaTime * 0.06	;
			if(this.r[i] > 100) {
				this.alive[i] = false;
				break;
			}
			var alpha = 1 - this.r[i] / 100;

			ctx1.beginPath();
			ctx1.arc(this.x[i], this.y[i], this.r[i], 0, Math.PI << 1);
			ctx1.closePath();
			ctx1.strokeStyle = "rgba(203, 91, 0, " + alpha + ")";
			ctx1.stroke();
		}
	}
	ctx1.restore();
}

//光环的产生方法
haloObj.prototype.born = function(x, y) {
	for(var i = 0; i < this.num; i++) {
		if(!this.alive[i]) {
			this.x[i] = x;
			this.y[i] = y;
			this.r[i] = 10;
			this.alive[i] = true;
			return;
		}
	}
}




/*
* 定义海中的漂浮物
*/
var dustObj = function() {
	this.x = [];
	this.y = [];
	this.amp = []; //振幅，摆动的幅度
	this.NO = []; //选一张图片

	this.alpha = 0; //正弦的角度
}

//漂浮物的数量
dustObj.prototype.num = 30;

//漂浮物的初始化方法
dustObj.prototype.init = function() {
	for(var i = 0; i < this.num; i++) {
		this.x[i] = Math.random() * canWidth;
		this.y[i] = Math.random() * canHeight;
		this.amp[i] = Math.random() * 25 + 20;
		this.NO[i] = Math.floor(Math.random() * 7); //[0, 6]
		this.alpha = 0;
	}
	this.alpha = 0;
}

//漂浮物的draw方法
dustObj.prototype.draw = function() {
	this.alpha += deltaTime * 0.0008;
	var l = Math.sin(this.alpha);
	for(var i = 0; i < this.num; i++) {
		var no = this.NO[i];
		ctx1.drawImage(dustPic[no], this.x[i] + l * this.amp[i], this.y[i]);
	}
}