/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-05-03 17:06:26
 * @version $Id$
 */

window.onload = function () {
	new MyTags('tagContainer');
	new MyHobbies('hobbyContainer');
}

//父“类”: MySuperClass
function MySuperClass() {
	//父属性
	this.arrTags = [];
}

//父方法：渲染
MySuperClass.prototype.render = function(obj) {
	var items = '';
 	for(var i = 0; i < this.arrTags.length; i ++) {
 		items = items + "<span class='tags'>" + this.arrTags[i] + "</span>";
 	}
	obj.innerHTML = items;
	this.addMouseOver(obj);
}

//父方法：添加事件
MySuperClass.prototype.addMouseOver = function (obj) {
	var _this = this;
	var aSpan = obj.getElementsByTagName('span');
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
			_this.render(obj);
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
	console.log(content);
}


//子“类”: MyTags
function MyTags(id) {
	//继承MySuperClass属性
	MySuperClass.call(this);

	var _this = this;

	var oDiv = document.getElementById(id);

	//子“类”自己的属性
	this.oTxt = oDiv.getElementsByTagName('input')[0];
	this.divTags = oDiv.getElementsByTagName('div')[0];

	this.oTxt.onkeydown = function(ev) {
 		_this.onKeyDown(ev);
 	}
	
}

//继承MySuperClass方法
MyTags.prototype = new MySuperClass();

//子"类"自己的方法
MyTags.prototype.onKeyDown = function(ev) {
 	var oEvent = ev || window.event;
	var kc = oEvent.keyCode;
	//32是空格，13是回车，188是逗号
	if(kc == 32 || kc == 13 || kc==188) {
		var tagContent = this.oTxt.value;
		
		if(kc!=188) {
			//如果不是逗号，trim()一下
			tagContent = tagContent.trim();
		} else {
			//如果是逗号，去掉逗号
			tagContent = tagContent.substring(0, tagContent.length-1);
		}

		//添加数据
		this.addData(tagContent);
		//清空输入框
		this.oTxt.value = '';
		//渲染
		this.render(this.divTags);
	}
 }

//子“类”: MyHobbies
function MyHobbies(id) {
	//继承MySuperClass属性
	MySuperClass.call(this);

	var _this = this;

	var oDiv = document.getElementById(id);

	//子“类”自己的属性
	this.oTxt = oDiv.getElementsByTagName('textarea')[0];
	this.divTags = oDiv.getElementsByTagName('div')[0];
	this.oBtn = oDiv.getElementsByTagName('button')[0];

	this.oBtn.onclick = function(ev) {
		_this.onClick(ev);
	}
}

//继承MySuperClass方法
MyHobbies.prototype = new MySuperClass();

//子"类"自己的方法
MyHobbies.prototype.onClick = function () {
	var str = this.oTxt.value.trim();
	var arr = str.split(/[^0-9a-zA-Z\u4e00-\u9fa5]+/).filter(function(element) {
			return element.length > 0 && element != null ? true : false;
	});

	for(var i = 0; i < arr.length; i++) {
		//添加数据
		this.addData(arr[i]);
	}
	//清空输入框
	this.oTxt.value = '';
	//渲染
	this.render(this.divTags);
}