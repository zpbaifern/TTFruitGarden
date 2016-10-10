jQuery(function($){
//初始化验证码
var arr = ["1","2","3","4","5","6","7","8","9","0","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
tNumAppear();

$(".testNumChange").on("click",function(){
	tNumAppear();
});


function tNumAppear(){
$(".tNum").html(arr[parseInt(Math.random()*36)]+arr[parseInt(Math.random()*36)]+arr[parseInt(Math.random()*36)]+arr[parseInt(Math.random()*36)]);
}



//点击注册按钮，检查信息是否正确，都正确,保存cookie，转到首页
$(".a1").on("click",function(){
	var telReg = /^1[34578]\d{9}$/;
	var telValue = $(".tel").val();
	var pswReg = /\d{6,20}/;
	var pswValue1 = $(".startpsw").val();
	var pswValue2 = $(".surepsw").val();
	var testNum = $(".testNum").val();
	var tNum = $(".tNum").text();
	var flag1 = flag2 = flag3 = flag4 = "";
	if(!(telReg.test(telValue))){ 
       $(".tel").closest("p").find("label").css({display:"block"}); 
    }else{
    	$(".tel").closest("p").find("label").css({display:"none"}); 
    	flag1 = "true";
    }
    if(!(pswReg.test(pswValue1))){ 
        $(".startpsw").closest("p").find("label").css({display:"block"}); 
        
    }else{
    	$(".startpsw").closest("p").find("label").css({display:"none"});
    	flag2 = "true";
    }
    if(pswValue2 != pswValue1||pswValue2 == ""){ 
    	 $(".surepsw").closest("p").find("label").css({display:"block"}); 
       
        
    }else{
    	$(".surepsw").closest("p").find("label").css({display:"none"}); 
    	flag3 = "true";
    } 
    if(testNum != tNum){ 
    	$(".testNum").closest("p").find("label").css({display:"block"}); 
        
    }else{
    	$(".testNum").closest("p").find("label").css({display:"none"}); 
    	flag4 = "true";
    } 
    if(flag1 && flag2 && flag3 && flag4)
    {
    	alert("注册成功");
    	//存cookie
    	var d = new Date();
    	d.setDate(d.getDate()+10);
    	var username1 = setCookie("username", telValue, d);
		var password1 = setCookie("password", pswValue1, d);
    	
    }else{
    	return false
    }
});












});