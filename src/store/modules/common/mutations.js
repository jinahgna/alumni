import { commonMutationType } from '@/store/mutationsType';

const mutations = {
    /**
     * @description 로딩 상태 설정
     * @param state
     * @param payload 전달 받은 값: Boolean
     */
    [commonMutationType.SET_LOADING_COMPLETE](state, payload) {
        try {
            if (typeof payload === 'boolean') {
                state.loadingComplete = payload;
            }
        } catch (e) {
            console.error(`[commonMutationType.SET_LOADING_COMPLETE] error: ${e}`);
        }
    },
};

export default mutations;
