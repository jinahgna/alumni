import commonActionType from '@/store/actionsType';
import commonMutationType from '@/store/mutationsType';
import apiModule from '@/api/module1';

const actions = {
    /**
     * @description action 게시판 리스트 조회
     * @param commit
     * @param payload 전달 받은 값
     */
    async [commonActionType.ACTION_BOARD_LIST]({ commit }, payload) {
        try {
            const boardListData = await apiModule.getModule(payload);
            commit(commonMutationType.SET_BOARD_LIST, boardListData.data.result);
        } catch (e) {
            console.log('게시판 조회 실패');
        }
    },
    /**
     * @description action 게시판 상세 조회
     * @param commit
     * @param payload 전달 받은 값
     */
    async [commonActionType.ACTION_BOARD_DETAIL]({ commit }, payload) {
        try {
            const boardViewData = await apiModule.getModule(payload);
            commit(commonMutationType.SET_BOARD_DETAIL, boardViewData.data.result);
        } catch (e) {
            console.log('게시판 상세 조회 실패');
        }
    },
    /**
     * @description action 게시판 댓글조회
     * @param commit
     * @param payload 전달 받은 값
     */
    async [commonActionType.ACTION_BOARD_COMMENT]({ commit }, payload) {
        try {
            const boardCommentData = await apiModule.getModule(`/getCommentList?board_id=${payload}`);
            commit(commonMutationType.SET_BOARD_COMMENT, boardCommentData.data.result);
        } catch (e) {
            console.log('게시판 댓글 조회 실패');
        }
    },
};

export default actions;
