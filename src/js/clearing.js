jQuery(function($){
	//加载页面时，读取buyList的cookie值，保存到名为buyList的变量中
	var buyList = decodeURI(getCookie("buyList"));
	
	//对变量buyList的值（字符串），进行修整
	if(buyList.indexOf(0) == ","){
		buyList = buyList.substring(1);
	}
	if(buyList.lastIndexOf() == ","){
		buyList = buyList.substring(0,buyList.length-1);
	}
	console.log(buyList);
	
	//调用toArray函数，传进经过修整，格式符合规范的buyList字符串作为参数，返回处理好了的数组
	var a = toArray(buyList);
	console.log(a);
	
	var $particularsSon = $(".particularsSon");
	var currentIndex = 0;
	getUlInfo();//调用getUlInfo函数,遍历一次数组a，找到ajax请求回来的并与之匹配的数据，创建节点，匹配的数据加入相应的节点，然后把节点添加到html页面
	function getUlInfo(){//递归解决普遍用for遍历执行ajax时，在第一次ajax请求还没返回完成，就已开始下一次ajax请求，覆盖掉上一次ajax请求，导致只能成功完整执行最后一次ajax请求并返回数据的矛盾问题
		if(currentIndex >= a.length-2){
			return;
		}
		$.ajax({
			async:"false",
			url:"../../data/Goods.json",
			dataType: "json",
			success: function(res) {
				
				$.each(res,function(idx,item) {
				
					if(item.xfruitId == a[currentIndex])
					{
						var $img = $("<img/>").attr({"src":item.imgurlCollection[0],"xFruid":a[currentIndex]});
						var $a1 = $("<a/>").attr({"xFruid":a[currentIndex],href:"details.html"});
						var $li1 = $("<li/>").addClass("li1 paddingTop10").attr("xFruid",a[currentIndex]);
						$a1.append($img);
						$li1.html($a1);
						
						var $span = $("<span/>").html(item.title).attr("xFruid",a[currentIndex]);
						var $a2 = $("<a/>").attr({"xFruid":a[currentIndex],href:"details.html"});
						$a2.append($span);
						var $li2 = $("<li/>").addClass("li2 paddingTop15");
						$li2.append($a2);
						
						if(item.bigPrice == a[currentIndex+1]){
							var $li3 = $("<li/>").html(item.big).addClass("li3 paddingTop15");
							var $li4 = $("<li/>").addClass("li4 paddingTop15").html('<span class="s1">￥</span><span class="s2">'+item.bigPrice+'</span></li>');
						}else{
							var $li3 = $("<li/>").html(item.small).addClass("li3 paddingTop15");
							var $li4 = $("<li/>").addClass("li4 paddingTop15").html('<span class="s1">￥</span><span class="s2">'+item.smallPrice+'</span></li>');
						}
						
						var $li5 = $("<li/>").addClass("li5 paddingTop15").html('<label class="labelLeft">-</label><label class="labelMiddle">'+a[currentIndex+2]+'</label><label class="labelRight">+</label></li>');
						
						var $li6 = $("<li/>").addClass("li6 paddingTop15").html('<span class="s1">￥</span><span span class="s2">'+(a[currentIndex+1]*a[currentIndex+2]).toFixed(2)+'</span>');
						
						var $li7 = $("<li/>").addClass("li7 paddingTop15").html("<span class=delete>删除</span>");
						
						var $ul =$("<ul/>").addClass("goods");
						$ul.append($li1).append($li1).append($li2).append($li3).append($li4).append($li5).append($li6).append($li7);
						
						$ul.appendTo($particularsSon);
					}
				});
				currentIndex+=3;
				getUlInfo();//调用函数自己
				checkNoBuy();//调用检查购买清单是否没有内容的函数
			}
		});
		
	}
	//点击结算列表中的li1图像或li2名字，可以转到对应的详情页
	turnToDetails();
	
	//调用加、减、删除按钮被委托点击事件的函数
	addClick();
	reduClick();
	deleteClick();
	
	//每次加载页面时，统计栏的相应数据，都从total和sum的cookie中读取，
	var total = getCookie("total")-0;
	var sum = getCookie("sum")-0;
	$(".total").html(total)-0;
	if(sum =="0"){
		sum ="0.00"
	}else{
		sum = sum-0;
		sum = sum.toFixed(2);
	}
	$(".sum").html(sum);
});

//-------------------------------------------------------------------------------------------------------------------



//传入字符串，返回新的数组（读取的代表购物清单buyList的cookie值字符串，转成一个数组，然后对数组遍历，把水果ID、规格都相同的商品进行合并，返回处理好后的数组）
function toArray(str){
	var b = str.split(",");
	var c=[];
	var d=[];
	
	for (var i=0;i<b.length;i++) {
		if(i%3==2){
			b[i] = parseInt(b[i]);
		}else{
			b[i] = b[i].toString();
		}
		c.push(b[i]);
	}

	for (var j=0;j<c.length-5;j+=3) {
		for (var k=j+3;k<c.length-2;k++) {
			if(c[j]==c[k]&&c[j+1]==c[k+1]){
				c[j+2]=c[j+2]+c[k+2];
				c[k]=c[k+1]=c[k+2]=NaN;
			}
		}
	}
	for (var l=0;l<c.length;l++) {
		if(c[l]){
			d.push(c[l]);
		}
	}
	return d;
}
//检查购买清单中是否有商品，没有就提示“购物车中还没有商品，继续逛逛吧！”,若检查到已有商品在清单中，提示则隐藏起来
function checkNoBuy(){	
	var $particularsSon = $(".particularsSon");
	if($particularsSon.find("li").html()){
		$particularsSon.find("h3").hide();
	}else{
		$particularsSon.find("h3").show();
	}
}
//点击li1的图像或li2的名字，转到对应详情页
function turnToDetails(){
	$(".particularsSon").on("click","a",function(){
		var detailFruitId = $(this).attr("xFruid");
		setCookie("detailFruitId",detailFruitId,-1,"/");
	});
}

//委托减按钮点击后，total的cookie值-1、sum的cookie值-此商品的单价、buyList的cookie值对应水果id的货物件数-1统计栏重新获取total、sum的cookie值
function reduClick(){
		$(".particularsSon").on("click",".labelLeft",function(){
			
			console.log(getCookie("buyList"));
			var num = $(this).next(".labelMiddle").html()-0;
			var perMoney = $(this).parent().prev().children().eq(1).html()-0;
			var allMoney = $(this).parent().next().children().eq(1).html()-0;
			if(num >= 2){
				num-=1;
				$(this).next(".labelMiddle").html(num);
				
				var afterRedu = allMoney - perMoney;
				afterRedu = afterRedu.toFixed(2);
				$(this).parent().next().children().eq(1).html(afterRedu);
				
				//获取total，sum的cookie值
				var total = getCookie("total")-0;
				total -=1;
				var sum = getCookie("sum")-0;
				sum = sum-perMoney;
				sum=sum.toFixed(2);
				//total，sum的cookie重新赋值
				setCookie("total",total,-1,"/");
				setCookie("sum",sum,-1,"/");
				
				$(".total").html(total);
				$(".sum").html(sum);
			}else{
				num = 1;
				return
			}
			//调用更新buyList的cookie值的函数
			var xFruid = $(this).parent().siblings().first().attr("xFruid");
			var type = $(this).parent().prev().children().last().html();
			
			console.log(xFruid);
			console.log(type);
			newBuyList(xFruid,type,num);
			console.log(getCookie("buyList"));
		});
	}
//委托减按钮点击后，total的cookie值+1、sum的cookie值+此商品的单价、buyList的cookie值对应水果id的货物件数+1、统计栏重新获取total、sum的cookie值
function addClick(){
		$(".particularsSon").on("click",".labelRight",function(){
			console.log(getCookie("buyList"));
			var num = $(this).prev(".labelMiddle").html()-0;
			var perMoney = $(this).parent().prev().children().eq(1).html()-0;
			var allMoney = $(this).parent().next().children().eq(1).html()-0;
			num+=1;
			$(this).prev(".labelMiddle").html(num);
			
			var afterAdd = allMoney + perMoney;
			afterAdd = afterAdd.toFixed(2);
			$(this).parent().next().children().eq(1).html(afterAdd);
			
			//获取total，sum的cookie值
			var total = getCookie("total")-0;
			total +=1;
			var sum = getCookie("sum")-0;
			sum = sum+perMoney;
			sum=sum.toFixed(2);
			//total，sum的cookie重新赋值
			setCookie("total",total,-1,"/");
			setCookie("sum",sum,-1,"/");
			
			$(".total").html(total);
			$(".sum").html(sum);
			
			
			//调用更新buyList的cookie值的函数
			var xFruid = $(this).parent().siblings().first().attr("xFruid");
			var type = $(this).parent().prev().children().last().html();
			console.log(xFruid);
			console.log(type);
			newBuyList(xFruid,type,num);
			console.log(getCookie("buyList"));
			
		});
	}
//更新buyList的中匹配的水果id的货物件数
function newBuyList(xFruid,type,num){
	var buyList = getCookie("buyList");
	buyList = toArray(buyList);
	for (var i = 0;i <= buyList.length-2;i+=3) {
		if(buyList[i] == xFruid && buyList[i+1] == type ){
			buyList[i+2] = num;
		}
	}
	buyList.join(",");
	setCookie("buyList",buyList,-1,"/")
}


//委托点击"删除"后，total、sum、buyList的cookie值、统计栏更新
function deleteClick(){
	$(".particularsSon").on("click",".delete",function(){
		
		var num = $(this).parent().prev().prev().children().eq(1).html()-0;
		var allMoney = $(this).parent().prev().children().eq(1).html()-0;
		
		//获取total，sum的cookie值
		var total = getCookie("total")-0;
		total -=num;
		var sum = getCookie("sum")-0;
		sum -= allMoney;
		sum=sum.toFixed(2);
		//total，sum的cookie重新赋值
		setCookie("total",total,-1,"/");
		setCookie("sum",sum,-1,"/");
		
		$(".total").html(total);
		$(".sum").html(sum);
		
		
		//调用更新buyList的cookie值的函数
		var xFruid = $(this).parent().parent().children().first().attr("xFruid");
		var perPrice = $(this).parent().prev().prev().prev().children().last().html();
		var buyList = getCookie("buyList");
		buyList = toArray(buyList);
		for (var i = 0;i<buyList.length-2;i+=3) {
			if(buyList[i]==xFruid && buyList[i+1] == perPrice){
				buyList.splice(i,3);
				i-=3;
			}
		}
		buyList.join(",");
		console.log(buyList);
		setCookie("buyList",buyList,-1,"/");
		
		//移除所在的ul
		$(this).closest(".goods").remove();
		checkNoBuy();
	});
}
