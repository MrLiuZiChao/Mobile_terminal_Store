<template>
	<view>
		<view class="consignee_info">
			<view class="info_item" v-for="(item,index) in info_text" :key="index">
				<view class="info_name">{{item.name}}</view>
				<view class="info_input">
					<input type="text" :placeholder="item.text" v-model="info_content[index]" />
				</view>
			</view>
			<view class="info_submit" @tap="saveAddress()">
				<view>保存地址</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info_text:[
					{
						name:"收货人",
						text:"名字"
					},
					{
						name:"手机号码",
						text:"手机号"
					},
					{
						name:"选择地区",
						text:"省、市、区、街道"
					},
					{
						name:"详细地址",
						text:"小区楼栋/乡村名称"
					}
				],
				info_content:['','','','']
			}
		},
		methods: {
			saveAddress() {
				let flag = true;
				for(let i = 0; i < 4; i++) {
					if(this.info_content[i] == '') {
						flag = false;
						uni.showToast({
							icon:'none',
							title: this.info_text[i].name + ' 还没填哦！'
						})
						break;
					}
				}
				if(flag) {
					let address = uni.getStorageSync('address_list') || [];
					let info = {
						name: this.info_content[0],
						phone: this.info_content[1],
						province: this.info_content[2],
						detail: this.info_content[3],
						isChosed: false
					}
					address.push(info);
					uni.setStorageSync('address_list',address);
					uni.showToast({
						title:'地址添加成功',
						icon:'success',
						mask:true
					})
					uni.redirectTo({
						url: '../address/address'
					})
				}
				
			}
		}
	}
</script>

<style>
	.consignee_info {
		width: 100%;
		height: 700rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
	.info_item {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		height: 100rpx;
		width: 90%;
		border-bottom: #DEDEDE solid 1px;
	}
	.info_name {
	    text-align: center;
	    width: 30%;	
		font-size: 16px;
	}
	.info_input {
		width: 70%;
	}
	.info_submit {
		height: 100rpx;
		width: 200rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		background-color: #0AF;
		color: #FFF;
		font-size: 17px;
		border-radius: 10px;
	}
</style>
