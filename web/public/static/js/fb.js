fb = {
	init : function() {
		$('#btnSubmit').on('click', function(){
			fb.feedbackCreate();
		});
		fb.load();
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
	load:function(){
		var d = {page:page,pageSize:pageSize};
		$.ajax({
		     type: 'GET',
		     url: '/api/member/feedback/query' ,
		    data: d,
		    //dataType: 'json',
		    contentType: "application/json; charset=utf-8", 
		    	success:function(data) {  
		    		console.log('反馈结果: ' + JSON.stringify(data));
		    		if(data.error_code == 200 ) {  
		    			var items = data.data.result;
		    			var tmpl = document.getElementById('tplFeedback').innerHTML;
		    			$('#pagePanel').html(doT.template(tmpl)(items));
		    			
		    			
		    		} else {  
		    			return new TipBox({str:'' +data.error_msg,setTime:'1000'});
		    		}  
		    	},  
		    	error : function() {  
		    		// view("异常！");  
		    		alert("异常！");  
		    	}  
		});
	},
	/**
	 * 订单认领申请
	 */
	feedbackCreate:function(){
		var phone = $('.phone').val(),ta = $('.ta').val();
		var type = $('#type').val();
	    if(phone == '' || phone == null){
	        return new TipBox({str:'请输入手机号码',setTime:'1000'});
	    }
	    if(!/^1(3[0-9]|4[5-9]|5[0-35-9]|7[0-9]|8[0-9]|9[89])\d{8}$/.test(phone)) {
	        return new TipBox({str:'手机号码格式错误',setTime:'1000'});
	    }
	    if(ta == '' || ta == null){
	        return new TipBox({str:'请输入反馈内容',setTime:'1000'});
	    }
	    var d = {
				phone:phone,
				content:ta,
				type:type
		};
		console.log("data=" + JSON.stringify(d));
		$.ajax({
		     type: 'POST',
		     url: '/api/member/feedback/create' ,
		    data: JSON.stringify(d),
		    dataType: 'json',
		    contentType: "application/json; charset=utf-8", 
		    	success:function(data) {  
		    		console.log('反馈结果: ' + JSON.stringify(data));
		    		if(data.error_code == 200 ) {  
		    			window.location.href = '/member/feedback_success';
		    		} else {  
		    			return new TipBox({str:'' +data.error_msg,setTime:'1000'});
		    		}  
		    	},  
		    	error : function() {  
		    		// view("异常！");  
		    		alert("异常！");  
		    	}  
		});
	},
};
$(document).ready(function() {
	fb.init();
});