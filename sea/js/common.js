(function (){  

	//创建空console对象，避免JS报错  
	
	if(!window.console)  
	    window.console = {};  
	var console = window.console;  
	
	var funcs = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml',  
	             'error', 'exception', 'group', 'groupCollapsed', 'groupEnd',  
	             'info', 'log', 'markTimeline', 'profile', 'profileEnd',  
	             'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];  
	for(var i=0,l=funcs.length;i<l;i++) {  
	    var func = funcs[i];  
	    if(!console[func])  
	        console[func] = function(){};  
	}  
	if(!console.memory)  
	    console.memory = {};  
    
    
	/******/
	
//	if (!Array.prototype.forEach){
//		Array.prototype.forEach = function(fun /*, thisp*/){
//			var len = this.length;
//			if (typeof fun != "function")
//				throw new TypeError();
//		 
//		  	var thisp = arguments[1];
//		  	for (var i = 0; i < len; i++){
//		   		if (i in this)
//		    		fun.call(thisp, this[i], i, this);
//		  	}
//		};
//	}
		
	
//	if (!Array.prototype.indexOf){
//		Array.prototype.indexOf = function(elt /*, from*/){		
//			
//		    var len = this.length >>> 0;
//		
//		    var from = Number(arguments[1]) || 0;
//		    from = (from < 0)? Math.ceil(from): Math.floor(from);
//		    if (from < 0)
//		      from += len;
//		
//		    for (; from < len; from++){
//		      if (from in this && this[from] === elt)
//		        return from;
//		    }
//		    return -1;
//		};
//	}
	
//	if (!Array.prototype.filter){
//		Array.prototype.filter = function(fun /*, thisArg */){
//		    "use strict";
//		
//		    if (this === void 0 || this === null)
//		    	throw new TypeError();
//		
//		    var t = Object(this);
//		    var len = t.length >>> 0;
//		    if (typeof fun !== "function")
//		    	throw new TypeError();
//		
//		    var res = [];
//		    var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
//		    for (var i = 0; i < len; i++){
//		    	if (i in t){
//		        	var val = t[i];
//		
//			        // NOTE: Technically this should Object.defineProperty at
//			        //       the next index, as push can be affected by
//			        //       properties on Object.prototype and Array.prototype.
//			        //       But that method's new, and collisions should be
//			        //       rare, so use the more-compatible alternative.
//			        if (fun.call(thisArg, val, i, t))
//			        	res.push(val);
//		        }
//		    }
//		
//		    return res;
//	    };
//	}
	
//	if (!Array.prototype.filter) { 
//	    Array.prototype.filter = function(fun /*, thisp*/){  
//	        var len = this.length;  
//	        if (typeof fun != "function"){  
//	            throw new TypeError();  
//	        }  
//	        var res = new Array();  
//	        var thisp = arguments[1];  
//	        for (var i = 0; i < len; i++){  
//	            if (i in this){  
//	                var val = this[i]; // in case fun mutates this  
//	                if (fun.call(thisp, val, i, this)) {  
//	                    res.push(val);  
//	                }  
//	            }  
//	        }  
//	        return res;  
//	    };  
//	} 	
	
})();


function myIndexof(arr){
		if (!arr.prototype.indexOf){		
		arr.prototype.indexOf = function(elt /*, from*/){		
			
		    var len = this.length >>> 0;
		
		    var from = Number(arguments[1]) || 0;
		    from = (from < 0)? Math.ceil(from): Math.floor(from);
		    if (from < 0)
		      from += len;
		
		    for (; from < len; from++){
		      if (from in this && this[from] === elt)
		        return from;
		    }
		    return -1;
		};
	}
}

/******
 * 获取用户当前金钱信息，用于有金钱改变的页面
 * 
 * *****/
function getUserMoney(total){
    var $pa = $(top.document);
    if(total){
        $pa.find("#cash").html(total);
        top.total_money = parseFloat(total);
    }else{
        $.ajax({
            type:"get",
            url: config.APP+"/Home/Business/ajax_get_money",
            async:true,
            dataType:'json',
            beforeSend:function(){
                
            },
            success:function(result){
                if (result.type == 1) {
                    // var addResult = result.data.total_money+result.data.total_frozen_money;
                    //刷新页面
                    $pa.find('#cash').html(result.data.total_money);
                    // $pa.find('#coldCash').html(result.data.total_frozen_money);
                    top.total_money = parseFloat(result.data.total_money);
                }else{
                    faultMsg(result.msg);
                }                   
            }
        }); 
    }
}

//金钱描述
function moneyDesc(val){
	var intNum,floatNum,index;
	index = val.indexOf('.');
	intNum = val.substring(0,index);
	floatNum = val.substring(index,val.length);
	return '<span>'+intNum+'</span>'+'<span style="font-size:16px;">'+floatNum+'</span>';
}	


// 兼容IE8及以下
String.prototype.repeat = String.prototype.repeat || function(n) { 
    var _this = this;
    var result = '';
    for(var i=0;i<n;i++) {
        result += _this;
    }
    return result;
};


// 货币格式化输出
Number.prototype.formatMoney = function (places, symbol, thousand, decimal) {
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    //symbol = symbol !== undefined ? symbol : "$";
    symbol = symbol !== undefined ? symbol : "";
    thousand = thousand || ",";
    decimal = decimal || ".";
    var number = this,
        negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};

// 获取URL请求参数
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

// 判断是否为数组
function isArray(obj) {   
    return Object.prototype.toString.call(obj) === '[object Array]';
}

function isEmail(strEmail) {
    if (strEmail.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1)
        return true;
    else
        return false;
}

function isMobile(mobile){
    var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
    if (reg.test(mobile)) {
        return true;
    }else{
        return false;
    }
}

//判断是否属于IP地址
function isIp(addr){
    var reg = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])(\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])){3}$/;
    if(addr.match(reg)){
        return true;
    }else{
        return false;
    }
}

//验证数字输入合法性
function ParseNum(num) {
    if (num == null) return false;
    else if (num == '0' ) return true;
    //else if (num == '0' || num == '0.5' || num == '1.5') return true;
    var reg = /^[0-9]*[1-9][0-9]*$/; //正整数      
    return reg.test(num);
}

// 判断数字是否 正整数 或 0
function isNotNegativeInt(num) {
    if (num == null) return false;
    else if (num == '0' ) return true;
    //else if (num == '0' || num == '0.5' || num == '1.5') return true;
    var reg = /^[0-9]*[1-9][0-9]*$/; //正整数      
    return reg.test(num);
};

//检验大于0且小数为两位的浮点数 或 小数为0的整数
function FloatNum(num){
	if (num == null) {
		return false;
	}else if (num < 0) {
		return false;
	}

	var test = /^-?\d+(\.?\d{0,2})?$/;
	return test.test(num)
}

//判断域名
function IsURL(str_url){
    var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
    + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
    + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
    + "|" // 允许IP和DOMAIN（域名）
    + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
    + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
    + "[a-z]{2,6})" // first level domain- .com or .museum
    + "(:[0-9]{1,4})?" // 端口- :80
    + "((/?)|" // a slash isn't required if there is no file name
    + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
    var reg = /((https|http|ftp|rtsp|mms):\/\/)?(([0-9a-z_!~*'().&=+$%-]+:)?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}\.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+\.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\.[a-z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+\/?)/g;
    var re=new RegExp(strRegex);
    //re.test()
//  if (re.test(str_url)){
	if(str_url.match(reg)){
        return true;
    }else{
        return false;
    }
}

/** * 对Date的扩展，将 Date 转化为指定格式的String * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q)
    可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
    Date()).pattern("yyyy-MM-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423      
 * (new Date()).pattern("yyyy-MM-dd E HH:mm:ss") ==> 2009-03-10 二 20:09:04      
 * (new Date()).pattern("yyyy-MM-dd EE hh:mm:ss") ==> 2009-03-10 周二 08:09:04      
 * (new Date()).pattern("yyyy-MM-dd EEE hh:mm:ss") ==> 2009-03-10 星期二 08:09:04      
 * (new Date()).pattern("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18      
 */ 
Date.prototype.pattern=function(fmt) {         
    var o = {         
    "M+" : this.getMonth()+1, //月份         
    "d+" : this.getDate(), //日         
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
    "H+" : this.getHours(), //小时         
    "m+" : this.getMinutes(), //分         
    "s+" : this.getSeconds(), //秒         
    "q+" : Math.floor((this.getMonth()+3)/3), //季度         
    "S" : this.getMilliseconds() //毫秒         
    };         
    var week = {         
    "0" : "/u65e5",         
    "1" : "/u4e00",         
    "2" : "/u4e8c",         
    "3" : "/u4e09",         
    "4" : "/u56db",         
    "5" : "/u4e94",         
    "6" : "/u516d"        
    };         
    if(/(y+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
    }         
    if(/(E+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);         
    }         
    for(var k in o){         
        if(new RegExp("("+ k +")").test(fmt)){         
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
        }         
    }         
    return fmt;         
} 

//日期输出字符串，重载了系统的toString方法  
Date.prototype.toString = function(showWeek)  
{   
    var myDate= this;  
//  var str = myDate.toLocaleDateString();  
    var str='';
    if (showWeek)  
    {   
        var Week = ['日','一','二','三','四','五','六'];  
        str += ' 星期' + Week[myDate.getDay()]+' ';  
    }  
    return str;  
} 

//开始时间小于结束时间
function checkDate(startTime,endTime,obj){
    if(startTime != undefined && startTime != null && startTime != ""){
        startTime += ' 00:00:00';
    }
    if(endTime != undefined  && endTime != null && endTime != ""){
        endTime += ' 23:59:59';
    }
	var tem1 = new Date(startTime.replace(/-/g,"\/")).getTime();
	var tem2 = new Date(endTime.replace(/-/g,"\/")).getTime();
	if (tem1!=NaN && tem2 !=NaN) {
    	if (tem1 >= tem2) {
    		faultMsg('结束时间不能小于或等于起始时间！');
    		obj.val('');
    		return false;
    	}            		
	}
}

/*
根据〖中华人民共和国国家标准 GB 11643-1999〗中有关公民身份号码的规定，公民身份号码是特征组合码，由十七位数字本体码和一位数字校验码组成。排列顺序从左至右依次为：六位数字地址码，八位数字出生日期码，三位数字顺序码和一位数字校验码。
    地址码表示编码对象常住户口所在县(市、旗、区)的行政区划代码。
    出生日期码表示编码对象出生的年、月、日，其中年份用四位数字表示，年、月、日之间不用分隔符。
    顺序码表示同一地址码所标识的区域范围内，对同年、月、日出生的人员编定的顺序号。顺序码的奇数分给男性，偶数分给女性。
    校验码是根据前面十七位数字码，按照ISO 7064:1983.MOD 11-2校验码计算出来的检验码。

出生日期计算方法。
    15位的身份证编码首先把出生年扩展为4位，简单的就是增加一个19或18,这样就包含了所有1800-1999年出生的人;
    2000年后出生的肯定都是18位的了没有这个烦恼，至于1800年前出生的,那啥那时应该还没身份证号这个东东，⊙﹏⊙b汗...
下面是正则表达式:
 出生日期1800-2099  (18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])
 身份证正则表达式 /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i            
 15位校验规则 6位地址编码+6位出生日期+3位顺序号
 18位校验规则 6位地址编码+8位出生日期+3位顺序号+1位校验位
 
 校验位规则     公式:∑(ai×Wi)(mod 11)……………………………………(1)
                公式(1)中： 
                i----表示号码字符从由至左包括校验码在内的位置序号； 
                ai----表示第i位置上的号码字符值； 
                Wi----示第i位置上的加权因子，其数值依据公式Wi=2^(n-1）(mod 11)计算得出。
                i 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
                Wi 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2 1

*/
//身份证号合法性验证 
//支持15位和18位身份证号
//支持地址编码、出生日期、校验位验证
function IdentityCodeValid(code) { 
    var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
    var tip = "";
    var pass= true;
    
    if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
        tip = "身份证号格式错误";
        pass = false;
    }
    
   else if(!city[code.substr(0,2)]){
        tip = "地址编码错误";
        pass = false;
    }
    else{
        //18位身份证需要验证最后一位校验位
        if(code.length == 18){
            code = code.split('');
            //∑(ai×Wi)(mod 11)
            //加权因子
            var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
            //校验位
            var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
            var sum = 0;
            var ai = 0;
            var wi = 0;
            for (var i = 0; i < 17; i++)
            {
                ai = code[i];
                wi = factor[i];
                sum += ai * wi;
            }
            var last = parity[sum % 11];
            if(parity[sum % 11] != code[17]){
                tip = "校验位错误";
                pass =false;
            }
        }
    }
    //if(!pass) alert(tip);
    return pass;
}

//身份证验证
function validateIdCard(idCard){
	 //15位和18位身份证号码的正则表达式
	 var msg=false;
	 var regIdCard=/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

	 //如果通过该验证，说明身份证格式正确，但准确性还需计算
	 if(regIdCard.test(idCard)){
	  if(idCard.length==18){
	   var idCardWi=new Array( 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ); //将前17位加权因子保存在数组里
	   var idCardY=new Array( 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
	   var idCardWiSum=0; //用来保存前17位各自乖以加权因子后的总和
	   for(var i=0;i<17;i++){
	    idCardWiSum+=idCard.substring(i,i+1)*idCardWi[i];
	   }

	   var idCardMod=idCardWiSum%11;//计算出校验码所在数组的位置
	   var idCardLast=idCard.substring(17);//得到最后一位身份证号码

	   //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
	   if(idCardMod==2){
	    if(idCardLast=="X"||idCardLast=="x"){
	    	msg=true;
	    }else{
	    	msg=false;
	    }
	   }else{
	    //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
	    if(idCardLast==idCardY[idCardMod]){
	    	msg=true;
	    }else{
	    	msg=false;
	    }
	   }
	  } 
	 }else{
		 msg=false;
	 }
	 return msg;
}


function changeTwoDecimal(v) {
    if (isNaN(v)) {//参数为非数字
        return 0;
    }
    var fv = parseFloat(v);
    fv = Math.round(fv * 100) / 100; //四舍五入，保留两位小数
    var fs = fv.toString();
    var fp = fs.indexOf('.');
    if (fp < 0) {
        fp = fs.length;
        fs += '.';
    }
    while (fs.length <= fp + 2) { //小数位小于两位，则补0
        fs += '0';
    }
    return fs;
}

function moutip(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) * mul(b, e)) / e;
}

function add(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) + mul(b, e)) / e;
}
 
function sub(a, b) {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mul(a, e) - mul(b, e)) / e;
}
 
function mul(a, b) {
    var c = 0,
        d = a.toString(),
        e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) {}
    try {
        c += e.split(".")[1].length;
    } catch (f) {}
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}
 
function div(a, b) {
    var c, d, e = 0,
        f = 0;
    try {
        e = a.toString().split(".")[1].length;
    } catch (g) {}
    try {
        f = b.toString().split(".")[1].length;
    } catch (g) {}
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
}

function errMsg(obj,msg){
	if (obj) {
		obj.focus();
	}
    layer.closeAll('dialog');
	layer.confirm(msg,{
        title:'操作失败',
        icon:0,
        btn:['确定']
    }) 
}

function successMsg(msg){
    layer.closeAll('dialog');
	layer.confirm(msg,{
        title:'操作成功',
        icon:1,
        btn:['确定']
    })
}

function faultMsg(msg){
    layer.closeAll('dialog');
	layer.confirm(msg,{
        title:'错误提示',
        icon:2,
        btn:['确定']
    })
}

function closeAllLayer(){
	layer.closeAll();
}

function lackOfMoney(msg){
     top.layer.confirm(msg, {
        icon: 0,
        btn: ['立即充值', '取消']
    }, function(index2) {
        top.loadPage(config.APP + '/Business/moneyset.html');
        layer.closeAll();
        top.layer.closeAll();
        
        // top.layer.closeAll();
        
    });
}

function payType(type,source){
    var resource = ''
    switch(type){
        case '1':
            resource = '支付宝';
            break;
        case '2':
            resource = '微信';
            break;
        case '3':
            resource = '网银';
            break;
        case '4':
            resource = '线下充值';
            break;
        case '5':
            resource = '系统赠送';
            break;
        case '6':
            resource = '线下充值';
            break;
        case '7':
            resource = '系统赠送';
            break;
        default:
            break; 
    }
    return resource;
}
