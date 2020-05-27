<template>
    <div class="wrap-login-info">
        <div class="before-login" v-if="!isLogin">
            <v-text-field label="ID" hide-details="auto" color="#6fd400" clearable v-model="userId"></v-text-field>
            <v-text-field label="PASSWORD" type="password" hide-details="auto" autocomplete="new-password" color="#6fd400" clearable v-model="userPassword"></v-text-field>
            <div class="wrap-btn">
                <v-btn x-large color="#6fd400" dark @click="login">login</v-btn>
            </div>
            <div class="wrap-btn">
                <span class="info-txt">아직 회원이 아니라면,</span>
                <router-link to="/userInfoWrite">
                    <v-btn x-large color="blue" dark>회원가입</v-btn>
                </router-link>
            </div>
        </div>
        <div class="after-login" v-if="isLogin">
            <p>로그인 성공! {{ userId }} 님 환영합니다.</p>
            <div class="wrap-btn">
                <!-- <router-link to="/userInfoWrite"> -->
                <v-btn x-large color="#6fd400" dark @click="infoModify">내정보 수정</v-btn>
                <!-- </router-link> -->
                <v-btn x-large color="blue" dark class="mt-5" @click="deleteUser">탈퇴하기</v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import qs from 'qs';
import { mapGetters } from 'vuex';
import commonMutationType from '@/store/mutationsType';
import commonActionType from '@/store/actionsType';

export default {
    name: 'home',
    components: {},
    data() {
        return {
            isLogin: false,
            userId: '',
            userPassword: '',
            loginInfo: this.$store.state.common.login,
        };
    },
    computed: {
        // ...mapGetters(['login']),
    },
    mounted() {
        this.userId = '';
        this.userPassword = '';
        this.loadView();
    },
    methods: {
        loadView() {
            if (this.loginInfo.idx !== undefined) {
                this.isLogin = true;
                this.userId = this.loginInfo.user_id;
            }
        },
        async login() {
            const payload = {
                user_id: this.userId,
                user_passwd: this.userPassword,
            };
            await this.$store.dispatch(commonActionType.ACTION_LOGIN, payload);
            this.loginInfo = this.$store.state.common.login;
            if (this.loginInfo.idx !== undefined) {
                alert('로그인이 완료 되었습니다. ');
            } else {
                alert('로그인 정보를 다시 확인해주세요. ');
            }
            this.loadView();
        },
        infoModify() {
            this.$router.push(`/userInfoWrite?user_idx=${this.loginInfo.idx}`);
        },
        async deleteUser() {
            const payload = `/deleteUserInfo?user_idx=${this.loginInfo.idx}`;
            const confirmDelete = confirm('정말 탈퇴 하시겠습니까?');
            if (confirmDelete === true) {
                await this.$store.dispatch(commonActionType.ACTION_USER_DELETE, payload);
                alert('회원 탈퇴가 완료되었습니다.');
            }
            // 임시
            this.loginInfo = '';
            this.userId = '';
            this.userPassword = '';
            this.isLogin = false;
        },
    },
};
</script>

<style scoped>
.wrap-login-info {
    width: 500px;
    margin: 100px auto;
}
.wrap-btn {
    padding: 20px 0;
    text-align: center;
}
.after-login p {
    text-align: center;
    font-weight: 700;
}
.wrap-btn button {
    width: 100%;
}
.info-txt {
    display: block;
    text-align: left;
    font-size: 14px;
    padding-bottom: 5px;
    color: #666;
}
.v-application a {
    color: transparent;
}
</style>
