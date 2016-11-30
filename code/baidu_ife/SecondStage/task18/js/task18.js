/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-04-24 10:57:37
 * @version $Id$
 */
window.onload = function() {
	var numInput = document.getElementById('numInput');
	var leftIn = document.getElementById('left-in');
	var rightIn = document.getElementById('right-in');
	var leftOut = document.getElementById('left-out');
	var rightOut = document.getElementById('right-out');
	var seque = document.getElementById('seque');
	leftIn.onclick = function () {
		handler(seque, "li");
	};
	rightIn.onclick = function() {
		handler(seque, "ri");
	};
	leftOut.onclick = function() {
		handler(seque, "lo");
	};
	rightOut.onclick = function () {
		handler(seque, "ro");
	}
}

function handler(obj, deal) {
	if(deal == "li" || deal == "ri") {
		if(numInput.value.match(/^[\d]+$/)) {
			if(deal == "li") {
				seque.innerHTML = "<span>" + numInput.value + "</span>" 
					+ seque.innerHTML;
			} else {
				seque.innerHTML += "<span>" + numInput.value + "</span>";
			}
		} else {
			alert('请输入数字！');
		}
		numInput.value = '';
	} else if(deal == 'lo' && obj.firstChild) {
		alert(obj.removeChild(obj.firstChild).innerHTML);
	} else if(obj.lastChild){
		alert(obj.removeChild(obj.lastChild).innerHTML);
	} else {
		alert('队列为空！');
	}
	
}