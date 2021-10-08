<template>
	<view class="cart_content" v-if="isLoad">
		<!-- 删除编辑按钮 -->
		<view class="clear iconfont icon-gengduo2" v-if="hasCart" @tap="changeWay()"></view>
		<!-- 购物车不为空时时 -->
		<view v-if="hasCart" class="cart_goods">
			<view v-for="(item,index) in cart" :key="index" class="cart_goods_item">
				<view class="cart_checkbox">
					<checkbox-group name="goods_selected">
						<label>
							<checkbox :checked="item.isChecked" @tap="changeStatus(index)"/><text></text>
						</label>
					</checkbox-group>
				</view>
				<navigator 
				class="cart_goods_info"
				:url="'../goods_detail/goods_detail?goods_id='+item.goods_info.goods_id">
					<view class="cart_goods_image">
						<image :src="item.goods_info.pics" mode="widthFix"></image>
					</view>
					<view class="cart_info_right">
						<view class="cart_goods_name">{{ item.goods_info.goods_name }}</view>
						<view class="cart_goods_price">￥{{ item.goods_info.goods_price }}</view>
					</view>
				</navigator>
				<view class="cart_goods_num">
					<view class="btn_del" :class="item.num <= 1 ? 'c_gray' : ''" @tap="del(index)">
						<view class="iconfont icon-jian"></view>
					</view>
					<view class="num"><view>{{ item.num }}</view></view>
					<view class="btn_add" @tap="add(index)">
						<view class="iconfont icon-jia"></view>
					</view>
				</view>
			</view>
		</view>
		<!-- 购物车为空时 -->
		<view v-if="!hasCart" class="cart_empty">
			<view class="empty_info">
				<view class="empty_img">
					<image src="https://data-lzc.oss-cn-shenzhen.aliyuncs.com/image/cart_empty.png" mode="widthFix"></image>
				</view>
				<view class="empty_text">
					购物车里商品数量为
					<text>0</text>
					哦！
				</view>
				<view class="empty_text">
					快去购物吧！
				</view>
				<navigator class="empty_btn" url="../index/index" open-type="switchTab">
					首页
				</navigator>
			</view>
		</view>
		<!-- 猜你喜欢 -->
		<goodsShow :goodsArray="recommendData" :scrollTop="scrollTop" :isShow="true"></goodsShow>
		<!-- 结算栏 -->
		<view class="account_bar">
			<view class="all_checkbox">
				<checkbox-group name="goods_selected">
					<label>
						<checkbox :checked="allChecked" @tap="allSelected()"/><view>全选</view>
					</label>
				</checkbox-group>
			</view>
			<view v-if="!isClear" class="cart_select_info">
				<view class="account_price">
					合计：
					<span>￥</span>
					<text>{{ total }}</text>
				</view>
				<view class="account_btn" @tap="account()">
					<view>结算({{ num }})</view>
				</view>
			</view>
			<view v-else class="account_btn clear_btn" @tap="clearCart()">
				<view>清除({{ num }})</view>
			</view>
		</view>
	</view>
</template>

<script>
	import goodsShow from "../../components/goodsShow/goodsShow.vue"
	import data from "../../utils/data.js"
	import request from "../../utils/request.js"
	import url from "../../utils/url.js"
	export default {
		data() {
			return {
				cart:[],
				isLoad: false,
				hasCart: false,
				isClear: false,
				total: 0.0,
				num: 0,
				allChecked: false,
				scrollTop:0,
				recommendData: [],
				goods_rand:[]
			}
		},
		onLoad() {
			this.loadGoodsShow();
		},
		onShow() {
			this.cart = uni.getStorageSync('cart') || [];
			if(this.cart.length) {
				this.hasCart = true;
				this.cart.forEach(item => item.isChecked = false);
			} else {
				this.hasCart = false;
			}
			this.init_cart();
			this.isLoad = true;
		},
		onHide() {
			this.isClear = false;
			if(this.cart.length) {
				uni.setStorageSync('cart',this.cart);
			}
		},
		onPageScroll({scrollTop}) {
		    this.scrollTop = scrollTop;
		},
		onReachBottom() {
			this.loadGoodsShow();
		},
		methods: {
			account() {
				let select_goods = this.cart.filter(item => item.isChecked);
				if(select_goods.length) {
					uni.setStorageSync('cart',this.cart);
					uni.setStorageSync('pay_goods',select_goods);
					uni.navigateTo({
						url:"../pay/pay"
					})
				}
			},
			allSelected() {
				this.allChecked = !this.allChecked;
				if(this.allChecked) {
					this.cart.forEach(item => {
						item.isChecked = true;
						this.total += item.num * item.goods_info.goods_price;
						this.num++;
					})
				} else {
					this.cart.forEach(item => {
						item.isChecked = false;
						this.total -= item.num * item.goods_info.goods_price;
						this.num--;
					})
				}
			},
			add(index) {
				if(this.cart[index].isChecked) {
					this.total += this.cart[index].goods_info.goods_price;
				}
				this.cart[index].num++;
			},
			changeStatus(index) {
				this.cart[index].isChecked = !this.cart[index].isChecked;
				let pay = this.cart[index].num * this.cart[index].goods_info.goods_price;
				if(this.cart[index].isChecked) {
					this.total += pay;
					this.num++;
				} else {
					this.total -= pay;
					this.num--;
				}
				if( this.cart.length && this.cart.every(item => item.isChecked) ) {
					this.allChecked = true;
				} else {
					this.allChecked = false;
				}
			},
			changeWay(){
				this.isClear = !this.isClear;
				this.cart.forEach(item => item.isChecked = false);
				this.init_cart();
			},
			clearCart() {
				let arr = [];
				this.cart.forEach(item=>{
					if(!item.isChecked) {
						arr.push(item)
					}
				});
				let isEmpty = this.cart.every(item =>!item.isChecked);
				if(!isEmpty) {
					uni.showModal({
						title: '清除商品提示',
						content:'确定将这'+this.num+'个宝贝清除？',
						confirmColor: '#0AF',
						cancelText: '再想想',
						cancelColor: '#9aa',
						success: res => {
							if(res.confirm) {
								this.cart = arr;
								this.init_cart();
								uni.setStorageSync('cart',this.cart);
								this.isClear = false;
							}
							if(!this.cart.length) {
								this.hasCart = false;
							}
						}
					})
				}
			},
			del(index) {
				if(this.cart[index].num > 1 ) {
					this.cart[index].num--;
					if(this.cart[index].isChecked) {
						this.total -= this.cart[index].goods_info.goods_price;
					}
				} else {
					uni.showToast({
						icon:'none',
						title:'商品数量不能再减少啦！'
					})
				}
			},
			init_cart() {
				this.num = 0;
				this.total = 0;
				this.allChecked = false;
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
			}
		},
		components: {
			goodsShow
		}
	}
</script>

<style>
	.cart_content {
		margin-bottom: 100px;
	}
	.icon-gengduo2 {
		position: fixed;
		top: 50px;
		right: 5px;
		text-align: center;
		width: 24px;
		border-radius: 2px;
		background-color: #FFF;
		opacity: 0.6;
	}
	.cart_goods {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
	.cart_goods_item {
		display: flex;
		flex-flow: column wrap;
		height: 300rpx;
		width: 710rpx;
		padding: 5px;
		background-color: #FFFFFF;
		margin-top: 5px;
		border-radius: 15px;
		border: #DDD solid 1px;
	}
	.cart_checkbox {
		height: 300rpx;
		width: 70rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	checkbox-group {
		height: 100%;
	}
	checkbox-group label {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 100%;
	}
	checkbox-group label view {
		height: 24px;
		font-weight: 600;
	}
	.uni-checkbox-input {
		border-radius: 50%;
	}
	.cart_goods_info {
		height: 100%;
		width: 640rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.cart_goods_image {
		width: 270rpx;
	}
	.cart_goods_image image {
		border-radius: 20px;
	}
	.cart_info_right {
		height: 90%;
		width: 370rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
	.cart_goods_name {
		width: 340rpx;
		height: 100rpx;
		display: -webkit-box;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-weight: 600;
	}
	.cart_goods_price {
		width: 340rpx;
		height: 60rpx;
		font-size: large;
		font-weight: 700;
		color: red;
	}
	.cart_goods_num {
		position: relative;
		right: 210rpx;
		top: 220rpx;
		display: flex;
		flex-direction: row;
		height: 60rpx;
	}
	.btn_del {
		height: 100%;
		width: 60rpx;
		border: #7d7d7d solid 1px;
		border-radius: 5px 0 0 5px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.num {
		height: 100%;
		width: 80rpx;
		border-width: 1px 0;
		border-color: #7d7d7d;
		border-style: solid;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.btn_add {
		height: 100%;
		width: 60rpx;
		border: #7d7d7d solid 1px;
		border-radius: 0 5px 5px 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.c_gray {
		color: #808080;
	}
	.cart_empty {
		width: 100%;
		height: 700rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.empty_info {
		width: 400rpx;
		display: flex;
		flex-flow: column wrap;
		align-items: center;
	}
	.empty_info text {
		color: red;
		font-size: 20px;
		padding: 0 5px;
	}
	.empty_img {
		width: 400rpx;
	}
	.empty_text {
		color: #0AF;
		font-size: 16px;
		font-weight: 600;
	}
	.empty_btn {
		width: 100px;
		height: 40px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 14px;
		font-weight: 600;
		background-color: #0AF;
		color: #FFF;
		border-radius: 10px;
		margin-top: 5px;
	}
	/* #ifdef APP-PLUS */
	.account_bar {
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		flex-direction: row;
		height: 90rpx;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		background-color: #FFFFFF;
	}
	/* #endif */
	/* #ifdef H5 */
	.account_bar {
		position: fixed;
		left: 0;
		bottom: 100rpx;
		display: flex;
		flex-direction: row;
		height: 90rpx;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		background-color: #FFFFFF;
	}
	/* #endif */
	.all_checkbox {
	    display: flex;
	    flex-direction: row;
	    align-items: center;
		padding-left: 15px;
	}
	.cart_select_info {
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-right: 10px;
	}
	.account_price {
		margin-right: 15px;
	}
	.account_price span {
		color: red;
	}
	.account_price text {
		color: red;
		font-size: 20px;
		font-weight: 600;
	}
	.account_btn {
		height: 80rpx;
		width: 210rpx;
		border-radius: 40rpx;
		color: #FFF;
		background-color: #FFB400;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.account_btn view {
		font-size: 20px;
	}
	.clear_btn {
		background-color: #4D6;
		margin-right: 10px;
	}
</style>
