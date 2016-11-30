/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-05-03 08:33:59
 * @version $Id$
 */
window.onload = function () {
	var leftIn = document.getElementById('left-in');
	var rightIn = document.getElementById('right-in');
	var leftOut = document.getElementById('left-out');
	var rightOut = document.getElementById('right-out');
	var btnSearch = document.getElementById('btnSearch');
	leftIn.onclick = function (){
		handler('li');
	};
	rightIn.onclick = function (){
		handler('ri');
	};
	leftOut.onclick = function (){
		handler('lo');
	};
	rightOut.onclick = function (){
		handler('ro');
	};
	btnSearch.onclick = function () {
		if(!mySearch()) {
			alert("不好意思！没找到！！！");
		}
	};
}
function mySearch() {
	var isFound = false;
	var seque = document.getElementById('seque');

	//要查找的内容
	var txtContent = document.getElementById('content');
	var str = txtContent.value.trim();
	if(str == '') {
		return isFound;
	}
	var reg = new RegExp(str, 'g');

	for(var i = 0; i < seque.childNodes.length; i++) {
		//先去掉原来innerHTML里面的标签
		var item = seque.childNodes[i].innerHTML.replace(/<.+?>/gim, "");
		if(item.search(str) != -1) {
			isFound = true;
			item = item.replace(reg, "<a class=\"isFound\">"+str+"</a>");
		}
		seque.childNodes[i].innerHTML = item;
	}
	return isFound;
}

function handler(direction) {
	var seque = document.getElementById('seque');
	if(direction === 'li' || direction === 'ri') {
		var oTxt = document.getElementById('numInput');
		var str = oTxt.value.trim();
		var aWord = str.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(element) {
			return element.length > 0 && element != null ? true : false;
		});
		var items = '';
		for(var i = 0; i < aWord.length; i ++) {
			items += "<span>" + aWord[i] + "</span>";
		}
		if(direction === 'li') {
			seque.innerHTML = items + seque.innerHTML;
		} else {
			seque.innerHTML += items;
		}
	} else {
		if(seque.firstChild) {
			if(direction === 'lo') {
				seque.removeChild(seque.firstChild);
			} else {
				seque.removeChild(seque.lastChild);
			}
		} else {
			alert('队列为空');
		}
	}
}