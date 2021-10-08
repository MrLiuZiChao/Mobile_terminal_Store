<template>
	<view>
		<!-- 收货地址组件 -->
		<addressInfoCard  
		v-if="hasAddress" 
		:consignee_info="address" 
		:isPay="false" 
		@changeChosed="changeChosed"
		@deleteAddress="deleteAddress">
		</addressInfoCard>
		<!-- 添加收货地址 -->
		<navigator class="add_address" url="../add_address/add_address" open-type="redirect">
			<view class="iconfont icon-jia-tianchong"></view>
			<view class="add_text">
				添加收货地址
			</view>
		</navigator>
		<!-- 使用收货地址 -->
		<view class="chose_address" @tap="useAddress()">
			<view>使用该地址</view>
		</view>
	</view>
</template>

<script>
	import addressInfoCard from "../../components/addressInfoCard/addressInfoCard.vue"
	export default {
		data() {
			return {
				hasAddress:false,
				address: []
			}
		},
		onShow() {
			this.initInfo();
		},
		methods: {
			changeChosed(index) {
				this.address.forEach(item => item.isChosed = false);
				this.address[index].isChosed = true;
			},
			deleteAddress(index) {
				uni.showModal({
					title:'删除收货信息提示',
					content:'确定要删除该收货信息吗？',
					confirmColor: '#0AF',
					cancelText: '再想想',
					cancelColor: '#9aa',
					success: res => {
							if(res.confirm) {
								if(this.address.length == 1) {
									this.address = [];
								} else {
									let arr = [];
									arr = this.address.filter( item => !item.isChosed);
									this.address = arr;
									this.address[0].isChosed = true;
								}
								uni.setStorageSync('address_list',this.address);
							}
						}
				})
			},
			initInfo() {
				this.address = uni.getStorageSync('address_list');
				if(this.address.length) {
					this.address[0].isChosed = true;
					this.hasAddress = true;
				}
			},
			useAddress() {
				if(this.address.length) {
					let info = this.address.filter( item => item.isChosed);
					uni.setStorageSync('address',info);
					uni.navigateBack({
						delta: 1
					})
				} else {
					uni.showToast({
						title: '你还没选择地址哦！',
						icon: 'none'
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
	.add_address {
		width: 100%;
		height: 50px;
		position: fixed;
		left: 0;
		bottom: 50px;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border-top: #DDD solid 1px;
		background-color: #FFF;
	}
	.icon-jia-tianchong{
		font-size: 25px;
		padding-right: 10px;
	}
	.add_text {
		font-size: 20px;
	}
	.chose_address {
		width: 100%;
		height: 50px;
		position: fixed;
		left: 0;
		bottom: 0;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		border-top: #DDD solid 1px;
		font-size: 20px;
		color: #FFF;
		background-color: #0AF;
	}
</style>
