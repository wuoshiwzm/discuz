(function() {
	WebUtil = {};

	WebUtil.getProductCoverSmallImagePath = function(path, name) {
		if (path.indexOf("community") > -1) {
			return 'http://' + this.getImageDomainDomain(path) + '/' + path + '/' + name
					+ '@100w_75h_1c_1e';
		} else {
			return 'http://' + this.getImageDomainDomain(path) + path
					+ 'c_s_' + name
		}
	}
	WebUtil.getArticleCoverSmallImagePath = function(path, name) {
		if (path.indexOf("community") > -1) {
			return 'http://' + this.getImageDomainDomain(path) + '/' + path + '/' + name
					+ '@100w_75h_1c_1e';
		} else {
			return 'http://' + this.getImageDomainDomain(path) + path
					+ 's_' + name
		}
	}

	WebUtil.getImageDomainDomain = function(name) {
		if (name.indexOf("community") > -1) {
			return "img.zcool.cn";
		} else if (name.indexOf("zcimg") > -1) {
			return "zcimg" + '.' + maindomain;
		} else {
			return "image" + '.' + maindomain;
		}
	}
	
})();