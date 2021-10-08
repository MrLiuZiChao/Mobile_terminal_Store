<template>
	<view class="content">
		<!-- 用户信息 -->
		<view class="user_info">
			<image class="user_bg" :src="user.bg_url"></image>
			<view class="user_content" @tap="login()">
				<image class="user_img" :src="user.img_url"></image>
				<view class="user_name">{{user.name}}</view>
			</view>
		</view>
		<!-- 功能选项 -->
		<view class="function_content">
			<view class="collect_content">
				<view 
				class="collect_item" 
				v-for="(item,index) in collect_text" 
				:key="index" 
				@tap="toCollect(index)">
					<text>{{ item.num }}</text><view>{{ item.text }}</view>
				</view>
			</view>
			<view class="order_content">
				<view class="order_title">我的订单</view>
				<view class="order_item" 
				v-for="(item,index) in order_item_content" 
				:key="index"
				@tap="toOrder(index)">
					<view :class="item.item_class"></view>
					<text>{{ item.item_text }}</text>
				</view>
			</view>
			<navigator class="info_part address_edit" url="../address/address">
				<view class="address_text">收货地址管理</view>
			</navigator>
			<view class="info_part ours_content">
				<view class="ours_item" 
				v-for="(item,index) in ours_text" 
				:key="index"
				@tap="aboutOurs(index)">
					<view>{{ item }}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Logined:false,
				empty_info: {
					name:'未登录',
					bg_url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3448797073,3535335541&fm=26&gp=0.jpg',
					img_url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fkpi.ftmsreport.com%2Fstatic%2Fimages%2Favatar.jpg&refer=http%3A%2F%2Fkpi.ftmsreport.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625367756&t=32740cbedfd3ed330cecf450ca60668a'
				},
				user:{},
				collect_text:[
					{text:'收藏的店铺', num: 0},
					{text:'收藏的商品', num: 0},
					{text:'关注的商品', num: 0},
					{text:'我的足迹', num: 0}
				],
				order_item_content: [
					{
						item_class: 'iconfont icon-dingdan1',
						item_text: '全部订单'
					},
					{
						item_class: 'iconfont icon-daifukuan',
						item_text: '待付款'
					},
					{
						item_class: 'iconfont icon-wuliu',
						item_text: '待收货'
					},
					{
						item_class: 'iconfont icon-tuikuan',
						item_text: '退款/退货'
					}
				],
				ours_text: ['联系客服','意见反馈','关于我们']
			}
		},
		methods: {
			aboutOurs(index) {
				if(index == 1) {
					uni.navigateTo({
						url: '../feedback/feedback'
					})
				}
			},
			initData() {
				this.Logined = false;
				this.Logined = uni.getStorageSync('login');
				if(this.Logined) {
					this.user = uni.getStorageSync('user_info');
					this.collect_text[1].num = uni.getStorageSync('collect').length;
				} else {
					this.user = this.empty_info;
					this.collect_text[1].num = 0;
				}
			},
			login() {
				if(this.Logined) {
					uni.showModal({
						title: '退出登录提示',
						content: '确定退出登录？',
						confirmColor: '#0AF',
						cancelText: '再想想',
						cancelColor: '#9aa',
						success: res=> {
							if(res.confirm) {
								uni.setStorageSync('login',false);
								this.initData();
							}
						}
					})
				} else {
					uni.navigateTo({
						url: '../login/login'
					})
				}
			},
			toCollect(index) {
				if(index == 1) {
					uni.navigateTo({
						url:'../collect/collect'
					})
				}
			},
			toOrder(index) {
				if(index == 0) {
					uni.navigateTo({
						url: '../order/order'
					})
				}
			}
		},
		onShow() {
			this.initData();
		}
	}
</script>

<style>
	.content {
		width: 100%;
		height: 100%;
	}
	.user_info {
		position: relative;
		width: 100%;
		height: 45%;
		background-color: #0AF;
		overflow: hidden;
	}
	.user_bg {
		width: 100%;
		height: 105%;
		filter: blur(3px);
	}
	.user_content {
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.user_img {
		width: 190rpx;
		height: 190rpx;
		border-radius: 50%;
		border: #FFF solid 5px;
	}
	.user_name {
		padding-top: 10px;
		color: #FFF;
		font-size: 15px;
		font-weight: 600;
	}
	.function_content {
		width: 100%;
		height: 650rpx;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: #DDD;
	}
	.collect_content {
		width: 94%;
		height: 100rpx;
		position: absolute;
		display: flex;
		align-items: center;
		top: -60rpx;
		left: 50%;
		transform: translateX(-50%);
		background-color: #FFF;
	}
	.info_part {
		margin-top: 20rpx;
		background-color: #FFF;
	}
	.collect_item {
		width: 25%;
		height: 90%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.collect_item text {
		height: 44rpx;
		color: red;
	}
	.order_content {
		width: 94%;
		height: 200rpx;
		display: flex;
		flex-flow: row wrap;
		background-color: #FFF;
		margin-top: 60rpx;
	}
	.order_title {
		width: 90%;
		height: 40%;
		display: flex;
		align-items: center;
		border-bottom: #DEDEDE solid 1px;
		padding: 0 5%;
	}
	.order_item {
		width: 25%;
		height: 60%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.iconfont {
		height: 30px;
		font-size: 25px;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.address_edit {
		width: 94%;
		height: 80rpx;
		display: flex;
		align-items: center;
	}
	.address_text {
		width: 90%;
		padding: 0 5%;
	}
	.ours_content {
		width: 94%;
		height: 220rpx;
		display: flex;
		flex-direction: column;
	}
	.ours_item {
		width: 100%;
		height: 33%;
		display: flex;
		align-items: center;
		border-bottom: #DEDEDE solid 1px;
		padding: 0 5%;
	}
</style>
