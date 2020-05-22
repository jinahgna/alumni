<template>
    <div class="wrap-login-info">
        <div class="before-login" v-if="!isLogin">
            <v-text-field label="ID" hide-details="auto" color="#6fd400"></v-text-field>
            <v-text-field label="PASSWORD" hide-details="auto" color="#6fd400"></v-text-field>
            <div class="wrap-btn">
                <v-btn x-large color="#6fd400" dark>login</v-btn>
            </div>
            <div class="wrap-btn">
                <span class="info-txt">아직 회원이 아니라면,</span>
                <router-link to="/userInfoWrite">
                    <v-btn x-large color="blue" dark>회원가입</v-btn>
                </router-link>
            </div>
        </div>
        <div class="after-login" v-if="isLogin">
            <p>로그인 성공! ooo님 환영합니다.</p>
            <div class="wrap-btn">
                <router-link to="/infoModify">
                    <v-btn x-large color="#6fd400" dark>내정보 수정</v-btn>
                </router-link>
                <v-btn x-large color="blue" dark class="mt-5">탈퇴하기</v-btn>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
// import Board from '@/components/Board.vue';

export default {
    name: 'home',
    components: {
        // Board,
    },
    data() {
        return {
            isLogin: false,
        };
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
