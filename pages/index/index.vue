<template>
	<view class="content" v-if="isLoaded">
		<!-- 顶部栏 -->
		<topBar></topBar>
		<!-- 轮播图 -->
		<view class="index_swiper_box">
			<swiper :autoplay="true" :interval="3000" :duration="1000" :circular="true">
				<swiper-item v-for="(item,index) in swiperData" :key="index">
					<navigator 
					class="index_swiper_item" 
					:url="swiperInfo[index]">
						<image v-lazy="item.image_src" mode="widthFix"></image>
					</navigator>
				</swiper-item>
			</swiper>
		</view>	
		<!-- 导航栏 -->
		<view class="activity">
			<view class="activity_detail" v-for="(item,index) in activityData" :key="index" @tap="navigate(index)">
				<image v-lazy="item.image_src"></image>
			</view>
		</view>
		<!-- 楼层 -->
		<view class="floor" v-for="(item,index) in floorData" :key="index">
			<view class="floor_title">
				<image mode="widthFix" v-lazy="item.floor_title.image_src"></image>
			</view>
			<view class="floor_content">
				<view 
				class="floor_detail" 
				:class="i == 0? 'long':''" 
				v-for="(it,i) in item.product_list" 
				:key="i"
				 @tap="turnToGoodsList(it.navigator_url)">
				<image v-lazy="it.image_src"></image>
				</view>
			</view>
		</view>
		<!-- 推荐好货 -->
		<goodsShow :goodsArray="recommendData" :scrollTop="scrollTop" :isShow="isShow"></goodsShow>
	</view>
	
</template>

<script>
	import topBar from "../../components/topBar/topBar.vue"
	import goodsShow from "../../components/goodsShow/goodsShow.vue"
	import data from "../../utils/data.js"
	import request from "../../utils/request.js"
	import url from "../../utils/url.js"
	export default {
		data() {
			return {
				scrollTop:0,
				isLoaded: false,
				isShow:false,
				swiperData: [],
				activityData: [],
				floorData: [],
				recommendData: [],
				goods_rand:[],
				swiperInfo:[
					'../goods_list/goods_list?query=夏装',
					'../goods_list/goods_list?query=小米电视',
					'../goods_list/goods_list?query=好货',
				]
			}
		},
		beforeMount() {
			// 发送请求获取页面数据
			Promise.all([
				request.getData({url:url.swiperURL})
				.then((res)=>{
					this.swiperData = JSON.parse(JSON.stringify(res));
				}),
				request.getData({url:url.activityURL})
				.then((res)=>{
					this.activityData = JSON.parse(JSON.stringify(res));
				}),
				request.getData({url:url.floorURL})
				.then((res)=>{
					this.floorData = JSON.parse(JSON.stringify(res));
				})
			]).then((res)=>{
				this.loadGoodsShow();
				this.isLoaded = true
			}).catch((err)=>{throw new Error(err)});
		},
		mounted() {
			
		},
		onReady() {
			this.isShow = true;
		},
		onPageScroll({scrollTop}) {
		    this.scrollTop = scrollTop;
		},
		onReachBottom() {
			this.loadGoodsShow();
		},
		methods: {
			turnToGoodsList(url) {
				let query = url.slice(url.lastIndexOf("=")+1);
				uni.navigateTo({
					url:'../goods_list/goods_list?query='+query
				})
			},
			loadGoodsShow() {
				var that = this;
				var num = Math.floor(Math.random()*50000)+1;
				this.goods_rand = [];
				this.goods_rand.push(num);
				for(let i = 0; i < 9; i++) {
					num = Math.floor(Math.random()*50000)+1;
					while(this.goods_rand.every(function(item){return num == item})) {
						num = Math.floor(Math.random()*50000)+1;
					}
					this.goods_rand.push(num);
				}
				this.goods_array = this.goods_rand.forEach(function(item) {
					request.getData({url:url.goodsDetailURL+"?goods_id="+item})
					.then((res)=>{
						that.$data.recommendData.push(JSON.parse(JSON.stringify(res)));
					})
				})
			},
			navigate(index) {
				if( index == 0 ) {
					uni.switchTab({
						url: "../class/class"
					});
				} else {
					let target = ["秒杀拍", "超市购", "母婴品"];
					uni.navigateTo({
						url: "../goods_list/goods_list?query=" + target[index - 1]
					})
				}
			}
		},
		components: {
			topBar,
			goodsShow
		}
	}
</script>

<style>
	.index_swiper_box {
		height: 340upx;
		width: 100%;
	}
	swiper {
		height: 100%;
	}
	.index_swiper_item {
		height: 100%;
	}
	.activity {
		width: 710upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin: 10px 10px 5px 10px;
	}
	.activity_detail {
		width: 160upx;
		height: 185upx;
	}
	.floor {
		display: flex;
		flex-flow: column wrap;
		margin: 25px 10px 5px 10px;
	}
	.floor_title {
		display: flex;
	}
	.floor_content {
		display: flex;
		flex-flow: column wrap;
		justify-content: space-around;
		height: 915upx;
		width: 710upx;
	}
	.floor_detail {
		height: 295upx;
		width: 350upx;
	}
	.long {
		height: 600upx;
		width: 350upx;
	}
</style>
