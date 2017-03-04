window.requestAnimFrame = (function() {
	return window.requestAnimationFrame 
	|| window.webkitRequestAnimationFrame 
	|| window.mozRequestAnimationFrame 
	|| window.oRequestAnimationFrame 
	|| window.msRequestAnimationFrame 
	|| function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 60);
		};
})();

//计算距离的平方
function calLength2(x1, y1, x2, y2) {
	return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
}

//随机颜色
function randomColor() {
	var col = [0, 1, 2];
	col[0] = Math.random() * 100 + 155;
	col[0] = col[0].toFixed();
	col[1] = Math.random() * 100 + 155;
	col[1] = col[1].toFixed();
	col[2] = Math.random() * 100 + 155;
	col[2] = col[2].toFixed();
	var num = Math.floor(Math.random() * 3);
	col[num] = 0;
	return "rgba(" + col[0] + "," + col[1] + "," + col[2] + ",";
}

//lerp, 即使一个值趋向一个目标值
function lerpAngle(a, b, t) {
	var d = b - a;
	if (d > Math.PI) d = d - 2 * Math.PI;
	if (d < -Math.PI) d = d + 2 * Math.PI;
	return a + d * t;
}

//lerp, 即使一个值趋向一个目标值
function lerpDistance(aim, cur, ratio) {
	var delta = cur - aim;
	return aim + delta * ratio;
}

//判断是否在一个左右上下的范围内
function inOboundary(arrX, arrY, l, r, t, b) { //在l r t b范围内的检测
	return arrX > l && arrX < r && arrY > t && arrY < b;
}


function rgbColor(r, g, b) {
	r = Math.round(r * 256);
	g = Math.round(g * 256);
	b = Math.round(b * 256);
	return "rgba(" + r + "," + g + "," + b + ",1)";
}

function rgbNum(r, g, b) {
	r = Math.round(r * 256);
	g = Math.round(g * 256);
	b = Math.round(b * 256);
	return "rgba(" + r + "," + g + "," + b;
}

function rnd(m) {
	var n = m || 1;
	return Math.random() * n;
}

function rateRandom(m, n) {
	var sum = 0;
	for (var i = 1; i < (n - m); i++) {
		sum += i;

	}

	var ran = Math.random() * sum;

	for (var i = 1; i < (n - m); i++) {
		ran -= i;
		if (ran < 0) {
			return i - 1 + m;
		}
	}
}

function distance(x1, y1, x2, y2, l) {
	var x = Math.abs(x1 - x2);
	var y = Math.abs(y1 - y2);
	if (x < l && y < l) {
		return true;
	}
	return false;
}

function AABBbox(object1, w1, h1, object2, w2, h2, overlap) {
	A1 = object1.x + overlap;
	B1 = object1.x + w1 - overlap;
	C1 = object1.y + overlap;
	D1 = object1.y + h1 - overlap;

	A2 = object2.x + overlap;
	B2 = object2.x + w2 - overlap;
	C2 = object2.y + overlap;
	D2 = object2.y + h2 - overlap;

	if (A1 > B2 || B1 < A2 || C1 > D2 || D1 < C2) return false;
	else return true;
}


//随机m到n的数
function rndi2(m, n) {
	var a = Math.random() * (n - m) + m;
	return Math.floor(a);
}


function setCookie(name, value, iDay) {
	if(isNaN(iDay)) {
		return ;
	}
	var oDate = new Date();
	oDate.setDate(oDate.getDate() + iDay);
	document.cookie = name + '=' + value + ';expires=' + oDate;
}
function getCookie(name) {
	var arr = document.cookie.split('; ');
	for(var i=0; i<arr.length; i++) {
		var arr2 = arr[i].split('=');
		if(arr2[0] == name) {
			return arr2[1];
		}
	}
	return '';
}
function removeCookie(name) {
	setCookie(name, 1, -1);
}