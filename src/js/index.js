jQuery(function($) {

	//“首页”导航样式初始化
	var $navMiddle = $(".navMiddle");
	$navMiddle.find("li").eq(0).css({
		"border-bottom": "2px solid #64A131"
	});
	$navMiddle.find("li").eq(0).find("a").css({
		color: "#64A131"
	});
	$navMiddle.find("li").eq(0).find("span").css({
		color: "#64A131"
	});

	//轮播图
	var $carousel = $(".carousel");
	var $carouselUl1 = $(".carouselUl1");
	var $li1 = $carouselUl1.find("li");
	var len = $li1.length;
	var $carouselUl2 = $(".carouselUl2");
	
	
	$.each($li1, function(idx, ele) {
		$carouselUl2.append($("<li/>"));
	});
	var $li2 = $carouselUl2.find("li");
	$carouselUl2.css({
		"width":$carouselUl2.width()/2,
		"margin-left": -$carouselUl2.width() / 4,
	});

	$li2.css({
		background: "url(css/img/collection.png) no-repeat 0 0",
		cursor: "pointer"
	});
	$li2.first().css({
		background: "url(css/img/collection.png) no-repeat 0 -19px"
	});
	var i = 0;
	var timer;

	$carouselUl1.on("mouseenter", function() {
		clearInterval(timer);
	}).on("mouseleave", function() {
		timer = setInterval(move, 2000);
	}).trigger("mouseleave");

	$li2.on("click", function() {
		clearInterval(timer);
		i = $(this).index();
		show();
		timer = setInterval(move, 2000);
	});
	//轮播到下一张
	function move() {
		i++;
		show();
	}
	
	//ul改变定位位置，实现轮播效果
	function show() {
		$carouselUl1.animate({
			left: -i * $(window).width()
		},nextCheck);
		$li2.css({
				background: "url(css/img/collection.png) no-repeat 0 0"
			}).eq(i).css({
				background: "url(css/img/collection.png) no-repeat 0 -19px"
			});
		if(i==len/2){
			$li2.css({
				background: "url(css/img/collection.png) no-repeat 0 0"
			}).eq(0).css({
				background: "url(css/img/collection.png) no-repeat 0 -19px"
			});
		}
	}
	//检查是否最后一张
	function nextCheck() {
		if(i >= len/2) {
			i = 0;
			$carouselUl1.css({"left":0});
			
		}
	}
	
	//Ajax加载商品
	//列表1 

	$.ajax({
		url: "../../data/Goods.json",
		dataType: "json",
		success: function(res) {
			var $targetUl1 = $("#contentList1");
			$.each(res, function(idx, item) {

				var $li = $("<li/>");
				$li.attr({
					"xfruitId": item.xfruitId
				});
				var $div = $("<div/>");
				var $p = $("<p/>");

				if(item.condition != "") {
					var $span1 = $("<span/>").addClass("green");
					$span1.html(item.condition);
					if(item.condition != "新品") {
						$span1.css({
							background: "#ff5353"
						});
					}
					$div.append($span1);
				}

				var $a = $("<a/>");
				$a.attr({
					href: "html/details.html"
				}).html($("<img/>").attr({
					src: item.imgurl
				}));
				$div.append($a);

				var $i = $("<i/>");
				$i.html(item.title);
				var $label = $("<label/>");
				$label.html(item.price);
				var $span2 = $("<span/>").addClass("littleCarLogo");
				$p.append($i).append($label).append($span2);

				$li.append($div).append($p);
				if(idx == 4 || (idx > 5 && ((idx - 5) % 4 == 0))) {

					$li.addClass("lilast");
				}
				$targetUl1.append($li);

			});

			enlarge();
			var $span = $targetUl1.find("li p span");
			smallCarLogoClick($span);
			$targetUl1.find("li").on("click", function() {
				var $self = $(this);
				recentBroswerRepeatCheck($self);
			});
		}
	});
	//列表2
	$.ajax({
		url: "../../data/Goods.json",
		dataType: "json",
		success: function(res) {
			var $targetUl2 = $("#contentList2");
			$.each(res, function(idx, item) {
				if(idx > 4) {
					return;
				}
				var $li = $("<li/>");
				$li.attr({
					"xfruitId": item.xfruitId
				});
				var $div = $("<div/>");
				var $p = $("<p/>");

				if(item.condition != "") {
					var $span1 = $("<span/>").addClass("green");
					$span1.html(item.condition);
					if(item.condition != "新品") {
						$span1.css({
							background: "#ff5353"
						});
					}
					$div.append($span1);
				}

				var $a = $("<a/>");
				$a.attr({
					href: "html/details.html"
				}).html($("<img/>").attr({
					src: item.imgurl
				}));
				$div.append($a);

				var $i = $("<i/>");
				$i.html(item.title);
				var $label = $("<label/>");
				$label.html(item.price);
				var $span2 = $("<span/>").addClass("littleCarLogo");
				$p.append($i).append($label).append($span2);

				$li.append($div).append($p);
				if(idx == 4) {

					$li.addClass("lilast");
				}
				$targetUl2.append($li);

			});
			enlarge();
			var $span = $targetUl2.find("li p span");
			smallCarLogoClick($span);
			$targetUl2.find("li").on("click", function() {
				var $self = $(this);
				recentBroswerRepeatCheck($self);
			});
		}
	});
	//列表3
	$.ajax({
		url: "../../data/Goods.json",
		dataType: "json",
		success: function(res) {
			var $targetUl3 = $("#contentList3");
			$.each(res, function(idx, item) {

				var $li = $("<li/>");
				$li.attr({
					"xfruitId": item.xfruitId
				});
				var $div = $("<div/>");
				var $p = $("<p/>");

				if(item.condition != "") {
					var $span1 = $("<span/>").addClass("green");
					$span1.html(item.condition);
					if(item.condition != "新品") {
						$span1.css({
							background: "#ff5353"
						});
					}
					$div.append($span1);
				}

				var $a = $("<a/>");
				$a.attr({
					href: "html/details.html"
				}).html($("<img/>").attr({
					src: item.imgurl
				}));
				$div.append($a);

				var $i = $("<i/>");
				$i.html(item.title);
				var $label = $("<label/>");
				$label.html(item.price);
				var $span2 = $("<span/>").addClass("littleCarLogo");
				$p.append($i).append($label).append($span2);

				$li.append($div).append($p);
				if(idx == 4 || (idx > 5 && ((idx - 5) % 4 == 0))) {

					$li.addClass("lilast");
				}
				$targetUl3.append($li);

			});
			enlarge();
			var $span = $targetUl3.find("li p span");
			smallCarLogoClick($span);
			$targetUl3.find("li").on("click", function() {
				var $self = $(this);
				recentBroswerRepeatCheck($self);
			});
		}
	});
	//列表4 
	$.ajax({
		url: "../../data/Goods.json",
		dataType: "json",
		success: function(res) {
			var $targetUl4 = $("#contentList4");
			$.each(res, function(idx, item) {

				var $li = $("<li/>");
				$li.attr({
					"xfruitId": item.xfruitId
				});
				var $div = $("<div/>");
				var $p = $("<p/>");

				if(item.condition != "") {
					var $span1 = $("<span/>").addClass("green");
					$span1.html(item.condition);
					if(item.condition != "新品") {
						$span1.css({
							background: "#ff5353"
						});
					}
					$div.append($span1);
				}

				var $a = $("<a/>");
				$a.attr({
					href: "html/details.html"
				}).html($("<img/>").attr({
					src: item.imgurl
				}));
				$div.append($a);

				var $i = $("<i/>");
				$i.html(item.title);
				var $label = $("<label/>");
				$label.html(item.price);
				var $span2 = $("<span/>").addClass("littleCarLogo");
				$p.append($i).append($label).append($span2);

				$li.append($div).append($p);
				if(idx == 4 || (idx > 5 && ((idx - 5) % 4 == 0))) {

					$li.addClass("lilast");
				}
				$targetUl4.append($li);

			});
			enlarge();
			var $span = $targetUl4.find("li p span");
			smallCarLogoClick($span);
			$targetUl4.find("li").on("click", function() {
				var $self = $(this);
				recentBroswerRepeatCheck($self);
			});
		}
	});

	//初始化购物车弹框的位置
	var $carAlert = $(".carAlert");

	$carAlert.css({
		"margin-left": -$carAlert.width() / 2,
		"margin-top": -$carAlert.height() / 2
	});
	//点击购物车弹窗的叉号或继续购物或键盘Enter键，就让弹窗隐藏
	var $spanClose = $(".carAlert span");
	var $aContinue = $(".a1");
	//（1）x号点击
	$spanClose.on("click", function() {
		$carAlert.fadeOut();
		var $littleCarLogo = $(".littleCarLogo");
		$littleCarLogo.css({
			backgroundPosition: "-516px -242px"
		});
	});
	//（2）继续购物点击
	$aContinue.on("click", function() {
		$carAlert.fadeOut();
		var $littleCarLogo = $(".littleCarLogo");
		$littleCarLogo.css({
			backgroundPosition: "-516px -242px"
		});
	});
	//（3）回车键按下
	$(window).on("keydown", function(e) {
		if(e.keyCode == 13) {
			$carAlert.fadeOut();
			var $littleCarLogo = $(".littleCarLogo");
			$littleCarLogo.css({
				backgroundPosition: "-516px -242px"
			});
		}
	});

});

//商品图片被鼠标悬停时，呈中心放大的动画函数
function enlarge() {
	var $contentImg = $(".content li div img");
	var iWidth = $contentImg.width();
	var iHeight = $contentImg.height();
	$contentImg.on("mouseenter", function() {
		$(this).stop().animate({
			left: -10,
			top: -10,
			width: iWidth + 20,
			height: iHeight + 20
		});
	}).on("mouseleave", function() {
		$(this).stop().animate({
			left: 0,
			top: 0,
			width: iWidth,
			height: iHeight
		});
	});
}
//点击小购物车图标，触发背景图运动切换，购物车弹窗显示，并让total+1；sum+bigPrice；detailFruitId=此li的xfruitId；buyList+“xfruit，bigPrice，1”；
function smallCarLogoClick($span) {

	$.each($span, function() {
		$(this).on("click", function(event) {
			event.stopPropagation();
			//点中的那个小购物车图标背景图切换
			$(this).css({
				backgroundPosition: "-514px -291px"
			});
			$(".carAlert").css({
				display: "block"
			});
			var detailFruitId = $(this).closest("li").attr("xfruitId");
			setCookie("detailFruitId", detailFruitId, -1, "/");
			var total = parseInt(getCookie("total"));
			var sum = parseFloat(getCookie("sum"));
			var buyList = getCookie("buyList");

			setCookie("total", total + 1, -1, "/"); //1、完成第1步，更新total的cookie值

			var temp = $(this).siblings("label").html();
			var index = temp.indexOf("/");
			temp = temp.substring(1, index);
			var tempStr = temp;
			temp = parseFloat(temp).toFixed(2) - 0;
			sum += temp;
			setCookie("sum", sum, -1, "/"); //2、完成第2步，更新sum的cookie值

			var str = detailFruitId + "," + tempStr + ",1,";
			var lastDouHao = buyList.lastIndexOf(",");
			if(lastDouHao != buyList.length - 1) {
				buyList += "," + str;
			} else {
				buyList += str;
			}
			console.log(buyList);
			setCookie("buyList", buyList, -1, "/"); //3、完成第3步，更新buyList的cookie值

			//购物车读取total，sum 的cookie信息
			var total = getCookie("total") - 0;
			var sum = getCookie("sum") - 0;
			if(!total) {
				total = 0;
			}
			if(!sum) {
				sum = 0;
			}
			sum = sum.toFixed(2);
			setCookie("total", total, -1, "/");
			setCookie("sum", sum, -1, "/");
			$(".carInfo label").first().html(total);
			$(".carInfo label").last().html(sum);
			$(".div1").find("span").html(total);
			//显示购物车弹框
			$(".carAlert").fadeIn();
		});
	});
}