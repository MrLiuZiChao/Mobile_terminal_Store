
<template>
	<view class="content classify" v-if="isLoaded">
		<topBar></topBar>
		<view class="main_part">
			<!-- 左侧标签区域 -->
			<scroll-view class="left" scroll-y>
				<!-- 定义一个acitves为0，与index的索引绑定,若相等赋予类名，不相等为空 -->
				<view class="type" :class="selectedID === index ? 'active' : ''" v-for="(item, index) in classData"
					:key="item.cat_id" @tap="selected(index)">
					{{ item.cat_name }}
				</view>
			</scroll-view>
			<!-- 右侧图片区域 -->
			<scroll-view class="right" :scroll-top="scrollTop" scroll-y  @scroll="scroll">
				<view class="level1" v-model="selectedID" v-for="item in classData[selectedID]['children']"
					:key="item.cat_id">
					<view class="l1_name">{{item.cat_name}}</view>
					<view class="item">
						<navigator 
						class="level2" 
						v-for="it in item['children']" 
						:key="it.cat_id"
						:url="'../goods_list/goods_list?cat_id='+it.cat_id">
							<image class="l2_img" :src="it.cat_icon"></image>
							<text class="l2_name">{{it.cat_name}}</text>
						</navigator>
					</view>
				</view>
				<text class="none" v-if="classData[selectedID].length === 0">暂无数据,请浏览其他页面!</text>
			</scroll-view>
		</view>

	</view>
</template>

<script>
	import topBar from "../../components/topBar/topBar.vue";
	import getData from "../../utils/data.js"
	export default {
		data() {
			return {
				scrollTop:0,
				isLoaded: false,
				classData: [],
				selectedID: 0,
				old: { scrollTop:0 }
			}
		},
		components: {
			topBar
		},
		onLoad() {
			let storageData = uni.getStorageSync("class");
			if(!storageData) {
				this.getListData();
			} else {
				if(Date.now() - storageData.time > 300000) {
					this.getListData();
				} else {
					this.classData = storageData.data;
					this.isLoaded = true;
				}
			}
		},
		methods: {
			async getListData(){
				let { classData, isLoaded } = await getData.getClassData();
				this.classData = classData;
				this.isLoaded = isLoaded;
				let data = {time:Date.now(),data:this.classData};
				uni.setStorageSync('class',data);
			},
			selected(id) {
				this.selectedID = id;
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
				this.scrollTop = 0
				});
			},
			scroll(e) {
			    this.old.scrollTop = e.detail.scrollTop
			}
		}
	}
</script>

<style>
	.classify {
		height: 100%;
	}

	.main_part {
		display: flex;
		height: 100%;
	}

	.left {
		width: 200upx;
		height: 100%;
		border-right: 1.5px solid #eee;
	}

	.right {
		height: 100%;
		width: 550upx;
		margin: 20upx auto;
	}

	.type {
		height: 120upx;
		line-height: 120upx;
		text-align: center;
		font-size: 30upx;
	}

	.active {
		color: #FFF;
		background-color: #0AF;
	}

	.level1 {
		display: flex;
		flex-flow: column wrap;
		align-items: center;
		margin-top: 20px;
		margin-bottom: 30px;
	}

	.l1_name {
		width: 70%;
		text-align: center;
		border-top: #00AAFF outset 5px;
		border-bottom: #00AAFF outset 5px;
		margin: 20px 0px;
		font-size: large;
		font-weight: 800;
	}

	.item {
		display: flex;
		flex-flow: row wrap;
		justify-content: flex-start;
	}

	.level2 {
		display: flex;
		flex-flow: column;
		align-items: center;
		margin: 10px;
	}

	.l2_img {
		width: 70px;
		height: 70px;
	}

	.l2_name {
		font-weight: 700;
	}
</style>
