module.exports = {
	ajaxTimes: 0,
	getData({url='',data={}} = {}) {
		this.ajaxTimes++;
		uni.showLoading({
			title:"加载中",
			mask: true
		})
		return new Promise((resolve, reject) => {
			uni.request({
				url: url,
				data: data,
				success: (res) => {
					resolve(res.data.message);
				},
				fail: (err) => {
					reject('err')
				},
				complete: ()=>{
					this.ajaxTimes--;
					if(this.ajaxTimes === 0) {
						uni.hideLoading();
					}
				}
			});
		})
	}
}