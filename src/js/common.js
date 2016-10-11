jQuery(function($){
//检查目标地点的cookie是否存在，如果没有就创建赋值为上海，有就读取，然后把$(".topDiv1 i")的内容进行替换
	
		var targetField =getCookie("targetField");
		console.log(targetField);		
		if(!$(".topDiv1 i").first().html()){
			if(!targetField){
				targetField = "上海";
				$(".topDiv1 i").first().html(targetField);
				setCookie("targetField",targetField,-1,"/");
			}else{
				$(".topDiv1 i").first().html(getCookie("targetField"));
			}
		}
			


		//检查代表购买商品总件数的total、代表总付费金额的sum是否已存在，如果没有，则分别创建并赋值为0		
		var total  = getCookie("total");
		var sum  = getCookie("sum");
		
		if(total==""){
			total = 0;
			setCookie("total",total,-1,"/");
		}
		if(sum==""){
			var sum =(0).toFixed(2);
			sum = sum-0;
			setCookie("sum",sum,-1,"/");
		}
		
		//检查代表购买清单的buyList是否存在，如果没有，则创建并赋值为空字符串
		var buyList = getCookie("buyList");
		if(!buyList){
			var buyList ="";
			setCookie("buyList",buyList,-1,"/");
		}

	$(".div1").find("span").html(total);	
	
	//检查代表最近浏览清单的recentBrowserList是否存在，如果没有，则创建并赋值为空字符串,若有就整理
		var recentBrowserList = getCookie("recentBrowserList");
		console.log(recentBrowserList);
			if(!recentBrowserList){
				var recentBrowserList ="";
				setCookie("recentBrowserList",recentBrowserList,-1,"/");
			}else{
					var arr = recentBrowserList.split(",");
					if(!arr[0]){
						arr.shift();
					}
					
					if(arr.length>=6){
						arr = arr.slice(arr.length-5);
					}
					console.log("liulan: "+arr);
					
					
					var currentIndex = 0;
					recentBrowser();
					function recentBrowser(){
						
						if(currentIndex>=arr.length)
						{return}
						$.ajax({
							url:"../../../data/Goods.json",
							dataType:"json",
							success:function(res){
								
								$.each(res, function(idx,item) {
									if(arr[currentIndex] == item.xfruitId){
										//list页，details页的最近浏览
										var $img = $("<img/>").css({background:"url("+item.imgurlList+") no-repeat",backgroundSize:"cover"}).attr("xfruitId",item.xfruitId);
										var $span1 = $("<span/>").html(item.title).css({"fontWeight":"bold",width:"120px"});
										var $span2 = $("<span/>").html(item.intro).css({"color":"#ccc",width:"148px"});
										var $a =$("<a/>").attr("href","details.html").css({display:"block",overflow:"hidden"});
										var $li = $("<li/>").attr("xfruitId",item.xfruitId);
										$a.append($img).append($span1).append($span2);
										$li.append($a)
										$li.prependTo($(".recentBrowseUl"));
										//clearing页的你可能感兴趣
//											
										var $interestedList = $(".interestedList");
										
										var $listli = $("<li/>").attr("xfruitId",item.xfruitId);
										var $divImg =$("<div/>").addClass("img").css({background:"url("+item.imgurlList+") no-repeat",backgroundSize:"cover"});
										var $a = $("<a/>").attr({href:"details.html"});
										$divImg.append($a);
										
										var $divUp = $("<div/>").addClass("up").html(item.title);
										
										var $divDown = $("<div/>").addClass("down");
										var $label = $("<label/>").html(item.price);
										$divDown.append($label);
										
										
										$listli.append($divImg).append($divUp).append($divDown);
										$interestedList.append($listli);
									}
								});
								currentIndex+=1;
								recentBrowserList = arr.join(",");
								setCookie("recentBrowserList",recentBrowserList,-1,"/");
								recentBrowser();//调用函数自己
							}
						});
						
					}
			}
		
		recentBroswerClick();
	
	
	//检查登录状态，若已登录则提示已登录|退出，否则显示未登录  
	var  loginstate= decodeURI(getCookie("loginState"));
	
	if(loginstate){
		$(".loginState").html(loginstate).css({color:"#64A131"});
		$(".loginState").next("label").html("|退出").css({color:"#555",cursor:"pointer"});
	}else{
		$(".loginState").html("未登录").css({color:"red"});
	}
	
	
	//点击退出，清除loginState的cookie，执行登录检测函数
	$(".exit").on("click",function(){
		
		setCookie("loginState","",-1,"/");
		$(".loginState").html("未登录").css({color:"red"});
		$(".loginState").next("label").html("");
		
	});
	
	
	
	
	
	//显示挑选所在地区的列表
	var $topDiv1 = $(".topDiv1");
	var $topDiv1son1 = $(".topDiv1-son1");
	$topDiv1.on("mouseenter",function(){
		$(this).css({background:"white"});
		$topDiv1son1.css({display:"block"});
	}).on("mouseleave",function(){
		$(this).css({background:"#eee"});
		$topDiv1son1.css({display:"none"});
	});
	
	
	//热门城市中的a被点击，所在地区就会改变为该地区
	$topDiv1son1.find("p").eq(0).find("a").on("click",function(){
		var targetField = $(this).html();
		$topDiv1.find("i").html(targetField);
		$topDiv1son1.css({display:"none"});
		setCookie("targetField",targetField,-1,"/");
	});
	
	//设置外壳li悬停效果
	var $liOut = $(".liOut");
	$liOut.on("mouseenter",function(){
		$liOut.css({background:"none"});
		$liOut.find("a").css({color:"#444"});
		$liOut.find("span").css({color:"#444"});
		$(this).css({background:"#eee"});
		$(this).find("a").css({color:"#64A131"});
		$(this).find("span").css({color:"#64A131"});
	}).on("mouseleave",function(){
		$liOut.css({background:"none"});
		$liOut.find("a").css({color:"#444"});
		$liOut.find("span").css({color:"#444"});
	});
	
	
	//设置外壳li点击效果，释放内容列表效果
	$liOut.on("click",function(){
	//设置不含ul的外壳li点击效果，整个列表隐藏，目标地点更新
	if(!$(this).find("ul").html()){
		$(".topDiv1_I").html($(this).find("a").text());
		
		
	}else{
		$(this).find("ul").css({background:"white"});
		$(this).find("ul").toggle();
		//设置内里li悬停效果
		$(this).find("ul").children("li").on("mouseenter",function(){
			$(this).parents("li").css({background:"none"});
			$(this).parents("li").find("a").css({color:"#444"});
			$(this).parents("li").find("span").css({color:"#444"});
			$(this).css({color:"#64A131"}).siblings("li").css({color:"#444"});
		}).on("mouseleave",function(){
			$(this).css({color:"#444"});
			$(this).parents("li").css({background:"#eee"});
			$(this).parents("li").find("a").css({color:"#64A131"});
			$(this).parents("li").find("span").css({color:"#64A131"});
		});
		//设置内里li点击效果
		$(this).find("ul").children("li").on("click",function(){
			var targetField = $(this).html();    
			$(".topDiv1_I").html(targetField);
			$topDiv1son1.hide();
			setCookie("targetField",targetField,-1,"/");
		});
		}
		$topDiv1son1.hide();
	});
	
	//设置“果园公告”悬停时，显示详细信息
	var $fruitPublicAll = $(".fruitPublicAll");
	var $fruitPublic = $(".fruitPublic");
	$fruitPublicAll.on("mouseenter",function(){
		$fruitPublic.show();
	}).on("mouseleave",function(){
		$fruitPublic.hide();
	});
	var $phoneGardenAll = $(".phoneGardenAll");
	var $phoneGarden = $(".phoneGarden");
	$phoneGardenAll.on("mouseenter",function(){
		$phoneGarden.show();
	}).on("mouseleave",function(){
		$phoneGarden.hide();
	});
	
	

	
	
//点击“top”，回到顶部
	var $backTop = $(".backTop");
	$backTop.on("click",function(){
		$(document).scrollTop("0");
	});
	

	
});


function recentBroswerClick(){
	//最近浏览列表的点击和你可能感兴趣的列表的点击设置相同效果
	//最近浏览列表的点击
	$(".recentBrowseUl").on("click","li",function(){
		var detailFruitId = $(this).attr("xfruitId");
		setCookie("detailFruitId",detailFruitId,-1,"/");
	});
	//你可能感兴趣的列表的点击
	$(".interestedList").on("click","li",function(){
		var detailFruitId = $(this).attr("xfruitId");
		setCookie("detailFruitId",detailFruitId,-1,"/");
	});
}


function recentBroswerRepeatCheck($self) {
	var detailFruitId = setCookie("detailFruitId", $self.attr("xfruitId"), -1, "/");
	var recentBrowserList = getCookie("recentBrowserList");
	var arr = recentBrowserList.split(",");
	if(arr.length >= 2) {
		if(!arr[0]) {
			arr.shift();
		}
		for(var i = 0; i < arr.length; i++) {
			if(arr[i] == $self.attr("xfruitId")) {
				arr.splice(i, 1);
				i--;
			}
		}
		recentBrowserList = arr.join(",");
		console.log(recentBrowserList);
		recentBrowserList += "," + $self.attr("xfruitId");
		console.log(recentBrowserList);
	} else {
		recentBrowserList += "," + $self.attr("xfruitId");
	}
	setCookie("recentBrowserList", recentBrowserList, -1, "/");
}

















//instanceof: 判断是否属于某个类型
//name=value;[expires=date];[path=路径];[domain=域名];[secure]
//设置cookie
function setCookie(name,value,expires,path,domain,secure){
	//name=value
	var cookieText = name +"="+ value;
	//失效时间expires=date
	if(expires instanceof Date){
		cookieText += ";expires="+expires;
	}
	//path=路径
	if(path){
		cookieText += ";path="+path;
	}
	//domain=域名
	if(domain){
		cookieText += ";domain="+domain;
	}
	//secure
	if(secure){
		cookieText += ";secure";
	}
	
	document.cookie = cookieText;
	return document.cookie;
 	
}

//获取cookie
function getCookie(name){
	var cookie = decodeURIComponent(document.cookie);//name=1; name2=2; name3=3
	
	var arr = cookie.split("; ");
	//[name=1,name2=2,name3=3]
	for(var i=0; i<arr.length; i++){
		//name=1
		var arr2 = arr[i].split("=");
		//[name,1]
		if(arr2.length >=2){
			if(arr2[0] == name){
				return arr2[1];
			}
		}	
	}
	return "";
	
}


//删除cookie
function removeCookie(name){
	var d = new Date(); 
	document.cookie = encodeURIComponent(name) +"=;expires="+d;
	return document.cookie;
	
}
