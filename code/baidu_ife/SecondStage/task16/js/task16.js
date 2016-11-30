/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-04-19 12:36:53
 * @version $Id$
 */

/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var oTxtCity = document.getElementById('aqi-city-input');
	var oTxtQuality = document.getElementById('aqi-value-input');
	var txtCityValue = oTxtCity.value.trim();
	var txtQualityValue = oTxtQuality.value.trim();
	if(!txtCityValue.match(/^[a-zA-Z\u4e00-\u9fa5]+$/)) {
		alert("城市名必须为中英文字符!");
		return;
	}
	if(!txtQualityValue.match(/^[\d]+$/)) {
		alert("空气质量指数必须为整数!");
		return;
	}
	aqiData[txtCityValue] = parseInt(txtQualityValue);
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var items = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>"
	for(var city in aqiData) {
		items += "<tr><td>" + city + "</td><td>" 
		+ aqiData[city] + "</td><td>" 
		+ "<a href='javascript:;' data-city='" 
		+ city + "'>删除</a></td></tr>"
	}
	document.getElementById('aqi-table').innerHTML = city ? items : "";
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
    // do sth.
    delete aqiData[city];
    renderAqiList();
}

function init() {

    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    var oBtn = document.getElementById('add-btn');
    oBtn.onclick = function () {
    	addBtnHandle();
    }
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    var oTable = document.getElementById('aqi-table');
    myAddEvent(oTable, 'click', function(ev) {
    	//ev在IE6/7/8为undefined IE9中ev为W3C标准事件对象。
    	//IE6/7/8只支持window.event不支持参数传入
    	var oEvent = ev || window.event;

    	// var myNull = Object.create(null);

    	//firefox: oEvent.target
    	//IE: oEvent.srcElement
    	var oTarget = oEvent.target || oEvent.srcElement;
    	if(oTarget.nodeName.toLowerCase() === 'a') {
    		// delBtnHandle.call(myNull, oTarget.dataset.city);
    		delBtnHandle(oTarget.dataset.city);
    	}

    });
}

function myAddEvent(obj, ev, fn) {
	if(obj.addEventListener) {
		obj.addEventListener(ev, fn, false);
	} else {
		obj.attachEvent('on' + ev, fn);
	}
}

init();
