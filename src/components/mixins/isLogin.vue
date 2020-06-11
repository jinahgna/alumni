<script>
import commonMutationType from '@/store/mutationsType';

export default {
	name: 'isLogin',
	data() {
		return {
			isLogin: JSON.parse(sessionStorage.getItem('isLogin')),
			authorId: '',
		};
	},
	created() {
		if (this.isLogin === null) {
			alert('로그인 후 이용해주세요.');
			this.$router.push({ path: '/' });
		} else {
			this.$store.commit(commonMutationType.SET_IS_LOGIN, true);
			this.authorId = JSON.parse(sessionStorage.getItem('loginInfo')).idx;
		}
	},
};
</script>
