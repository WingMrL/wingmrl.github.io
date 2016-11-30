/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-04-22 11:39:32
 * @version $Id$
 */
/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = ''
    for (var i = 1; i < 102; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
	var oDiv = document.querySelector(".aqi-chart-wrap");
	var sCity = pageState.nowSelectCity;
	var sTime = pageState.nowGraTime;
	var items = '';
	var width = Math.floor(640/chartData[sCity][sTime].length);
	var date = new Date("2016-01-01");
	for(var i = 0; i < chartData[sCity][sTime].length; i++) {

		var color = "#" + Math.floor((Math.random()*0xFFFFFF)).toString(16);

		items += "<span style='background-color: " + color + "; height: "
			+ chartData[sCity][sTime][i] + "px; width: "
			+ width + "px; margin-left: " + (width-1) 
			+ "px;' title='" + getTitle() + "，空气质量：" + chartData[sCity][sTime][i]
			+ "'></span>";
	}
	oDiv.innerHTML = items;
	function getTitle() {
		var title = '';
		switch(sTime) {
			case "day":
				title = getDateStr(date);
				date.setDate(date.getDate() + 1);
				break;
			case "week":
				title = "第" + (i + 1) + "周";
				break;
			case "month":
				title = "第" + (i + 1) + "月";
				break;
		}
		return title;
	}
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(graTime) {
    // 确定是否选项发生了变化 
    if(pageState.nowGraTime == graTime) {
    	return ;
    }
    // 设置对应数据
    pageState.nowGraTime = graTime;
    // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(selectCity) {
    // 确定是否选项发生了变化 
    if(pageState.nowSelectCity == selectCity) {
    	return ;
    }
    // 设置对应数据
    pageState.nowSelectCity = selectCity;
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
	var aGraTime = document.getElementsByName('gra-time');
	for(var i = 0; i < aGraTime.length; i ++) {
		aGraTime[i].onclick = function () {
			graTimeChange(this.value);
		};
	}
	pageState.nowGraTime = "day";
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var oCitySelect = document.getElementById('city-select');
    var aCity = Object.getOwnPropertyNames(aqiSourceData);
    var items = '';
    for(var i = 0; i < aCity.length; i ++) {
    	items += "<option data-city='"+ aCity[i] +"'>" + aCity[i] + "</option>";
    }
    oCitySelect.innerHTML = items;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    oCitySelect.onchange = function () {
    	citySelectChange(this.value);
    }
    pageState.nowSelectCity="北京";
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中

    for(var city in aqiSourceData) {

    	var dayData = [];
	    var weekData = [];
	    var monthData = [];

		var oDate = new Date("2016-01-01");
		var curDay = oDate.getDay();
		var weekDateNum = 0;
		var curMonth = "01";
		var monthDateNum = 0;
    	var tempWeekData = 0;
    	var tempMonthData = 0;

    	for(var day in aqiSourceData[city]) {
    		//日数据
    		dayData.push(aqiSourceData[city][day]);
    		//周数据
    		tempWeekData += aqiSourceData[city][day];
    		weekDateNum ++;
    		if((curDay + 1) % 7 == 0) {
    			weekData.push(Math.ceil(tempWeekData/weekDateNum));
    			curDay = 0;
    			tempWeekData = 0;
    			weekDateNum = 0;
    		} else {
    			curDay ++;
    		}
    		//月数据
    		if(curMonth != day.slice(5,7)) {
    			monthData.push(Math.ceil(tempMonthData/monthDateNum));
    			curMonth = day.slice(5,7);
    			tempMonthData = 0;
    			monthDateNum = 0;
    		} else {
    			tempMonthData += aqiSourceData[city][day];
    			monthDateNum ++;
    		}
    	}
    	weekData.push(Math.ceil(tempWeekData/weekDateNum));
    	monthData.push(Math.ceil(tempMonthData/monthDateNum));
    	chartData[city] = {
    		day: dayData,
    		week: weekData,
    		month: monthData
    	}
    }
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
    renderChart();
}

init();
