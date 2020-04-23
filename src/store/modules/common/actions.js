import { commonActionType } from '@/store/actionsType';
import { commonMutationType } from '@/store/mutationsType';
import index from '@/api/index';

const actions = {
    /**
     * @description action 유저 리스트 조회
     * @param commit
     * @param payload 전달 받은 값
     */
    async [commonActionType.ACTION_USER_LIST]({ commit }, payload) {
        try {
            const member = await index.getModule(payload);
            commit(commonMutationType.SET_LOADING_END, true);
            commit(commonMutationType.SET_MEMBER_LIST, member.data.result);
        } catch (e) {
            const snackbarPayload = {
                ...this.state.common.snackbarContent,
                text: `회원 조회에 실패하였습니다.`,
                active: true,
            };
            commit(commonMutationType.SET_LOADING_END, true);
            commit(commonMutationType.SET_SNACKBAR_CONTENT, snackbarPayload);
        }
    },
};

export default actions;
