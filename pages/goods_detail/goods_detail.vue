<template>
	<view class= "content" v-if="isLoaded">
		<!-- 轮播图 -->
		<view class="detial_swiper_box">
			<swiper 
			:autoplay="true" 
			:interval="3000" 
			:duration="1000" 
			:circular="true"
			:indicator-dots="true">
				<swiper-item v-for="(item,index) in goods_info.pics"
				 :key="index" 
				 @tap="handlepreviewImage(index)">
					<view class="detail_swiper_item">
						<view class="detail_swiper_image">
							<image :src="item.pics_sma" mode="widthFix"></image>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<!-- 商品信息 -->
		<view class="goods_info">
			<view class="goods_price">￥{{goods_info.goods_price}}</view>
			<view class="goods_part">
				<view class="goods_name">{{goods_info.goods_name}}</view>
				<view class="goods_share">
					<view class="iconfont icon-fenxiang"></view>
					<view>分享</view>
					<button open-type="share"></button>
				</view>
			</view>
		</view>
		<!-- 图文详情 -->
		<view>
			<view class="goods_info_title">图文详情</view>
			<view class="goods_info_content">
				<rich-text :nodes="goods_info.goods_introduce"></rich-text>
			</view>
		</view>
		<!-- 底部栏 -->
		<view class="tool_bar">
			<view class="tool_item">
				<view class="iconfont icon-kefu"></view>
				<view>客服</view>
				<button open-type="contact"></button>
			</view>
			<view class="tool_item" @tap="collect()">
				<view class=" iconfont icon-shoucang1"></view>
				<view>收藏</view>
			</view>
			<navigator class="tool_item" url="../cart/cart" open-type="switchTab">
				<view class=" iconfont icon-gouwuche"></view>
				<view>购物车</view>
			</navigator>
			<view class="btn cart" @tap="selectContent('cart')">加入购物车</view>
			<view class="btn buy" @tap="selectContent('buy')">立即购买</view>
		</view>
		<!-- 购买信息选择框 -->
		<view :class="isShow? 'goods_selected' : 'd-none'">
			<view class="background" @tap="isShow=false"></view>
			<view class="select_content animated fadeInUpBig">
				<view class="select_part">
					<view class="select_info">
						<view class="exit iconfont icon-guanbi" @tap="isShow=false"></view>
						<view class="select_image">
							<image :src="goods_info.pics[0].pics_sma" mode="widthFix"></image>
						</view>
						<view class="select_text">
							<view class="select_price">￥{{goods_info.goods_price}}</view>
							<view class="select_name">{{goods_info.goods_name}}</view>
						</view>
					</view>
					<view class="select_item">
						<view class="select_item_text">购买数量：</view>
						<view class="select_item_control">
							<view class="btn_control del" 
							@tap="selectNum > 1 ? selectNum-- : selectNum = 1">
								<view class="iconfont icon-jian"></view>
							</view>
							<view class="num">{{selectNum}}</view>
							<view class="btn_control add" @tap="selectNum++">
								<view class="iconfont icon-jia"></view>
							</view>
						</view>
					</view>	
				</view>
				<view class="select_ensure" @tap="selectInfo()"><view>确定</view></view>
			</view>
		</view>
	</view>
</template>

<script>
	import data from "../../utils/data.js"
	import request from "../../utils/request.js"
	import url from "../../utils/url.js"
	export default {
		data() {
			return {
				isLoaded: false,
				isShow: false,
				selectNum: 1,
				goods_info: {},
				myOption:'',
				pics_rep:[
					{
						pics_sma:'https://s1.ax1x.com/2020/08/16/dVCN4O.th.jpg',
						pics_mid:'https://s1.ax1x.com/2020/08/16/dVCN4O.th.jpg'
					},
					{
						pics_sma:'https://s1.ax1x.com/2020/08/16/dVCN4O.th.jpg',
						pics_mid:'https://s1.ax1x.com/2020/08/16/dVCN4O.th.jpg'
					},
					{
						pics_sma:'https://s1.ax1x.com/2020/08/16/dVCN4O.th.jpg',
						pics_mid:'https://s1.ax1x.com/2020/08/16/dVCN4O.th.jpg'
					},
					{
						pics_sma:'https://s1.ax1x.com/2020/08/16/dVCN4O.th.jpg',
						pics_mid:'https://s1.ax1x.com/2020/08/16/dVCN4O.th.jpg'
					},
					{
						pics_sma:'https://s1.ax1x.com/2020/08/16/dVCN4O.th.jpg',
						pics_mid:'https://s1.ax1x.com/2020/08/16/dVCN4O.th.jpg'
					}
				],
				props: { 
					goods_id:1
				}
			}
		},
		onLoad(Option) {
			if(Option.goods_id) {
				this.props.goods_id = Option.goods_id;
			}
			request.getData({url:url.goodsDetailURL,data:this.props})
			.then((res)=>{
				var that = this;
				this.goods_info = {
					goods_name: res.goods_name,
					goods_price: res.goods_price,
					pics:res.pics.length !== 0 ? res.pics : that.pics_rep,
					goods_introduce: res.goods_introduce.replace(/\.webp/g,'.jpg')
				};
				this.isLoaded = true;
			}).catch((err)=>{ throw new Error(err)})
		},
		methods: {
			collect() {
				if(uni.getStorageSync('login')) {
					let collect = uni.getStorageSync('collect') || [];
					let index = collect.findIndex(item => item.goods_name == this.goods_info.goods_name);
					if( index == -1 ) {
						collect.push({
							goods_id: this.props.goods_id,
							goods_name: this.goods_info.goods_name,
							goods_price: this.goods_info.goods_price,
							pics: this.goods_info.pics[0].pics_sma
						})
						uni.showModal({
							title: '收藏成功提示',
							content:'已经将这个商品加入收藏列表，是否前往收藏列表查看？',
							confirmColor: '#0AF',
							cancelText: '再想想',
							cancelColor: '#9aa',
							success: res => {
								uni.navigateTo({
									url: '../collect/collect'
								})
							}
						})
						uni.showToast({
							title: "收藏成功",
							icon: "success"
						})
					} else {
						uni.showToast({
							title: "本商品已加入收藏列表,请勿重复收藏！",
							icon: "none"
						})
					}
					uni.setStorageSync('collect',collect)
				} else {
					uni.showToast({
						title: '你还没登录哦！先去登录吧！',
						icon: 'none'
					})
				}
			},
			handlepreviewImage(index) {
				const urls = this.goods_info.pics.map(item=>item.pics_mid);
				uni.previewImage({
					urls: urls,
					current: urls[index]
				})
			},
			selectContent(option) {
				this.myOption = option;
				this.isShow = true;
			},
			selectInfo() {
				if(uni.getStorageSync('login')) {
					let goods = {
									goods_info: {
										goods_id: this.props.goods_id,
										goods_name: this.goods_info.goods_name,
										goods_price: this.goods_info.goods_price,
										pics: this.goods_info.pics[0].pics_sma,
										isChecked: false
									},
									num:this.selectNum 
								};
					if(this.myOption === 'cart') {
						let cart = uni.getStorageSync('cart') || [];
						let index = cart.findIndex(item => item.goods_info.goods_name == this.goods_info.goods_name)
						if(cart.length == 0 || index == -1) {
							cart.push(goods);
						} else {
							cart[index].num += this.selectNum;
						}
						uni.setStorageSync('cart',cart);
						uni.showToast({
							title:'加入购物车成功',
							icon:'success'
						})
					} else {
						
						uni.setStorageSync('pay_goods',[goods]);
						uni.navigateTo({
							url: '../pay/pay'
						})
					}
					this.selectNum = 1;
					this.isShow = false;
				} else {
					uni.showToast({
						title: '你还没登录哦！先去登录吧！',
						icon: 'none'
					})
				}
			}
		}
	}
</script>

<style>
	swiper {
		height: 100%;
	}
	button {
		position: absolute;
		top: 0;
		height: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
	.detial_swiper_box {
		height: 350rpx;
		width: 100%;
	}
	.detail_swiper_item {
		display: flex;
		height: 300rpx;
		width: 100%;
		flex-direction: column;
		align-items: center;
	}
	.detail_swiper_image {
		height: 100%;
		width: 300rpx;
	}
	.goods_price {
		color: red;
		font-size: xx-large;
		font-weight: 700;
		line-height: 1;
	}
	.goods_part {
		display: flex;
		width: 730rpx;
		flex-direction: row;
		margin: 5px;
		border: #dedede solid 1px;
	}
	.goods_name {
		width: 80%;
		font-size: larger;
		font-weight: 600;
		padding: 5px 10px 5px 5px;
		margin: 5px 0;
		border-right: solid 1px;
		display: -webkit-box;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	.goods_share {
		position: relative;
		display: flex;
		width: 20%;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.iconfont {
		font-size: 40rpx;
		height: 60rpx;
	}
	.goods_info_title {
		color: #0AF;
		font-size: 32rpx;
		font-weight: 600;
		padding: 20rpx;
		border: #dedede solid 1px;
	}
	.goods_info_content {
		margin-bottom: 90rpx;
	}
	.tool_bar {
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 90rpx;
		display: flex;
		background-color: white;
		border-top: #CCCCCC solid 1px;
	}
	.tool_item {
		position: relative;
		width: 16%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
	}
	.tool_item .iconfont {
		font-size: 35rpx;
		height: 45rpx;
	}
	.btn{
		width: 26%;
		font-size: 30rpx;
		text-align: center;
		line-height: 3;
		color: #FFF;
	}
	.cart {
		background-color: #FFB400;
	}
	.buy {
		background-color: #DC3545;
	}
	.d-none {
		display: none;
	}
	.goods_selected {
		position: fixed;
		left: 0;
		bottom: 0;
		height: 100%;
		width: 100%;
	}
	.select_content {
		height: 70%;
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		background-color: #FFF;
		border-radius: 20rpx;
	}
	.background {
		height: 100%;
		width: 100%;
		background-color: rgba(0,0,0,0.4);
	}
	.exit {
		position: fixed;
		font-size: 35rpx;
		right: 10px;
		top: 5px;
	}
	.select_part {
		margin: 15px;
		width: calc(100%-15px*2);
		display: flex;
		flex-direction: column;
	}
	.select_info {
		height: 200rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		border-bottom:#dedede solid 1px;
	}
	.select_image {
		width: 200rpx;
	}
	.select_text {
		padding-left: 5px;
		display: flex;
		flex-direction: column;
		width: 480rpx;
	}
	.select_price {
		height: 100rpx;
		font-size: xx-large;
		font-weight: 600;
		color: red;
	}
	.select_name {
		height: 100rpx;
		font-size: small;
		font-weight: 600;
		display: -webkit-box;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	.select_item {
		height: 70rpx;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		margin-top: 10px;
	}
	.select_item_text {
		font-weight: 600;
		font-size: 35rpx;
	}
	.select_item_control {
		height: 100%;
		width: 220rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding-top: 5px;
	}
	.btn_control {
		height: 50rpx;
		width: 70rpx;
		color: #6D6D72;
		border-width: 0 1px;
		border-style: solid;
		border-color: #FFFFFF;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.icon-jia,.icon-jian {
		height: 70rpx;
	}
	.add {
		background-color: #D9D9D9;
	}
	.del {
		background-color: #EEEEEE;
	}
	.num {
		height: 50rpx;
		width: 70rpx;
		background-color: #DEE2E6;
		text-align: center;
	}
	.select_ensure {
		margin: 0 15px;
		position: fixed;
		left: 0;
		bottom: 10px;
		height: 80rpx;
		width: 690rpx;
		background-color: #FF6622;
		color: #FFF;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 20px;
	}
</style>
