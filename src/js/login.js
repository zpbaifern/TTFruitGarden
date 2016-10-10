jQuery(function($) {
	////	获取cookie中的密码

	var oldusername = getCookie("username");
	var oldpassword = getCookie("password");
	var rememberName = getCookie("rememberName");
	var rememberPassword = getCookie("rememberPassword");
	var flag1 = flag2 = 0;
	
	
	if(rememberName){
		$(".tel").val(rememberName);
		$(".psw").val(rememberPassword);
	}
	
	
			
	//登录按钮绑定事件
	$(".a1").on("click", function() {
		
		
			var $telValue = $(".tel").val();
			var $pswValue = $(".psw").val();
		
		
		
		
		
		
		if(oldusername) {
			



			if($telValue != oldusername) {
				$(".tel").closest("p").find("label").css({display: "block"});
				flag1 = 0;
			} else {
				$(".tel").closest("p").find("label").css({display: "none"});
				flag1 = 1;
			}
			if($pswValue != oldpassword) {
				$(".psw").closest("p").find("label").css({display: "block"});
				flag2 = 0;

			} else {
				$(".psw").closest("p").find("label").css({display: "none"});
				flag2 = 1;
			}
			
			
			if(flag1 && flag2) {
				alert("登录成功");
				
						if($(".remember").prop("checked")){
							alert("勾了")
							//创建登录账号密码的cookie
							var date = new Date();
							date.setDate(date.getDate()+12);
							var rname = setCookie("rememberName",oldusername,date,"/");
							var rpassword = setCookie("rememberPassword",oldpassword,date,"/");
							
							
							
							
						} else {
							alert("meijizhu");
							$(".tel").val("");
							$(".psw").val("");
							
						}
						
						var loginState = setCookie("loginState","已登录",-1,"/");
						

			}else {
					return false;
				}
		
		}else {
			$(".tel").closest("p").find("label").css({display: "block"});
			$(".psw").closest("p").find("label").css({display: "block"});
			alert("账户未注册");
			return false;
		}
	});

});
