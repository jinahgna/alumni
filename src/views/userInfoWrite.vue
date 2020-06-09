<template>
	<div class="user-info-write">
		<v-text-field label="ID" hide-details="auto" color="#6fd400" clearable v-if="!isLogin" v-model="userId"></v-text-field>
		<v-text-field label="ID" hide-details="auto" color="#6fd400" clearable v-if="isLogin" v-model="userId" disabled></v-text-field>
		<v-text-field label="PASSWORD" hide-details="auto" color="#6fd400" autocomplete="new-password" clearable type="password" v-if="!isLogin" v-model="userPassword"></v-text-field>
		<v-text-field label="PASSWORD CONFIRM" hide-details="auto" color="#6fd400" clearable type="password" v-if="!isLogin" v-model="userPasswordConfirm" :rules="[() => (userPassword !== '' && userPasswordConfirm !== '' && userPassword === userPasswordConfirm) || '비밀번호가 일치하지 않습니다.']"></v-text-field>
		<v-text-field label="NAME" hide-details="auto" color="#6fd400" clearable v-model="userName"></v-text-field>
		<p class="wrap-address">
			<v-text-field label="ADDRESS" hide-details="auto" color="#6fd400" clearable v-model="userAddress"></v-text-field>
			<v-btn small @click="openAddress">주소검색</v-btn>
		</p>
		<v-text-field label="PHONE" hide-details="auto" color="#6fd400" clearable v-model="userPhone"></v-text-field>
		<v-text-field label="E-MAIL" hide-details="auto" color="#6fd400" clearable v-model="userEmail"></v-text-field>
		<v-radio-group v-model="userGender">
			<v-radio label="FEMALE" value="F" color="#6fd400"></v-radio>
			<v-radio label="MALE" value="M" color="#6fd400"></v-radio>
		</v-radio-group>
		<v-text-field label="직장명" hide-details="auto" color="#6fd400" clearable v-if="isLogin" v-model="userCorp"></v-text-field>
		<div class="wrap-btn">
			<v-btn x-large color="#6fd400" dark @click="userAdd">{{ buttonText }}</v-btn>
		</div>
		<div class="popup" v-if="openPopup">
			<v-btn small @click="openAddress">닫기</v-btn>
			<vue-daum-postcode style="max-height:400px; overflow-y:auto;" @complete="searchAddress($event)" />
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import qs from 'qs';
import { mapGetters } from 'vuex';
import commonMutationType from '@/store/mutationsType';
import commonActionType from '@/store/actionsType';

export default {
	name: 'userInfoWrite',
	data() {
		return {
			isLogin: JSON.parse(sessionStorage.getItem('isLogin')),
			authorId: '',
			userId: '',
			userPassword: '',
			userPasswordConfirm: '',
			userName: '',
			userAddress: '',
			userPhone: '',
			userEmail: '',
			userGender: '',
			userCorp: '',
			buttonText: '',
			openPopup: false,
		};
	},
	computed: {
		...mapGetters(['idCheck', 'userDetail']),
	},
	mounted() {
		this.buttonText = this.isLogin !== true ? '가입하기' : '수정하기';
		if (this.isLogin === true) {
			this.authorId = JSON.parse(sessionStorage.getItem('loginInfo')).idx;
			this.$store.commit(commonMutationType.SET_IS_LOGIN, true);
			const query = qs.parse(window.location.search, { ignoreQueryPrefix: true });
			this.authorId = query.user_idx;
			this.loadView();
		}
	},
	methods: {
		async loadView() {
			const payload = {
				user_idx: this.authorId,
			};
			await this.$store.dispatch(commonActionType.ACTION_USER_DETAIL, payload);
			this.userId = this.userDetail.user_id;
			this.userName = this.userDetail.user_name;
			this.userAddress = this.userDetail.user_address;
			this.userPhone = this.userDetail.user_phone;
			this.userEmail = this.userDetail.user_email;
			this.userGender = this.userDetail.user_gender;
			this.userCorp = this.userDetail.curr_corp;
		},
		openAddress() {
			this.openPopup = !this.openPopup;
		},
		searchAddress(result) {
			const address = `(${result.zonecode}) ${result.address}`;
			this.userAddress = address;
			this.openPopup = !this.openPopup;
		},
		// eslint-disable-next-line consistent-return
		async userAdd() {
			const payloadAdd = {
				user_id: this.userId,
				user_passwd: this.userPassword,
				user_name: this.userName,
				user_address: this.userAddress,
				user_phone: this.userPhone,
				user_email: this.userEmail,
				user_gender: this.userGender,
			};
			const payloadUpdate = {
				user_name: this.userName,
				user_address: this.userAddress,
				user_phone: this.userPhone,
				user_email: this.userEmail,
				user_gender: this.userGender,
				curr_corp: this.userCorp,
				user_idx: this.userDetail.idx,
			};
			const idCheckData = {
				user_id: this.userId,
			};
			if (this.userId === '' && this.isLogin === false) {
				alert('아이디를 입력해주세요.');
				return false;
			}
			if (this.userPassword === '' && this.isLogin === false) {
				alert('비밀번호를 입력해주세요.');
				return false;
			}
			if (this.userPassword !== '' && this.userPasswordConfirm !== '' && this.userPassword !== this.userPasswordConfirm && this.isLogin === false) {
				alert('비밀번호가 일치하지 않습니다.');
				return false;
			}
			if (this.userName === '') {
				alert('이름을 입력해주세요.');
				return false;
			}
			if (this.userAddress === '') {
				alert('주소를 입력해주세요.');
				return false;
			}
			if (this.userPhone === '') {
				alert('핸드폰 번호를 입력해주세요.');
				return false;
			}
			if (this.userEmail === '') {
				alert('이메일을 입력해주세요.');
				return false;
			}
			if (this.userGender === '') {
				alert('성별을 입력해주세요.');
				return false;
			}
			if (this.userCorp === '' && this.isLogin === true) {
				alert('현재 재직중인 직장명을 입력해주세요.');
				return false;
			}
			if (this.isLogin === true) {
				console.log('회원정보수정');
				await this.$store.dispatch(commonActionType.ACTION_USER_UPDATE, payloadUpdate);
				alert('회원정보수정이 완료 되었습니다.');
				this.loadView();
			} else {
				await this.$store.dispatch(commonActionType.ACTION_ID_CHECK, idCheckData);
				if (this.idCheck === 'true') {
					await this.$store.dispatch(commonActionType.ACTION_ADD_USER, payloadAdd);
					alert('회원가입이 완료 되었습니다. 관리자의 승인 후 로그인 가능합니다.');
					this.$router.replace({ path: `/` });
				} else {
					alert('중복된 아이디 입니다.');
				}
			}
		},
	},
};
</script>
<style scoped>
.user-info-write {
	width: 500px;
	margin: 100px auto;
}
.wrap-btn {
	padding: 20px 0;
	text-align: center;
}
.wrap-btn button {
	width: 100%;
}
.warning-txt {
	color: #ff0000;
}
.wrap-address {
	position: relative;
	padding-right: 80px;
	margin-bottom: 0;
}
.wrap-address button {
	position: absolute;
	right: 0;
	top: 15px;
}
.popup {
	position: fixed;
	top: 20%;
	left: 50%;
	width: 320px;
	margin-left: -160px;
	padding-top: 32px;
	border: 1px solid #ddd;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}
.popup button {
	position: absolute;
	right: 0;
	top: 0;
}
</style>
