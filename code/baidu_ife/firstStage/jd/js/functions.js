/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-01-25 17:02:30
 * @version $Id$
 */

function loadFuWuBgImgs() {
	var j = -25;
	for(var i=1; i<=12; i++) {
		var bg = document.getElementById("fuwu" + i);
		// console.log(bg);
		var bga = bg.getElementsByTagName("a")[0];
		// console.log(bga);
		var bgi = bga.getElementsByTagName("i")[0];
		bgi.style.background="url(./imgs/shenghuofuwu.png) no-repeat 0 " + (j * i + 25) + "px";
	}
}
window.onload = function() {
	loadFuWuBgImgs();
}

// window.onload = loadFuWuBgImgs(), a();
