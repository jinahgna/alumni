import commonMutationType from '@/store/mutationsType';

const mutations = {
    /**
     * @description 게시글 리스트 설정
     * @param state
     * @param payload 전달 받은 값: object
     */
    [commonMutationType.SET_BOARD_LIST](state, payload) {
        try {
            if (typeof payload === 'object') {
                state.boardListData = payload;
            }
        } catch (e) {
            console.error(`[commonMutationType.SET_BOARD_LIST] error: ${e}`);
        }
    },
};

export default mutations;
