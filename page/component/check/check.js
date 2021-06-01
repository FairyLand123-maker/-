const check={
	telphone(data){
		if(!(/^1[3456789]\d{9}$/.test(data))){
			uni.showToast({
				title:"手机格式有误",
				icon:"none"
			})
		    return false; 
		}
		return true;
	},
	password(data){
		if(data.length<6){
			uni.showToast({
				title:"密码长度不能小于六位",
				icon:"none"
			})
			return false; 
		}
		return true;
	},
	code(data){
		if(data.length!=4){
			uni.showToast({
				title:"验证码长度不符",
				icon:"none"
			})
			return false; 
		}
		return true;
	},
	username(data){
		if(data==''){
			uni.showToast({
				title:"用户姓名不能为空",
				icon:"none"
			})
			return false; 
		}
		return true;
	},
	city(data){
		if(data==''||data=="请选择收货地址"){
			uni.showToast({
				title:"请选择收货地址",
				icon:"none"
			})
			return false; 
		}
		return true;
	},
	address(data){
		if(data==''){
			uni.showToast({
				title:"请输入详细地址",
				icon:"none"
			})
			return false; 
		}
		return true;
	}
}