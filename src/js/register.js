jQuery(function($) {
	//初始化验证码
	var arr = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	tNumAppear();

	$(".testNumChange").on("click", function() {
		tNumAppear();
	});

	function tNumAppear() {
		$(".tNum").html(arr[parseInt(Math.random() * 36)] + arr[parseInt(Math.random() * 36)] + arr[parseInt(Math.random() * 36)] + arr[parseInt(Math.random() * 36)]);
	}

	//点击注册按钮，检查信息是否正确，都正确,保存cookie，转到首页
	//若勾选了记住密码，会创建remember。。。的cookie，下次加载页面会自动填入在输入框中
	$(".a1").on("click", function() {
		var telReg = /^1[34578]\d{9}$/;
		var telValue = $(".tel").val();
		var pswReg = /\d{6,20}/;
		var pswValue1 = $(".startpsw").val();
		var pswValue2 = $(".surepsw").val();
		var testNum = $(".testNum").val();
		var tNum = $(".tNum").text();
		var flag1 = flag2 = flag3 = flag4 = "";
		if(!(telReg.test(telValue))) {
			$(".tel").closest("p").find("label").css({
				display: "block"
			});
		} else {
			$(".tel").closest("p").find("label").css({
				display: "none"
			});
			flag1 = "true";
		}
		if(!(pswReg.test(pswValue1))) {
			$(".startpsw").closest("p").find("label").css({
				display: "block"
			});

		} else {
			$(".startpsw").closest("p").find("label").css({
				display: "none"
			});
			flag2 = "true";
		}
		if(pswValue2 != pswValue1 || pswValue2 == "") {
			$(".surepsw").closest("p").find("label").css({
				display: "block"
			});

		} else {
			$(".surepsw").closest("p").find("label").css({
				display: "none"
			});
			flag3 = "true";
		}
		if(testNum != tNum) {
			$(".testNum").closest("p").find("label").css({
				display: "block"
			});

		} else {
			$(".testNum").closest("p").find("label").css({
				display: "none"
			});
			flag4 = "true";
		}
		if(flag1 && flag2 && flag3 && flag4) {
			alert("注册成功");
			//存cookie
			var d = new Date();
			d.setDate(d.getDate() + 10);
			//获取存储账户信息的cookie值，存入变量account中，创建一个空数组arrAccount
			var account = (getCookie("account"));
			var arrAccount=[];
			//如果account值为真，则让arr保存account字符串解析出来的数组对象，否则，arr依然为空数组
			if(account){
				arrAccount = JSON.parse(account);
			}
			var obj ={};
			obj.name = telValue;
			obj.psw = pswValue1;
			arrAccount.push(obj);
			account = JSON.stringify(arrAccount);
			setCookie("account",account,d,"/");
		} else {
			return false
		}
	});

});