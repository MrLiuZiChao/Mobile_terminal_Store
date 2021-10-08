<template>
	<view class="content">
		<!-- 订单列表不为空 -->
		<view v-if="hasOrder" class="order_list">
			<view class="list_item" v-for="(item,index) in list" :key="index">
				<view class="item_img">
					<image src="https://data-lzc.oss-cn-shenzhen.aliyuncs.com/image/order.png" mode="widthFix"></image>
				</view>
				<view class="item_info">
					<view class="item_row">
						<view class="item_text">订单编号</view>
						<view class="order_id">{{ item.id }}</view>
					</view>
					<view class="item_row">
						<view class="item_text">订单价格</view>
						<view class="order_price">￥{{ item.total }}</view>
					</view>
					<view class="item_row">
						<view class="item_text">订单日期</view>
						<view class="order_time">{{ item.date }}</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 订单列表为空 -->
		<view v-else class="order_empty">
			<view class="empty_img">
				<image src="https://data-lzc.oss-cn-shenzhen.aliyuncs.com/image/collect_empty.png" mode="widthFix">
				</image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				hasOrder: false,
				total: 0,
			}
		},
		onShow() {
			this.initOrder();
		},
		methods: {
			initOrder() {
				this.hasOrder = false;
				this.total = 0;
				this.list = uni.getStorageSync('order') || [];
				if(this.list.length) {
					this.hasOrder = true;
				}
			}
		}
	}
</script>

<style>
	.order_list {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 20rpx;
	}
	.list_item {
		height: 210rpx;
		width: calc(100% - 35rpx * 2);
		padding: 10rpx 20rpx;
		border: #DEDEDE solid 2rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		margin-bottom: 2rpx;
	}
	.item_img {
		height: 200rpx;
		width: 200rpx;
		border: #0AF solid 4rpx;
		border-radius: 100rpx;
	}
	.item_info {
		height: 100%;
		width: calc(100% - 220rpx);
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin-left: 10rpx;
	}
	.item_row {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	.order_price {
		font-size: 34rpx ;
		color: red;
	}
	.order_empty {
		width: 100%;
	}
	.empty_img {
		width: 100%;
	}
</style>
