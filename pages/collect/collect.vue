<template>
	<view class="content">
		<!-- 收藏列表不为空 -->
		<view v-if="hasCollect" class="collect_list">
			<view class="list_title">
				收藏列表
			</view>
			<view class="list_detail">
				<view class="list_item" v-for="(item,index) in list" :key="index">
					<navigator class="item_main" :url="'../goods_detail/goods_detail?goods_id='+item.goods_id">
						<view class="item_img">
							<image :src="item.pics" mode="widthFix"></image>
						</view>
						<view class="item_name">{{ item.goods_name }}</view>
						<view class="item_price">￥{{ item.goods_price }}</view>
					</navigator>
					<view class="iconfont icon-guanbi" @tap="deleteCollection(index)"></view>
				</view>
			</view>
		</view>
		<!-- 收藏列表为空 -->
		<view v-else class="collect_empty">
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
				hasCollect: false
			}
		},
		onShow() {
			this.list = uni.getStorageSync("collect");
			if(this.list.length) {
				this.hasCollect = true;
			} else {
				this.hasCollect = false;
			}
		},
		methods: {
			deleteCollection(index) {
				uni.showModal({
					title: '清除收藏提示',
					content:'确定将这个宝贝移除？',
					confirmColor: '#0AF',
					cancelText: '再想想',
					cancelColor: '#9aa',
					success: res => {
						if(res.confirm) {
							let arr = this.list.filter(item => item != this.list[index]);
							this.list = arr;
							uni.setStorageSync('collect',this.list);
						}
						if(!this.list.length) {
							this.hasCollect = false;
						}
					}
				})
			}
		}
	}
</script>

<style>
	.content {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.collect_empty {
		width: 100%;
	}
	.collect_list {
		width: 96%;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 10rpx 0;
		padding: 10rpx 0;
	}
	.list_title {
		width: 200rpx;
		display: flex;
		font-size: 35rpx;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		color: #FFF;
		background-color: #0AF;
		border-radius: 10rpx;
	}
	.list_detail {
		width: 100%;
		display: flex;
		flex-direction: column;
		margin-top: 10rpx;
		border: #DEDEDE solid 2px;
		border-radius: 10rpx;
	}
	.list_item {
		display: flex;
		flex-direction: row;
		width: calc(100%-40rpx);
		height: 300rpx;
		padding: 20rpx 10rpx;
	}
	.item_main {
		width: 94%;
		height: 100%;
		display: flex;
		flex-flow: column wrap;
		justify-content: space-around;
	}
	.item_img {
		width: 40%;
		
	}
	.item_name {
		width: 58%;
		padding-left: 2%;
		font-weight: 600;
		margin-bottom: 105rpx;
		display: -webkit-box;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	.item_price {
		width: 58%;
		padding-left: 2%;
		font-size: 40rpx;
		font-weight: 600;
		color: red;
	}
	.icon-guanbi {
		font-size: 32rpx;
		height: 50rpx;
		width: 50rpx;
	}
</style>
