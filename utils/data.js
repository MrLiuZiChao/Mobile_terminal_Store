import request from './request.js';
import url from './url.js'

module.exports = {
	rand() {
		var goods_rand = [];
		var num = Math.floor(Math.random()*50000)+1;
		goods_rand.push(num);
		for(let i = 0; i < 9; i++) {
			num = Math.floor(Math.random()*50000)+1;
			while(goods_rand.every(function(item){return num == item})) {
				num = Math.floor(Math.random()*50000)+1;
			}
			goods_rand.push(num);
		}
		return goods_rand;
	},
	loadGoodsList() {
		var arr = this.rand();
		var data = [];
		arr.forEach( item => {
			request.getData({ url: url.goodsDetailURL , data: {goods_id:item} })
			.then((res) => {
				data.push(res);
			})
		})
		return data;
	},
	async getClassData() {
		var classData = {};
		var isLoaded = false;
		await request.getData({ url: url.classURL })
		.then((res) => {
			classData = JSON.parse(JSON.stringify(res));
			isLoaded = true;
		}).catch((err) => {
			throw new Error(err);
		});
		return {
			classData,
			isLoaded
		}
	},
	async getSearchData(msg) {
		return request.getData({ url: url.goodsSearchURL , data:msg });
	}
};