<template>
    <v-app>
        <div class="header-tab">
            <ul class="menu">
                <li>
                    <router-link to="/">Home</router-link>
                </li>
                <!-- <li><router-link to="/userInfoWrite">회원가입</router-link></li> -->
                <li>
                    <router-link to="/boardList?type=notice&num=0">공지사항</router-link>
                </li>
                <li>
                    <router-link to="/boardList?type=free&num=0">게시판</router-link>
                </li>
                <li>
                    <router-link to="/adminUserInfo">관리자</router-link>
                </li>
            </ul>
        </div>
        <v-content>
            <router-view :key="$route.fullPath" />
        </v-content>
    </v-app>
</template>

<script>
export default {
    name: 'App',
    components: {},
    data() {
        return {};
    },
};
</script>
<style scoped>
.v-tabs {
    flex: 0;
}
.v-content {
    width: 80%;
    margin: 30px auto;
}
.header-tab {
    background-color: #000;
}
.menu li {
    display: inline-block;
    list-style: none;
    padding: 10px;
}
.menu li a {
    text-decoration: none;
    color: #fff;
}
/* .menu li .router-link-exact-active.router-link-active {color:#6fd400;} */
</style>
