jQuery(function($) {
	//获取cookie中的账号密码
	var account = getCookie("account");
	var arrAccount = JSON.parse(account);
	
	
	
	//如果存在在登录时因勾选了记住密码才会创建的“rememberName”的cookie值，则把记住的用户名、密码自动填入对应输入框中
	var rememberName = getCookie("rememberName");
	var rememberPassword = getCookie("rememberPassword");
	var flag1 = flag2 = 0;
	if(rememberName) {
		$(".tel").val(rememberName);
		$(".psw").val(rememberPassword);
	}

	//登录按钮绑定事件
	$(".a1").on("click", function() {

		var $telValue = $(".tel").val();
		var $pswValue = $(".psw").val();
		var oldusername;
		var oldpassword;
		
		//在之前已注册过的前提下，检测用户名和密码是否匹配
		if(arrAccount) {
			$.each(arrAccount,function(idx,item){
				if(item.name == $telValue ){
					oldusername = $telValue;
					if(item.psw == $pswValue){
						oldpassword = $pswValue;
					}
				}
			});
			
			if(oldusername){
				$(".tel").closest("p").find("label").css({
					display: "none"
				});
				flag1 = 1;
			}else{
			 	$(".tel").closest("p").find("label").css({
					display: "block"
				});
				flag1 = 0;
			}
			if(oldpassword) {
				$(".psw").closest("p").find("label").css({
					display: "none"
				});
				flag2 = 1;
			} else {
				$(".psw").closest("p").find("label").css({
					display: "block"
				});
				flag2 = 0;
			}
			//如果用户名和密码匹配无误，则弹框提示登陆成功，并跳转至首页，否则不能跳转
			if(flag1 && flag2) {
				alert("登录成功");
				//如果勾选了“记住密码”，则点击登录时，将会创建remember。。。的cookie，方便下次登录自动填入输入框中
				if($(".remember").prop("checked")) {
					//创建登录账号密码的cookie
					var date = new Date();
					date.setDate(date.getDate() + 12);
					var rname = setCookie("rememberName", oldusername, date, "/");
					var rpassword = setCookie("rememberPassword", oldpassword, date, "/");

				} else {
					$(".tel").val("");
					$(".psw").val("");

				}
				//创建记录登录状态的cookie（loginState）
				setCookie("loginState", "已登录", -1, "/");
			
			} else {
				//用户名和密码匹配有误则不能跳转
				return false;
			}

		} else {//若之前未曾注册过（oldusername的cookie值为假），则提示出错标志和弹框“未注册”，并不能跳转
			$(".tel").closest("p").find("label").css({
				display: "block"
			});
			$(".psw").closest("p").find("label").css({
				display: "block"
			});
			alert("账户未注册");
			return false;
		}
	});

});