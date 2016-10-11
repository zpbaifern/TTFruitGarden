jQuery(function($) {
	

	
	//
	var $dianul = $(".dianul");
	var $tuul = $(".tuul");
	var $dianImg;
	var $span1;
	var $li;

	//获取对应的水果id，通过ajax请求加载对应的图片

	var detailFruitId = getCookie("detailFruitId");
	$.ajax({
		url: "../../../data/Goods.json",
		dataType: "json",
		success: function(res) {

			$.each(res, function(idx, item) {
				if(item.xfruitId == detailFruitId) {

					for(var j = 0; j < item.imgurlCollection.length / 2; j++) {
						$dianImg = $("<img/>").attr({
							"src": item.imgurlCollection[j]
						});
						$span1 = $("<span/>").html('<img src="../css/img/panel.png">');
						$li = $("<li/>");
						$li.prepend($dianImg).append($span1);
						$dianul.append($li);
					}

					var $span = $dianul.find("span");
					$span.first().removeClass("active").eq(0).addClass("active");

					var $li1 = $(".dianul li");
					var $img = $("<img/>").attr({
						"src": item.imgurlCollection[item.imgurlCollection.length / 2],
						"data-big": item.imgurlCollection[item.imgurlCollection.length / 2]
					});

					$tuul.html($img);
					var $tuulImg = $(".tuul").find("img");
					$li1.on("click", function() {
						
						i = $(this).index() + 1;
						$tuulImg.attr({
							"src": "../css/img/" + detailFruitId + "_" + (i + item.imgurlCollection.length / 2) + ".jpg",
							"data-big": "../css/img/" + detailFruitId + "_" + (i + item.imgurlCollection.length / 2) + ".jpg"
						});
						
						$span.removeClass("active").eq(i - 1).addClass("active");
						
					});
					
					






					//页面左上角索引
					$(".bread span").last().html(item.title);
					//右边商品信息部分
					$(".title").html(item.title);
					$(".title_describeapp").html(item.intro);
					if(item.big){
						$("#jq-price").html(item.bigPrice);
						var $sBig = $("<span/>").html(item.big).attr({
							"data-old-price":item.bigPrice,
							"data-price":item.bigPrice,
						}).addClass("pull-left current");
						var $sSmall = $("<span/>").html(item.small).attr({
							"data-old-price":item.smallPrice,
							"data-price":item.smallPrice,
						}).addClass("pull-left");
						$(".style").append($sBig).append($sSmall);
					}else{
						$("#jq-price").html(item.smallPrice);
						var $sSmall = $("<span/>").html(item.small).attr({
							"data-old-price":item.smallPrice,
							"data-price":item.smallPrice,
						}).addClass("pull-left current");
						$(".style").append($sSmall);
					}
		







				//根据规格，改变单价
	
				$(".style span").on('click', function() {
					if(!$(this).hasClass('current')) {
						$("#jq-old-price").html($(this).data('old-price'));
						$("#jq-price").html($(this).data('price'));
						$(this).addClass('current').siblings('span').removeClass('current');
						$("#product_no").text($(this).data('product_no'));
						var stockMsg = '有货';
						$("div.send > span.have").text(stockMsg);
			
					}
				});
















				}
			});

				 $('.tuul').xfruit({position: 'right'})
		
		}
	});

	

	//增减购买件数
	$input = $(".amount :text");

	$redu1 = $("#redu1");
	$redu1.on("click", function() {
		var num = parseInt($input.val());
		if(num == 1) {
			return;
		} else {
			num--;
			$input.val(num)
		}
	});
	$add1 = $("#add1");
	$add1.on("click", function() {
		var num = parseInt($input.val());
		if(num == 400) {
			return;
		} else {
			num++;
			$input.val(num)
		}
	});

	
	//初始化购物车弹框的位置
	var $carAlert = $(".carAlert");
	
	$carAlert.css({
		"margin-left": -$carAlert.width() / 2,
		"margin-top": - $carAlert.height() / 2
	});
	
		
//点击购物车弹窗的叉号或继续购物，就让弹窗隐藏
	var $spanClose = $(".carAlert span");
	var $aContinue = $(".a1");
	$spanClose.on("click",function(){
		$carAlert.hide();
	});
	$aContinue.on("click",function(){
		$carAlert.hide();
	});

//购物车读取total，sum 的cookie信息
		$(".carInfo label").first().html(getCookie("total"));
		$(".carInfo label").last().html(getCookie("sum"));
//给立即购买按钮绑定点击事件，点击一下使得total+1，sum+标价，购物车弹框显示，并获取水果id、规格及件数，把其信息添加到结算页的内容中
	
	$(".fr-buy").on("click",function(){
		if($("#jq-price").html()!=""){
		var t = getCookie("total")-0;
		var buyList = getCookie("buyList");
		var x = getCookie("detailFruitId");
		
		t+=$("#add").val()-0;
		if(buyList.lastIndexOf(",") != buyList.length-1){
			buyList = buyList+",";
		}
		buyList = buyList+x+","
		buyList = buyList+$("#jq-price").html()+",";
		buyList = buyList+$("#add").val()+",";
		}else{
			t=0;
			buyList="";
		}
		console.log(buyList);
		setCookie("total",t,-1,"/");
		setCookie("buyList",buyList,-1,"/");
		
		var s = getCookie("sum")-0;
		var times = $("#add").val()-0;
		s+=($("#jq-price").html()-0)*times;
		s = s.toFixed(2);
		
		setCookie("sum",s,-1,"/");
	});

	//给加入购物车按钮绑定点击事件，点击一下使得total+1，sum+标价，购物车弹框显示，并获取水果id、规格及件数，把其信息添加到结算页的内容中
	
	$(".fr-add"),$(".fr-add2").on("click",function(){
		if($("#jq-price").html()!=""){
		var t = getCookie("total")-0;
		var buyList = getCookie("buyList");
		var x = getCookie("detailFruitId");
		
		t+=$("#add").val()-0;
		if(buyList.lastIndexOf(",") != buyList.length-1){
			buyList = buyList+",";
		}
		buyList = buyList+x+","
		buyList = buyList+$("#jq-price").html()+",";
		buyList = buyList+$("#add").val()+",";
		}else{
			t=0;
			buyList="";
		}
		console.log(buyList);
		setCookie("total",t,-1,"/");
		setCookie("buyList",buyList,-1,"/");
		
		var s = getCookie("sum")-0;
		var times = $("#add").val()-0;
		s+=($("#jq-price").html()-0)*times;
		s = s.toFixed(2);
		
		setCookie("sum",s,-1,"/");
		
		
		//购物车读取total，sum 的cookie信息
		$(".carInfo label").first().html(getCookie("total"));
		$(".carInfo label").last().html((getCookie("sum")-0).toFixed(2));
		$(".div1").find("span").html(getCookie("total")-0);
		//显示购物车弹框
		$(".carAlert").fadeIn();
	});
	
	
	//给固定定位条的滚动条中的“商品简介”、“顾客评论”绑定点击事件
$(".fixed").on("click","span",function(){
	$(this).addClass("spanActive").siblings("span").removeClass("spanActive");
	
	if($(this).index()==0){
		$("#showImg").css({display:"block"});
		$("#showComment").css({display:"none"});
	}else if($(this).index() == 1){
		$("#showImg").css({display:"none"});
		$("#showComment").css({display:"block"});
	}
});


});


