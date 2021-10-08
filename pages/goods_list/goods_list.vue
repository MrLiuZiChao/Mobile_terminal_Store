<template>
	<view class="content" v-if="isLoaded">
		<topBar></topBar>
		<view class="main_content">
			<view class="ranking_type">
				<view 
				class="type" 
				:class="index == selected? 'selected':''"
				v-for="(item,index) in rankingType"
				:key="index"
				@tap="changeSelect(index)">
					{{item}}
				</view>
			</view>
			<navigator 
			class="list_item" 
			v-for="(item,index) in goodListData" 
			:key="index"
			:url="'../goods_detail/goods_detail?goods_id='+item.goods_id">
				<view class="goods_list_img">
					<image :src="item.goods_small_logo?item.goods_small_logo:'https://s1.ax1x.com/2020/08/16/dVCN4O.th.jpg'"></image>
				</view>
				<view class="goods_list_name">{{item.goods_name}}</view>
				<view class="goods_list_price">
					<text style="font-size: medium;">￥</text>
					{{item.goods_price}}
				</view>
			</navigator>	
		</view>
	</view>
</template>

<script>
	import topBar from "../../components/topBar/topBar.vue"
	import data from "../../utils/data.js"
	import request from "../../utils/request.js"
	import url from "../../utils/url.js"
	export default {
		data() {
			return {
				isLoaded:false,
				selected: 0,
				rankingType:['综合','销量','价格'],
				goodListData: [],
				totalPages: 1,
				QueryParams:{
				    query:"",
				    cid:"",
				    pagenum:1,
				    pagesize:10
				},
			}
		},
		onLoad(Option) {
			if(Option.query == null) {
				this.QueryParams.cid = Option.cat_id;
			} else {
				this.QueryParams.query = Option.query;
			}
			this.getListData();
		},
		onReachBottom(){
			if(this.QueryParams.pagenum >= this.totalPages){
				uni.showToast({
					title: '没有下一页数据了'
				});
			}else{
			    this.QueryParams.pagenum++;
			    this.getListData();
			}
		},
		onPullDownRefresh() {
			this.goodListData = [];
			this.QueryParams.pagenum = 1;
			this.getListData();
		},
		methods: {
			getListData() {
				request.getData({
					url:url.goodsListURL,
					data: this.QueryParams
				}).then((res)=>{
					let item = Array.from(JSON.parse(JSON.stringify(res.goods)));
					this.totalPages = Math.ceil(res.total / this.QueryParams.pagesize);
					let arr = [...this.goodListData, ... item]
					this.goodListData = arr;
					this.isLoaded = true;
					uni.stopPullDownRefresh();
				});
			},
			changeSelect(index) {
				this.selected = index;
			}
		},
		components: {
			topBar
		}
	}
</script>

<style>
	.main_content {
		width: 100%;
		display: flex;
		flex-flow: column wrap; 
	}
	.ranking_type {
		height: 100upx;
		width: 100%;
		display: flex;
		flex-flow: row wrap;
	}
	.type {
		color: gray;
		width: 33.33%;
		height: 100%;
		text-align: center;
		line-height: 100upx;
		font-size: medium;
		font-weight: 700;
		border-bottom: #999999 solid 5upx;
	}
	.selected {
		color: #00AAFF;
		border-bottom: #00AAFF solid 5upx;
	}
	.list_item {
		height: 240upx;
		width: 100%;
		display: flex;
		flex-flow: column wrap;
		justify-content: space-around;
		border-bottom: #999999 solid 3upx;
	}
	.goods_list_img {
		height: 200upx;
		width: 200upx;
		padding: 10px;
	}
	.goods_list_name {
		height: 100upx;
		width: 450upx;
		font-size: medium;
		font-weight: 700;
		display: -webkit-box;
		overflow: hidden;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}
	.goods_list_price {
		height: 70upx;
		width: 450upx;
		font-size: x-large;
		font-weight: 700;
		color: red;
	}
</style>
