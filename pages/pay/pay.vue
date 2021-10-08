<template>
	<view>
		<!-- 收货地址 -->
		<view class="address">
			<navigator v-if="!hasAddress" class="chose_address" url="../address/address">
				<view class="iconfont icon-dingwei"></view>
				<view class="add_text">选择收货人信息</view>
			</navigator>
			<view v-else class="address_info">
				<addressInfoCard 
				:consignee_info="address" 
				:isPay="true" 
				@changeChosed="navigateTo()">
				</addressInfoCard>
			</view>
		</view>
		<!-- 支付清单 -->
		<view class="pay">
			<view class="pay_list">
				<view class="pay_item" v-for="(item,index) in pay" :key="index">
					<view class="pay_image">
						<image :src="item.goods_info.pics" mode="widthFix"></image>
					</view>
					<view class="pay_text">
						<view class="pay_name">{{ item.goods_info.goods_name }}</view>
						<view class="pay_pan">
							<view class="pay_price">￥{{ item.goods_info.goods_price }}</view>
							<view class="pay_num">x{{ item.num }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 提交栏 -->
		<view class="submit_bar">
			<view class="submit_text">
				共{{ pay.length }}件，合计
				<text>{{ total }}</text>
				元（含邮费）
			</view>
			<view class="submit_btn" @tap="submit()">
				支付
			</view>
		</view>
	</view>
</template>

<script>
	import addressInfoCard from "../../components/addressInfoCard/addressInfoCard.vue"
	export default {
		data() {
			return {
				address: [],
				hasAddress:false,
				total:0,
				pay:[]
			}
		},
		onShow() {
			this.initPay();
		},
		methods: {
			initPay() {
				this.total = 0;
				this.pay = uni.getStorageSync('pay_goods');
				this.address = uni.getStorageSync('address');
				if(this.address[0]) {
					this.hasAddress = true;
				}
				this.pay.forEach(item => this.total += item.goods_info.goods_price * item.num);
			},
			navigateTo() {
				uni.navigateTo({
					url:'../address/address'
				})
			},
			submit() {
				if(!this.hasAddress) {
					uni.showToast({
						title:'收货人信息不能为空哦！',
						icon:'none'
					})
				} else {
					let cart = [];
					cart = Array.from(uni.getStorageSync('cart')).filter( item => !item.isChecked );
					uni.setStorageSync('cart',cart);
					let order = uni.getStorageSync('order') || [];
					let date = new Date();
					let num = String(order.length + 100000001).slice(1);
					let year = date.getFullYear();
					let month = date.getMonth() + 1;
					let day = date.getDate();
					let h = date.getHours(), m = date.getMinutes(), s = date.getSeconds();
					let noon = h > 12 ? "下午" : "上午";
					let hour = h > 12 ? h - 12 > 10 ? h - 12 : "0" + (h - 12) : h > 10 ? h : "0" + h;
					let minute = m > 10 ? m : "0" + m;
					let second = s ? s : "0" + s;
					let id = 'LZC' + year + String(month + 100).slice(1) + String(day + 100).slice(1) + num;	
					order.unshift({
						total: this.total,
						date: year + '/' + month + '/' + day + " " + noon + " " + hour + ":" + minute + ":" + second,
						id
					});
					uni.setStorageSync('order',order);
					uni.setStorageSync('pay_goods',[]);
					uni.showToast({
						title:'支付成功！可以在订单中查看货物信息哦！',
						icon:'none'
					})
					uni.redirectTo({
						url: '../order/order'
					})
				}
			}
		},
		components: {
			addressInfoCard
		}
	}
</script>

<style>
	.address {
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: center;
		justify-content: center;
		padding-top: 10px;
	}
	.chose_address {
		display: flex;
		flex-direction: row;
		width: 96%;
		height: 160rpx;
		align-items: center;
		justify-content: center;
		border: #0AF solid 1px;
	}
	.icon-dingwei {
	    width: 40px;
	    height: 40px;
	    text-align: center;
	    line-height: 1.5;
	    font-size: 25px;
	    background-color: #CCC;
	    border-radius: 20px;	
	}
	.add_text {
		font-size: 18px;
		padding-left: 15px;
	}
	.address_info {
		display: flex;
		flex-direction: row;
		
	}
	.address_info {
		width: 100%;
	}
	.pay {
		margin-top: 10px;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.pay_list {
		width: 96%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		padding: 5px 0;
		border: #DDD solid 1px;
		border-radius: 10px;
	}
	.pay_item {
		width: 96%;
		display: flex;
		flex-direction: row;
		padding: 5px;
	}
	.pay_image {
		width: 400rpx;
		display: flex;
	    flex-direction: column;
	    justify-content: center;
	}
	.pay_text {
		padding-left: 3px;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.pay_name {
		display: -webkit-box;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-weight: 600;
	}
	.pay_pan {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.pay_price {
		font-size: 15px;
	    padding-top: 5px;
		color: #6D6D6D;
	}
	.pay_num {
		font-size: 20px;
		padding-right: 3px;
	}
	.submit_bar {
		height: 100rpx;
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: center;
		border-top: #DDD solid 1px;
	}
	.submit_text {
		font-size: 15px;
	}
	.submit_text text {
		font-size: 20px;
		color: red;
	}
	.submit_btn {
		height: 80rpx;
		width: 200rpx;
		background-color: #00AAFF;
		margin: 5px;
		border-radius: 20px;
		color: #FFF;
		font-size: 16px;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
	}
</style>
