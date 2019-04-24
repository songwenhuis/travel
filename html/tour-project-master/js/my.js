//自由行&全部选项卡
$(".l_ui-content .search-main  .search-nav .qbgl").click(function(){
	$(this).addClass("search-nav-item-selected").siblings().removeClass("search-nav-item-selected");
	$(".l_ui-content .search-main  .search-filter .u-qb").hide();
	$(".l_ui-content .search-main  .search-filter .u-zyx").show();
});
$(".l_ui-content .search-main  .search-nav .zyx").click(function(){
	
	$(this).addClass("search-nav-item-selected").siblings().removeClass("search-nav-item-selected");
	$(".l_ui-content .search-main  .search-filter .u-qb").show();
	$(".l_ui-content .search-main  .search-filter .u-zyx").hide();
});
//更多折叠
	var gengduo = 0;
$(".l_ui-content .search-main  .search-filter .u-zyx .view-more").click(function(){

	if (gengduo==0) {
		$(this).addClass("hide-more");
		$(this).html("收起 <i class='arrow'></i>");
		$(this).parent().addClass("more");
		gengduo=1;
	}else if(gengduo==1){
		$(this).removeClass("hide-more");
		$(this).html("更多 <i class='arrow'></i>");
		$(this).parent().removeClass("more");
		gengduo=0;
	}
});

//价格效果
$(".l_ui-content .J_price .zdj").focus(function() {
    $(this).parent().addClass("expand");
    $(this).attr("value" ,"");
}).blur(function(){
        if($(this).val()==""){
             $(this).attr("value" ,"最低价");
        }
    })  ;
$(".l_ui-content .J_price .zgj").focus(function() {
    $(this).parent().addClass("expand");
    $(this).attr("value" ,"");
}).blur(function(){
        if($(this).val()==""){
            $(this).attr("value" ,"最高价");
        }

    })  ;
$(".l_ui-content .J_price .input-text").blur(function(){
    $(this).parent().removeClass("expand");
});
