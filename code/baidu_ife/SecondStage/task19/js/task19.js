/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-04-24 14:56:06
 * @version $Id$
 */

var sorting = false;

window.onload = function () {
	var leftIn = document.getElementById('leftIn');
	var rightIn = document.getElementById('rightIn');
	var leftOut = document.getElementById('leftOut');
	var rightOut = document.getElementById('rightOut');
	var randomProduce = document.getElementById('randomProduce');
	var qSort = document.getElementById('qSort');
	var arr = []; //存放队列
	var tempArr = []; //是arr[]的临时arr, 用快排把交换的下标记录在delayArr
	var delayArr = []; //动画序列，记录交换的下标

	leftIn.onclick = function () {
		if(!sorting) {
			handler("li", arr);
		} else {
			alert('正在排序呢');
		}
	};
	rightIn.onclick = function () {
		if(!sorting) {
			handler("ri", arr);
		} else {
			alert('正在排序呢');
		}
	};
	leftOut.onclick = function () {
		if(!sorting) {
			handler("lo", arr);
		} else {
			alert('正在排序呢');
		}
	};
	rightOut.onclick = function () {
		if(!sorting) {
			handler("ro", arr);
		} else {
			alert('正在排序呢');
		}
	};

	randomProduce.onclick = function () {
		if(!sorting) {
			produceNums(arr);
			render(arr);
		} else {
			alert('正在排序呢');
		}
	};
	qSort.onclick = function () {
		if(!sorting) {
			delayArr = [];
			tempArr = arr.slice(0); //复制arr到tempArr
			quickSort(tempArr, 0, tempArr.length-1, delayArr);
			//开始序列动画
			myAnimation(arr, delayArr);
		} else {
			alert('正在排序呢');
		}
	};
}


//处理左右入，左右出
function handler(deal, list) {
	var seque = document.getElementById('seque');
	var numInput = document.getElementById('numInput');
	if(deal == "li" || deal == "ri") {
		if(numInput.value.match(/^[\d]+$/) && numInput.value >= 10 && numInput.value <= 100) {
			if(list.length < 60) {
				if(deal == "li") {
					seque.innerHTML = "<span style='height: " + (numInput.value << 2) 
						+ "px;'></span>" + seque.innerHTML;
					list.unshift(numInput.value);
				} else {
					seque.innerHTML += "<span style='height: " + (numInput.value << 2) 
						+ "px;'></span>";
					list.push(numInput.value);
				}
			} else {
				alert('队长最多为60!');
			}
		} else {
			alert('请请输入10~100的整数!');
		}
		numInput.value = '';
	} else if(list.length > 0){
		if(deal == 'lo') {
			seque.removeChild(seque.firstChild);
			list.shift();
		} else {
			seque.removeChild(seque.lastChild);
			list.pop();
		}
	} else {
		alert('队列为空！');
	}
}

//渲染
function render(list, pivot) {
	var seque = document.getElementById('seque');
	var items = '';
	for(var i = 0; i < list.length; i ++) {
		if(i == pivot) {
			items += "<span style='background-color: blue; height: " + (list[i] << 2) 
						+ "px;'></span>";
		} else {
			if(list[i] < list[pivot]) {
				items += "<span style='background-color: green; height: " + (list[i] << 2) 
						+ "px;'></span>";
			} else if(list[i] >= list[pivot]){
				items += "<span style='background-color: red; height: " + (list[i] << 2) 
						+ "px;'></span>";
			} else {
				items += "<span style='height: " + (list[i] << 2) 
						+ "px;'></span>";
			}
		}
	}
	seque.innerHTML = items;
}

//产生随机数
function produceNums(list) {
	for(var i = 0; i < 60; i ++) {
		list[i] = Math.round(Math.random() * (100 - 10) + 10);
	}
}

function quickSort(list, start, end, delayList) {
	if(start == end) {
		return ;
	}
	var index = paitition(list, start, end, delayList);
	if(index > start) {
		quickSort(list, start, index - 1, delayList);
	}
	if(index < end) {
		quickSort(list, index + 1, end, delayList);
	}
}

function paitition(list, start, end, delayList) {
	var index = Math.floor((start + end) >> 1);
	swap(list, index, end);
	createDelayArr(end, index, end);

	var small = start - 1;
	for(index = start; index < end; index++) {
		if(list[index] < list[end]) {
			small ++;
			if(small != index) {
				swap(list, index, small);
				createDelayArr(end, index, small);
			}
		}
	}
	small ++;
	if(small != end) {
		swap(list, small, end);
		createDelayArr(end, small, end);
	}
	return small;

	function createDelayArr(pivot, index1, index2) {
		delayList.push(pivot);
		delayList.push(index1);
		delayList.push(index2);
	}
}

function swap(list, index1, index2) {
	var temp = list[index1];
	list[index1] = list[index2];
	list[index2] = temp;
}

//序列动画
function myAnimation(list, delayList) {
	speed = document.getElementById('speed').value >> 1 ;
	sorting = true;
	//加入动画序列
	for(var i = 0; i < delayList.length; i += 3) {
		(function(a){
			setTimeout(function(){
				swap(list, delayList[a+1], delayList[a+2]);
				render(list, delayList[a]);
			}, speed * a);
		})(i);
	}
	setTimeout(function() {
		sorting = false;
	}, speed * i);
}