<template>
	<view class="address_list">
		<view
		 class="address_item" 
		 v-for="(item,index) in  consignee_info" 
		 :key="index" 
		 @tap="changeChosed(index)">
			<view v-if="item.isChosed" class="iconfont icon-dingwei1"></view>
			<view v-else class="iconfont icon-dingwei"></view>
			<view class="address_info">
				<view class="consignee_name">{{ item.name }}</view>
				<view class="consignee_phone">{{ item.phone }}</view>
				<view class="iconfont icon-guanbi" v-if="!isPay" @tap="deleteAddress(index)"></view>
				<view class="address_province">{{ item.province }}</view>
				<view class="address_detail">{{ item.detail }}</view>
			</view>
		</view>	
		<view v-if="!isPay" style="width: 100%; height: 110px;"></view>
	</view>
	
</template>

<script>
	export default {
		name:"addressInfoCard",
		data() {
			return {
			};
		},
		methods:{
			changeChosed(index) {
				this.$emit('changeChosed',index);
			},
			deleteAddress(index) {
				this.$emit('deleteAddress',index);
			}
		},
		props: {
			consignee_info: Array,
			isPay: Boolean
		}
	}
</script>

<style>
	.address_list {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.address_item {
		width: 96%;
		display: flex;
		flex-flow: row wrap;
		justify-content: space-around;
		align-items: center;
		border: #DDD solid 1px;
		border-radius: 10px;
		margin-top: 10px;
	}
	.icon-dingwei {
		width: 30px;
		height: 30px;
		text-align: center;
		line-height: 1.5;
		font-size: 20px;
		background-color: #CCC;
		border-radius: 15px;
	}
	.icon-dingwei1 {
		width: 30px;
		height: 30px;
		text-align: center;
		line-height: 1.5;
		font-size: 20px;
		background-color: #00AAFF;
		border-radius: 15px;
	}
	.address_info {
	    width: 85%;
		display: flex;
		flex-flow: row wrap;
		padding: 5px 0;
	}
	.consignee_name {
	    font-size: 19px;
	    padding-right: 5px;	
	}
	.consignee_phone {
		padding-top: 5px;
		font-size: 15px;
	}
	.address_province {
		width: 100%;
		word-break: break-all;
		word-wrap: break-word;
		font-size: 16px;
	}
	.address_detail {
		width: 100%;
		word-break: break-all;
		word-wrap: break-word;
		font-size: 16px;
	}
	.icon-guanbi {
		position: absolute;
		right: 20px;
	}
</style>
