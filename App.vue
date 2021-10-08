<script>
	export default {
		onLaunch: function() {
			uni.setStorageSync('user_info',{
				name:'Mr.Liu',
				bg_url: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F13602134387%2F1000&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625364541&t=73e3bcef51e2efbd4954e772210b3834',
				img_url:'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F13602134387%2F1000&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1625364541&t=73e3bcef51e2efbd4954e772210b3834',
				id: '123',
				password: '321'
			});
			uni.setStorageSync('login',false);
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* 官方 ui库*/
	@import url("/common/uni.css");
	/* 第三方动画库 */
	@import url("/common/animate.min.css");
	/* 图标库 */
	@import url("/common/icon.css");
	/* 公共样式 */
	@import url("/common/common.css");
</style>
