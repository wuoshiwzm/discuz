var PrefixEnum={
	"M_":"m_",
	"C_M_":"c_m_",
	"S_":"s_",
	"B_":"b_",
	"C_S_":"c_s_",
	"C_B_":"c_b_"
}

function getImageDomain(path){
	if(path.indexOf("zcimg") >= 0){
		return "http://zcimg.zcool.com.cn";
	}else if(path.indexOf("community") >= 0){
		return "http://img.zcool.cn";
	}else {
		return "http://image.zcool.com.cn";
	}

}
//小头像
	function getFaceSmallImgName(imgPath, imgName){
		if(imgPath.indexOf("community") >= 0){
			return "/" + imgPath + "/" + imgName + "@48w_48h";
		} else {
			return imgPath + PrefixEnum.S_ + imgName;
		}
	}
	//中头像
	function getFaceMiddleImgName(imgPath, imgName){
		if(imgPath.indexOf("community") >= 0){
			return "/" + imgPath + "/" + imgName + "@64w_64h";
		} else {
			return imgPath + PrefixEnum.M_ + imgName;
		}
	}
	//大头像
	function getFaceBigImgName(imgPath,imgName){
		if(imgPath.indexOf("community") >= 0){
			return "/" + imgPath + "/" + imgName + "@145w_145h";
		}else {
			return imgPath + PrefixEnum.B_ + imgName;
		}
	}
	//小头像全路径
	function getSmallFaceImage(path,  name){
		return getImageDomain(path) + getFaceSmallImgName(path, name);
	}
	//中头像全路径
	function getMiddleFaceImage(path, name){
		return getImageDomain(path) + getFaceMiddleImgName(path, name);
	}
	//大头像全路径
	function getBigFaceImage(path,  name){
		return getImageDomain(path) + getFaceBigImgName(path, name);
	}
	
	//头像
	function getFaceImage( path,  name) {
		return getImageDomain(path) + getFaceBigImgName(path, name);
	}
	function getFaceImage( image) {
		return getImageDomain(image) + image;
	}

	//封面中图全路径
	function getMiddleCoverImage(path,name){
		if(path.indexOf("community") >= 0){
			return getImageDomain(path) + "/" + path + "/" + name + "@250w_188h_1c_1e";
		} else {
			return getImageDomain(path) +path + PrefixEnum.M_ + name;
		}
		
	}

	//封面中图全路径
	function getMiddleCoverImage_C_M(path,name){
		if(path.indexOf("community") >= 0){
			return getImageDomain(path) + "/" + path + "/" + name + "@250w_188h_1c_1e";
		} else {
			return getImageDomain(path) +path + PrefixEnum.C_M_ + name;
		}
		
	}

	//后台焦点图地址
	function getFocusImgPath(name){
		if(name.indexOf("community") >= 0){
			return "http://img.zcool.cn/" + name;
		} else {
			return "http://zcimg.zcool.com.cn/zcimg/" + name;
		}
		
	}
	
	function getMiddleCoverImage_C_M_320_241(path,name){
		if(path.indexOf("community") >= 0){
			return getImageDomain(path) + "/" + path + "/" + name + "@320w_241h_1c_1e";
		} else {
			return getImageDomain(path) +path + PrefixEnum.C_M_ + name;
		}
		
	}
	
	