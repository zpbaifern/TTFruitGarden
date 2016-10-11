jQuery(function($){
//先判断是否存在表示购物总件数total、购物总金额sum的cookie及购物清单buyList，没有则创建，并都赋值为0
	if(flag){
		total  = getCookie("total");
		sum  = getCookie("sum");
		
//		var buyList = getCookie("buyList");

		if(total==""){
			
			setCookie("total",0);
		}
		if(sum==""){
			
			setCookie("sum","0.00");
		}
//		if(!buyList){
//			setCookie("buyList","");
//		}
	}
});