/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-05-03 17:06:26
 * @version $Id$
 */

/**
* 对task21.js的进一步封装
*/

window.onload = function () {
	new MyTags('tagContainer', 'input');
	new MyHobbies('hobbyContainer', 'textarea');
}

//父“类”: MySuperClass
function MySuperClass(id, input) {
	//父属性
	this.arrTags = [];
	this.oDiv = document.getElementById(id);
	this.oTxt = this.oDiv.getElementsByTagName(input)[0];
	this.divTags = this.oDiv.getElementsByTagName('div')[0];
}

//父方法：渲染
MySuperClass.prototype.render = function() {
	var items = '';
 	for(var i = 0; i < this.arrTags.length; i ++) {
 		items = items + "<span class='tags'>" + this.arrTags[i] + "</span>";
 	}
	this.divTags.innerHTML = items;
	this.addMouseOver();
}

//父方法：添加事件
MySuperClass.prototype.addMouseOver = function () {
	var _this = this;
	var aSpan = this.divTags.getElementsByTagName('span');
	for(var i = 0; i < aSpan.length; i++) {
		aSpan[i].onmouseover = function () {
			this.innerHTML = "删除" + this.innerHTML;
			this.style.background = "#f00";
		}
		aSpan[i].onmouseout = function () {
			this.innerHTML = this.innerHTML.substring(2);
			this.style.background = "#3DE6FF";
		}
		aSpan[i].onclick = function () {
			_this.arrTags.splice(_this.arrTags.indexOf(this.innerHTML.substring(2)), 1);
			_this.render();
		}	
	}
}

//父方法：添加数据
MySuperClass.prototype.addData = function (content) {
	if(content != '' && this.arrTags.indexOf(content) == -1) {
		if(this.arrTags.length == 10) {
			this.arrTags.pop();
		}
		this.arrTags.unshift(content);
	}
}

//子“类”: MyTags
function MyTags(id, input) {
	var _this = this;
	//继承MySuperClass属性
	MySuperClass.call(this, id, input);

	this.oTxt.onkeydown = function(ev) {
 		_this.onKeyDown(ev);
 	}
}

//继承MySuperClass方法
for(var i in MySuperClass.prototype) {
	MyTags.prototype[i] = MySuperClass.prototype[i];
}

//子"类"自己的方法
MyTags.prototype.onKeyDown = function(ev) {
 	var oEvent = ev || window.event;
	var kc = oEvent.keyCode;
	//32是空格，13是回车，188是逗号
	if(kc == 32 || kc == 13 || kc==188) {
		var tagContent = this.oTxt.value;
		if(kc!=188) {
			tagContent = tagContent.trim(); //如果不是逗号，trim()一下
		} else {
			tagContent = tagContent.substring(0, tagContent.length-1); //去掉逗号
		}
		this.addData(tagContent); //添加数据
		this.oTxt.value = '';//清空输入框
		this.render();//渲染
	}
 }

//子“类”: MyHobbies
function MyHobbies(id, input) {
	var _this = this;
	//继承MySuperClass属性
	MySuperClass.call(this, id, input);
	//子“类”属性
	this.oBtn = this.oDiv.getElementsByTagName('button')[0];
	this.oBtn.onclick = function(ev) {
		_this.onClick(ev);
	}
}

//继承MySuperClass方法
for(var i in MySuperClass.prototype) {
	MyHobbies.prototype[i] = MySuperClass.prototype[i];
}

//子"类"自己的方法
MyHobbies.prototype.onClick = function () {
	var str = this.oTxt.value.trim();
	var arr = str.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(element) {
			return element.length > 0 && element != null ? true : false;
	});
	for(var i = 0; i < arr.length; i++) {
		this.addData(arr[i]); //添加数据
	}
	this.oTxt.value = ''; //清空输入框
	this.render(); //渲染
}