userCenter = {
	init : function() {
		$('#btnDrawOrder').on('click', function(){
			userCenter.drawOrdersApply();
		});
	},
	account : '',
	pwd : '',
	code : '',
	mobileExists : 0,
	leftTime:120,
	timer:0,
	st:'',
	
	/*
	 * 加载好友订单
	 */
	loadFriendOrders:function(){

	},
	/**
	 * 订单认领申请
	 */
	drawOrdersApply:function(){
		var items = $("#orderDrawPop input[type='text']");
		var d = {
				trade_ids:[],
				phone:''
		};
		for (var i = 0; i < items.length; i++) {
			var tradeId = $(items[i]).val();
			if(tradeId != '') {
				d.trade_ids.push(tradeId);
			}
		}
		if(d.trade_ids.length == 0) {
			return new TipBox({str:'请输入订单号噢',setTime:'1000'});
//			return false;
		}
		console.log("data=" + JSON.stringify(d));
		$.ajax({
		     type: 'POST',
		     url: '/api/member/orderDrawApply' ,
		    data: JSON.stringify(d),
		    dataType: 'json',
		    contentType: "application/json; charset=utf-8", 
		    	success:function(data) {  
		    		closepop();
		    		console.log('认领申请结果: ' + JSON.stringify(data));
		    		if(data.error_code == 200 ) {  
		    			if(data.data.failList.length == 0) { //提交成功
		    				window.location.href='/member/orderApply_success';
		    			} else {
		    				var failIds = [];
		    				for(var i=0; i<data.data.failList.length; i++) {
		    					var item = data.data.failList[i];
		    					failIds.push('' + item.id +"," + item.errorCode);
		    				}
		    				var ids = failIds.join(',');
		    				window.location.href='/member/orderApply_fail?result=fail&ids=' + ids;
		    			}
		    		} else {  
		    			
		    		}  
		    	},  
		    	error : function() {  
		    		// view("异常！");  
		    		alert("异常！");  
		    	}  
		});
	},
	//验证手机号码格式
	checkMobile : function() {
		mobileReg.account = $("#jq_account").val();
		if ( typeof mobileReg.account == 'undefined' || '' == $.trim(mobileReg.account)) {
			showTips('请输入注册的手机号码!');
			return false;
		}
		var mobileExp = /^(1(([3587][0-9])|(4[57])))\d{8}$/;
		if (!mobileExp.test(mobileReg.account)) {
			showTips('请输入正确格式的手机号码!');
			return false;
		}
		return true;
	},
};
$(document).ready(function() {
	userCenter.init();
});