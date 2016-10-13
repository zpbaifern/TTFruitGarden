jQuery(function($) {

	//限制加载次数
	var i = 0;

	//鲜果导航样式初始化
	var $navMiddle = $(".navMiddle");
	$navMiddle.find("li").eq(1).css({
		"border-bottom": "2px solid #64A131"
	});
	$navMiddle.find("li").eq(1).find("a").css({
		color: "#64A131"
	});
	$navMiddle.find("li").eq(1).find("span").css({
		color: "#64A131"
	});

	//加载商品(懒加载)
	$.ajaxSetup({
		url: "../../data/Goods.json",
		dataType: "json",
		success: function(res) {

			var $lazy = $(".lazy");

			$.each(res, function(idx, item) {
				var self = this;
				var $li = $("<li/>").addClass("lazyli");
				$li.attr({
					"xfruitId": item.xfruitId
				});

				var $div1 = $("<div/>").addClass("img");
				var $a = $("<a/>").attr({
					"href": "details.html"
				});
				$div1.append($a).css({
					background: "url(" + item.imgurlList + ") no-repeat"
				});

				var $div2 = $("<div/>").addClass("up");
				$div2.html(item.title);
				var $label = $("<label/>");
				$div2.append($label);

				if(item.bigPriceAll) {

					$label.html(item.bigPriceAll);

					var $div3 = $("<div/>").addClass("down");
					$label1 = $("<label/>").addClass("cur").html(item.big);
					$label2 = $("<label/>").html(item.small);
					$label1.addClass("big").attr({
						bigPriceAll: (item.bigPriceAll + "")
					});
					$label2.addClass("small").attr({
						smallPriceAll: (item.smallPriceAll + "")
					});
					var $p = $("<p/>").addClass("littleCarLogo");
					$div3.append($label1);
					$div3.append($label2);
					$div3.append($p);

				} else {

					$label.html(item.smallPriceAll);

					var $div3 = $("<div/>").addClass("down");
					$label1 = $("<label/>").addClass("cur").html(item.small);
					$label1.attr({
						id: "small"
					});
					var $p = $("<p/>").addClass("littleCarLogo");
					$div3.append($label1);
					$div3.append($p);

				}

				$li.append($div1).append($div2).append($div3);
				$lazy.append($li);

				if(item.condition != "") {
					var $span1 = $("<span/>").html(item.condition);
					switch(item.condition) {
						case "新品":
							$span1.css({
								background: "#64A131"
							});
							break;
						case "包邮":
							$span1.css({
								background: "skyblue"
							});
							break;
						case "补货中":
							$span1.css({
								background: "silver"
							});
							break;
						default:
							$span1.css({
								background: "#ff5353"
							});
							break;
					}

					$li.append($span1);
				}

			});
			$.each($(".lazy li"), function() {
				$(this).on("click", function() {
					var $self = $(this);
					recentBroswerRepeatCheck($self);
				});

			});
			typeClick();
			smallCarLogoClick();
		}
	});
	$.ajax();

	// 懒加载效果
	var j = 0

	$(window).on('scroll', function() {
		// 获取滚动条滚动过的距离
		var scrollTop = $(window).scrollTop();
		//				console.log(scrollTop+"；；；；"+$(document).height()+"；；；；"+$(window).height());
		if(scrollTop >= $(document).height() - $(window).height() - 600) {
			i++;
			if(i <= 4) {
				j++;
				if(j > 1) {
					$.ajax();
				}
			}
		}
	})

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
		console.log($littleCarLogo.html());
		$littleCarLogo.css({
			backgroundPosition: "-517px -242px"
		});
	});
	//（2）继续购物点击
	$aContinue.on("click", function() {
		$carAlert.fadeOut();
		var $littleCarLogo = $(".littleCarLogo");
		$littleCarLogo.css({
			backgroundPosition: "-517px -242px"
		});
	});
	//（3）回车键按下
	$(window).on("keydown", function(e) {
		if(e.keyCode == 13) {
			$carAlert.fadeOut();
			var $littleCarLogo = $(".littleCarLogo");
			$littleCarLogo.css({
				backgroundPosition: "-517px -242px"
			});
		}
	});

	
});
//-----------------------------------------------------------------------------------------
//点选规格，高亮对应价格
function typeClick() {
	$(".big").on("click", function() {
		$(this).closest("li").find(".up label").html($(this).attr("bigPriceAll"));
		$(this).addClass("cur").siblings("label").removeClass("cur");
	});
	$(".small").on("click", function() {
		$(this).closest("li").find(".up label").html($(this).attr("smallPriceAll"));
		$(this).addClass("cur").siblings("label").removeClass("cur");
	});
}

//点击小购物车图标，触发背景图运动切换，并让total+1；sum+bigPriceAll；detailFruitId=此li的xfruitId；buyList+“xfruit，bigPriceAll，1”；
function smallCarLogoClick() {

	var $p = $(".lazy").find(".down p");
	$.each($p, function() {
		$(this).on("click", function(event) {
			event.stopPropagation();

			//点中的那个小购物车图标背景图切换
			$(this).css({
				backgroundPosition: "-514px -291px"
			});

			var detailFruitId = $(this).closest("li").attr("xfruitId");
			setCookie("detailFruitId", detailFruitId, -1, "/");
			var total = parseInt(getCookie("total"));
			var sum = parseFloat(getCookie("sum"));
			var buyList = getCookie("buyList");

			setCookie("total", total + 1, -1, "/"); //1、完成第1步，更新total的cookie值

			var temp = $(this).closest("li").find(".up label").html();
			temp = temp.substring(1);
			temp = parseFloat(temp).toFixed(2) - 0;
			var tempStr = temp.toFixed(2);
			sum += temp;
			setCookie("sum", sum, -1, "/"); //2、完成第2步，更新sum的cookie值

			var str = detailFruitId + "," + tempStr + ",1,";
			var lastDouHao = buyList.lastIndexOf(",");
			if(lastDouHao == buyList.length - 1) {
				buyList += str;
			} else {
				buyList += "," + str;
			}

			console.log(buyList);
			setCookie("buyList", buyList, -1, "/"); //3、完成第3步，更新buyList的cookie值

			//购物车读取total，sum 的cookie信息，更新对应的数据
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
		})

	});

}