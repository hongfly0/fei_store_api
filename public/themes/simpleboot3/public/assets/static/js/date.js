

/**
 * 鑾峰彇鏈懆銆佹湰瀛ｅ害銆佹湰鏈堛€佷笂鏈堢殑寮€濮嬫棩鏈熴€佺粨鏉熸棩鏈�
 */
var now = new Date();                    //褰撳墠鏃ユ湡   
var nowDayOfWeek = now.getDay();         //浠婂ぉ鏈懆鐨勭鍑犲ぉ   
var nowDay = now.getDate();              //褰撳墠鏃�   
var nowMonth = now.getMonth();           //褰撳墠鏈�   
var nowYear = now.getYear();             //褰撳墠骞�   
nowYear += (nowYear < 2000) ? 1900 : 0;  //  


var lastMonthDate = new Date();  //涓婃湀鏃ユ湡
lastMonthDate.setDate(1);
lastMonthDate.setMonth(lastMonthDate.getMonth()-1);
var lastYear = lastMonthDate.getYear();
var lastMonth = lastMonthDate.getMonth();
  
//鏍煎紡鍖栨棩鏈燂細yyyy-MM-dd   
function formatDate(date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth()+1;
    var myweekday = date.getDate();
    var hour=date.getHours(); 
    var minute=date.getMinutes(); 
    var second=date.getSeconds(); 
       
    if(mymonth < 10){   
        mymonth = "0" + mymonth;
    }    
    if(myweekday < 10){   
        myweekday = "0" + myweekday;
    }   
    return (myyear+"-"+mymonth + "-" + myweekday + " " + hour + ":" + minute + ":" + second); 
}    
  
//鑾峰緱鏌愭湀鐨勫ぉ鏁�   
function getMonthDays(myMonth){   
    var monthStartDate = new Date(nowYear, myMonth, 1);
    var monthEndDate = new Date(nowYear, myMonth + 1, 1);
    var   days   =   (monthEndDate   -   monthStartDate)/(1000   *   60   *   60   *   24);
    return   days;
}   
  
//鑾峰緱鏈搴︾殑寮€濮嬫湀浠�   
function getQuarterStartMonth(){
    var quarterStartMonth = 0;
    if(nowMonth<3){
       quarterStartMonth = 0;
    }
    if(2<nowMonth && nowMonth<6){
       quarterStartMonth = 3;
    }
    if(5<nowMonth && nowMonth<9){
       quarterStartMonth = 6;
    }
    if(nowMonth>8){
       quarterStartMonth = 9;
    }
    return quarterStartMonth;
}   
  
//鑾峰緱鏈懆鐨勫紑濮嬫棩鏈�   
function getWeekStartDate() {    
    var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek);    
    return formatDate(weekStartDate);   
}    
  
//鑾峰緱鏈懆鐨勭粨鏉熸棩鏈�   
function getWeekEndDate() {    
    var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek));    
    return formatDate(weekEndDate);   
}    
  
//鑾峰緱鏈湀鐨勫紑濮嬫棩鏈�   
function getMonthStartDate(){   
    var monthStartDate = new Date(nowYear, nowMonth, 1);    
    return formatDate(monthStartDate);   
}   
  
//鑾峰緱鏈湀鐨勭粨鏉熸棩鏈�   
function getMonthEndDate(){   
    var monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));    
    return formatDate(monthEndDate);   
}   


//鑾峰緱涓婃湀寮€濮嬫椂闂�
function getLastMonthStartDate(){
	var lastMonthStartDate = new Date(nowYear, lastMonth, 1);
	return formatDate(lastMonthStartDate);  
}


//鑾峰緱涓婃湀缁撴潫鏃堕棿
function getLastMonthEndDate(){
	var lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth));
	return formatDate(lastMonthEndDate);  
}
  
//鑾峰緱鏈搴︾殑寮€濮嬫棩鏈�   
function getQuarterStartDate(){   
       
    var quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1);    
    return formatDate(quarterStartDate);   
}   
  
//鎴栫殑鏈搴︾殑缁撴潫鏃ユ湡   
function getQuarterEndDate(){   
    var quarterEndMonth = getQuarterStartMonth() + 2;   
    var quarterStartDate = new Date(nowYear, quarterEndMonth, getMonthDays(quarterEndMonth));    
    return formatDate(quarterStartDate);   
}

//鑾峰緱鏈勾搴︾殑寮€濮嬫棩鏈�
function getYearStartDate(i) {
	var quarterStartDate = new Date(nowYear + i, 0, 1);
	return formatDate(quarterStartDate);
}

// 鑾峰緱鏈勾搴︾殑缁撴潫鏃ユ湡
function getYearEndDate(i) {
	var quarterStartDate = new Date(nowYear + i, 11, getMonthDays(11), 23, 59, 59);
	return formatDate(quarterStartDate);
}

//璁＄畻鏈懆璧峰鏃ユ湡锛屽苟浠� Y-m-d 褰㈠紡杩斿洖銆�
function getWeekTime888()
{
  var now = new Date();      
  var Year = now.getFullYear();
  var Month = now.getMonth() + 1;
  var Day = now.getDate()- now.getDay();
  if(now.getDay()==0)           //鏄熸湡澶╄〃绀� 0 鏁呭綋鏄熸湡澶╃殑鏃跺€欙紝鑾峰彇涓婂懆寮€濮嬬殑鏃跺€�
  {
      Day -= 6;
  }
  var beginTime = Year + "-" + Month +"-" + Day;        //鏍煎紡 Y-m-d
  return beginTime;
}