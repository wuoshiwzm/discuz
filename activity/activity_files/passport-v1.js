/**
 * 本文件将提供 站酷Passport最基本的登录、登出函数定义支持
 *
 * 本文件依赖:
 *   > jQuery 1.7 或者更新版本
 *
 * @author  king.zhu(darkwing.zhu@gmail.com)
 * 2014-6 First created
 * @date 2014-08-19 modified by king.zhu & version:v1.0.8
 * @date 2014-09-26 modified by king.zhu & version:v1.0.9
 * @date 2014-11-20 modified by king.zhu & version.v1.1.2
 * @date 2015-01-06 modified by king.zhu & version.v1.1.4 增加高高手在线教育退出处理
 * @date 2015-03-12 modified by xulz & version.v1.1.5 新增接口loginActive，邮箱未激活状态下可登陆，参数中返回邮箱是否激活状态
 */
(function($) {
	 window.PassPortUtil = {
			 /**
			  *  passport通行证统一的异步登录
			  *  @param appId 登录应用Id
			  *  @param userId 登录账号
			  *  @param password 登录密码
			  *  @param remember 是否自动登录
			  *  @param code 验证码
			  *  @param cb 回调函数
			  *  @param cb 回调地址
			  *  @param passportHost passport服务器主机地址
			  *  @param clientHostLogin passport应用的回调登录地址
			  */
			 loginNew:function(appId,userid,password,remember,code,cb,cbUrl,passportHost,clientHostLogin) {
				 $.ajax({  
				        url:passportHost+'/login_jsonp_new.do?jsonpCallback=?',  
				        dataType:'jsonp',  
				        data:{appId:appId,username:userid,password:password,autoLogin:remember,code:code,service:cbUrl,appLogin:clientHostLogin},  
				        jsonp:'callback',  
				        success:function(data) {  
				        	cb(data);
				        },  
				        error:function(data) {
				        	
				        	var obj= {result:false,success:false,msg:"登录失败,请稍后再试"} ; 
					    	cb(obj);
				        },
				        timeout:3000  
				    });  
			 },
			 /**
			  *  passport通行证统一的异步登录,新增接口,邮箱未激活状态下可登陆
			  *  @param appId 登录应用Id
			  *  @param userId 登录账号
			  *  @param password 登录密码
			  *  @param remember 是否自动登录
			  *  @param code 验证码
			  *  @param cb 回调函数
			  *  @param cb 回调地址
			  *  @param passportHost passport服务器主机地址
			  *  @param clientHostLogin passport应用的回调登录地址
			  */
			 loginActive:function(appId,userid,password,remember,code,cb,cbUrl,passportHost,clientHostLogin) {
				$z.encryptFn(appId,userid,password,remember,code,cb,cbUrl,passportHost,clientHostLogin);
			 },
			 /**
			  * 统一退出应用
			  * @param appLogoutUrl 应用的退出地址
			  * @param appId 当前退出应用的appId
			  * @param passportHost passport服务器主机地址
			  * @param isRedirect 是否需要重定向刷新页面
			  * @param cbUrl 应用的回调地址
			  * 
			  */
			 logout:function(appLogoutUrl,appId,passportHost,isRedirect,cbUrl) {
				 var str = passportHost+"/logout.do?appId="+appId+"&isRedirect="+isRedirect+"&callbackName=$z.logoutPassportServer";
				 if(cbUrl) {
					 str += "&cbUrl="+cbUrl;
				 }
				 $.when($z.logoutAppOne(passportHost), $z.logoutAppTwo(passportHost),$z.logoutAppThree(passportHost),$z.logoutAppShop(passportHost),$z.logoutAppGogoup(passportHost),$z.logoutProHellorf(passportHost),$z.logoutBlogHellorf(passportHost),$z.logoutHellorfPre(passportHost)).done($z.logoutServer(str)).fail(function(){
					 $z.logoutAppOne(passportHost);
					 $z.logoutAppTwo(passportHost);
					 $z.logoutAppThree(passportHost);
					 $z.logoutAppShop(passportHost);
					 $z.logoutAppGogoup(passportHost);
					 $z.logoutProHellorf(passportHost);
					 $z.logoutBlogHellorf(passportHost);
					 $z.logoutHellorfPre(passportHost);
					 $z.logoutServer(str);
				 });
			 },
			 logoutAppOne:function(passportHost)  {
				 if(passportHost != null && passportHost.indexOf('test') > -1){
					 $z.addScriptTag('http://www.test.zcool.com.cn/sso/logout_jsonp.do?callback=$z.logoutCallBack&scriptId=ssoscript1006','ssoscript1006');
				 }else{
					 $z.addScriptTag('http://www.zcool.com.cn/sso/logout_jsonp.do?callback=$z.logoutCallBack&scriptId=ssoscript1006','ssoscript1006');
				 }
				 
			 },
			 logoutAppTwo:function(passportHost) {
//				 if(passportHost != null && passportHost.indexOf('test') > -1){
//					 $z.addScriptTag("http://www.test.zcooler.com/sso/logout_jsonp?callback=$z.logoutCallBack&scriptId=ssoscript1001",'ssoscript1001');
//				 }else{
					 $z.addScriptTag("http://www.zcooler.com/sso/logout_jsonp?callback=$z.logoutCallBack&scriptId=ssoscript1001",'ssoscript1001');
//				 }
			 },
			 logoutAppThree:function(passportHost) {
//				 if(passportHost != null && passportHost.indexOf('test') > -1){
//					 $z.addScriptTag("http://www.test.hellorf.com/user/ssologout/?callback=$z.logoutCallBack&scriptId=ssoscript1007",'ssoscript1007');
//				 }else{
					 $z.addScriptTag("http://www.hellorf.com/user/ssologout/?callback=$z.logoutCallBack&scriptId=ssoscript1007",'ssoscript1007');
//				 }
			 },
			 logoutAppShop:function(passportHost) {
				 $z.addScriptTag("http://shop.zcool.com.cn/ajaxLogout.php?callback=$z.logoutCallBack&scriptId=ssoscript1009",'ssoscript1009');
			 },
			 logoutAppGogoup:function(passportHost) {
				 if(passportHost != null && passportHost.indexOf('test') > -1){
					 $z.addScriptTag("http://www.test.gogoup.com/sso/logout_jsonp?callback=$z.logoutCallBack&scriptId=ssoscript1010",'ssoscript1010');
				 }else{
					 $z.addScriptTag("http://www.gogoup.com/sso/logout_jsonp?callback=$z.logoutCallBack&scriptId=ssoscript1010",'ssoscript1010');
				 }
			 },
			 logoutProHellorf:function(passportHost) {
				 if(passportHost != null && passportHost.indexOf('test') > -1){
					 $z.addScriptTag("http://test.contributor.hellorf.com/login/dologout/?callback=$z.logoutCallBack&scriptId=ssoscript1012",'ssoscript1012');
				 }else{
					 $z.addScriptTag("http://contributor.hellorf.com/login/dologout/?callback=$z.logoutCallBack&scriptId=ssoscript1011",'ssoscript1011');
				 }
			 },
			 logoutBlogHellorf:function(passportHost) {
				 if(passportHost != null && passportHost.indexOf('test') > -1){
					 $z.addScriptTag("http://test.blog.hellorf.com/login/dologout/?callback=$z.logoutCallBack&scriptId=ssoscript1023",'ssoscript1023');
				 }else{
					 $z.addScriptTag("http://blog.hellorf.com/login/dologout/?callback=$z.logoutCallBack&scriptId=ssoscript1013",'ssoscript1013');
				 }
			 },
			 logoutHellorfPre:function(passportHost) {
				 if(passportHost != null && passportHost.indexOf('test') > -1){
					 $z.addScriptTag("http://test.plus.hellorf.com/login/dologout/?callback=$z.logoutCallBack&scriptId=ssoscript1024",'ssoscript1024');
				 }else{
					 $z.addScriptTag("http://plus.hellorf.com/login/dologout/?callback=$z.logoutCallBack&scriptId=ssoscript1014",'ssoscript1014');
				 }
			 },
			 logoutServer:function(str) {
				 $z.addScriptTag(str);
			 },
			 logoutCallBack:function(result) {
				 var flag = false;
				 if(result) {
					 if(result.retcode=="1") {
						 flag = true;
						 $('#'+result.scriptId).remove();
					 }else {
						 flag = false;
					 } 
				 }
//				 console.log('logoutCallback:'+flag);
				 return flag;
			 },
			 /**
			 * 登出passport服务器的处理函数。
			 * @param {Object} data 登录后的数据
			 * @param logoutSuccessUrl 登出passport服务器后的跳转地址
			 */
			 logoutPassportServer:function(data) {
				if(data[0].result){
					//登出后的处理。
					/*setTimeout(function() {
						window.location.href = data[0].logoutSuccessUrl;
					}, 1000);*/
					if(data[0].isRedirect) {
						window.location.href = data[0].logoutSuccessUrl;
					}
				}
			 },
			 /**
			  * 重复登录统一退出应用(排除服务器的退出情况)
			  * @param currentAppLogoutUrl 当前应用的退出地址
			  * @param appId 当前退出应用的appId
			  * @param passportHost passport服务器主机地址
			  * @param isRedirect 是否需要重定向刷新页面
			  * 
			  */
			 repeatLoginLogout:function(currentAppLogoutUrl,appId,passportHost,isRedirect,cbUrl) {
				 $.when($z.logoutAppOne(), $z.logoutAppTwo(),$z.logoutAppThree(),$z.logoutAppShop())
				 .done(function(){
					 if(cbUrl) {
						 document.location.href=cbUrl;
					 }/*else {
						 window.location.reload();
					 }*/
				 })
				 .fail(function(){ 
					 $z.logoutAppOne();
					 $z.logoutAppTwo();
					 $z.logoutAppThree();
					 $z.logoutAppShop();
//					 console.log('重复登录,退出失败!');
				});
			 },
			 reloadPage:function () {
				 window.location.reload();
			 },
			 /**
			 * 获得当前用户登录的应用列表。
			 * @param appList 登录的应用列表，json对象。
			 */
			 /*fetchAppList:function(appList) {
				//登录的应用不为空。
				if (appList) {
					for ( var i = 0; i < appList.length; i++) {
						var appObj = appList[i];
						if (appObj && appObj.logoutUrl) {
							//发送请求挨个登出各应用。
							$z.addImgTag(appObj.logoutUrl);
						}
					}
				}else {
					$z.addImgTag('http://www.zcool.com.cn/logout.do');
					$z.addImgTag('http://www.zcooler.com/logout');
				}
			 },*/
			 /**
			 * 登出本应用，至少要登出本应用。
			 * @param currentAppLogoutUrl 本应用登出地址
			 */
			 /*logoutCurrentApp:function(currentAppLogoutUrl) {
				//登出ki4so服务器。
				 $z.addImgTag(currentAppLogoutUrl);
			 },*/
			 /**
			 * 动态添加某个javascript文件到文档中。
			 * @param {Object} src js文件的路径。
			 */
			 addScriptTag:function(src,scriptId) {
				/*var script = document.createElement('script');
				script.setAttribute("type","text/javascript");
				script.src = src;
				document.body.appendChild(script);*/
				 var script ='<script id="'+scriptId+'" type="text/javascript" src="'+src+'"><\/script>';
				 $(script).appendTo($('body')); 
			 },
			 
			 /**
			  * 动态添加某个img文件到文档中
			  * @param {Object} src img文件的路径。
			  */
			/* addImgTag:function(src) {
				 var img = document.createElement('img');
				 img.setAttribute("style","display:none");
				 img.src = src;
				 document.body.appendChild(img);
			 },*/
			 /**
			  * 获取之前登录应用的账户ID
			  * 
			  * @returns {String}
			  */
			 /*getPrevUserLoginedId:function() {
				 var token = $z.getCookie("TOKEN"),
					userLoginedId = "";
				if(null!=token && "" != token ) {
					userLoginedId = token.split('uid=')[1];
				}
				if(null != userLoginedId && 0 < userLoginedId.length) {
					userLoginedId = userLoginedId.substr(0,userLoginedId.length-1);
				}
				return userLoginedId;
			 },*/
			 /**
			  * 获取服务器端的cookie
			  * 
			  */
			 getServerCookie:function(passportHost,cb) {
				 $.getJSON(passportHost+'/get_server_ec_jsonp.do?jsonpCallback=?'+'&t='+new Date().getTime(),  
					function(data){  
					 	cb(data);
		  			}
				 ); 
			 },
			 getUserSession:function(passportHost,cb){
				 $.getJSON(passportHost+'/get_user_session_jsonp.do?jsonpCallback=?'+'&t='+new Date().getTime(),  
					function(data){  
					 	cb(data);
		  			}
				 );
			 },
			 /**
			  * 获取Cookie
			  * 
			  */
			 getCookie:function(name) {
				 if(document.cookie.length>0){
				   c_start=document.cookie.indexOf(name + "=");
				   if(c_start!=-1){ 
				      c_start=c_start + name.length+1; 
				      c_end=document.cookie.indexOf(";",c_start);
				      if(c_end==-1) c_end=document.cookie.length;
				      return unescape(document.cookie.substring(c_start,c_end));
				    }
				 }
				 return "";
			 },
			 encryptFn:function(appId,userid,password,remember,code,cb,cbUrl,passportHost,clientHostLogin){
				 $.ajax({  
				        url:passportHost+'/passKey.do?jsonpCallback=?',  
				        dataType:'jsonp',  
				        success:function(data) {
				        	if(data != null){
				        		setMaxDigits(130);
								var passcode = encryptedString(new RSAKeyPair(data.a, "", data.b), password);
								$.ajax({  
							        url:passportHost+'/login_jsonp_active.do?jsonpCallback=?',  
							        dataType:'jsonp',  
							        data:{appId:appId,username:userid,password:passcode,autoLogin:remember,code:code,service:cbUrl,appLogin:clientHostLogin},  
							        jsonp:'callback',  
							        success:function(data) {  
							        	cb(data);
							        },  
							        error:function(data) {
							        	
							        	var obj= {result:false,success:false,msg:"登录失败,请稍后再试"} ; 
								    	cb(obj);
							        },
							        timeout:3000  
							    });
				        	}
				        },  
				        error:function(data) {
//				        	console.log("登陆失败，服务器端加密异常");
				        	var obj= {result:false,success:false,msg:"登录超时,请稍后再试"} ; 
					    	cb(obj);
				        },
				        timeout:6000  
				    });
			 }
	 };
	 
	// 创建 PassPortUtil 的别名
	window.$z = window.PassPortUtil;
})(window.jQuery);

function BarrettMu(m)
{
	this.modulus = biCopy(m);
	this.k = biHighIndex(this.modulus) + 1;
	var b2k = new BigInt();
	b2k.digits[2 * this.k] = 1; // b2k = b^(2k)
	this.mu = biDivide(b2k, this.modulus);
	this.bkplus1 = new BigInt();
	this.bkplus1.digits[this.k + 1] = 1; // bkplus1 = b^(k+1)
	this.modulo = BarrettMu_modulo;
	this.multiplyMod = BarrettMu_multiplyMod;
	this.powMod = BarrettMu_powMod;
}

function BarrettMu_modulo(x)
{
	var q1 = biDivideByRadixPower(x, this.k - 1);
	var q2 = biMultiply(q1, this.mu);
	var q3 = biDivideByRadixPower(q2, this.k + 1);
	var r1 = biModuloByRadixPower(x, this.k + 1);
	var r2term = biMultiply(q3, this.modulus);
	var r2 = biModuloByRadixPower(r2term, this.k + 1);
	var r = biSubtract(r1, r2);
	if (r.isNeg) {
		r = biAdd(r, this.bkplus1);
	}
	var rgtem = biCompare(r, this.modulus) >= 0;
	while (rgtem) {
		r = biSubtract(r, this.modulus);
		rgtem = biCompare(r, this.modulus) >= 0;
	}
	return r;
}

function BarrettMu_multiplyMod(x, y)
{
	/*
	x = this.modulo(x);
	y = this.modulo(y);
	*/
	var xy = biMultiply(x, y);
	return this.modulo(xy);
}

function BarrettMu_powMod(x, y)
{
	var result = new BigInt();
	result.digits[0] = 1;
	var a = x;
	var k = y;
	while (true) {
		if ((k.digits[0] & 1) != 0) result = this.multiplyMod(result, a);
		k = biShiftRight(k, 1);
		if (k.digits[0] == 0 && biHighIndex(k) == 0) break;
		a = this.multiplyMod(a, a);
	}
	return result;
}

var biRadixBase = 2;
var biRadixBits = 16;
var bitsPerDigit = biRadixBits;
var biRadix = 1 << 16; // = 2^16 = 65536
var biHalfRadix = biRadix >>> 1;
var biRadixSquared = biRadix * biRadix;
var maxDigitVal = biRadix - 1;
var maxInteger = 9999999999999998; 

var maxDigits;
var ZERO_ARRAY;
var bigZero, bigOne;

function setMaxDigits(value)
{
	maxDigits = value;
	ZERO_ARRAY = new Array(maxDigits);
	for (var iza = 0; iza < ZERO_ARRAY.length; iza++) ZERO_ARRAY[iza] = 0;
	bigZero = new BigInt();
	bigOne = new BigInt();
	bigOne.digits[0] = 1;
}

setMaxDigits(20);

// The maximum number of digits in base 10 you can convert to an
// integer without JavaScript throwing up on you.
var dpl10 = 15;
// lr10 = 10 ^ dpl10
var lr10 = biFromNumber(1000000000000000);

function BigInt(flag)
{
	if (typeof flag == "boolean" && flag == true) {
		this.digits = null;
	}
	else {
		this.digits = ZERO_ARRAY.slice(0);
	}
	this.isNeg = false;
}

function biFromDecimal(s)
{
	var isNeg = s.charAt(0) == '-';
	var i = isNeg ? 1 : 0;
	var result;
	// Skip leading zeros.
	while (i < s.length && s.charAt(i) == '0') ++i;
	if (i == s.length) {
		result = new BigInt();
	}
	else {
		var digitCount = s.length - i;
		var fgl = digitCount % dpl10;
		if (fgl == 0) fgl = dpl10;
		result = biFromNumber(Number(s.substr(i, fgl)));
		i += fgl;
		while (i < s.length) {
			result = biAdd(biMultiply(result, lr10),
			               biFromNumber(Number(s.substr(i, dpl10))));
			i += dpl10;
		}
		result.isNeg = isNeg;
	}
	return result;
}

function biCopy(bi)
{
	var result = new BigInt(true);
	result.digits = bi.digits.slice(0);
	result.isNeg = bi.isNeg;
	return result;
}

function biFromNumber(i)
{
	var result = new BigInt();
	result.isNeg = i < 0;
	i = Math.abs(i);
	var j = 0;
	while (i > 0) {
		result.digits[j++] = i & maxDigitVal;
		i >>= biRadixBits;
	}
	return result;
}

function reverseStr(s)
{
	var result = "";
	for (var i = s.length - 1; i > -1; --i) {
		result += s.charAt(i);
	}
	return result;
}

var hexatrigesimalToChar = new Array(
 '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
 'u', 'v', 'w', 'x', 'y', 'z'
);

function biToString(x, radix)
	// 2 <= radix <= 36
{
	var b = new BigInt();
	b.digits[0] = radix;
	var qr = biDivideModulo(x, b);
	var result = hexatrigesimalToChar[qr[1].digits[0]];
	while (biCompare(qr[0], bigZero) == 1) {
		qr = biDivideModulo(qr[0], b);
		digit = qr[1].digits[0];
		result += hexatrigesimalToChar[qr[1].digits[0]];
	}
	return (x.isNeg ? "-" : "") + reverseStr(result);
}

function biToDecimal(x)
{
	var b = new BigInt();
	b.digits[0] = 10;
	var qr = biDivideModulo(x, b);
	var result = String(qr[1].digits[0]);
	while (biCompare(qr[0], bigZero) == 1) {
		qr = biDivideModulo(qr[0], b);
		result += String(qr[1].digits[0]);
	}
	return (x.isNeg ? "-" : "") + reverseStr(result);
}

var hexToChar = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                          'a', 'b', 'c', 'd', 'e', 'f');

function digitToHex(n)
{
	var mask = 0xf;
	var result = "";
	for (i = 0; i < 4; ++i) {
		result += hexToChar[n & mask];
		n >>>= 4;
	}
	return reverseStr(result);
}

function biToHex(x)
{
	var result = "";
	var n = biHighIndex(x);
	for (var i = biHighIndex(x); i > -1; --i) {
		result += digitToHex(x.digits[i]);
	}
	return result;
}

function charToHex(c)
{
	var ZERO = 48;
	var NINE = ZERO + 9;
	var littleA = 97;
	var littleZ = littleA + 25;
	var bigA = 65;
	var bigZ = 65 + 25;
	var result;

	if (c >= ZERO && c <= NINE) {
		result = c - ZERO;
	} else if (c >= bigA && c <= bigZ) {
		result = 10 + c - bigA;
	} else if (c >= littleA && c <= littleZ) {
		result = 10 + c - littleA;
	} else {
		result = 0;
	}
	return result;
}

function hexToDigit(s)
{
	var result = 0;
	var sl = Math.min(s.length, 4);
	for (var i = 0; i < sl; ++i) {
		result <<= 4;
		result |= charToHex(s.charCodeAt(i))
	}
	return result;
}

function biFromHex(s)
{
	var result = new BigInt();
	var sl = s.length;
	for (var i = sl, j = 0; i > 0; i -= 4, ++j) {
		result.digits[j] = hexToDigit(s.substr(Math.max(i - 4, 0), Math.min(i, 4)));
	}
	return result;
}

function biFromString(s, radix)
{
	var isNeg = s.charAt(0) == '-';
	var istop = isNeg ? 1 : 0;
	var result = new BigInt();
	var place = new BigInt();
	place.digits[0] = 1; // radix^0
	for (var i = s.length - 1; i >= istop; i--) {
		var c = s.charCodeAt(i);
		var digit = charToHex(c);
		var biDigit = biMultiplyDigit(place, digit);
		result = biAdd(result, biDigit);
		place = biMultiplyDigit(place, radix);
	}
	result.isNeg = isNeg;
	return result;
}

function biToBytes(x)
	// Returns a string containing raw bytes.
{
	var result = "";
	for (var i = biHighIndex(x); i > -1; --i) {
		result += digitToBytes(x.digits[i]);
	}
	return result;
}

function digitToBytes(n)
	// Convert two-byte digit to string containing both bytes.
{
	var c1 = String.fromCharCode(n & 0xff);
	n >>>= 8;
	var c2 = String.fromCharCode(n & 0xff);
	return c2 + c1;
}

function biDump(b)
{
	return (b.isNeg ? "-" : "") + b.digits.join(" ");
}

function biAdd(x, y)
{
	var result;

	if (x.isNeg != y.isNeg) {
		y.isNeg = !y.isNeg;
		result = biSubtract(x, y);
		y.isNeg = !y.isNeg;
	}
	else {
		result = new BigInt();
		var c = 0;
		var n;
		for (var i = 0; i < x.digits.length; ++i) {
			n = x.digits[i] + y.digits[i] + c;
			result.digits[i] = n & 0xffff;
			c = Number(n >= biRadix);
		}
		result.isNeg = x.isNeg;
	}
	return result;
}

function biSubtract(x, y)
{
	var result;
	if (x.isNeg != y.isNeg) {
		y.isNeg = !y.isNeg;
		result = biAdd(x, y);
		y.isNeg = !y.isNeg;
	} else {
		result = new BigInt();
		var n, c;
		c = 0;
		for (var i = 0; i < x.digits.length; ++i) {
			n = x.digits[i] - y.digits[i] + c;
			result.digits[i] = n & 0xffff;
			// Stupid non-conforming modulus operation.
			if (result.digits[i] < 0) result.digits[i] += biRadix;
			c = 0 - Number(n < 0);
		}
		// Fix up the negative sign, if any.
		if (c == -1) {
			c = 0;
			for (var i = 0; i < x.digits.length; ++i) {
				n = 0 - result.digits[i] + c;
				result.digits[i] = n & 0xffff;
				// Stupid non-conforming modulus operation.
				if (result.digits[i] < 0) result.digits[i] += biRadix;
				c = 0 - Number(n < 0);
			}
			// Result is opposite sign of arguments.
			result.isNeg = !x.isNeg;
		} else {
			// Result is same sign.
			result.isNeg = x.isNeg;
		}
	}
	return result;
}

function biHighIndex(x)
{
	var result = x.digits.length - 1;
	while (result > 0 && x.digits[result] == 0) --result;
	return result;
}

function biNumBits(x)
{
	var n = biHighIndex(x);
	var d = x.digits[n];
	var m = (n + 1) * bitsPerDigit;
	var result;
	for (result = m; result > m - bitsPerDigit; --result) {
		if ((d & 0x8000) != 0) break;
		d <<= 1;
	}
	return result;
}

function biMultiply(x, y)
{
	var result = new BigInt();
	var c;
	var n = biHighIndex(x);
	var t = biHighIndex(y);
	var u, uv, k;

	for (var i = 0; i <= t; ++i) {
		c = 0;
		k = i;
		for (j = 0; j <= n; ++j, ++k) {
			uv = result.digits[k] + x.digits[j] * y.digits[i] + c;
			result.digits[k] = uv & maxDigitVal;
			c = uv >>> biRadixBits;
		}
		result.digits[i + n + 1] = c;
	}
	// Someone give me a logical xor, please.
	result.isNeg = x.isNeg != y.isNeg;
	return result;
}

function biMultiplyDigit(x, y)
{
	var n, c, uv;

	result = new BigInt();
	n = biHighIndex(x);
	c = 0;
	for (var j = 0; j <= n; ++j) {
		uv = result.digits[j] + x.digits[j] * y + c;
		result.digits[j] = uv & maxDigitVal;
		c = uv >>> biRadixBits;
	}
	result.digits[1 + n] = c;
	return result;
}

function arrayCopy(src, srcStart, dest, destStart, n)
{
	var m = Math.min(srcStart + n, src.length);
	for (var i = srcStart, j = destStart; i < m; ++i, ++j) {
		dest[j] = src[i];
	}
}

var highBitMasks = new Array(0x0000, 0x8000, 0xC000, 0xE000, 0xF000, 0xF800,
                             0xFC00, 0xFE00, 0xFF00, 0xFF80, 0xFFC0, 0xFFE0,
                             0xFFF0, 0xFFF8, 0xFFFC, 0xFFFE, 0xFFFF);

function biShiftLeft(x, n)
{
	var digitCount = Math.floor(n / bitsPerDigit);
	var result = new BigInt();
	arrayCopy(x.digits, 0, result.digits, digitCount,
	          result.digits.length - digitCount);
	var bits = n % bitsPerDigit;
	var rightBits = bitsPerDigit - bits;
	for (var i = result.digits.length - 1, i1 = i - 1; i > 0; --i, --i1) {
		result.digits[i] = ((result.digits[i] << bits) & maxDigitVal) |
		                   ((result.digits[i1] & highBitMasks[bits]) >>>
		                    (rightBits));
	}
	result.digits[0] = ((result.digits[i] << bits) & maxDigitVal);
	result.isNeg = x.isNeg;
	return result;
}

var lowBitMasks = new Array(0x0000, 0x0001, 0x0003, 0x0007, 0x000F, 0x001F,
                            0x003F, 0x007F, 0x00FF, 0x01FF, 0x03FF, 0x07FF,
                            0x0FFF, 0x1FFF, 0x3FFF, 0x7FFF, 0xFFFF);

function biShiftRight(x, n)
{
	var digitCount = Math.floor(n / bitsPerDigit);
	var result = new BigInt();
	arrayCopy(x.digits, digitCount, result.digits, 0,
	          x.digits.length - digitCount);
	var bits = n % bitsPerDigit;
	var leftBits = bitsPerDigit - bits;
	for (var i = 0, i1 = i + 1; i < result.digits.length - 1; ++i, ++i1) {
		result.digits[i] = (result.digits[i] >>> bits) |
		                   ((result.digits[i1] & lowBitMasks[bits]) << leftBits);
	}
	result.digits[result.digits.length - 1] >>>= bits;
	result.isNeg = x.isNeg;
	return result;
}

function biMultiplyByRadixPower(x, n)
{
	var result = new BigInt();
	arrayCopy(x.digits, 0, result.digits, n, result.digits.length - n);
	return result;
}

function biDivideByRadixPower(x, n)
{
	var result = new BigInt();
	arrayCopy(x.digits, n, result.digits, 0, result.digits.length - n);
	return result;
}

function biModuloByRadixPower(x, n)
{
	var result = new BigInt();
	arrayCopy(x.digits, 0, result.digits, 0, n);
	return result;
}

function biCompare(x, y)
{
	if (x.isNeg != y.isNeg) {
		return 1 - 2 * Number(x.isNeg);
	}
	for (var i = x.digits.length - 1; i >= 0; --i) {
		if (x.digits[i] != y.digits[i]) {
			if (x.isNeg) {
				return 1 - 2 * Number(x.digits[i] > y.digits[i]);
			} else {
				return 1 - 2 * Number(x.digits[i] < y.digits[i]);
			}
		}
	}
	return 0;
}

function biDivideModulo(x, y)
{
	var nb = biNumBits(x);
	var tb = biNumBits(y);
	var origYIsNeg = y.isNeg;
	var q, r;
	if (nb < tb) {
		// |x| < |y|
		if (x.isNeg) {
			q = biCopy(bigOne);
			q.isNeg = !y.isNeg;
			x.isNeg = false;
			y.isNeg = false;
			r = biSubtract(y, x);
			// Restore signs, 'cause they're references.
			x.isNeg = true;
			y.isNeg = origYIsNeg;
		} else {
			q = new BigInt();
			r = biCopy(x);
		}
		return new Array(q, r);
	}

	q = new BigInt();
	r = x;

	// Normalize Y.
	var t = Math.ceil(tb / bitsPerDigit) - 1;
	var lambda = 0;
	while (y.digits[t] < biHalfRadix) {
		y = biShiftLeft(y, 1);
		++lambda;
		++tb;
		t = Math.ceil(tb / bitsPerDigit) - 1;
	}
	// Shift r over to keep the quotient constant. We'll shift the
	// remainder back at the end.
	r = biShiftLeft(r, lambda);
	nb += lambda; // Update the bit count for x.
	var n = Math.ceil(nb / bitsPerDigit) - 1;

	var b = biMultiplyByRadixPower(y, n - t);
	while (biCompare(r, b) != -1) {
		++q.digits[n - t];
		r = biSubtract(r, b);
	}
	for (var i = n; i > t; --i) {
    var ri = (i >= r.digits.length) ? 0 : r.digits[i];
    var ri1 = (i - 1 >= r.digits.length) ? 0 : r.digits[i - 1];
    var ri2 = (i - 2 >= r.digits.length) ? 0 : r.digits[i - 2];
    var yt = (t >= y.digits.length) ? 0 : y.digits[t];
    var yt1 = (t - 1 >= y.digits.length) ? 0 : y.digits[t - 1];
		if (ri == yt) {
			q.digits[i - t - 1] = maxDigitVal;
		} else {
			q.digits[i - t - 1] = Math.floor((ri * biRadix + ri1) / yt);
		}

		var c1 = q.digits[i - t - 1] * ((yt * biRadix) + yt1);
		var c2 = (ri * biRadixSquared) + ((ri1 * biRadix) + ri2);
		while (c1 > c2) {
			--q.digits[i - t - 1];
			c1 = q.digits[i - t - 1] * ((yt * biRadix) | yt1);
			c2 = (ri * biRadix * biRadix) + ((ri1 * biRadix) + ri2);
		}

		b = biMultiplyByRadixPower(y, i - t - 1);
		r = biSubtract(r, biMultiplyDigit(b, q.digits[i - t - 1]));
		if (r.isNeg) {
			r = biAdd(r, b);
			--q.digits[i - t - 1];
		}
	}
	r = biShiftRight(r, lambda);
	// Fiddle with the signs and stuff to make sure that 0 <= r < y.
	q.isNeg = x.isNeg != origYIsNeg;
	if (x.isNeg) {
		if (origYIsNeg) {
			q = biAdd(q, bigOne);
		} else {
			q = biSubtract(q, bigOne);
		}
		y = biShiftRight(y, lambda);
		r = biSubtract(y, r);
	}
	// Check for the unbelievably stupid degenerate case of r == -0.
	if (r.digits[0] == 0 && biHighIndex(r) == 0) r.isNeg = false;

	return new Array(q, r);
}

function biDivide(x, y)
{
	return biDivideModulo(x, y)[0];
}

function biModulo(x, y)
{
	return biDivideModulo(x, y)[1];
}

function biMultiplyMod(x, y, m)
{
	return biModulo(biMultiply(x, y), m);
}

function biPow(x, y)
{
	var result = bigOne;
	var a = x;
	while (true) {
		if ((y & 1) != 0) result = biMultiply(result, a);
		y >>= 1;
		if (y == 0) break;
		a = biMultiply(a, a);
	}
	return result;
}

function biPowMod(x, y, m)
{
	var result = bigOne;
	var a = x;
	var k = y;
	while (true) {
		if ((k.digits[0] & 1) != 0) result = biMultiplyMod(result, a, m);
		k = biShiftRight(k, 1);
		if (k.digits[0] == 0 && biHighIndex(k) == 0) break;
		a = biMultiplyMod(a, a, m);
	}
	return result;
}

var RSAAPP = {};

RSAAPP.NoPadding = "NoPadding";
RSAAPP.PKCS1Padding = "PKCS1Padding";
RSAAPP.RawEncoding = "RawEncoding";
RSAAPP.NumericEncoding = "NumericEncoding"

function RSAKeyPair(encryptionExponent, decryptionExponent, modulus, keylen)
{
this.e = biFromHex(encryptionExponent);
this.d = biFromHex(decryptionExponent);
this.m = biFromHex(modulus);
if (typeof(keylen) != 'number') { this.chunkSize = 2 * biHighIndex(this.m); }
else { this.chunkSize = keylen / 8; }

this.radix = 16;
/*
* Precalculate the stuff used for Barrett modular reductions.
*/
this.barrett = new BarrettMu(this.m);
}

/*****************************************************************************/

function encryptedString(key, s, pad, encoding)
{
var a = new Array();                    // The usual Alice and Bob stuff
var sl = s.length;                      // Plaintext string length
var i, j, k;                            // The usual Fortran index stuff
var padtype;                            // Type of padding to do
var encodingtype;                       // Type of output encoding
var rpad;                               // Random pad
var al;                                 // Array length
var result = "";                        // Cypthertext result
var block;                              // Big integer block to encrypt
var crypt;                              // Big integer result
var text;                               // Text result
/*
* Figure out the padding type.
*/
if (typeof(pad) == 'string') {
  if (pad == RSAAPP.NoPadding) { padtype = 1; }
  else if (pad == RSAAPP.PKCS1Padding) { padtype = 2; }
  else { padtype = 0; }
}
else { padtype = 0; }
/*
* Determine encoding type.
*/
if (typeof(encoding) == 'string' && encoding == RSAAPP.RawEncoding) {
	encodingtype = 1;
}
else { encodingtype = 0; }

if (padtype == 1) {
  if (sl > key.chunkSize) { sl = key.chunkSize; }
}
else if (padtype == 2) {
  if (sl > (key.chunkSize-11)) { sl = key.chunkSize - 11; }
}
i = 0;

if (padtype == 2) { j = sl - 1; }
else { j = key.chunkSize - 1; }

while (i < sl) {
  if (padtype) { a[j] = s.charCodeAt(i); }
  else { a[i] = s.charCodeAt(i); }

  i++; j--;
}
if (padtype == 1) { i = 0; }

j = key.chunkSize - (sl % key.chunkSize);

while (j > 0) {
  if (padtype == 2) {
    rpad = Math.floor(Math.random() * 256);

    while (!rpad) { rpad = Math.floor(Math.random() * 256); }

    a[i] = rpad;
  }
  else { a[i] = 0; }

  i++; j--;
}
if (padtype == 2)
  {
  a[sl] = 0;
  a[key.chunkSize-2] = 2;
  a[key.chunkSize-1] = 0;
  }
/*
* Carve up the plaintext and encrypt each of the resultant blocks.
*/
al = a.length;

for (i = 0; i < al; i += key.chunkSize) {
  /*
  * Get a block.
  */
  block = new BigInt();

  j = 0;

  for (k = i; k < (i+key.chunkSize); ++j) {
    block.digits[j] = a[k++];
    block.digits[j] += a[k++] << 8;
  }
  /*
  * Encrypt it, convert it to text, and append it to the result.
  */
  crypt = key.barrett.powMod(block, key.e);
  if (encodingtype == 1) {
	  text = biToBytes(crypt);
  }
  else {
	  text = (key.radix == 16) ? biToHex(crypt) : biToString(crypt, key.radix);
  }
  result += text;
}
return result;
}

/*****************************************************************************/

function decryptedString(key, c)
{
var blocks = c.split(" ");              // Multiple blocks of cyphertext
var b;                                  // The usual Alice and Bob stuff
var i, j;                               // The usual Fortran index stuff
var bi;                                 // Cyphertext as a big integer
var result = "";                        // Plaintext result
/*
* Carve up the cyphertext into blocks.
*/
for (i = 0; i < blocks.length; ++i) {
  /*
  * Depending on the radix being used for the key, convert this cyphertext
  * block into a big integer.
  */
  if (key.radix == 16) { bi = biFromHex(blocks[i]); }
  else { bi = biFromString(blocks[i], key.radix); }
  /*
  * Decrypt the cyphertext.
  */
  b = key.barrett.powMod(bi, key.d);
  /*
  * Convert the decrypted big integer back to the plaintext string.  Since
  * we are using big integers, each element thereof represents two bytes of
  * plaintext.
  */
  for (j = 0; j <= biHighIndex(b); ++j) {
    result += String.fromCharCode(b.digits[j] & 255, b.digits[j] >> 8);
  }
}
/*
* Remove trailing null, if any.
*/
if (result.charCodeAt(result.length - 1) == 0) {
  result = result.substring(0, result.length - 1);
}
/*
* Return the plaintext.
*/
return (result);
}