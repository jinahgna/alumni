<template>
    <div class="user-info-write">
        <v-text-field label="ID" hide-details="auto" color="#6fd400" v-model="userId"></v-text-field>
        <v-text-field label="PASSWORD" hide-details="auto" color="#6fd400" type="password" v-model="userPassword"></v-text-field>
        <v-text-field label="PASSWORD CONFIRM" hide-details="auto" color="#6fd400" type="password" v-model="userPasswordConfirm"></v-text-field>
        <p class="warning-txt" v-if="userPassword !== '' && userPasswordConfirm !== '' && userPassword !== userPasswordConfirm">비밀번호가 일치하지 않습니다.</p>
        <v-text-field label="NAME" hide-details="auto" color="#6fd400" v-model="userName"></v-text-field>
        <v-text-field label="ADDRESS" hide-details="auto" color="#6fd400" v-model="userAddress"></v-text-field>
        <v-text-field label="PHONE" hide-details="auto" color="#6fd400" v-model="userPhone"></v-text-field>
        <v-text-field label="E-MAIL" hide-details="auto" color="#6fd400" v-model="userEmail"></v-text-field>
        <v-radio-group v-model="userGender">
            <v-radio label="FEMALE" value="F" color="#6fd400"></v-radio>
            <v-radio label="MALE" value="M" color="#6fd400"></v-radio>
        </v-radio-group>
        <div class="wrap-btn">
            <v-btn x-large color="#6fd400" dark @click="userAdd">userInfoWrite</v-btn>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex';
import commonMutationType from '@/store/mutationsType';
import commonActionType from '@/store/actionsType';

export default {
    name: 'userInfoWrite',
    data() {
        return {
            userId: '',
            userPassword: '',
            userPasswordConfirm: '',
            userName: '',
            userAddress: '',
            userPhone: '',
            userEmail: '',
            userGender: '',
            loginInfo: '',
        };
    },
    mounted() {
        // this.loadView();
    },
    computed: {
        ...mapGetters(['idCheck']),
    },
    methods: {
        // loadView() {
        //     this.loginInfo = this.$store.state.common.login;
        //     console.log('loginInfo', this.loginInfo);
        //     if (this.loginInfo.idx !== undefined) {
        //     }
        // },
        async userAdd() {
            const payload = {
                user_id: this.userId,
                user_passwd: this.userPassword,
                user_name: this.userName,
                user_address: this.userAddress,
                user_phone: this.userPhone,
                user_email: this.userEmail,
                user_gender: this.userGender,
            };
            const idCheckData = {
                user_id: this.userId,
            };
            if (this.userId === '') {
                alert('아이디를 입력해주세요.');
                return false;
            }
            if (this.userPassword === '') {
                alert('비밀번호를 입력해주세요.');
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
            await this.$store.dispatch(commonActionType.ACTION_ID_CHECK, idCheckData);
            if (this.idCheck === 'true') {
                await this.$store.dispatch(commonActionType.ACTION_ADD_USER, payload);
                alert('회원가입이 완료 되었습니다. 관리자의 승인 후 로그인 가능합니다.');
                this.$router.replace({ path: `/` });
            } else {
                alert('중복된 아이디 입니다.');
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
</style>
