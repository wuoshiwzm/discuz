if(typeof logoutFirst != 'undefined' && undefined != logoutFirst  && logoutFirst == 1){
	$z.logout('http://www.'+maindomain+'/logout.do',ki4soClientAppId,'http://'+passportdomain+'',false);
	printUnloginHTML();
}else {
	if(userCookieUID <= 0 ){
		printUnloginHTML();
		getPassportEC();
	}else{
		getLoginUser();
	}
}

function getPassportEC(){
	if ($z){
		$z.getServerCookie('http://'+passportdomain,function (data){
			if (data.passportServerEc != null && data.passportServerEc.length > 0){
				var loginUrl = "http://www."+maindomain+"/login_cb?isajax=true&TOKEN=" + data.passportServerEc + "&jsonpCallback=?" ;
				$.getJSON(loginUrl,function (da){

					if (da && da.success=="true"){
						userCookieUID=da.mid;
						userCookieUserDomain=da.domain;
						userCookieUserFace="/"+da.facepath+"/" + da.facename;
						userCookieLoginname=da.username;

						var userfacedomain = WebUtil.getImageDomainDomain(userCookieUserFace);
						var userFace = "http://" + userfacedomain + userCookieUserFace;
						$(".thrUl").attr('userfacesrc', userFace);
						printLoginHTML();
					}
					else{
						//printUnloginHTML();
					}

				});
			}
			else{
				//printUnloginHTML();
			}

		});
	}
}

function printUnloginHTML(){
	$(".thrUl").html('<li class="doLogBox"><a href="http://www.'+maindomain+'/tologin.do">登录</a>|<a href="http://'+passportdomain+'/reg.do?appId='+ki4soClientAppId+'&service=http://www.'+maindomain+'&appLogin=http://www.'+maindomain+'/login_cb&passportHost=http://'+passportdomain+'">注册</a></li>');
}

function printLoginHTML(){

	var facedomain = WebUtil.getImageDomainDomain(userCookieUserFace);
	var userFaceUrl = "http://" + facedomain + userCookieUserFace;

	var html ='	<li class="m01" id="_msg_foucs"><a st_t="click" st_n="nav_myindex" href="http://'+domain+appname+'tomyIndexTest.do"></a>'
	html+='                </li>';
	html+='                <li class="m02" id="_msg_topic_count"><a st_t="click" st_n="nav_sms" href="http://'+domain+appname+'tosms.do" title="查看我的私信"></a>';
	html+='                </li>';
	html+='                <li class="m03" id="_msg_total_count"><a st_t="click" st_n="nav_sms_2" href="http://'+domain+appname+'tosms.do"></a>';
	html+='                	<div class="son">';
	html+='                    	<ul>';
	html+='                        	<li><a st_t="click" st_n="nav_my_fans" href="http://'+domain+appname+'tofans.do?flag=0"><span class="rNum" id="_msg_fans_count"></span>我的粉丝</a></li>';
	html+='							<li><a st_t="click" st_n="nav_at_me" href="http://'+domain+appname+'atme.do"><span class="rNum" id="_msg_at_count"></span>@到我的</a></li>';
	html+='							<li><a st_t="click" st_n="nav_recommend_me" href="http://'+domain+appname+'torecommend.do"><span class="rNum" id="_msg_recommend_count"></span>推荐我的</a></li>';
	html+='							<li><a st_t="click" st_n="nav_comment_me" href="http://'+domain+appname+'tocomments.do"><span class="rNum" id="_msg_comment_count"></span>给我的评论</a></li>';
	html+='							<li><a st_t="click" st_n="nav_gbook_me" href="'+getpersonaldomain2(userCookieUID,userCookieUserDomain)+'?gb=1#gb"><span class="rNum" id="_msg_gbook_count"></span>给我的留言</a></li>';
	html+='							<li><a st_t="click" st_n="nav_recomment_me" href="http://'+domain+appname+'toreComments.do"><span class="rNum" id="_msg_reply_count"></span>给我的回复</a></li>';
	html+='							<li><a st_t="click" st_n="nav_noti" href="http://'+domain+appname+'tonotifications.do"><span class="rNum" id="_msg_notice_count"></span>系统通知</a></li>';
	html+='							<li><a st_t="click" st_n="nav_bulletin" href="http://'+domain+appname+'tonotificationsEvent.do"><span class="rNum" id="_msg_news_count"></span>站酷公告</a></li>';
	html+='                        </ul>';
	html+='                    </div>';
	html+='                </li>';
	html+='                <li class="m04"><a st_t="click" st_n="nav_fav" href="http://'+domain+appname+'myFavorite.do" title="进入我的收藏夹"></a>';
	html+='                <li class="m05"><a st_t="click" st_n="nav_upload_null" href="#"></a>';
	html+='				<div class="son">';
	html+='                    	<ul>';
	html+='                        	<li><a st_t="click" st_n="nav_upload_work" href="http://'+domain+appname+'touploadWorks.do">发布作品</a></li>';
	html+='							<li><a st_t="click" st_n="nav_upload_article" href="http://'+domain+appname+'touploadArticle.do">发表文章</a></li>';
	html+='                        </ul>';
	html+='                    </div>';
	html+='				</li>';
	html+='                <li class="m06"><a st_t="click" st_n="nav_face" href="'+getpersonaldomain2(userCookieUID,userCookieUserDomain)+'"><img src="'+userFaceUrl+'" width="24" height="24" /></a>';
	html+='                	<div class="son">';
	html+='                    	<div class="sonA" id="bar_username" style="height:widht:106px;42px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#ffba00;"><a st_t="click" st_n="nav_name" href="'+getpersonaldomain2(userCookieUID,userCookieUserDomain)+'" hidefocus>'+userCookieLoginname+'</a></div>';
	html+='                    	<ul>';
	html+='                            <li class="a2"><a st_t="click" st_n="nav_my_upload" href="http://'+domain+appname+'tomyWorks.do">作品管理</a></li>';
	html+='                            <li class="a1"><a st_t="click" st_n="nav_my_focus" href="http://'+domain+appname+'tofans.do">我关注的</a></li>';
	html+='                            <li class="a8"><a st_t="click" st_n="nav_my_team" href="http://'+domain+appname+'zteam">我的团队</a></li>';
	html+='                            <li class="a1"><a st_t="click" st_n="nav_my_focus" href="http://www.'+maindomain+'/job/mypreview.do">我的简历</a></li>';
	html+='                            <li class="a6"><a st_t="click" st_n="nav_setting" href="http://'+domain+appname+'toconfig.do">账号设置</a></li>';
	html+='                            <li class="a7"><a st_t="click" st_n="nav_logout" href="javascript:logout();">退出</a></li>';
	html+='                        </ul>';
	html+='                    </div>';
	html+='					</li>';

	$(".thrUl").html(html);

	get_message_count();
}

function logout(){
//	$z.logout('http://www.'+maindomain+'/logout.do',ki4soClientAppId,'http://'+passportdomain,true);
	if ("my."+maindomain+"" == window.location.host) {
		$z.logout('http://www.'+maindomain+'/logout.do',ki4soClientAppId,'http://'+passportdomain+'',true, "http://www." + maindomain);
	} else {
		$z.logout('http://www.'+maindomain+'/logout.do',ki4soClientAppId,'http://'+passportdomain+'',false);
		printUnloginHTML();
	}
}

function getLoginUser() {
	  $.ajax(
	  	{url: 'http://www.'+maindomain+'/getUser.do?jsonpcallback=?', dataType: 'json'}
	  ).done(function (data) {
		if(data && data.id>0){
			userCookieUID=data.id;
			userCookieUserDomain=data.domain;
			userCookieUserFace="/"+data.facepath+"/" + data.facename;
			userCookieLoginname=data.username;
			printLoginHTML();
		}else {
			$z.logout('http://www.'+maindomain+'/logout.do',ki4soClientAppId,'http://'+passportdomain+'',false);
			printUnloginHTML()
		}
	}).fail(function () {
		printLoginHTML();
	});
}

function get_message_count(){
	$.ajax
	(
			{
				url: 'http://'+domain+appname+'countmessage.do?t='+Math.random()+'&callback=?',
				dataType: 'json'
			}
	).done
	(
			function(data)
			{
				var dc = data.total;
//			if (data.a6)
//			{
//				dc=dc-data.a6;
//			}
				dc=data.a1+data.a2+data.a3+data.a4+data.a5+data.a8+data.a9+data.a10;

				if (dc>0){$("#_msg_total_count").addClass("hasMsg").prepend("<div class=\"fonts\"><a href=\"tosms.do\">"+ dc +"</a></div>");}
				if (data.a2>0){$("#_msg_fans_count").html("+"+data.a2);}
				if (data.a8>0){$("#_msg_recommend_count").html("+"+data.a8);}
				if (data.a3>0){$("#_msg_comment_count").html("+"+data.a3);}
				if (data.a5>0){$("#_msg_gbook_count").html("+"+data.a5);}
				if (data.a4>0){$("#_msg_reply_count").html("+"+data.a4);}
				if (data.a6>0){$("#_msg_topic_count").addClass("hasMsg").prepend("<div class=\"fonts\"><a href=\"tosms.do\">"+ data.a6 +"</a></div>");}
				if (data.a1>0){$("#_msg_notice_count").html("+"+data.a1);}
				if (data.a9>0){$("#_msg_news_count").html("+"+data.a9);}
				if (data.a10>0){$("#_msg_at_count").html("+"+data.a10);}
			}
	);



	$.ajax
	(
			{
				url: 'http://'+domain+appname+'getFocusProductCount.do?t='+Math.random()+'&callback=?',
				dataType: 'json'
			}
	).done
	(
			function(data)
			{
				var total = data.total;
				if(total>0)
				{
					$("#_msg_foucs").addClass("hasMsg").prepend("<div class=\"fonts\"><a href=tomyIndexTest.do>"+total+"</a></div>");
					$("#_myhome").html("+"+total);
					new Image().src="http://log.zcool.com.cn/view.gif?t=nav_myindex_view";
				}
			}
	);
}
function getpersonaldomain(membertmpId,mydomain){
	if (mydomain&&mydomain!='null') {
		return "http://"+mydomain+"."+maindomain;
	} else {
		return "http://"+domain+"/u/"+membertmpId;
	}
}
function getpersonaldomain2(membertmpId,mydomain){
	var ret="";
	if (mydomain&&mydomain!='null') {
		ret="http://"+mydomain+"."+maindomain;
	} else {
		ret="http://"+domain+"/u/"+membertmpId;
	}
	ret=ret.replace("http://my.","http://www.");
	return ret;
}
function check_imagecode(code){
	var checkUrl = "http://"+passportdomain+"/check_imgcode.do?code=" + code + "&jsonpCallback=?" ;
	$.getJSON(checkUrl,function (da){
		if (da.result) {
			$('#popRandomCodeIconImg').attr('src','http://static.zcool.com.cn/v1.0.3/passport/images/icon_right_s.png');
		} else {
			$('#popRandomCodeIconImg').attr('src','http://static.zcool.com.cn/v1.0.3/passport/images/icon_error_s.png');
		}
	});
}
$(function(){
	$('#randomCode').on('keyup',function(){
		if ($('#randomCode').val().length >= 5) {
			check_imagecode($('#randomCode').val());
		}
	});
});
