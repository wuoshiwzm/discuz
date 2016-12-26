$(function(){

	documentInit();			//页面文档事件初始化
	tagInit();				//标签扩展属性初始化
	tabInit();				//tab扩展初始化
	zcoolInit();			//站酷其他特效初始化


});

function zcoolInit(){
	//===============================所有页面头部的搜索下拉框弹出===================================
	$(".chooseSearchTypePop li a").on("click",function(){
		$(this).parents(".chooseSearchType").children(".sTypeList").html($(this).html());
		$(".chooseSearchTypePop").mouseout();
	});


	$(".ftChoosePop li a").on("click",function(){
		$(this).parents(".ftChoose").children(".ftChooseList").html($(this).html());
		$(".ftChoose").mouseout();
	});

}

function documentInit(){
	$(document).mouseup(function(){
		$("[btnmode='true']").removeClass("down");//取消按钮down的状态
		$("[selectmode='true']").removeClass("down");
	});
}
function tagInit(){

	//按钮三个状态
	$("[btnmode='true']").on("mousedown",function(){
		$(this).addClass("down");
	});

	//下拉框
	$("[selectmode='true'] .selectBtnBg").on("click",function(){
		var _self = $(this).parent();
		_self.addClass("down");
		_self.find("li").click(function(){
			var val = $(this).children().html();
			_self.children(".selectBtnBg").children("span").html(val);
		});
	});

	//==================================inputdefault 输入框属性扩展=============================
	$("[inputdefault]").each(function(){//请勿对输入框和文本区域以外的标签使用inputdefault属性
		if($(this).is(":focus")){
			$(this).val("").addClass("focus");
		}else{
			$(this).val($(this).attr("inputdefault"));
		}
	})
	$("[inputdefault]").on("focus",function(){
		if($(this).val()==$(this).attr("inputdefault")){
			$(this).val("").addClass("focus");
		}
	});
	$("[inputdefault]").on("blur",function(){
		if($(this).val()==""){
			$(this).val($(this).attr("inputdefault")).removeClass("focus");
		}
	});

	//==========================事件 扩展================================
	$("[hoverable='true']").on("mouseover",function(){$(this).addClass("hover");});
	$("[hoverable='true']").on("mouseout",function(){$(this).removeClass("hover");});
	$("[focusable='true']").on("focus",function(){$(this).addClass("focus");});
	$("[focusable='true']").on("blur",function(){$(this).removeClass("focus");});
	$("[parentfocus='true']").on("focus",function(){$(this).parent().addClass("focus");});
	$("[parentfocus='true']").on("blur",function(){$(this).parent().removeClass("focus");});
	$("[selectedable='true']").on("click",function(){$(this).toggleClass("selected");});


	//parentfocusable
	$("[parentfocusable]").each(function(){
		if($(this).is(":focus")){
			$(this).parent().addClass("focus");
		}else{
			if($(this).val()!=""){
				$(this).parent().addClass("focus");
			}
		}
	});
	$("[parentfocusable]").focus(function(){
		$(this).parent().addClass("focus");
	});
	$("[parentfocusable]").blur(function(){
		if($(this).val()==""){
			$(this).parent().removeClass("focus");
		}
	});

}


function tabInit(){
	$("[tab]").each(function(){
		var titleTag = $(this).attr("tab");
		$(this).find("[tabtitle='true'] "+titleTag).each(function(i){
			$(this).click(function(){
				$(this).parents("[tabtitle]").find(titleTag).removeClass("selected");
				$(this).addClass("selected");
				$(this).parents("[tab]").find("[tabcon='true']").children().removeClass("selected");
				$(this).parents("[tab]").find("[tabcon='true']").children().eq(i).addClass("selected");
			});
		});
	});
}





$(function(){
	$("[popheadid]").on("mouseover",function(){
		popHead(this);
		//要取id的话 alert($(this).attr('popheadid'))
	})
	$("[popheadid]").on("mouseout",function(){
		$("#popHead").hide();
		//popHead(this);因为要读数据，和程序结合的太紧了 这里就不写逻辑了
	});
})

function popHead(obj){
	var _x = $(obj).offset().left - 400;
	var _y = $(obj).offset().top - 240;

	if($("#popHead").size()>0){
		$("#popHead").css({
							  left:_x,
							  top:_y
						  }).show();
	}else{
		$.post("pop/popHead.html", function(data){
			$("body").append($(data));
			$("#popHead").css({
								  left:_x,
								  top:_y
							  });
		});
	}
}



function popFace(obj){
	var _x = $(obj).offset().left - $(obj).width()/2 + 30;
	var _y = $(obj).offset().top + $(obj).height() + 5;
	var span = $(obj).find("span");

	if($("#popFace").size()>0){
		$("#popFace").css({
							  left:_x,
							  top:_y
						  }).show();
		//保存textarear框的id
		$('#popFace').attr("textareaID",$(obj).parent().parent().find('textarea').attr("id"));
		$('#popFace').focus();
		tabInit();

	}else{

		$("body").append(str);
		$("#popFace").css({
							  left:_x,
							  top:_y
						  });
		//保存textarear框的id
		$('#popFace').attr("textareaID",$(obj).parent().parent().find('textarea').attr("id"));
		$('#popFace').focus();
		tabInit();


	}

}


/*下面几个pop可以最后改成一个通用的哈*/
function popFav(obj){
	popLayer('popFav',130);
}


function popMsg(obj){
	popLayer('popMsg',75);
}

function popAlert(){
	popLayer('popAlert',150);
}

function popShare(){
	popLayer('popShare',100);
}
function popLogin(){
	popLayer('popLogin',175);
}

function popRecommend(){
	popLayer('popRecommend',150);
}

function popDown(){
	popLayer('popDown',170);
}
function popModifyComment(){
	popLayer('popModifyComment',250);
}

function topUpPop(){
	popLayer('topUpPop',110);
}
function popLayer(popid,height){
	var obj = $('#'+popid);
	if(obj.size()>0){
		obj.css("margin-top",$(window).scrollTop()-height).show();
	}else{
		var prprecommend = obj;
		prprecommend.show();
		$('body').append(prprecommend);
		obj.css("margin-top",$(window).scrollTop()-height);
	}
}
function popMessage(mesg){
	var obj = $('#gloablPopMesg');
	var mesgdiv=$('#gloablPopMesg .popContent');
	mesgdiv.html(mesg);
	obj.css("margin-top",$(window).scrollTop()-175);
	obj.fadeIn('slow', function() {
		obj.fadeOut(3000);
	});

}

jQuery.fn.extend({
					 /**
					       * ctrl+enter提交表单
					       * @param {Function} fn 操作后执行的函数
					       * @param {Object} thisObj 指针作用域
					       */
					 ctrlSubmit:function(fn,thisObj){
						 var obj = thisObj || this;
						 var stat = false;
						 return this.each(function(){
							 $(this).keyup(function(event){
								 //只按下ctrl情况，等待enter键的按下
								 if(event.keyCode == 17){
									 stat = true;
									 //取消等待
									 setTimeout(function(){
										 stat = false;
									 },300);
								 }
								 if(event.keyCode == 13 && (stat || event.ctrlKey)){
									 fn.call(obj,event);
								 }
							 });
						 });
					 }
				 });

/*
 var slow_for_blockui=false;
 var unblocked_for_blockui=false;

 function enableSlowForBlockUI()
 {
 slow_for_blockui=true;
 }
 */

//loading页面
function loadingBlock()
{
	//return;
//	if(slow_for_blockui)
//	{
	$.blockUI(
			{
				message:'<img src="http://static.zcool.com.cn/images/loading3.gif"><br>加载中...',
				css:
				{
					//width:	'200px',
					border: 'none',
					padding: '15px',
					backgroundColor: '#fff',
					'-webkit-border-radius': '10px',
					'-moz-border-radius': '10px',
					opacity: .5,
					color: '#fff'
				},
				overlayCSS:
				{
					backgroundColor:	'#000',
					opacity:			0.0,
					cursor:				'wait'
				}
			}
	);
	//}
}

function unblockUI()
{
	//return;
	//slow_for_blockui=false;
	//alert(slow_for_blockui);
	$.unblockUI();
}

function blockWithClose(msg){
	$.blockUI({
				  onOverlayClick: $.unblockUI,
				  message:msg,
				  css: {
					  border: 'none',
					  padding: '15px',
					  backgroundColor: '#000',
					  '-webkit-border-radius': '10px',
					  '-moz-border-radius': '10px',
					  opacity: .5,
					  color: '#fff'
				  }

			  });
}


function showLayer(layer){
	$.blockUI({
				  onOverlayClick: $.unblockUI,
				  message:$("#"+layer)
			  });
}

function showMessage(msg){
	if (msg==null){
		msg = "<h1>执行成功</h1>";
	}
	$.blockUI({
				  message: msg,
				  fadeIn: 700,
				  fadeOut: 700,
				  timeout: 2000,
				  showOverlay: false,
				  centerY: false,
				  css: {
					  border: 'none',
					  padding: '15px',
					  backgroundColor: '#000',
					  '-webkit-border-radius': '10px',
					  '-moz-border-radius': '10px',
					  opacity: .7,
					  color: '#fff'
				  }
			  });
}



var str="";
str+="<div class=\"popFace\" id=\"popFace\" style=\"outline: none;\" tabindex=\"-1\" onblur=\"$(this).hide();\">";
str+="	<div class=\"popFaceFlag\"></div>";
str+="	<div class=\"popFaceBox\" tab=\"a\">";
str+="		<div class=\"popFaceTitle\">";
str+="			<a href=\"javascript:void(0)\" class=\"fRight\" onclick=\"$(this).parents(\'.popFace\').hide();\">";
str+="				<img src=\"http://static.zcool.com.cn/images/dClose.png\" width=\"16\" height=\"16\" />";
str+="			</a>";
str+="			<p tabtitle=\"true\">";
str+="				<a style=\"cursor:pointer\" class=\"selected\">常用表情</a>";
str+="				<a style=\"cursor:pointer\">站酷小Z</a>";
str+="				<a style=\"cursor:pointer\">牛MO王</a>";
str+="				<a style=\"cursor:pointer\">小幺鸡</a>";
str+="				<a style=\"cursor:pointer\">彼尔德</a>";
str+="				<a style=\"cursor:pointer\">阿狸</a>";
str+="				<a style=\"cursor:pointer\">郭斯特</a>";
str+="				<a style=\"cursor:pointer\">摩丝摩丝</a>";
str+="				<a style=\"cursor:pointer\">炮炮兵</a>";
str+="				<a style=\"cursor:pointer\">麦拉风</a>";
str+="			</p>";
str+="		</div>";


str+="		<div class=\"popFaceCon\" tabcon=\"true\">";
str+="			<div class=\"face selected\">";
str+="				<div class=\"faceList\">";

str+="					<img src=\"http://static.zcool.com.cn/images/face/z_daku.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'z大哭\');\" title=\"z大哭\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/z_daxiao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'z大笑\');\" title=\"z大笑\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/z_dongxin.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'z动心\');\" title=\"z动心\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/z_fennu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'z愤怒\');\" title=\"z愤怒\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/z_guzhang.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'z鼓掌\');\" title=\"z鼓掌\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/z_guancha.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'z观察\');\" title=\"z观察\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/z_huanhu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'z欢呼\');\" title=\"z欢呼\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/z_jiayou.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'z加油\');\" title=\"z加油\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/z_jingkong.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'z惊恐\');\" title=\"z惊恐\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/z_leipi.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'z雷劈\');\" title=\"z雷劈\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/z_shihua.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'z石化\');\" title=\"z石化\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/z_shuijiao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'z睡觉\');\" title=\"z睡觉\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/z_touxiao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'z偷笑\');\" title=\"z偷笑\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/z_woding.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'z我顶\');\" title=\"z我顶\">";

str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_aimu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw爱慕\');\" title=\"nmw爱慕\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_baichi.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw白痴\');\" title=\"nmw白痴\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_baodou.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw爆豆\');\" title=\"nmw爆豆\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_baoju.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw爆菊\');\" title=\"nmw爆菊\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_bixue.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw鼻血\');\" title=\"nmw鼻血\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_bishi.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw鄙视\');\" title=\"nmw鄙视\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_chenqie.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw臣妾\');\" title=\"nmw臣妾\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_daku.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw大哭\');\" title=\"nmw大哭\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_dashen.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw大神\');\" title=\"nmw大神\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_dawu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw大悟\');\" title=\"nmw大悟\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_daxiao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw大笑\');\" title=\"nmw大笑\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_danteng.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw蛋疼\');\" title=\"nmw蛋疼\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_dingni.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw顶你\');\" title=\"nmw顶你\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_fennu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw愤怒\');\" title=\"nmw愤怒\">";


str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_aini.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj爱你\');\" title=\"xyj爱你\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_biaolei.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj飙泪\');\" title=\"xyj飙泪\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_deyi.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj得意\');\" title=\"xyj得意\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_fengle.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj疯了\');\" title=\"xyj疯了\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_huaixiao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj坏笑\');\" title=\"xyj坏笑\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_kelian.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj可怜\');\" title=\"xyj可怜\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_jiuming.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj救命\');\" title=\"xyj救命\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_keshui.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj瞌睡\');\" title=\"xyj瞌睡\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_liuhan.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj流汗\');\" title=\"xyj流汗\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_niuyangge.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj扭秧歌\');\" title=\"xyj扭秧歌\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_sajiao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj撒娇\');\" title=\"xyj撒娇\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_tuxue.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj吐血\');\" title=\"xyj吐血\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_weinan.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj为难\');\" title=\"xyj为难\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_zoukai.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj走开\');\" title=\"xyj走开\">";

str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_bazhang.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd巴掌\');\" title=\"billd巴掌\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_benpao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd奔跑\');\" title=\"billd奔跑\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_feiwen.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd飞吻\');\" title=\"billd飞吻\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_lalala.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd啦啦啦\');\" title=\"billd啦啦啦\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_lianyao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd练腰\');\" title=\"billd练腰\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_lingluan.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd凌乱\');\" title=\"billd凌乱\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_naoyang.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd挠痒\');\" title=\"billd挠痒\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_paidupi.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd拍肚皮\');\" title=\"billd拍肚皮\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_pailian.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd拍脸\');\" title=\"billd拍脸\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_paishou.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd拍手\');\" title=\"billd拍手\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_rouyan.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd揉眼\');\" title=\"billd揉眼\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_sajiao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd撒娇\');\" title=\"billd撒娇\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_xingfen.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd兴奋\');\" title=\"billd兴奋\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_zhuanquan.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd转圈\');\" title=\"billd转圈\">";

str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_88.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali88\');\" title=\"ali88\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_bainian.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali拜年\');\" title=\"ali拜年\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_baoyibao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali抱一抱\');\" title=\"ali抱一抱\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_buma.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali不是吧\');\" title=\"ali不是吧\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_liu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali溜\');\" title=\"ali溜\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_momotou.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali摸摸头\');\" title=\"ali摸摸头\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_paipaishou.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali拍拍手\');\" title=\"ali拍拍手\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_qianzou.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali欠揍\');\" title=\"ali欠揍\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_qinyige.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali亲一个\');\" title=\"ali亲一个\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_xianzhuozi.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali掀桌子\');\" title=\"ali掀桌子\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_xiaosile.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali笑死了\');\" title=\"ali笑死了\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_xiu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali羞\');\" title=\"ali羞\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_xuxuxu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali嘘嘘嘘\');\" title=\"ali嘘嘘嘘\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_yumen.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali郁闷\');\" title=\"ali郁闷\">";

str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_aima.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst挨骂\');\" title=\"gst挨骂\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_buhuole.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst不活了\');\" title=\"gst不活了\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_chaoxiaoni.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst嘲笑你\');\" title=\"gst嘲笑你\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_chouniya.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst抽你呀\');\" title=\"gst抽你呀\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_fagongzila.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst发工资啦\');\" title=\"gst发工资啦\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_ganmalu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst认错\');\" title=\"gst认错\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_haonandong.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst好难懂\');\" title=\"gst好难懂\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_rerere.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst热热热\');\" title=\"gst热热热\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_shuaibile.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst帅毙了\');\" title=\"gst帅毙了\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_touxiang.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst投降\');\" title=\"gst投降\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_wabishi.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst挖鼻屎\');\" title=\"gst挖鼻屎\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_wanan.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst晚安\');\" title=\"gst晚安\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_xiabanla.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst下班啦\');\" title=\"gst下班啦\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_zhuanzhuanzhuan.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst转转转\');\" title=\"gst转转转\">";


str+="				</div>";
str+="				<p class=\"c999 pt5\">";
str+="					感谢酷友 " +
	 "						<a href=\"http://zhyhappy321.zcool.com.cn/\" class=\"c009cff\" target=\"_blank\">zhyhappy321</a>、" +
	 "						<a href=\"http://jr1985.zcool.com.cn/\" class=\"c009cff\" target=\"_blank\">牛MO王</a>、" +
	 "						<a href=\"http://www.zcool.com.cn/u/550599/\" class=\"c009cff\" target=\"_blank\">马里奥小黄</a>、" +
	 "						<a href=\"http://www.zcool.com.cn/u/61119/\" class=\"c009cff\" target=\"_blank\">comichunter</a>、" +
	 "						<a href=\"http://www.zcool.com.cn/u/913618/\" class=\"c009cff\" target=\"_blank\">Hans_阿狸</a>、" +
	 "						<a href=\"http://www.zcool.com.cn/u/286713/\" class=\"c009cff\" target=\"_blank\">viviling</a>、" +
	 "						<a href=\"http://www.zcool.com.cn/u/76367/\" class=\"c009cff\" target=\"_blank\">碳碳</a>、" +
	 "						<a href=\"http://www.zcool.com.cn/u/1167820/\" class=\"c009cff\" target=\"_blank\">郭国果过</a>" +
	 "						<a href=\"http://www.zcool.com.cn/u/363414/\" class=\"c009cff\" target=\"_blank\">糕糕</a>" +
	 "						 提供表情支持。";
str+="				</p>";
str+="			</div>";

str+="			<div class=\"face\">";
str+="				<div class=\"faceList\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/z_daku.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'z大哭\');\" title=\"z大哭\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/z_daxiao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'z大笑\');\" title=\"z大笑\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/z_dongxin.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'z动心\');\" title=\"z动心\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/z_fennu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'z愤怒\');\" title=\"z愤怒\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/z_guzhang.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'z鼓掌\');\" title=\"z鼓掌\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/z_guancha.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'z观察\');\" title=\"z观察\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/z_huanhu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'z欢呼\');\" title=\"z欢呼\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/z_jiayou.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'z加油\');\" title=\"z加油\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/z_jingkong.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'z惊恐\');\" title=\"z惊恐\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/z_leipi.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'z雷劈\');\" title=\"z雷劈\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/z_shihua.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'z石化\');\" title=\"z石化\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/z_shuijiao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'z睡觉\');\" title=\"z睡觉\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/z_touxiao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'z偷笑\');\" title=\"z偷笑\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/z_woding.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'z我顶\');\" title=\"z我顶\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/z_wohan.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'z我汗\');\" title=\"z我汗\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/z_wotu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'z我吐\');\" title=\"z我吐\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/z_wozan.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'z我赞\');\" title=\"z我赞\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/z_zaijian.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'z再见\');\" title=\"z再见\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/z_zhaoda.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'z找打\');\" title=\"z找打\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/z_zhenniu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'z真牛\');\" title=\"z真牛\">";
str+="				</div>";
str+="				<p class=\"c999 pt5\">";
str+="					表情作者：<a href=\"http://zhyhappy321.zcool.com.cn/\" class=\"c009cff\" target=\"_blank\">zhyhappy321</a>";
str+="				</p>";
str+="			</div>";

str+="			<div class=\"face\">";
str+="				<div class=\"faceList\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_aimu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw爱慕\');\" title=\"nmw爱慕\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_baichi.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw白痴\');\" title=\"nmw白痴\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_baodou.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw爆豆\');\" title=\"nmw爆豆\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_baoju.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw爆菊\');\" title=\"nmw爆菊\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_bixue.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw鼻血\');\" title=\"nmw鼻血\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_bishi.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw鄙视\');\" title=\"nmw鄙视\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_chenqie.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw臣妾\');\" title=\"nmw臣妾\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_daku.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw大哭\');\" title=\"nmw大哭\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_dashen.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw大神\');\" title=\"nmw大神\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_dawu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw大悟\');\" title=\"nmw大悟\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_daxiao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw大笑\');\" title=\"nmw大笑\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_danteng.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw蛋疼\');\" title=\"nmw蛋疼\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_dingni.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw顶你\');\" title=\"nmw顶你\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_fennu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw愤怒\');\" title=\"nmw愤怒\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_fengnan.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw风男\');\" title=\"nmw风男\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_guihun.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw鬼魂\');\" title=\"nmw鬼魂\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_guilian.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw鬼脸\');\" title=\"nmw鬼脸\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_hanyan.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw汗颜\');\" title=\"nmw汗颜\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_jiyou.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw基友\');\" title=\"nmw基友\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_jianyi.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw坚毅\');\" title=\"nmw坚毅\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_jingdai.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw惊呆\');\" title=\"nmw惊呆\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_kuqi.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw哭泣\');\" title=\"nmw哭泣\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_lanke.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw揽客\');\" title=\"nmw揽客\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_leidao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw雷倒\');\" title=\"nmw雷倒\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_miantian.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw腼腆\');\" title=\"nmw腼腆\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_niubi.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw牛逼\');\" title=\"nmw牛逼\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_oke.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw哦可\');\" title=\"nmw哦可\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_outu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw呕吐\');\" title=\"nmw呕吐\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_pangzi.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw胖子\');\" title=\"nmw胖子\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_rounai.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw揉奶\');\" title=\"nmw揉奶\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_sajiao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw撒娇\');\" title=\"nmw撒娇\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_segui.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw色鬼\');\" title=\"nmw色鬼\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_shengqi.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw生气\');\" title=\"nmw生气\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_shuashuai.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw耍帅\');\" title=\"nmw耍帅\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_shuijiao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw睡觉\');\" title=\"nmw睡觉\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_weixiao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw微笑\');\" title=\"nmw微笑\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_xiaban.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw下班\');\" title=\"nmw下班\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_yanjing.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw眼镜\');\" title=\"nmw眼镜\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_yiwen.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw疑问\');\" title=\"nmw疑问\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_zana.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw赞啊\');\" title=\"nmw赞啊\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/nmw_zuichan.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'nmw嘴馋\');\" title=\"nmw嘴馋\">";
str+="				</div>";
str+="				<p class=\"c999 pt5\">";
str+="					表情作者：<a href=\"http://jr1985.zcool.com.cn\" class=\"c009cff\" target=\"_blank\">牛MO王</a>";
str+="				</p>";
str+="			</div>";

str+="			<div class=\"face\">";
str+="				<div class=\"faceList\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_aini.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj爱你\');\" title=\"xyj爱你\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_aiya.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj哎呀\');\" title=\"xyj哎呀\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_biaolei.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj飙泪\');\" title=\"xyj飙泪\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_buyaoya.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj不要呀\');\" title=\"xyj不要呀\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_ceng.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj撑\');\" title=\"xyj撑\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_chixigua.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj吃西瓜\');\" title=\"xyj吃西瓜\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_chonga.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj冲啊\');\" title=\"xyj冲啊\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_deyi.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj得意\');\" title=\"xyj得意\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_ding.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj顶\');\" title=\"xyj顶\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_fengle.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj疯了\');\" title=\"xyj疯了\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_guale.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj挂了\');\" title=\"xyj挂了\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_huaixiao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj坏笑\');\" title=\"xyj坏笑\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_jiuming.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj救命\');\" title=\"xyj救命\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_kafei.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj咖啡\');\" title=\"xyj咖啡\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_kelian.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj可怜\');\" title=\"xyj可怜\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_keshui.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj瞌睡\');\" title=\"xyj瞌睡\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_laima.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj来嘛\');\" title=\"xyj来嘛\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_langxiao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj浪笑\');\" title=\"xyj浪笑\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_laoda.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj老大\');\" title=\"xyj老大\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_leng.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj冷\');\" title=\"xyj冷\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_liuhan.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj流汗\');\" title=\"xyj流汗\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_longnianxyjbai.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj新年快乐\');\" title=\"xyj新年快乐\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_longnianxyjhb.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj万事大吉\');\" title=\"xyj万事大吉\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_longnianxyjyu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj恭喜发财\');\" title=\"xyj恭喜发财\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_meishaonv.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj美少女\');\" title=\"xyj美少女\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_meiyan.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj媚眼\');\" title=\"xyj媚眼\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_niuyangge.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj扭秧歌\');\" title=\"xyj扭秧歌\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_pinle.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj拼了\');\" title=\"xyj拼了\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_sajiao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj撒娇\');\" title=\"xyj撒娇\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_tian.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj舔\');\" title=\"xyj舔\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_tuxue.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj吐血\');\" title=\"xyj吐血\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_weinan.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj为难\');\" title=\"xyj为难\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_xiayan.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj瞎眼\');\" title=\"xyj瞎眼\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_yun.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj晕\');\" title=\"xyj晕\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_zhenhan.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj震撼\');\" title=\"xyj震撼\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_zhuashafa.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj抓沙发\');\" title=\"xyj抓沙发\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_zoukai.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj走开\');\" title=\"xyj走开\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/xyj_zuoyi.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'xyj作揖\');\" title=\"xyj作揖\">";
str+="				</div>";
str+="				<p class=\"c999 pt5\">";
str+="					表情作者：<a href=\"http://www.zcool.com.cn/u/550599/\" class=\"c009cff\" target=\"_blank\">马里奥小黄</a>";
str+="				</p>";
str+="			</div>";
str+="			<div class=\"face\">";
str+="				<div class=\"faceList\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_bazhang.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd巴掌\');\" title=\"billd巴掌\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_benpao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd奔跑\');\" title=\"billd奔跑\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_che.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd扯\');\" title=\"billd扯\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_chuyu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd出浴\');\" title=\"billd出浴\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_dengtui.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd蹬腿\');\" title=\"billd蹬腿\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_feiwen.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd飞吻\');\" title=\"billd飞吻\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_haobao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd好饱\');\" title=\"billd好饱\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_heiha.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd嘿哈\');\" title=\"billd嘿哈\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_juyaling.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd举哑铃\');\" title=\"billd举哑铃\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_lalala.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd啦啦啦\');\" title=\"billd啦啦啦\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_lianyao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd练腰\');\" title=\"billd练腰\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_lingluan.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd凌乱\');\" title=\"billd凌乱\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_naoyang.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd挠痒\');\" title=\"billd挠痒\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_paidupi.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd拍肚皮\');\" title=\"billd拍肚皮\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_pailian.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd拍脸\');\" title=\"billd拍脸\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_paishou.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd拍手\');\" title=\"billd拍手\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_pao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd跑\');\" title=\"billd跑\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_piaohu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd飘忽\');\" title=\"billd飘忽\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_rouyan.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd揉眼\');\" title=\"billd揉眼\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_sajiao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd撒娇\');\" title=\"billd撒娇\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_tabu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd踏步\');\" title=\"billd踏步\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_tantiao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd弹跳\');\" title=\"billd弹跳\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_tiao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd跳\');\" title=\"billd跳\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_xingfen.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd兴奋\');\" title=\"billd兴奋\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_yangwoqizuo.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd仰卧起坐\');\" title=\"billd仰卧起坐\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/Billd_zhuanquan.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'billd转圈\');\" title=\"billd转圈\">";
str+="				</div>";
str+="				<p class=\"c999 pt5\">";
str+="					表情作者：<a href=\"http://www.zcool.com.cn/u/61119/\" class=\"c009cff\" target=\"_blank\">comichunter（郑插插）</a>";
str+="				</p>";
str+="			</div>";
str+="			<div class=\"face\">";
str+="				<div class=\"faceList\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_88.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali88\');\" title=\"ali88\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_bainian.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali拜年\');\" title=\"ali拜年\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_baoyibao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali抱一抱\');\" title=\"ali抱一抱\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_bianpao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali鞭炮\');\" title=\"ali鞭炮\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_biechao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali别吵\');\" title=\"ali别吵\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_buma.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali不是吧\');\" title=\"ali不是吧\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_bunaifan.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali不耐烦\');\" title=\"ali不耐烦\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_cai.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali踩\');\" title=\"ali踩\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_dachi.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali大吃\');\" title=\"ali大吃\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_dagun.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali打滚\');\" title=\"ali打滚\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_dalanqiu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali打篮球\');\" title=\"ali打篮球\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_dese.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali得瑟\');\" title=\"ali得瑟\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_diantou.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali点头\');\" title=\"ali点头\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_dingqi.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali顶起\');\" title=\"ali顶起\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_fanbaiyan.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali翻白眼\');\" title=\"ali翻白眼\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_fei.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali飞\');\" title=\"ali飞\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_fengzheng.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali风筝\');\" title=\"ali风筝\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_guiqiu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali跪求\');\" title=\"ali跪求\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_huaixiao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali坏笑\');\" title=\"ali坏笑\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_huanhu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali欢呼\');\" title=\"ali欢呼\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_hulaquan.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali呼啦圈\');\" title=\"ali呼啦圈\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_jiangshitiao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali僵尸跳\');\" title=\"ali僵尸跳\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_jiayou.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali加油\');\" title=\"ali加油\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_jing.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali惊\');\" title=\"ali惊\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_jiu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali紧张\');\" title=\"ali紧张\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_laiba.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali来吧\');\" title=\"ali来吧\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_laipi.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali赖皮\');\" title=\"ali赖皮\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_liu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali溜\');\" title=\"ali溜\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_momotou.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali摸摸头\');\" title=\"ali摸摸头\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_naoqiang.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali挠墙\');\" title=\"ali挠墙\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_ni.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali你\');\" title=\"ali你\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_paipaishou.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali拍拍手\');\" title=\"ali拍拍手\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_penti.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali喷嚏\');\" title=\"ali喷嚏\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_piao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali恳求\');\" title=\"ali恳求\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_piaoguo.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali飘过\');\" title=\"ali飘过\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_pu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali心动\');\" title=\"ali心动\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_pudao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali扑倒\');\" title=\"ali扑倒\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_qianzou.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali欠揍\');\" title=\"ali欠揍\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_qinyige.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali亲一个\');\" title=\"ali亲一个\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_saqian.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali撒钱\');\" title=\"ali撒钱\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_shuai.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali帅\');\" title=\"ali帅\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_shuaishou.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali甩手\');\" title=\"ali甩手\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_shui.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali睡\');\" title=\"ali睡\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_songliwu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali送礼物\');\" title=\"ali送礼物\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_toukan.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali偷看\');\" title=\"ali偷看\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_tuxue.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali吐血\');\" title=\"ali吐血\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_wa.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali哇\');\" title=\"ali哇\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_xia.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali吓\');\" title=\"ali吓\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_xiang.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali想\');\" title=\"ali想\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_xianhua.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali鲜花\');\" title=\"ali鲜花\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_xianzhuozi.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali掀桌子\');\" title=\"ali掀桌子\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_xiao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali笑\');\" title=\"ali笑\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_xiaosile.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali笑死了\');\" title=\"ali笑死了\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_xiu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali羞\');\" title=\"ali羞\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_xuxuxu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali嘘嘘嘘\');\" title=\"ali嘘嘘嘘\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_yaohuang.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali摇晃\');\" title=\"ali摇晃\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_yuanbao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali元宝\');\" title=\"ali元宝\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_yumen.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali郁闷\');\" title=\"ali郁闷\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_zhuan.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali转\');\" title=\"ali转\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_zhuanquanku.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali转圈哭\');\" title=\"ali转圈哭\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_zhui.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali追\');\" title=\"ali追\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ali_zuoguilian.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ali做鬼脸\');\" title=\"ali做鬼脸\">";
str+="				</div>";
str+="				<p class=\"c999 pt5\">";
str+="					表情作者：<a href=\"http://www.zcool.com.cn/u/913618/\" class=\"c009cff\" target=\"_blank\">Hans_阿狸（Hans）</a>";
str+="				</p>";
str+="			</div>";
str+="			<div class=\"face\">";
str+="				<div class=\"faceList\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_aima.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst挨骂\');\" title=\"gst挨骂\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_buhuole.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst不活了\');\" title=\"gst不活了\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_chaoxiaoni.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst嘲笑你\');\" title=\"gst嘲笑你\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_chouniya.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst抽你呀\');\" title=\"gst抽你呀\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_dese.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst得瑟\');\" title=\"gst得瑟\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_fagongzila.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst发工资啦\');\" title=\"gst发工资啦\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_ganmalu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst认错\');\" title=\"gst认错\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_han.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst汗\');\" title=\"gst汗\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_haonandong.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst好难懂\');\" title=\"gst好难懂\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_haopaya.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst好怕呀\');\" title=\"gst好怕呀\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_haoxiuse.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst好羞涩\');\" title=\"gst好羞涩\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_heiheihei.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst嘿嘿嘿\');\" title=\"gst嘿嘿嘿\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_kun.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst困\');\" title=\"gst困\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_naini.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst耐你\');\" title=\"gst耐你\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_renjiabuyi.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst人家不依\');\" title=\"gst人家不依\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_rerere.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst热热热\');\" title=\"gst热热热\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_rouroulian.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst揉揉脸\');\" title=\"gst揉揉脸\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_shuaibile.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst帅毙了\');\" title=\"gst帅毙了\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_tiantian.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst舔舔\');\" title=\"gst舔舔\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_touxiang.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst投降\');\" title=\"gst投降\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_wabishi.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst挖鼻屎\');\" title=\"gst挖鼻屎\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_wanan.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst晚安\');\" title=\"gst晚安\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_xiabanla.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst下班啦\');\" title=\"gst下班啦\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_yameidie.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst雅蠛蝶\');\" title=\"gst雅蠛蝶\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_youwenzi.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst有蚊子\');\" title=\"gst有蚊子\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/gst_zhuanzhuanzhuan.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'gst转转转\');\" title=\"gst转转转\">";
str+="				</div>";
str+="				<p class=\"c999 pt5\">";
str+="					表情作者：<a href=\"http://www.zcool.com.cn/u/286713/\" class=\"c009cff\" target=\"_blank\">viviling（郭斯特）</a>";
str+="				</p>";
str+="			</div>";
str+="			<div class=\"face\">";
str+="				<div class=\"faceList\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/moc_chelian.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'moc扯脸\');\" title=\"moc扯脸\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/moc_ciyaxiao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'moc呲牙笑\');\" title=\"moc呲牙笑\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/moc_daji.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'moc打击\');\" title=\"moc打击\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/moc_dakouchi.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'moc大口吃\');\" title=\"moc大口吃\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/moc_daku.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'moc大哭\');\" title=\"moc大哭\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/moc_ding.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'moc顶\');\" title=\"moc顶\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/moc_fuyun.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'moc浮云\');\" title=\"moc浮云\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/moc_ganga.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'moc尴尬\');\" title=\"moc尴尬\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/moc_guilian.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'moc鬼脸\');\" title=\"moc鬼脸\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/moc_ji.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'moc挤\');\" title=\"moc挤\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/moc_jiebing.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'moc结冰\');\" title=\"moc结冰\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/moc_kanqingchu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'moc看清楚\');\" title=\"moc看清楚\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/moc_luguo.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'moc路过\');\" title=\"moc路过\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/moc_maochu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'moc冒出\');\" title=\"moc冒出\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/moc_outu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'moc呕吐\');\" title=\"moc呕吐\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/moc_paizhao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'moc拍照\');\" title=\"moc拍照\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/moc_qiangwen.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'moc强吻\');\" title=\"moc强吻\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/moc_qinqinwen.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'moc亲亲吻\');\" title=\"moc亲亲吻\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/moc_qinqinyou.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'moc亲亲右\');\" title=\"moc亲亲右\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/moc_qinqinzuo.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'moc亲亲左\');\" title=\"moc亲亲左\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/moc_shengqi.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'moc生气\');\" title=\"moc生气\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/moc_shihua.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'moc石化\');\" title=\"moc石化\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/moc_tantiao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'moc弹跳\');\" title=\"moc弹跳\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/moc_wanan.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'moc晚安\');\" title=\"moc晚安\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/moc_weiguan.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'moc围观\');\" title=\"moc围观\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/moc_xiu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'moc羞\');\" title=\"moc羞\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/moc_yun.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'moc晕\');\" title=\"moc晕\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/moc_zhongjian.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'moc中箭\');\" title=\"moc中箭\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/moc_zhuanfa.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'moc转发\');\" title=\"moc转发\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/moc_zhuangku.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'moc装酷\');\" title=\"moc装酷\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/moc_zhuangtou.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'moc撞头\');\" title=\"moc撞头\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/moc_zizhong.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'moc自重\');\" title=\"moc自重\">";
str+="				</div>";
str+="				<p class=\"c999 pt5\">";
str+="					表情作者：<a href=\"http://www.zcool.com.cn/u/76367/\" class=\"c009cff\" target=\"_blank\">碳碳</a>";
str+="				</p>";
str+="			</div>";
str+="			<div class=\"face\">";
str+="				<div class=\"faceList\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ppb_bibi.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ppb哔哔\');\" title=\"ppb哔哔\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ppb_buyao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ppb不要\');\" title=\"ppb不要\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ppb_chouyan.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ppb抽烟\');\" title=\"ppb抽烟\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ppb_chuidi.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ppb捶地\');\" title=\"ppb捶地\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ppb_ele.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ppb饿了\');\" title=\"ppb饿了\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ppb_haixiu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ppb害羞\');\" title=\"ppb害羞\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ppb_jiangshi.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ppb僵尸\');\" title=\"ppb僵尸\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ppb_jianshen.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ppb健身\');\" title=\"ppb健身\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ppb_jianxiao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ppb贱笑\');\" title=\"ppb贱笑\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ppb_kaihuo.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ppb开火\');\" title=\"ppb开火\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ppb_kaiqiang.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ppb开枪\');\" title=\"ppb开枪\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ppb_liuzou.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ppb溜走\');\" title=\"ppb溜走\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ppb_nielian.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ppb捏脸\');\" title=\"ppb捏脸\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ppb_niudong.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ppb扭动\');\" title=\"ppb扭动\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ppb_paishou.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ppb拍手\');\" title=\"ppb拍手\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ppb_paopao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ppb泡泡\');\" title=\"ppb泡泡\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ppb_piaoguo.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ppb飘过\');\" title=\"ppb飘过\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ppb_ppb_tushui.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ppb吐口水\');\" title=\"ppb吐口水\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ppb_qianshui.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ppb潜水\');\" title=\"ppb潜水\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ppb_quantou.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ppb拳头\');\" title=\"ppb拳头\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ppb_re.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ppb热\');\" title=\"ppb热\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ppb_sahua.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ppb撒花\');\" title=\"ppb撒花\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ppb_shuaya.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ppb刷牙\');\" title=\"ppb刷牙\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ppb_tuxue.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ppb吐血\');\" title=\"ppb吐血\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ppb_xiayu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ppb下雨\');\" title=\"ppb下雨\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ppb_xuanzhuan.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ppb旋转\');\" title=\"ppb旋转\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ppb_zhuangqiang.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ppb撞墙\');\" title=\"ppb撞墙\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ppb_zhuanlian.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ppb转脸\');\" title=\"ppb转脸\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ppb_zhuanquan.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ppb转圈\');\" title=\"ppb转圈\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/ppb_zoulu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'ppb走路\');\" title=\"ppb走路\">";
str+="				</div>";
str+="				<p class=\"c999 pt5\">";
str+="					表情作者：<a href=\"http://www.zcool.com.cn/u/1167820/\" class=\"c009cff\" target=\"_blank\">郭国果过（郭征）</a>";
str+="				</p>";
str+="			</div>";


str+="			<div class=\"face\">";
str+="				<div class=\"faceList\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/mlf_chifan.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'mlf吃饭\');\" title=\"mlf吃饭\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/mlf_dahaqian.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'mlf打哈欠\');\" title=\"mlf打哈欠\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/mlf_daku.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'mlf大哭\');\" title=\"mlf大哭\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/mlf_diantou.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'mlf点头\');\" title=\"mlf点头\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/mlf_dun.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'mlf遁\');\" title=\"mlf遁\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/mlf_fulaile.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'mlf福来了\');\" title=\"mlf福来了\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/mlf_gongxi.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'mlf恭喜\');\" title=\"mlf恭喜\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/mlf_haixiu.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'mlf害羞\');\" title=\"mlf害羞\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/mlf_han.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'mlf汗\');\" title=\"mlf汗\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/mlf_haorenka.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'mlf好人卡\');\" title=\"mlf好人卡\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/mlf_hecha.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'mlf喝茶\');\" title=\"mlf喝茶\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/mlf_huachi.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'mlf花痴\');\" title=\"mlf花痴\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/mlf_huaixiao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'mlf坏笑\');\" title=\"mlf坏笑\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/mlf_keshui.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'mlf瞌睡\');\" title=\"mlf瞌睡\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/mlf_nielian.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'mlf捏脸\');\" title=\"mlf捏脸\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/mlf_nuhuo.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'mlf怒火\');\" title=\"mlf怒火\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/mlf_qiaoqiao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'mlf瞧瞧\');\" title=\"mlf瞧瞧\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/mlf_qinqin.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'mlf亲亲\');\" title=\"mlf亲亲\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/mlf_tao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'mlf逃\');\" title=\"mlf逃\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/mlf_wanan.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'mlf晚安\');\" title=\"mlf晚安\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/mlf_weixiao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'mlf微笑\');\" title=\"mlf微笑\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/mlf_wuliao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'mlf无聊\');\" title=\"mlf无聊\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/mlf_yangtiandaxiao.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'mlf仰天大笑\');\" title=\"mlf仰天大笑\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/mlf_zhenjing.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'mlf震惊\');\" title=\"mlf震惊\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/mlf_zhuakuang.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'mlf抓狂\');\" title=\"mlf抓狂\">";
str+="					<img src=\"http://static.zcool.com.cn/images/face/mlf_zhuangsha.gif\" style=\"cursor:pointer\" onclick=\"insertSmile(\'mlf装傻\');\" title=\"mlf装傻\">";
str+="				</div>";
str+="				<p class=\"c999 pt5\">";
str+="					表情作者：<a href=\"http://www.zcool.com.cn/u/363414/\" class=\"c009cff\" target=\"_blank\">糕糕</a>";
str+="				</p>";
str+="			</div>";







str+="		</div>";
str+="	</div>";


/*判断浏览器*/
function userBrowser(){
	var browserName=navigator.userAgent.toLowerCase();
	var Browser;
	if(/msie/i.test(browserName) && !/opera/.test(browserName)){
		Browser="IE";
		return;
	}else if(/firefox/i.test(browserName)){
		Browser="Firefox";
		return ;
	}else if(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName)){
		Browser="Chrome";
		return ;
	}else if(/opera/i.test(browserName)){
		Browser="Opera";
		return ;
	}else if(/webkit/i.test(browserName) &&!(/chrome/i.test(browserName) && /webkit/i.test(browserName) && /mozilla/i.test(browserName))){
		Browser="Safari";
		return ;
	}else{
		Browser="unKnow";
	}
}
userBrowser();

/**@功能 */
var indexLi = 0;
var liVal="";
/*弹出层显示*/
function layshow(obj,str,currentstr,del){
	if (currentstr) {
		$.getJSON('/at/s/'+currentstr+'.do',{},function(data){
			if (data.code == 1000) {
				dolayshow(obj,str,data.data,del);
			}
		});
	} else {
		$.getJSON('/at/newestat.do',{},function(data){
			if (data.code == 1000) {
				dolayshow(obj,str,data.data,del);
			}
		});
	}
}

function dolayshow(obj,str,data,del){
	/*通过构造一个div_textarea，来获取光标的位置，从而定位弹出层*/
	var w = $(obj).width();
	var h = $(obj).height();
	var o = $(obj).offset();
	$(".div_textarea").css({
							   width:w+'px',
							   height:h+'px',
							   top:o.top+'px',
							   left:o.left+'px'
						   }).html(str+'<span class="nowpos">&nbsp;</span>');
	var p = $(".div_textarea .nowpos").offset();
	if(Browser="Chrome"){
		$userlist.css({
						  top:p.top+25+'px'
					  });
	}else{
		$userlist.css({
						  top:p.top+10+'px'
					  });
	}
	$userlist.css({left:p.left-5+'px'}).show();

	if(data==""){
		var html = '<li class="first suggest_title">请敲空格完成输入</li>';
		$userlist.html(html);
		indexLi=0;

	}else{
		var html = '<li class="first suggest_title">选择最近@的人或直接输入</li>';
		for (var j =0; j<data.length ; j++ ){
			html += '<li class="item" data-value="'+data[j]+'"><a href="javascript:;">'+data[j]+'</a></li>';
		}
		$userlist.html(html);
		$userlist.find("li").eq(1).addClass("cur").siblings().removeClass("cur");
		indexLi=1;

		/*鼠标经过列表*/
		$userlist.find("li.item").on("mousemove",function(){
			$(this).addClass("cur").siblings().removeClass("cur");
		});

		/*鼠标点击*/
		$userlist.find("li.item").on("click",function(){
			liVal = $(this).attr("data-value");
			getlival($(obj),liVal,del);
		});
	}
}


/*获取li的值,并插入*/
function getlival(obj,v,del){
	$(obj).selection().backspace(del);
	$(obj).insertContent(v+" ");
	$userlist.hide();
}


$(document).ready(function(){
	var $commenttextarea = $(".at_input");
	$userlist = $(".layer_menu");
	/*监听键盘输入*/
	$commenttextarea.keyup(function(event){
		if(event.which==38||event.which==40||event.which==13){
			return;
		}else{
			var v = $(this).val();
			var m = $(this).selection().start;
			var n = v.substr(m-1,1);
			var s = v.substr(0,m);
			/*光标前有@连续合法字符 或者@*/
			if (s.indexOf("@")!=-1) {
				var strss = s.split("@");
				var h = strss.length-1;
				var currentstr = strss[h];
				if (currentstr.indexOf(" ")==-1) {
					var l = m - currentstr.length;//光标之前最近的@下标
					var v2 = v.substr(0,l);
					v2 = v2.replace(/[\r\n]/g,"<br>");
					var del = m-l;
					if(h>10){
						alert("最多只能@10个人");
						return false;
					}
					else{
						layshow(this,v2,currentstr,del);
					}
				}
				else {
					$userlist.hide();
					return false;
				}

			}
			/*如果光标前有空格*/
			else{
				$userlist.hide();
			}

		}
	});

	/*点击识别@*/
	$commenttextarea.click(function(){
		var v = $(this).val();
		var m = $(this).selection().start;
		var n = v.substr(m-1,1);
		var s = v.substr(0,m);
		if (s.indexOf("@")!=-1) {
			var strss = s.split("@");
			var h = strss.length-1;
			var currentstr = strss[h];
			if (currentstr.indexOf(" ")==-1) {
				var l = m - currentstr.length;//光标之前最近的@下标
				var v2 = v.substr(0,l);

				v2 = v2.replace(/[\r\n]/g,"<br>");
				var del = m-l;
				layshow(this,v2,currentstr,del);

			}
			else {
				$userlist.hide();
				return false;
			}
		}
		else{
			$userlist.hide();
			return false;
		}
	});

	$commenttextarea.keydown(function(event){
		if($userlist.is(":visible")&&$userlist.find(".item").length>0){
			if(event.which==38){
				if(indexLi == 1){
					indexLi= $userlist.find("li").length-1;
				}else{
					indexLi--;
				}
				$userlist.find("li").eq(indexLi).addClass("cur").siblings().removeClass("cur");
				return false;
			}
			if(event.which==40){
				if(indexLi ==  $userlist.find("li").length-1){
					indexLi = 1;
				}else{
					indexLi++;
				}
				$userlist.find("li").eq(indexLi).addClass("cur").siblings().removeClass("cur");
				return false;
			}
			if(event.which==13){
				var v = $(this).val();
				var m = $(this).selection().start;
				var s = v.substr(0,m);
				var strss = s.split("@");
				var h = strss.length-1;
				var currentstr = strss[h];
				var l = m - currentstr.length;
				var del = m-l;
				liVal = $userlist.find("li.cur").attr("data-value");
				var m = $(this).selection().start;
				getlival(this,liVal,del);
				return false;
			}
		}else{
			$userlist.hide();
		}
	});

	/*隐藏弹出层*/
	$(document).on("click",function(){
		$userlist.hide();
	});
});

/*insertContent插件：在光标位置后面插入字符串*/
(function($) {
	$.fn.extend({
					insertContent: function(myValue, t) {
						var $t = $(this)[0];
						if (document.selection) { //ie
							this.focus();
							var sel = document.selection.createRange();
							sel.text = myValue;
							this.focus();
							sel.moveStart('character', -l);
							var wee = sel.text.length;
							if (arguments.length == 2) {
								var l = $t.value.length;
								sel.moveEnd("character", wee + t);
								t <= 0 ? sel.moveStart("character", wee - 2 * t - myValue.length) : sel.moveStart("character", wee - t - myValue.length);

								sel.select();
							}
						} else if ($t.selectionStart || $t.selectionStart == '0') {
							var startPos = $t.selectionStart;
							var endPos = $t.selectionEnd;
							var scrollTop = $t.scrollTop;
							$t.value = $t.value.substring(0, startPos) + myValue + $t.value.substring(endPos, $t.value.length);
							this.focus();
							$t.selectionStart = startPos + myValue.length;
							$t.selectionEnd = startPos + myValue.length;
							$t.scrollTop = scrollTop;
							if (arguments.length == 2) {
								$t.setSelectionRange(startPos - t, $t.selectionEnd + t);
								this.focus();
							}
						}
						else {
							this.value += myValue;
							this.focus();
						}
					}
				})
})(jQuery);
/**@功能 */
