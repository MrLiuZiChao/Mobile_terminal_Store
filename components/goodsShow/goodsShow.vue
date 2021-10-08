<template name="goodsShow">
	<view class="content" v-if="isShow">
		<view class="tital">推荐好货</view>
		<navigator 
		class="item" v-for="(item,index) in goodsArray" 
		:key="index" 
		:url="'../goods_detail/goods_detail?goods_id='+item.goods_id">
			<view class="goods_show_img">
				<image mode="widthFix" 
				:src="item.goods_big_logo?
				item.goods_big_logo:'https://s1.ax1x.com/2020/08/16/dVCN4O.th.jpg'">
				</image>
			</view>
			<view class="goods_show_name">
				{{item.goods_name}}
			</view>
			<view class="goods_show_price">
				<text style="font-size: medium;">￥</text>
				<text>{{item.goods_price}}</text>
			</view>
		</navigator>
	</view>
</template>


<script>
	export default{
		name:"goodsShow",
		data() {
			return {
			}
		},
		props:{
			goodsArray:Array,
			scrollTop:Number,
			isShow: Boolean
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-flow: row wrap;
		justify-content: space-around;
		width: 710upx;
		height: 100%;
		margin: 5px 10px 50px 10px;
	}
	.tital {
		padding: 20rpx;
		color: #00AAFF;
		font-size: 32rpx;
		font-weight: 800;
		width: 100%;
	}
	.item {
		display: flex;
		flex-flow: column wrap; 
		justify-content: start;
		align-items: center;
		width: 320upx;
		margin-bottom: 20px;
		border-radius: 5px;
		border: #C8C7CC solid 1px;
	}
	.goods_show_img {
		width: 100%;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
	}
	image {
		border-bottom: #C8C7CC solid 1px;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
	}
	.goods_show_name {
		width: 90%;
		font-weight: 700;
		display: -webkit-box;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	.goods_show_price {
		width: 90%;
		color: red;
		font-size: large;
	}
</style>
