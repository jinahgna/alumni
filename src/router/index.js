import Vue from 'vue';
import VueRouter from 'vue-router';
import home from '../views/home.vue';
import userInfoWrite from '../views/userInfoWrite.vue';
import boardList from '../views/boardList.vue';
import boardDetailView from '../views/boardDetailView.vue';
import boardWrite from '../views/boardWrite.vue';
import infoModify from '../views/infoModify.vue';
import adminUserInfo from '../views/adminUserInfo.vue';

Vue.use(VueRouter);

const routes = [
    // { path: '*', component: NotFoundComponent }, // 404 page
    // { path: '/home', name: 'Home', component: LayoutDefault, children: pageGroup1 },
    // { path: '/about', name: 'About', component: LayoutDefault, children: pageGroup2 },
    {
        path: '/',
        name: 'home',
        component: home,
    },
    {
        path: '/userInfoWrite',
        name: 'userInfoWrite',
        component: userInfoWrite,
    },
    {
        path: '/boardList',
        name: 'boardList',
        component: boardList,
    },
    {
        path: '/boardDetailView',
        name: 'boardDetailView',
        component: boardDetailView,
    },
    {
        path: '/boardWrite',
        name: 'boardWrite',
        component: boardWrite,
    },
    {
        path: '/infoModify',
        name: 'infoModify',
        component: infoModify,
    },
    {
        path: '/adminUserInfo',
        name: 'adminUserInfo',
        component: adminUserInfo,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

/**
 * @description router에서 화면 전환이 발생하는 경우 특정 예외 처리및 화면 이동 전 수행되어야 하는것을 처리
 *
 * @param {object} to - 다음 화면 정보
 * @param {object} from - 이전 화면 정보
 * @param {function} next - 다음 화면으로 진행하기 위한 함수
 */
router.beforeEach((to, from, next) => {
    console.log(`router.beforeEach`);
    console.log(`to:`, to);
    console.log(`from:`, from);
    next();
});

export default router;