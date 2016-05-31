//登录
$(".login_form").Validform({
	beforeSubmit:function(curform){
		var mobile = $("#mobile").val();
		if(trim(mobile)==""){
			alert("请输入手机号");
			return false;
		}
		if(!isMobile(mobile)){
			alert("手机号格式不正确");
			return false;
		}
		var pwd = $("#pwd").val();
		if(trim(pwd)==""){
			alert("请输入密码");
			return false;
		}
		if(!isPassword(pwd)){
			alert("密码格式字母，数字，下划线，长度6-20位");
			return false;
		}
		var code = getQueryString("code");
		$("#code").val(code);
	},
	btnSubmit:".login_btn",
	ajaxPost:true,
	callback:function(data){
		if(data.code=="SUCCESS"){
			var url = getQueryString("url");
			if(url!=null&&url!=""&&url!="null"){
				window.myform.action=url;
			}else{
				url = data.msg;
				if(url!=null&&url!=""){
					window.myform.action=url;
				}
			}
			window.myform.submit();
		}else if(data.code=="-1"){
			location.href="/login/perfectReg.html";
	    }else{
			alert(data.msg);
		}
	}
});
//注册
$(".reg_form").Validform({
	beforeSubmit:function(curform){
		var mobile = $("#mobile").val();
		if(trim(mobile)==""){
			alert("请输入手机号");
			return false;
		}
		if(!isMobile(mobile)){
			alert("手机号格式不正确");
			return false;
		}
		var pwd = $("#pwd").val();
		if(trim(pwd)==""){
			alert("请输入密码");
			return false;
		}
		if(!isPassword(pwd)){
			alert("密码格式字母，数字，下划线，长度6-20位");
			return false;
		}
	
		var verifyCode = $("#verifyCode").val();
		if(trim(verifyCode)==""){
			alert("请输入验证码");
			return false;
		}
		
		var invitationCode = $("#invitationCode").val();
		if(!trim(invitationCode)==""){
			if(invitationCode.length != 6){
				alert("邀请码长度为6");
				return false;
			}
		}
		
	},
	btnSubmit:".reg_btn",
	ajaxPost:true,
	callback:function(data){
		if(data.code=="SUCCESS"){
			var url = getQueryString("url");
			window.location.href = window.myform.action + "?url="+url;
		}else{
			alert(data.msg);
		}
	}
});
//完善资料
$(".perReg_btn").Validform({
	beforeSubmit:function(curform){
		var name = $("#name").val();
		if(trim(name)==""){
			alert("请输入姓名");
			return false;
		}
		var userType = $("#userType").val();
		if(userType==9){
			var bankId = $("#bankId").val();
			if(trim(bankId)==""){
				alert("请选择公司/银行");
				return false;
			}
			var subBankId = $("#subBankId").val();
			if(trim(subBankId)==""){
				alert("请选择支行");
				return false;
			}
		}else{
			var team = $("#team").val();
			if(trim(team)==""){
				alert("请输入公司/银行");
				return false;
			}
		}
	},
	btnSubmit:".reg_btn",
	ajaxPost:true,
	callback:function(data){
		if(data.code=="SUCCESS"){
			var url = getQueryString("url");
			if(url!=null&&url!=""&&url!="null"){
				window.location.href=url;
			}else{
				window.myform.submit();
			}
		}else{
			alert(data.msg);
		}
	}
	
});

function wjmm(){
	var url = getQueryString("url");
	window.location.href="wjmm.html?url="+url;
}

$(".zc").click(function(){
	var url = getQueryString("url");
	window.location.href="reg.html?url="+url;
});

$(".wjmm").click(function(){
	var url = getQueryString("url");
	window.location.href="login.html?url="+url;
});

//获取验证码
var timer;
function sendVerifyCode(flag){
	var mobile = $("#mobile").val();
	if(trim(mobile)==""){
		alert("请输入手机号");
		return false;
	}
	if(!isMobile(mobile)){
		alert("手机号格式不正确");
		return false;
	}
	$.ajax({
		url : "/mortgage/account/checksendsms",
		type : 'POST',
		data:{
			"mobile":mobile,
			"flag":flag
		},
		dataType : 'json',
		success : function(data) {
			if (data.code=="SUCCESS") {
				$(".verifyCode").removeAttr("onclick");
				$("#zxm").html('<a href="javascript:void(0)" class="yzm1 fr verifyCode"><span class=\'time-span\'>60</span>S重新获取</a>');
   			 	timer = self.setInterval("changeTime("+flag+")",1000);
			}else{
				alert(data.msg);
			}
		}
	});
}
function changeTime(flag){
	 var t = $('.time-span').html();
	 if(t > 0){
		 $('.time-span').html(t-1);
	 }else{
		  window.clearInterval(timer);
		  $(".verifyCode").html("获取验证码");
		  $(".verifyCode").attr("onclick","sendVerifyCode("+flag+")");
	 }
}
//忘记密码
$(".resetpwd_form").Validform({
	beforeSubmit:function(curform){
		var mobile = $("#mobile").val();
		if(trim(mobile)==""){
			alert("请输入手机号");
			return false;
		}
		if(!isMobile(mobile)){
			alert("手机号格式不正确");
			return false;
		}
		var verifyCode = $("#verifyCode").val();
		if(trim(verifyCode)==""){
			alert("请输入验证码");
			return false;
		}
		var pwd = $("#pwd").val();
		if(trim(pwd)==""){
			alert("请输入密码");
			return false;
		}
		if(!isPassword(pwd)){
			alert("密码格式字母，数字，下划线，长度6-20位");
			return false;
		}
	},
	btnSubmit:".resetpwd_btn",
	ajaxPost:true,
	callback:function(data){
		if(data.code=="SUCCESS"){
			alert("重置密码成功");
			var url = getQueryString("url");
			var activity = getQueryString("activity");
			if(activity == 'y'){
				window.location.href=url;
			}else{
				window.location.href="login.html?url="+url;
			}
		}else{
			alert(data.msg);
		}
	}
});