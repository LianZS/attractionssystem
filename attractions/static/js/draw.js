function CommentRadar(idname, jsondata) {
    len = jsondata.length;
    indicatorList = new Array(len);
    valueList = new Array(len);
    for (let i = 0; i < len; i++) {
        item = jsondata[i];
        adjectives = item['adjectives'];
        rate = item['rate'];

        indicatorList[i] = {
            name: adjectives,
            max: 100,
            color: 'aquamarine'
        };

        valueList[i] = rate
    }

    var mychart = echarts.init(document.getElementById(idname));
    var option = {

        tooltip: {},
        backgroundcolor: "blue",
        radar: {
            indicator: indicatorList,
            splitLine: {
                lineStyle: {
                    color: "#14FDFD"
                }
            },
            axisLine: {
                lineStyle: {
                    color: "#10F8FF"
                }
            }

        },
        series: [{
            lineStyle: {
                color: "#F5FE2A"
            },
            type: 'radar',
            // areaStyle: {normal: {}},
            data: [{
                value: valueList,
                name: "景区评分"
            },]
        }]
    };
    mychart.setOption(option);


}

function drawAreaChart(data_json, x_name, y_name, id_name, color) {
    let pre_array = new Array();

    let mychart = echarts.init(document.getElementById(id_name));
    let option = {
        title: {
            textStyle: {
                color: 'white'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        xAxis: {
            type: 'category',
            name: x_name,
            nameLocation: "middle",
            nameGap: 30,
            nameTextStyle: {
                color: "white",
                fontSize: 15
            },
            boundaryGap: false,
            data: data_json.time,

            axisLabel: {
                color: "white",
            }

        },
        yAxis: {
            type: 'value',

            name: y_name,
            nameLocation: "middle",
            nameGap: 50,
            nameTextStyle: {
                color: "white",
                fontSize: 15,

            },

            axisLabel: {
                color: "white",
            }

        },

        series: [{
            name: y_name,
            data: data_json.data,
            type: 'line',
            areaStyle: {
                color: color

            },
        }
        ]
    };

    mychart.setOption(option);

}

function LineChart(idname) {
    this.mychart = echarts.init(document.getElementById(idname));


}


LineChart.prototype.drawtrend = function (jsondata) {

    option = {
        title: {
            textStyle: {
                color: "white",
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['时间'],
            textStyle: {
                color: "white"
            },
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            name: "时间",
            type: 'category',
            boundaryGap: false,
            data: ["2019-06-01", "2019-06-02", "2019-06-03", "2019-06-04", "2019-06-05", "2019-06-06",],
            axisLabel: {
                color: 'white',
            },
            nameTextStyle: {
                color: 'white',
                fontSize: 15,

            },
        },
        yAxis: {
            name: "指数",

            type: 'value',
            axisLabel: {
                color: 'white',
            },
            nameTextStyle: {
                color: 'white',
                fontSize: 15,
            },
        },
        series: [
            {
                name: '指数',
                type: 'line',
                stack: '总量',
                data: [120, 132, 101, 134, 90, 230, 210]
            },

        ]
    };
    this.mychart.setOption(option);

};

LineChart.prototype.drawsearch = function (jsondata) {
    option = {
        title: {
            textStyle: {
                color: "white",
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['百度', '微信', '搜狗'],
            textStyle: {
                color: "white"
            },
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        xAxis: {
            name: "日期",
            type: 'category',
            boundaryGap: false,
            data: json.time,
            axisLabel: {
                color: 'white',
            },
            nameTextStyle: {
                color: 'white',
                fontSize: 15,

            },
        },
        yAxis: {
            name: "数量",

            type: 'value',
            axisLabel: {
                color: 'white',
            },
            nameTextStyle: {
                color: 'white',
                fontSize: 15,
            },
        },
        series: [
            {
                name: '百度',
                type: 'line',
                color: "#33FF74",
                stack: '总量',
                data: json.data.baidu
            },
            {
                name: '微信',
                type: 'line',
                color: "#33FFFF",
                stack: '总量',
                data: json.data.wechat
            },
            {
                name: '搜狗',
                type: 'line',
                color: "#D733FF",
                stack: '总量',
                data: json.data.sougou
            },

        ]
    };
    this.mychart.setOption(option);
};

function map(bounds, elementid, center_lon, center_lat) {
    if (bounds.length > 200) {
        zoom_size = 15

    } else {
        zoom_size = 16
    }
    var map = new AMap.Map(elementid, {
        resizeEnable: true,

        zooms: [10, 20],
        center: [center_lon, center_lat],

        showIndoorMap: false,
        zoom: zoom_size,

        isHotspot: false,
        defaultCursor: 'pointer',
        touchZoomCenter: 1,
        pitch: 0,
        mapStyle: "amap://styles/18df5ae292f09eda98fc81c6b37810c0",
        viewMode: '3D',
        resizeEnable: true,
    });

    var polyline = new AMap.Polyline({
        path: bounds,          //设置线覆盖物路径
        strokeColor: "red", //线颜色
        strokeWeight: 5,        //线宽
        strokeStyle: "solid",   //线样式
    });
    map.add(polyline);


}

function realtimeFlow(area_pid, dbegin, dend, range) {
    //人流热度
    let url = "http://scenicmonitor.top/attractions/api/getLocation_pn_percent_new";
    $.get(url, {
        pid: area_pid,
        date_begin: dbegin,
        date_end: dend,
        range: range,
        predict: true,
        sub_domain: ''

    }, function (data, state) {
        future_data = data['future_data'];//预测数据
        future_time = data['future_time'];//未来时间
        data = data['data'];//已经存在的数据
        timeList = new Array(data.length); //已过去的时间
        numList = new Array(data.length); //过去的人数
        for (let i = 0; i < data.length; i++) {
            timeList[i] = data[i][0];
            numList[i] = data[i][1];
        }

        data_json = {
            "data": numList,
            "time": timeList
        }
        let obj = new drawAreaChart(data_json, "时间", "客流量", "scence", "red");

    }, 'json');

}

function SearchRate(area_pid, flag_id) {
    //关键词热度
    let url = "http://scenicmonitor.top/attractions/api/getLocation_search_rate"
    $.get(url, {
        pid: area_pid,
        type_flag: flag_id,
        sub_domain: ''

    }, function (data, state) {
        wechat = data["wechat"];
        sougou = data['sougou'];
        baidu = data['baidu'];

        //微信数据
        wechat_dateList = new Array(wechat.length); //时间
        wechat_numList = new Array(wechat.length); //搜索次数

        for (let i = 0; i < wechat.length; i++) {
            wechat_dateList[i] = wechat[i]['tmp_date'];
            wechat_numList[i] = wechat[i]['rate'];
        }
        //搜狗数据
        sougou_dateList = new Array(sougou.length); //时间
        sougou_numList = new Array(sougou.length); //搜索次数

        for (let i = 0; i < sougou.length; i++) {


            sougou_dateList[i] = sougou[i]['tmp_date'];
            sougou_numList[i] = sougou[i]['rate'];
        }
        //搜狗数据
        baidu_dateList = new Array(baidu.length); //时间
        baidu_numList = new Array(baidu.length); //搜索次数

        for (let i = 0; i < baidu.length; i++) {
            baidu_dateList[i] = baidu[i]['tmp_date'];
            baidu_numList[i] = baidu[i]['rate'];
        }
        let dataList = {
            "wechat": wechat_numList,
            "baidu": baidu_numList,
            "sougou": sougou_numList

        };

        if (wechat_dateList.length >= baidu_dateList.length && wechat_dateList.length >= sougou_dateList.length) {
            dateList = wechat_dateList
        }
        if (baidu_dateList.length >= wechat_dateList.length && baidu_dateList.length >= sougou_dateList.length) {
            dateList = baidu_dateList
        } else {
            dateList = sougou_dateList
        }
        json = {
            "data": dataList,
            "time": dateList
        }
        search = new LineChart("search-index");
        search.drawsearch(json);
    }, 'json');

}

function Geographic_bounds(area_pid, flag_id, lon, lat) {
    //  地区地图范围
    let url = "http://scenicmonitor.top/attractions/api/getLocation_geographic_bounds"
    $.get(url, {
        pid: area_pid,
        type_flag: flag_id,
        sub_domain: ''

    }, function (data, state) {
        var bounds = data['bounds']


        new map(bounds, "container", lon, lat)
    }, 'json');
}

function People_Distribution_rate(area_pid, flag_id, lon, lat) {
    //  人口分布
    let url = " http://scenicmonitor.top/attractions/api/getLocation_distribution_rate"
    $.get(url, {
        pid: area_pid,
        type_flag: flag_id,
        sub_domain: ''

    }, function (data, state) {
        let heatmapData = data['data']
        new hotmap(heatmapData, "container", lon, lat);

    }, 'json');

}

function trend(area_pid, dbegin, dend) {
    let url = 'http://scenicmonitor.top/attractions/api/getLocation_trend_percent_new?'
    $.get(url, {
        pid: area_pid,
        date_begin: dbegin,
        date_end: dend,
        predict: true,
        sub_domain: ''

    }, function (data, state) {

        data = data['data'];//已经存在的数据
        timeList = new Array(data.length); //已过去的时间
        numList = new Array(data.length); //过去的人数
        for (let i = 0; i < data.length; i++) {
            timeList[i] = data[i][0];
            numList[i] = data[i][1];
        }

        data_json = {
            "data": numList,
            "time": timeList
        }
        let obj = new drawAreaChart(data_json, "时间", "趋势指数", "trend-index", "#07F9FD");

    }, 'json');
}


Date.prototype.format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};
function Image_reuqest(pid){
	this.url ="http://scenicmonitor.top/attractions/api/getImage";
	var image_url="http://scenicmonitor.top/media/";
	$.get(this.url,{"pid":pid},function(data,state){
		urls = data['url'];
		$(".carousel-inner").empty();
		for(let i=0;i<urls.length;i++){
			photo_url = image_url+urls[i].photo;
			if(i==0){
				newElemet = "<div class='item active'><img src="+photo_url+"   /></div>"
			}
			else{
				newElemet = "<div class='item '><img src="+photo_url+" alt=''  /></div>"
			}
				$(".carousel-inner").append(newElemet)

		}
	},'json')
}

function Comment(pid) {
	let url = "http://scenicmonitor.top/attractions/api/getComment?";
	var img_url = "http://scenicmonitor.top/media/";
	$.get(url, {
		"pid": pid
	}, function(data, state) {
		comments = data['comment'];
		$(".panel-body").empty();
		for(let i = 0; i < comments.length; i++) {
			item = comments[i];
			commentuser = item['commentuser'];
			comment = item["comment"];
			commenttime = item['commenttime'];
			commentlike = item['commentlike'];
			userphoto=item['userphoto'];
			commentElement = "<div class='chat-widget-left'>" + comment + "</div>";
			$("#comment").append(commentElement);
			src =img_url+userphoto;
			infoElement = "<div class='chat-widget-name-left'><img class='media-object img-circle img-left-chat' style='width:25%' src=" + src + "  /><h4> " + commentuser + "</h4><h5>评价时间：" + commenttime + "</h5></div><hr />"
			$("#comment").append(infoElement);

		}
	}, 'json')
}
function CommentRate(pid,idname){
	//评论指数
	let url="http://scenicmonitor.top/attractions/api/getCommentRate?";
	$.get(url,{"pid":pid},function(data){
		comment=data['comment'];

		new CommentRadar(idname,comment);
	},"json")
}

function ScenceState(pid){
	 this.url="http://scenicmonitor.top/attractions/api/getState?";
	 $.get(this.url,{"pid":pid},function(data,state){
	 	item=data['state'];
	 	coststate=item['coststate'];
	 	environmentstate=item['environmentstate'];
	 	trafficstate=item['trafficstate'];
	 	weatherstate=item['weatherstate'];
	 	$("#traffic").text(trafficstate);
	 	$("#weather").text(weatherstate);
	 	$("#cost").text(coststate);
	 	$("#environment").text(environmentstate);



	 },'json')
}
function CityInfoRequest() {
	//刚进入该页面时进行的初始化
	//页面省份城市初始化
	this.city_url = "http://scenicmonitor.top/attractions/api/getCitysByProvince";
	this.area_url = "http://scenicmonitor.top/attractions/api/getRegionsByCity";
	//	var objs = document.getElementById("prov_select0");
	//					var grade = objs.options[objs.selectedIndex].value;\n
	var pro = getParams("province");
	if(pro == null) {
		pro = $("#prov_select0 option:first").val();
	} else {
		$("#prov_select0 option:contains(" + pro + ")").attr("selected", true);

	}

	var area_list_url = this.area_url;

	$.get(this.city_url, {
		province: pro
	}, function(data, state) {
		//这里显示从服务器返回的数据

		citylist = data['city'];
		$('#city_select0').find("option").remove();
		for(let i = 0; i < citylist.length; i++) {
			city = citylist[i]['loaction'];
			pid = citylist[i]['citypid'];

			var newElement = "<option value=" + pid + ">" + city + "</option>";
			$('#city_select0').append(newElement);

		}
		city = getParams("location");
		if(city == null) {
			start_Add_Element_Of_area(pro, area_list_url);
			return
		} else {
			$("#city_select0 option:contains(" + city + ")").attr("selected", true);
			start_Add_Element_Of_area(pro, area_list_url);
		}

	}, 'json');
	this.listen();

}

function start_Add_Element_Of_area(pro, area_url) {
	//切换省份时自动加载第一个城市以及第一个景区
	//页面城市地区初始化
	var city = $("#city_select0 option:selected").text();
	var citypid = $("#city_select0").val();
	$.get(area_url, {
		province: pro,
		location: city,
		citypid: citypid
	}, function(data, state) {
		//这里显示从服务器返回的数据
		areaList = data['area'];
		$('#scence_select0').find("option").remove();
		for(let i = 0; i < areaList.length; i++) {
			area = areaList[i]['area'];
			pid = areaList[i]['pid'];
			flag = areaList[i]['type_flag'];
			lon = areaList[i]['longitude'];
			lat = areaList[i]['latitude'];
			var newElement = "<option value=" + pid + " flag=" + flag + " lon=" + lon + " lat=" + lat + " >" + area + "</option>";
			$('#scence_select0').append(newElement);

		}
		area = getParams("area");
		range=getParams("range");
		if(area == null&range==null) {
			load_data()
		} else {
			$("#scence_select0  option:contains(" + area + ")").attr("selected", true);
			 $("#range_select0 option:contains(" + range + ")").attr("selected", true);
				load_data()

		}

	}, 'json');
}
CityInfoRequest.prototype.listen = function() {
	//页面省份城市地区监听
	var pro = $("#prov_select0 option:selected").val();
	url = this.city_url;
	area_url = this.area_url;
	$("#prov_select0").change(function() {
		pro = $(this).children('option:selected').val();

		$.get(url, {
			province: pro
		}, function(data, state) {
			//这里显示从服务器返回的数据

			citylist = data['city'];
			$('#city_select0').find("option").remove();
			for(let i = 0; i < citylist.length; i++) {
				city = citylist[i]['loaction'];
				pid = citylist[i]['citypid'];

				var newElement = "<option value=" + pid + ">" + city + "</option>";
				$('#city_select0').append(newElement);

			}
			start_Add_Element_Of_area(pro, area_url);

		}, 'json');
	});

	$("#city_select0").change(function() {
		var city = $(this).children('option:selected').text();
		var citypid = $(this).children('option:selected').val();
		$.get(area_url, {
			province: pro,
			location: city,
			citypid: citypid
		}, function(data, state) {
			//这里显示从服务器返回的数据
			areaList = data['area'];
			$('#scence_select0').find("option").remove();
			for(let i = 0; i < areaList.length; i++) {
				area = areaList[i]['area'];
				pid = areaList[i]['pid'];
				flag = areaList[i]['flag'];
				lon = areaList[i]['longitude'];
				lat = areaList[i]['latitude'];
				var newElement = "<option value=" + pid + " flag=" + flag + " lon=" + lon + " lat=" + lat + " >" + area + "</option>";
				$('#scence_select0').append(newElement);

			}
		}, 'json');

	});

	$("#load").click(function() {
		//更新页面数据
		children_page();
		load_data();
	})
}

function children_page() {
	//切换链接
	province = $('#prov_select0 option:selected').val();
	city = $('#city_select0 option:selected').text();
	citypid = $('#city_select0 option:selected').val();
	area = $('#scence_select0 option:selected').text();
	pid = $('#scence_select0 option:selected').val();
	flag = parseInt($('#scence_select0 option:selected').attr("flag"));
	range = $('#range_select0 option:selected').val();
//	href = "realtimeScence.html?province=" + province + "&location=" + city + "&citypid=" + citypid + "&area=" + area + "&pid=" + pid + "&flag=" + flag + "&range=" + range
	var url = window.location.href;
	var valiable = url.split("?")[0] + "?province=" + province + "&location=" + city + "&area=" + area + "&range=" + range
	window.history.pushState({}, 0, valiable);

}

function load_data() {
	pid = $('#scence_select0 option:selected').val();
	lon = $('#scence_select0 option:selected').attr("lon");
	lat = $('#scence_select0 option:selected').attr("lat");
	date_begin = new Date().format("yyyyMMdd");
	date_end = parseInt(date_begin) + 1;
	flag = parseInt($('#scence_select0 option:selected').attr("flag"));
	range = $('#range_select0 option:selected').val();
	try{
		new realtimeFlow(pid, date_begin, date_end,range);
	}catch(e){
		new realtimeFlow(pid, date_begin, date_end,range);
	}
	try{
			new SearchRate(pid, flag);

	}catch(e){
	new SearchRate(pid, flag);
	}
	try{
			new Geographic_bounds(pid, flag, lon, lat);

	}catch(e){
	new Geographic_bounds(pid, flag, lon, lat);
	}

	try{
			new People_Distribution_rate(pid, flag,lon, lat);

	}catch(e){
	new People_Distribution_rate(pid, flag,lon, lat);
	}
	try{
			new Image_reuqest(pid);

	}catch(e){
	new Image_reuqest(pid);
	}
	try{	new Comment(pid);


	}catch(e){
	new Comment(pid);
	}
	try{
			new CommentRate(pid, "evaluate");

	}catch(e){
			new CommentRate(pid, "evaluate");
	}
	try{
			new ScenceState(pid);

	}catch(e){
	new ScenceState(pid);
	}
	try{
		new trend(pid,date_begin, date_end);
	}catch(e){
		new trend(pid,date_begin, date_end);
	}

}
Date.prototype.format = function(fmt) {
	var o = {
		"M+": this.getMonth() + 1, //月份
		"d+": this.getDate(), //日
		"h+": this.getHours(), //小时
		"m+": this.getMinutes(), //分
		"s+": this.getSeconds(), //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds() //毫秒
	};
	if(/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for(var k in o) {
		if(new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
};

function getParams(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return decodeURI(r[2]);
	return null;

};