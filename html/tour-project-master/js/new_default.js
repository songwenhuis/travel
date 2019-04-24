$(document).ready(function() {
	
		$('.lv_link').hover(function(e) {
            $(this).siblings('.top_down').toggle();
        });
	
	
	
		$('.lv_city_up').click(function(e) {
            $('.kexuan').toggle();
			$('.lv_city_up').toggleClass('has_bg')
        });
	
	
		$('.js_searchbox').click(function(e) {
            $('.another').toggle();
			$('.js_searchbox').toggleClass('white')
        });
	
		$('.lv_my_box').hover(function(e) {
			$(this).toggleClass('baisje')
            $('.dingdan').toggle();
        });
		
		$('.rx_tab li').click(function(e) {
			$(this).addClass('active').siblings().removeClass('active');
            var li_index=$(this).index()
			$('.rx_list').eq(li_index).show().siblings('.rx_list').hide()
        });
		
		var dl_index=$('.links_list').index()
		$('.btn_links').click(function(e) {
            $(this).parent().toggleClass('height_auto');
        });
	
		$('.number').hover(function(e) {
            $('.number_hide').show();
			$(this).addClass('baise_bg')
        },function(){
			$('.number_hide').hide();
			$(this).removeClass('baise_bg')
		});
	
	
		
		
	$(window).scroll(function(e) {
        if($(window).scrollTop()>100){
			$('.in').fadeIn(1500);
		}
		else
		{
			$('.in').hide().fadeOut(1500);
		};
    });
	$('#goTopBtn').click(function(e) {
        $('body,html').animate({scrollTop:0},1000);
    });
		
		
		
	
	
	$('#categorys').live('hover',function() {
		$(this).children('.mc').toggle();
	});
	
	
	$(".item").live('hover',function() {
		$(this).toggleClass('hover');
	});
	
	$('.qunaer .titles').click(function(){
		$(this).closest('li').siblings().removeClass('hover');
		$(this).closest('li').addClass('hover');
	});
	
	$('.index_cnt .menu ul li').click(function(){
		$(this).siblings('li').removeClass('hover');
		$(this).addClass('hover');
		$(this).closest('.index_cnt').find('.index_line').removeClass('hover');
		$(this).closest('.index_cnt').find('.index_line').eq($(this).index()).addClass('hover');
	});
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	// 检测浏览器版本
	var userAgent = navigator.userAgent, rMsie = /(msie\s|trident.*rv:)([\w.]+)/, rFirefox = /(firefox)\/([\w.]+)/, rOpera = /(opera).+version\/([\w.]+)/, rChrome = /(chrome)\/([\w.]+)/, rSafari = /version\/([\w.]+).*(safari)/;
	var browser;
	var version;
	var ua = userAgent.toLowerCase();
	function uaMatch(ua) {
		var match = rMsie.exec(ua);
		if (match != null) {
			return {
				browser : "IE",
				version : match[2] || "0"
			};
		}
		var match = rFirefox.exec(ua);
		if (match != null) {
			return {
				browser : match[1] || "",
				version : match[2] || "0"
			};
		}
		var match = rOpera.exec(ua);
		if (match != null) {
			return {
				browser : match[1] || "",
				version : match[2] || "0"
			};
		}
		var match = rChrome.exec(ua);
		if (match != null) {
			return {
				browser : match[1] || "",
				version : match[2] || "0"
			};
		}
		var match = rSafari.exec(ua);
		if (match != null) {
			return {
				browser : match[2] || "",
				version : match[1] || "0"
			};
		}
		if (match != null) {
			return {
				browser : "",
				version : "0"
			};
		}
	}
	var browserMatch = uaMatch(userAgent.toLowerCase());
	if (browserMatch.browser) {
		browser = browserMatch.browser;
		version = browserMatch.version;
	}

	if (version == "6.0" || version == "7.0") {
		alert('您的浏览器版本过低,建议您使用IE8及以上浏览器访问,获得最佳浏览效果!');
	}
	
	// lazyload
	if(typeof($(".index_content")) != 'undefined'){
		$(".index_content img").lazyload({
			threshold : 200,
	        skip_invisible : false
	    });
	}
	
	// 顶部广告图
	if ($('#ads_pic img').length > 0) {
		$('#ads_pic').slideDown(1000, function() {
			setTimeout("$('#ads_pic').slideUp(1000)", 3000);
		});
	}
	
	// 点击关闭广告图
	$('#ads_pic_close').click(function() {
		$('#ads_pic').slideUp(1000);
	})

	// 搜索框获取、失去焦点
	var search_txt = $('.search_txt');
	search_txt.focus(function() {
		if (search_txt.val() == '马尔代夫') {
			search_txt.val('');
		}
	}).blur(function() {
		if (search_txt.val() == '') {
			search_txt.val('马尔代夫');
		}
	})
	
	// 引入导航下拉菜单
	$.get("daohang/index.html", function(data) {
		$("#menu").before(data);
	});
	
	// 头部微信
	$('.top_weixin').hover(function() {
		$('.weixin_erweima').slideDown('1500');
	},function() {
		$('.weixin_erweima').slideUp('1500');
	});
	
	// 头部微博跳转
	$('#weibo').click(function() {
		window.open("http://weibo.com/bytst");
	});
	
	//添加收藏
	$('#favorites').click(function(){
		alert('请按Ctrl+D直接收藏我们!');
	});
	
	// 全部分类隐藏、显示切换
});