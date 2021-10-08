<template name="topBar">
	<view class="content">
		<view class="search_bar">
			<view class="search_icon iconfont icon-search"></view>
			<navigator class="search_navigator" url="../search/search">点击进入商品搜索</navigator>
			<view class="scan_icon iconfont icon-saoyisao"></view>
		</view>	
	</view>
	
</template>

<script>
	export default{
		name:"topBar",
		data() {
			return {
			}
		},
		methods: {
		}
	}
</script>

<style>
	.content {
		width: 100%;
		height: 100upx;
		background-color: #00AAFF;
	}
	.search_bar {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 700upx;
		height: 60upx;
		position: absolute;
		background-color: #FFFFFF;
		margin: 10px 12.5px 0px  12.5px;
		border: gray solid 1px;
		border-radius: 30upx;
	}
	.search_icon {
		display: block;
		height: 60upx;
		margin: 0 5px 0 10px;  
	}
	.search_navigator {
		display: block;
		width: 600upx;
		height: 60upx;
		font-weight: 700;
		line-height: 60upx;
		text-align: center;
		color: gray;
	}
	.scan_icon {
		height: 60upx;
		width: 60upx;
	}
</style>
