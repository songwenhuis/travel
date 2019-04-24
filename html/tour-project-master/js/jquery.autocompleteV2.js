/*
	请求URL：http://10.2.1.37/search/oneSearch.do?callback=111&keyword=sh&fromDestId=79&fromChannel=TICKET&newChannel=
	跳转URL：http://www.lvmama.com/search/fromChannle-formDest-fromDestId-selectChannel-keyword.html
			示例：http://www.lvmama.com/search/ROUTE-上海-79-TICKET-三亚.html	
*/
if(!window.console){
	window.console = {
		log : function(){
		
		},
		debug : function(){
		
		}
	}
}
if(!console.debug){
	console.debug = function(){
		
	}
}
var img = new Image();
img.src = "http://pic.lvmama.com/img/new_v/ob_yjdy/y_loading.gif";
img.onload = function(){

}
UI.extend.autoComplete = function(opt){
	/*{
			fromChannel : ".search-box", //从这个节点上取出需要的自定义属性参数
			newChannel : $("li.info-item-selected").attr("newChannel") || "", //
			clickSearch : "#searchHotelBtn" //绑定搜索click，如果要自己定义cilck，就不要传入此参数
		}
	*/
	var baseUrl = opt.baseUrl ? opt.baseUrl : "http://www.lvmama.com/search/";
	var inputSel = this;
	var input = $(inputSel);
	var width = input.width() > 200 ? input.outerWidth() : 200;
	var auto_main1 = "auto_main1";
	var auto_data_list = "auto_data_list";
	var str = '<div style="width:'+width+'px;display:none" class="auto auto-single" id="'+auto_main1+'">'+
			'	<div class="auto-box">'+
			'		<ul id="'+auto_data_list+'">'+
			'		</ul>'+
			'		<ul class="auto-channel" id="auto-channel">'+
			'			<li channel="TICKET"><a href="javascript:void(0)">搜索"<label></label>"&#12288;<span class="auto-type">打折门票</span></a></li>'+
			'			<li channel="FREETOUR"><a href="javascript:void(0)">搜索"<label></label>"&#12288;<span class="auto-type">门票+酒店</span></a></li>'+
			'			<li channel="HOTEL"><a href="javascript:void(0)">搜索"<label></label>"&#12288;<span class="auto-type">特色酒店</span></a></li>'+
			'			<li channel="ROUTE"><a href="javascript:void(0)">搜索"<label></label>"&#12288;<span class="auto-type">度假线路</span></a></li>'+
			'		</ul>'+
			'	</div>'+
			'</div>';
	auto_main1 = "#"+auto_main1;
	auto_data_list = "#"+auto_data_list;
	var typeData = {
		TICKET : "门票",
		HOTEL : "酒店",
		GROUP : "跟团游",
		ROUTE : "度假",
		FREETOUR : "景点+酒店",
		FREELONG : "机票+酒店",
		AROUND : "周边"
	}
	var param;
	if(opt.fromChannel){
		param = $(opt.fromChannel);
	}else{
		param = $("body").attr({
			"data-city-name" : $("#fromDest").val(),
			"data-city-id" : $("#fromDestId").val()
		});
	}
	var url = location.href;
	var key = url.substring(url.lastIndexOf("/")+1).toUpperCase();
	key = typeData[key]?key:"";
	param.attr("fromChannel", key);

    // 搜索关键词联想监测
	var inputVal = "";
	function monitor(key, asKey, type, block) {
	    var str = "";

	    if (block == "a") {
	        str = key + "_" + asKey + (typeData[type] ? "_" + typeData[type] : "");
	    } else {
	        str = key + "_" + typeData[type];
	    }

        // 后台监测
		if(window.cmCreateElementTag){
			cmCreateElementTag(str, "联想搜索");
		}
	}

	var selectedData = function(){
	    var obj = $(this).find("a");
	    var key = input.val();
		var keyword = obj.attr("text");
		var channel = obj.attr("channel");
		var pinYin = obj.attr("pinYin");
		var fromDest = param.attr("data-city-name");
		var fromDestId = param.attr("data-city-id");
		var fromChannle = key;
		if(opt.baseUrl){
			$("#searchVa").val(keyword);
			$("#searchVaForm").submit();
			return;
		}
		input.val(keyword);
		input.attr("pinYin",pinYin);
		if(opt.fromChannel){
			var url = "http://www.lvmama.com/search/"+fromChannle+"-"+fromDest+"-"+fromDestId+"-"+channel+"-"+keyword+".html";
			monitor(key, keyword, channel, "a");
			location.href = url;
		}
	}
	if($(auto_main1).length==0){
		$("body").append(str);
		$(auto_data_list).delegate("li","mousedown",selectedData);
		$("#auto-channel li").mousedown(function(){
			var keyword = input.val();
			var channel = $(this).attr("channel");
			var fromDest = param.attr("data-city-name");
			var fromDestId = param.attr("data-city-id");
			var fromChannle = key;
			var url = "http://www.lvmama.com/search/"+fromChannle+"-"+fromDest+"-"+fromDestId+"-"+channel+"-"+keyword+"-.html"
			if(opt.baseUrl){
				$("#searchVa").val(keyword);
				$("#searchVaForm").submit();
				return;
			}
			monitor(keyword, "", channel, "li");
			location.href = url;
		});

        // 过滤特殊字符 2013.09.22
		function specialFiltersStr(s) {
		    var reg = new RegExp("[`~～•￥%\＠＄＾＆＿｛｝｜＂＜＞－＝［］＼＇．／•｛｝｜［］／＃％＊＋!@#$^&*=|{}':'\\[\\].<>/?~！@#￥……&*——|{}【】‘；：\"”“'。，、？+_《》]"),
                result = "";

		    for (var i = 0, len = s.length; i < len; i++) {
		        result += s.substr(i, 1).replace(reg, " ");
		    }

		    return result;
		}
		
		opt.clickSearch && $(opt.clickSearch).click(function () {
			var input_val = input.val(); 
			if (input_val.indexOf("W") == 0 || /^\d+$/.test(input_val)) {
			    input_val = "W" + input_val;
			}
			
			var keyword = specialFiltersStr(input_val);
			
			if (keyword.replace(/(^\s*)/g, "").length === 0) {
				input.val("");
			}
			    
			if($.trim(input.val())==""){
				input.focus();
				return false;
			}
			
			keyword = opt.baseUrl ? input_val : encodeURIComponent(specialFiltersStr(input_val).substr(0,160));
			//keyword = encodeURIComponent(keyword.replace(/\-/g, "－"));
			
			var _form = $("form.form-search"); 
			var channel = input.attr("channel"); 
			var fromDest = param.attr("data-city-name");
			var fromDestId = param.attr("data-city-id");
			var fromChannle = key;
			if(typeof channel != "undefined"){ 
				// 点击补全内容搜索 
				// 针对分销平台搜索功能做了个很挫的case判断
				if(opt.baseUrl){
					$("#searchVa").val(keyword);
					$("#searchVaForm").submit();
					return;
				}else{
					url = baseUrl+fromChannle+"-"+fromDest+"-"+fromDestId+"-"+channel+"-"+keyword+".html"; 
				}
			}else{ 
				//直接搜索 
				if(opt.baseUrl){
					$("#searchVa").val(keyword);
					$("#searchVaForm").submit();
					return;
				}else{
					url = "http://www.lvmama.com/search/"+fromDest+"/"+keyword+".html"; 
				}
			}
			monitor(inputVal, input_val, channel, "a");
			if(_form.length>0){
				_form.attr("action",url);
				_form.submit();
			}else{
				location.href = url;
			}
		});
	}
	$.getJSONCache = function(url,keyword,callback){
		if(UI.cache[keyword]){
			callback(UI.cache[keyword]);
		}else{
			return $.getJSON(url,function(data){
				callback(data);
				UI.cache[keyword] = data;
			});
		}
	}
	input.keyup(function(e){
		if(/^(38|40|13|9)$/.test(e.keyCode)){
			return;
		}
		
		var main = $(auto_main1);
		var datalist = $(auto_data_list);
		if(this.value==""){
			main.hide();
		}else{
			main.css({
				position : "absolute",
				zIndex : 999,
				left : $(this).offset().left,
				top : $(this).offset().top + $(this).outerHeight()
			});
			var pushData = {
				fromDestId : param.attr("data-city-id"),
				keywords : this.value,
				fromChannel : param.attr("fromChannel"),
				newChannel : opt.newChannel
			}
			
			$.httpAjax && ($.httpAjax.abort());
			var str = '<img src="http://pic.lvmama.com/img/new_v/ob_yjdy/y_loading.gif" id="autoLoading2" style="position:absolute;z-index:999;display:none"/>';
			if($("#autoLoading2").length==0){
				$("body").append(str);
			}
			var loading = $("#autoLoading2");
			var obj = $(this);
			loading.css({
				display : "block",
				left : obj.offset().left + (obj.outerWidth(false)-loading.width())-5,
				top : obj.offset().top + (obj.outerHeight(false)-loading.width())/2
			});
			$.httpAjax = $.getJSONCache("http://www.lvmama.com/search/autoCompletePlace.do?callback=?&keyword="+encodeURIComponent(pushData.keywords)+"&fromDestId="+pushData.fromDestId+"&fromChannel="+pushData.fromChannel+"&newChannel="+pushData.newChannel,encodeURIComponent(pushData.keywords),function(json){
				$("#autoLoading2").hide();
				$("#auto-channel label").html(pushData.keywords);
				if(!json){
					datalist.hide();
					return;
				}
				var data = json.placeListJson;
				
				if(data instanceof Array && data.length>0){
					var arr = [];
					
					for(var i=0;i<data.length;i++){
						if(i>=12){
							break;
						}
						var n = data[i];
						if(n.name==data[0].name && data[1] && n.name==data[1].name){
							if(i==0){
								arr.push('<li><a href="javascript:void(0)" pinYin="'+n.pinYin+'" channel="'+n.channel+'" text="'+n.name+'">'+n.name+'&#12288;<span class="auto-type">在<b>'+typeData[n.channel]+'</b>分类中搜索</span></a></li>');
							}else{
								var kg = n.name.replace(/(.)/g,"&#12288;");
								arr.push('<li><a href="javascript:void(0)" pinYin="'+n.pinYin+'" channel="'+n.channel+'" text="'+n.name+'">'+kg+'&#12288;<span class="auto-type">在<b>'+typeData[n.channel]+'</b>分类中搜索</span></a></li>');
							}
						}else{
							arr.push('<li><a href="javascript:void(0)" pinYin="'+n.pinYin+'" channel="'+n.channel+'" text="'+n.name+'">'+n.name+'</a></li>');
						}
					}
					datalist.html(arr.join(""));
					main.show();
					datalist.show();
				}else{
					$(auto_data_list).hide();
				}
			});
		}
	}).blur(function(){
		setTimeout(function(){
			$(auto_main1).hide();
		},50);
	}).keydown(function(e){
		if(e.keyCode==40){
			var li = $(auto_data_list+" li.active");
			if(li.length==0){
				li = $(auto_data_list+" li:first");
			}else{
				li = li.next();
			}
			li.addClass("active").siblings(".active").removeClass("active");
		}else if(e.keyCode==38){
			var li = $(auto_data_list+" li.active");
			if(li.length==0){
				li = $(auto_data_list+" li:first");
			}else{
				li = li.prev();
			}
			li.addClass("active").siblings(".active").removeClass("active");
		}else if(e.keyCode==13){
			var li = $(auto_data_list+" li.active");
			var obj = li.find("a");
			if (obj.attr("text")) {
			    inputVal = input.val();
				input.val(obj.attr("text"));
				input.attr("pinYin",obj.attr("pinYin"));
				input.attr("channel",obj.attr("channel"));
				$(auto_main1).hide();
				//selectedData.call(li.get(0));
			}
		}
	});
}
