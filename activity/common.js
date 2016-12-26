//"{1}"=res.obj_coverpath "{2}"=res.obj_covername "{3}"=res.obj_title  "{4}"= res.url "{5}"= res.view_count  "{6}"= res.comment_count  "{7}"= res.favorite_count "{8}"= res.creatorId  "{9}"==res.mem_name
 
function initIndexProduct(event_id,recommend,pagesize){
       $.ajax({
            type: "get", 
            dataType: "json", 
            url: "/event/index.do", 
            data: "event_id="+event_id+"&recommend="+recommend+"&pagesize="+pagesize+"", 
            complete :function(){$("#load").hide();}, 
            success: function(msg){     
                 if(msg.success){
					 var data=msg.productList;
					 var content="";
					 $.each(data, function(i, res){
                       content=content+getTxt(res.obj_coverpath,res.obj_covername,res.obj_title,res.url,res.view_count,res.comment_count,res.favorite_count,res.creatorId,res.mem_name,res.image_count,res.mem_facepath,res.mem_facename,res.obj_subcateStr);           
                 });
					 $("#lidata").append(content);
                
					 
				 } 
			}
   })
}
function initIndexProductSearch(event_id,recommend,pagesize,word,obj){
       $.ajax({
            type: "get", 
            dataType: "json", 
            url: "/event/index.do", 
            data: "event_id="+event_id+"&recommend="+recommend+"&pagesize="+pagesize+"&word="+word, 
            complete :function(){$("#load_tuijianProduct").hide();}, 
            success: function(msg){     
                 if(msg.success){
					 var data=msg.productList;
					 var content="";
					 $.each(data, function(i, res){
                       content=content+getProductTxt(res.obj_coverpath,res.obj_covername,res.obj_title,res.url,res.view_count,res.comment_count,res.recommend_count,res.favorite_count,res.creatorId,res.mem_name,res.image_count,res.mem_facepath,res.mem_facename,res.obj_subcateStr);           
                 });
					 obj.append(content);
                
					 
				 } 
			}
   })
}
 
function initIndexProduct_new(event_id,recommend,pagesize){
       $.ajax({
            type: "get", 
            dataType: "json", 
            url: "/event/index.do", 
            data: "event_id="+event_id+"&recommend="+recommend+"&pagesize="+pagesize+"", 
            complete :function(){$("#load").hide();}, 
            success: function(msg){     
                 if(msg.success){
					 var data=msg.productList;
					 var content="";
					 $.each(data, function(i, res){
                       content=content+getTxt(res.obj_coverpath,res.obj_covername,res.obj_title,res.url,res.view_count,res.comment_count,res.favorite_count,res.recommend_count,res.creatorId,res.mem_name,res.image_count,res.mem_facepath,res.mem_facename,res.obj_subcateStr);           
                 });
					 $("#lidata").append(content);
                
					 
				 } 
			}
   })
}

function initWorksProduct(event_id,recommend,pagesize,p,sort,cateType,subcateType){
        $.ajax({
            type: "get",//使用get方法访问后台
            dataType: "json",//返回json格式的数据
            url: "/event/works.do",//要访问的后台地址
            data: "event_id="+event_id+"&recommend="+recommend+"&pagesize="+pagesize+"&p="+p+"&sort="+sort+"&cateType="+cateType+"&subcateType="+subcateType,//要发送的数据
            complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
            success: function(msg){//msg为返回的数据，在这里做数据绑定           
                 if(msg.success){
					 var data=msg.productList;
					 var content="";
					 $.each(data, function(i, res){
                       content=content+getTxt(res.obj_coverpath,res.obj_covername,res.obj_title,res.url,res.view_count,res.comment_count,res.favorite_count,res.creatorId,res.mem_name,res.image_count,res.mem_facepath,res.mem_facename,res.obj_subcateStr);      
                 });
				    $("#total")[0].innerHTML=msg.total; 
					$("#lidata").append(content);
                    $("#pageInfo").append(msg.pageInfo);
				 } 
			}
   })
}
function initWorksProduct_new(event_id,recommend,pagesize,p,sort,cateType,subcateType){
        $.ajax({
            type: "get",//使用get方法访问后台
            dataType: "json",//返回json格式的数据
            url: "/event/works.do",//要访问的后台地址
            data: "event_id="+event_id+"&recommend="+recommend+"&pagesize="+pagesize+"&p="+p+"&sort="+sort+"&cateType="+cateType+"&subcateType="+subcateType,//要发送的数据
            complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
            success: function(msg){//msg为返回的数据，在这里做数据绑定           
                 if(msg.success){
					 var data=msg.productList;
					 var content="";
					 $.each(data, function(i, res){
                       content=content+getTxt(res.obj_coverpath,res.obj_covername,res.obj_title,res.url,res.view_count,res.comment_count,res.favorite_count,res.recommend_count,res.creatorId,res.mem_name,res.image_count,res.mem_facepath,res.mem_facename,res.obj_subcateStr);      
                 });
				    $("#total")[0].innerHTML=msg.total; 
					$("#lidata").append(content);
                    $("#pageInfo").append(msg.pageInfo);
				 } 
			}
   })
}
function initWorksProductSearch_new(event_id,recommend,pagesize,p,sort,cateType,subcateType,word,obj){
	      
	    word=encodeURI(word);
		 
        $.ajax({
            type: "get",//使用get方法访问后台
            dataType: "json",//返回json格式的数据
            url: "/event/works.do",//要访问的后台地址
            data: "event_id="+event_id+"&recommend="+recommend+"&pagesize="+pagesize+"&p="+p+"&sort="+sort+"&cateType="+cateType+"&subcateType="+subcateType+"&word="+word+"&t="+Math.random(),//要发送的数据
            complete :function(){$("#load_product").hide();},//AJAX请求完成时隐藏loading提示
            success: function(msg){//msg为返回的数据，在这里做数据绑定           
                 if(msg.success){
					 var data=msg.productList;
					 var content="";
					 $.each(data, function(i, res){
                       content=content+getProductTxt(res.obj_coverpath,res.obj_covername,res.obj_title,res.url,res.view_count,res.comment_count,res.recommend_count,res.favorite_count,res.creatorId,res.mem_name,res.image_count,res.mem_facepath,res.mem_facename,res.obj_subcateStr);      
                 }); 
		    obj.append(content);
                    $("#pageInfo_product").append(msg.pageInfo);
				 } 
			}
   })
}
function initWorksProductSearch(event_id,recommend,pagesize,p,sort,cateType,subcateType,word){
	    word=encodeURI(word);
        $.ajax({
            type: "get",//使用get方法访问后台
            dataType: "json",//返回json格式的数据
            url: "/event/works.do",//要访问的后台地址
            data: "event_id="+event_id+"&recommend="+recommend+"&pagesize="+pagesize+"&p="+p+"&sort="+sort+"&cateType="+cateType+"&subcateType="+subcateType+"&word="+word+"&t="+Math.random(),//要发送的数据
            complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
            success: function(msg){//msg为返回的数据，在这里做数据绑定           
                 if(msg.success){
					 var data=msg.productList;
					 var content="";
					 $.each(data, function(i, res){
                       content=content+getTxt(res.obj_coverpath,res.obj_covername,res.obj_title,res.url,res.view_count,res.comment_count,res.favorite_count,res.creatorId,res.mem_name,res.image_count,res.mem_facepath,res.mem_facename,res.obj_subcateStr);      
                 });
				    $("#total")[0].innerHTML=msg.total; 
					$("#lidata").append(content);
                    $("#pageInfo").append(msg.pageInfo);
				 } 
			}
   })
}

//20140311
function initWorks(event_id,recommend,pagesize,p,sort,word,obj){
	      
	    word=encodeURI(word);
		 
        $.ajax({
            type: "get",//使用get方法访问后台
            dataType: "json",//返回json格式的数据
            url: "/event/works.do",//要访问的后台地址
            data: "event_id="+event_id+"&recommend="+recommend+"&pagesize="+pagesize+"&p="+p+"&sort="+sort+"&word="+word+"&t="+Math.random(),//要发送的数据
            complete :function(){$("#load_product").hide();},//AJAX请求完成时隐藏loading提示
            success: function(msg){//msg为返回的数据，在这里做数据绑定           
                 if(msg.success){
					 var data=msg.productList;
					 var content="";
					 $.each(data, function(i, res){
                       content=content+getWorksTxt(res.obj_coverpath,res.obj_covername,res.obj_title,res.url,res.view_count,res.comment_count,res.recommend_count,res.favorite_count,res.creatorId,res.mem_name,res.image_count,res.mem_facepath,res.mem_facename,res.obj_subcateStr);      
                 }); 
		             obj.append(content);
                     initWorksFinish(msg);
				 } 
			}
   })
}

function initShotlist(event_id,recommend,pagesize,p,sort,obj){
        $.ajax({
            type: "get",//使用get方法访问后台
            dataType: "json",//返回json格式的数据
            url: "/event/shortlist.do",//要访问的后台地址
            data: "event_id="+event_id+"&recommend="+recommend+"&pagesize="+pagesize+"&p="+p+"&sort="+sort,//要发送的数据
            complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
            success: function(msg){//msg为返回的数据，在这里做数据绑定           
                 if(msg.success){
					 var data=msg.productList;
					 var content="";
					 $.each(data, function(i, res){
                       content=content+getTxt(res.obj_coverpath,res.obj_covername,res.obj_title,res.url,res.view_count,res.comment_count,res.favorite_count,res.creatorId,res.mem_name,res.image_count,res.mem_facepath,res.mem_facename);          
                 });
					obj.append(content);
				 } 
			}
   })
}

function initWinnerlist(event_id,recommend,pagesize,p,sort,cup,obj){
        $.ajax({
            type: "get",//使用get方法访问后台
            dataType: "json",//返回json格式的数据
            url: "/event/winnerlist.do",//要访问的后台地址
            data: "event_id="+event_id+"&recommend="+recommend+"&pagesize="+pagesize+"&p="+p+"&sort="+sort+"&cup="+cup,//要发送的数据
            complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
            success: function(msg){//msg为返回的数据，在这里做数据绑定           
                 if(msg.success){
					 var data=msg.productList;
					 var content="";
					 $.each(data, function(i, res){
                       content=content+getTxt(res.obj_coverpath,res.obj_covername,res.obj_title,res.url,res.view_count,res.comment_count,res.favorite_count,res.creatorId,res.mem_name,res.image_count,res.mem_facepath,res.mem_facename);          
                     });
					obj.append(content);
                    initWinnerlistBack(data.length);
				 } 
			}
   })
}
function initWinnerlist_new(event_id,recommend,pagesize,p,sort,cup,obj,type){
        $.ajax({
            type: "get",//使用get方法访问后台
            dataType: "json",//返回json格式的数据
            url: "/event/winnerlist.do",//要访问的后台地址
            data: "event_id="+event_id+"&recommend="+recommend+"&pagesize="+pagesize+"&p="+p+"&sort="+sort+"&cup="+cup,//要发送的数据
            complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
            success: function(msg){//msg为返回的数据，在这里做数据绑定           
                 if(msg.success){
					 var data=msg.productList;
					 var content="";
					 $.each(data, function(i, res){
					    if(type==1){
		                               content=content+getTxt1(i,res.obj_coverpath,res.obj_covername,res.obj_title,res.url,res.view_count,res.comment_count,res.favorite_count,res.creatorId,res.mem_name,res.image_count,res.mem_facepath,res.mem_facename);          			    
					    }
                                            if(type==2){
		                               content=content+getTxt2(i,res.obj_coverpath,res.obj_covername,res.obj_title,res.url,res.view_count,res.comment_count,res.favorite_count,res.creatorId,res.mem_name,res.image_count,res.mem_facepath,res.mem_facename);          			    
					    }
                                        });
					obj.append(content);
                    initWinnerlistBack(data.length);
				 } 
			}
   })
}

function initProductScorelist(event_id,sort,cup,obj){
        $.ajax({
            type: "get",//使用get方法访问后台
            dataType: "json",//返回json格式的数据
            url: "/event/productScorelist.do",//要访问的后台地址
            data: "event_id="+event_id+"&sort="+sort+"&cup="+cup+"&t="+Math.random(),//要发送的数据
            complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
            success: function(msg){//msg为返回的数据，在这里做数据绑定           
                 if(msg.success){
                     var data=msg.winnerlist;
					 var data1=msg.eventProductScoreList; 
					 if(typeof(data.length)!="undefind"){
					     initProductScorelistBack(data.length);
					 }
					  var content="";
					  var score=-1;
					  var remark='';
					 $.each(data, function(i, res){ 
						 score=-1;
						 if(!isnull(userCookieUID)){
                           $.each(data1, function(j, res1){  
                                 if(res1.uid==userCookieUID&&res1.pId==res.id){
								     score=res1.score;
									 remark=res1.comments;
								 }
                           });
						 }
                       content=content+getTxt(res.obj_coverpath,res.obj_covername,res.obj_title,res.url,res.view_count,res.comment_count,res.favorite_count,res.creatorId,res.mem_name,res.image_count,res.mem_facepath,res.mem_facename,score,res.id,remark);          
                       remark='';
					   score=-1;
					 });
					obj.append(content);
				
				 } 
			}
      })
}
function initProductScorelist(event_id,sort,cup,obj,cate,subcate){
        $.ajax({
            type: "get",//使用get方法访问后台
            dataType: "json",//返回json格式的数据
            url: "/event/productScorelist.do",//要访问的后台地址
            data: "event_id="+event_id+"&sort="+sort+"&cate="+cate+"&subcate="+subcate+"&cup="+cup+"&t="+Math.random(),//要发送的数据
            complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
            success: function(msg){//msg为返回的数据，在这里做数据绑定           
                 if(msg.success){
                     var data=msg.winnerlist;
           var data1=msg.eventProductScoreList; 
           if(typeof(data.length)!="undefind"){
               initProductScorelistBack(data.length);
           }
            var content="";
            var score=-1;
            var remark='';
           $.each(data, function(i, res){ 
             score=-1;
             if(!isnull(userCookieUID)){
                           $.each(data1, function(j, res1){  
                                 if(res1.uid==userCookieUID&&res1.pId==res.id){
                     score=res1.score;
                   remark=res1.comments;
                 }
                           });
             }
                       content=content+getTxt(res.obj_coverpath,res.obj_covername,res.obj_title,res.url,res.view_count,res.comment_count,res.favorite_count,res.creatorId,res.mem_name,res.image_count,res.mem_facepath,res.mem_facename,score,res.id,remark);          
                       remark='';
             score=-1;
           });
          obj.append(content);
        
         } 
      }
      })
}
function initProductByGroup(event_id,sort,groupId,obj){
        $.ajax({
            type: "get",//使用get方法访问后台
            dataType: "json",//返回json格式的数据
            url: "/event/productgroup.do",//要访问的后台地址
            data: "event_id="+event_id+"&sort="+sort+"&groupId="+groupId+"&t="+Math.random(),//要发送的数据
            complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
            success: function(msg){//msg为返回的数据，在这里做数据绑定           
                 if(msg.success){
					 var data=msg.winnerlist;
					 var content="";
					 $.each(data, function(i, res){
                       content=content+getTxt(res.obj_coverpath,res.obj_covername,res.obj_title,res.url,res.view_count,res.comment_count,res.favorite_count,res.creatorId,res.mem_name,res.image_count,res.mem_facepath,res.mem_facename);          
                     });
					obj.append(content);
                    initWinnerlistBack(data.length);
				 } 
			}
      })
}

function initProductScore(event_id){
      
        $.ajax({
            type: "get",//使用get方法访问后台
            dataType: "json",//返回json格式的数据
            url: "/event/productScoreShow.do",//要访问的后台地址
            data: "event_id="+event_id+"&t="+Math.random(),//要发送的数据
            complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
            success: function(msg){//msg为返回的数据，在这里做数据绑定           
                 if(msg.success){
                     	dealProductScoreShow(msg);	 
		 }
            }
      })
}
function initProductScore(event_id,type,sort){
      
        $.ajax({
            type: "get",//使用get方法访问后台
            dataType: "json",//返回json格式的数据
            url: "/event/productScoreShow.do",//要访问的后台地址
            data: "event_id="+event_id+"&sort="+sort+"&type="+type+"&t="+Math.random(),//要发送的数据
            complete :function(){$("#load").hide();},//AJAX请求完成时隐藏loading提示
            success: function(msg){//msg为返回的数据，在这里做数据绑定           
                 if(msg.success){
                      dealProductScoreShow(msg);   
     }
            }
      })
}
function getFile(fileId){ßß
        $.ajax({
            type: "get",//使用get方法访问后台
            dataType: "json",//返回json格式的数据
            url: "/event/getFile.do",//要访问的后台地址
            data: "fileId="+fileId+"&t="+Math.random(),//要发送的数据
            success: function(msg){//msg为返回的数据，在这里做数据绑定           
                 if(msg.success){
                       getFileCallback(msg.fileUrl);
                  }else{
                       getFileCallbackError(msg.error);
                  }
            }
      })
}
function getFile(fileId,obj){
        $.ajax({
            type: "get",//使用get方法访问后台
            dataType: "json",//返回json格式的数据
            url: "/event/getFile.do",//要访问的后台地址
            data: "fileId="+fileId+"&t="+Math.random(),//要发送的数据
            success: function(msg){//msg为返回的数据，在这里做数据绑定           
                 if(msg.success){
                       getFileCallback(msg.fileUrl,obj);
                  }else{
                       getFileCallbackError(msg.error,obj);
                  }
            }
      })
}      
