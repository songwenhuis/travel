$(document).ready(function() {
	
	var browser = {
		versions : function() {
			var u = navigator.userAgent, app = navigator.appVersion;
			return { // 移动终端浏览器版本信息
				trident : u.indexOf('Trident') > -1, // IE内核
				presto : u.indexOf('Presto') > -1, // opera内核
				webKit : u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
				gecko : u.indexOf('Gecko') > -1	&& u.indexOf('KHTML') == -1, // 火狐内核
				mobile : !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
				ios : !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
				android : u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或uc浏览器
				iPhone : u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
				iPad : u.indexOf('iPad') > -1, // 是否iPad
				webApp : u.indexOf('Safari') == -1
			// 是否web应该程序，没有头部与底部
			};
		}(),
		language : (navigator.browserLanguage || navigator.language).toLowerCase()
	}
	if (browser.versions.mobile == true && !browser.versions.iPad)
	{
		window.location.href = 'http://m.bytst.com';
	}
	
	$('img.lazy').lazyload({
		threshold : 200
	});
	
	/*var ads_pic = "<div id='ads_pics'><div class='pic'><a class='pic' href='/chunjie/' target='_blank'><img alt='春节旅游_2019春节旅游专题' src='/resources/pc/banner/chunjie.jpg' /></a><div id='ads_pic_close'>×</div></div></div>";*/
	/*var ads_pic = "<div id='ads_pics'><div class='pic'><img src='/images/banner/top.jpg' usemap='#Map' /><map name='Map' id='Map'><area shape='rect' coords='200,0,415,60' href='/ouzhou/' target='_blank' /><area shape='rect' coords='416,0,629,60' href='/riben/' target='_blank' /><area shape='rect' coords='630,0,852,60' href='/eluosi/' target='_blank' /><area shape='rect' coords='854,0,1060,60' href='/yunnan/' target='_blank' /></map><div id='ads_pic_close'>×</div></div></div>";*/
	/*$('.logos').before(ads_pic);
	$('#ads_pic_close').click(function(){
		$('#ads_pics,#ads_pics .pic').slideUp();
	});*/
	
	/*var telTop = (window.innerHeight / 2) - 106 - 140;
	var floatTel = "<div id='floatTel' style='top:"+ telTop +"px;'></div>";
	$('.header').before(floatTel);*/

	$('#footer_weixin_close').live('click', function(){
		$('#footer_weixin').slideUp();
	});

	$('#categorys').hover(function() {
		$(this).children('.mc').toggle();
	});
	$(".item").hover(function() {
		$(this).toggleClass('hover');
	});
	
	$('.weibo a').click(function(){
		window.open('http://weibo.com/bytst/');
	});
	
	$('.weixin').hover(function(){
		$(this).find('span').empty().append('▲');
		$('.wx_pic').slideDown('500');
	},function(){
		$(this).find('span').empty().append('▼');
		$('.wx_pic').slideUp('500');
	});
	
	$('.favorites').click(function(){
		alert('请按Ctrl+D直接收藏我们!');
	});
	
	// 引入51la
	$.get("/data/51la.html", function(data) {
		$(".copyright").append(data);
	});

    if (get_site()) {
        $.get("/data/tejia.html",function(data){
            if ($.trim(data) != ''){
                $('body').append('<div class="timed_specials"><h2>今日推荐</h2><div class="summary">详情请致电询问 位置有限 先到先得</div><div class="shrinkage">∨</div><div class="close">×</div>' + data + '</div>');
                $('.timed_specials').slideDown();
            }
        });

        /*var footer_weixin = "<div id='footer_weixin'><div class='box-background'></div><div class='box-inner'><img src='/images/banner/footer_weixin.png' title='微信:iutour' /></div><div id='footer_weixin_close'><img src='/images/banner/footer_weixin_close.png' title='关闭北青旅微信提示窗' alt='关闭北青旅微信提示窗' /></div></div>";
		$('.contents').after(footer_weixin);*/
    }

    $('.timed_specials .shrinkage').live('click',function(){
        var str = $(this).html();
        var hg = $('.timed_specials').height();
        hg = hg - 46;
        if (str == '∨') {
            $('.timed_specials').animate(
                {
                    bottom: '-' + hg + 'px'
                },500,
                function(){
                    $('.timed_specials .shrinkage').html('∧');
                    $('.timed_specials .close').show();
                }
            );
        } else {
            $('.timed_specials').animate(
                {
                    bottom: '0'
                },500);
            $('.timed_specials .shrinkage').html('∨');
            $('.timed_specials .close').hide();
        }
    });

    $('.timed_specials .close').live('click',function(){
       $('.timed_specials').slideUp();
    });
});

function get_site(){
    var str = document.referrer;
    str = str.replace('http://','');
    var arr = str.split('/');
    if (arr[0] != 'www.bytst.com') {
        return true;
    } else {
        return false;
    }
}

function search_destination(){
	var mdd = $.trim($('#destination').val());
	mdd = removeHTMLTag(mdd);
	mdd = removeHTMLTag(mdd);
	if (mdd.indexOf('帕劳') < 0 && mdd.indexOf('韩国') < 0 && mdd.indexOf('首尔') < 0 && mdd.indexOf('济州') < 0 && mdd.indexOf('朝鲜') < 0 && mdd.indexOf('平壤') < 0)
	{
		if (mdd != '' && mdd != '泰国/希腊/云南'){
			$('.search_main').attr('action','/search/?');
			$('#destination').attr('name','mdd');
			return true;
		} else {
			return false;
		}
	}
}

function isnull(destination) {
	if (!$.trim(destination)){
		$('#destination').val('泰国/希腊/云南');
	}
}

function removeHTMLTag(str){
	str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
	str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
	str = str.replace(/ /ig,'');//去掉 
	return str;
}