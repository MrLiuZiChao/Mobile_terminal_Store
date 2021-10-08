<template>
	<view class="content">
		<!-- 搜索栏 -->
		<view class="search_bar">
			<view class="search_input">
				<input type="text" v-model="msg" placeholder="在此输入要搜索的商品名称" @input="recommend()"/>
			</view>
			<view class="search_btn" @tap="goTolist()">
				搜索
			</view>
		</view>
		<!-- 搜索列表 -->
		<view v-if="isShow" class="search_show">
			<view v-if="hasResult" class="search_list">
				<navigator 
				class="search_item" 
				v-for="(item,index) in recommendData" 
				:key="index"
				:url="'../goods_detail/goods_detail?goods_id='+item.goods_id">
					{{ item.goods_name }}
				</navigator>
			</view>
			<view v-else class="search_item">
				没有搜索结果哦！
			</view>
		</view>
		<!-- 热搜爆款 -->
		<view v-else class="recommend_content">
			<view class="recommend_part">
				<view class="recommend_title">
					热搜爆款
				</view>
				<navigator 
				class="recommend_item"
				v-for="(item,index) in list"
				:key="index"
				:url="'../goods_detail/goods_detail?goods_id='+item.goods_id">
				{{ item.goods_name }}
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import data from "../../utils/data.js"
	export default {
		data() {
			return {
				list: [],
				msg: '',
				isShow:false,
				hasResult:false,
				recommendData:[]
			}
		},
		onLoad() {
			this.getRecommendListData();
		},
		methods: {
			getRecommendListData() {
				this.list = data.loadGoodsList();
			},
			goTolist(){
				if( this.isShow && this.hasResult ) {
					uni.navigateTo({
						url:'../goods_list/goods_list?query='+this.msg
					})
				}
			},
			recommend() {
				this.isShow = true;
				if(this.msg) {
					this.recommendData = [];
					data.getSearchData({ query: this.msg }).then((res) => {
						this.recommendData = res;
						if(!this.recommendData.length) {
							this.hasResult = false;
						} else {
							this.hasResult = true;
						}
					});
				} else {
					this.isShow =false;
				}
			}
		}
	}
</script>

<style>
	.search_bar {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 80rpx;
		align-items: center;
		justify-content: space-around;
		padding: 20rpx 0;
		border-bottom: #DEDEDE solid 4rpx;
	}
	.search_input {
		width: 70%;
		height: 70rpx;
		font-size: 60rpx;
		border: #0AF solid 4rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		padding-left: 35rpx;
		border-radius: 35rpx;
	}
	.search_btn {
		width: 20%;
		height: 70rpx;
		background-color: #0AF;
		color: #FFF;
		border-radius: 35rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		font-size: 35rpx;
	}
	.recommend_content {
		height: calc(100% - 120rpx);
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		padding-top: 80rpx;
	}
	.recommend_part {
		width: 96%;
		height: 70%;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-around;
		align-items: center;
		border: #0AF solid 4rpx;
		border-radius: 20rpx;
		padding: 40rpx 0 20rpx 0;
		position: relative;
	}
	.recommend_title {
		width: 30%;
		height: 80rpx;
		position: absolute;
		top: -60rpx;
		font-size: 35rpx;
		color: #0AF;
		border: #0AF outset 4rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #FFF;
	}
	.recommend_item {
		width: 45%;
		height: 100rpx;
		border-radius: 10rpx;
		border: #0AF outset 4rpx;
		padding: 0 10rpx;
		display: -webkit-box;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		background-color: rgba(0, 170, 255, 0.2);
	}
	.search_show {
		width: 100%;
	}
	.search_item {
		width: 100%;
		height: 50rpx;
		font-size: 28rpx;
		display: -webkit-box;
		border-bottom: #DEDEDE solid 4rpx;
		padding-left: 20rpx;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}
</style>
