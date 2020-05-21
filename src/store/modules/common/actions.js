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
    /**
     * @description action 게시판 글 등록
     * @param commit
     * @param payload 전달 받은 값 updateBoard
     */
    async [commonActionType.ACTION_BOARD_ADD]({ commit }, payload) {
        try {
            await apiModule.postModule('/addBoard', payload);
        } catch (e) {
            console.log('게시판 등록 실패');
        }
    },
    /**
     * @description action 게시판 글 수정
     * @param commit
     * @param payload 전달 받은 값
     */
    async [commonActionType.ACTION_BOARD_UPDATE]({ commit }, payload) {
        try {
            await apiModule.postModule('/updateBoard', payload);
        } catch (e) {
            console.log('게시판 수정 실패');
        }
    },
    /**
     * @description action 게시판 글 삭제
     * @param commit
     * @param payload 전달 받은 값
     */
    async [commonActionType.ACTION_BOARD_DELETE]({ commit }, payload) {
        try {
            await apiModule.deleteModule(payload);
        } catch (e) {
            console.log('게시판 삭제 실패');
        }
    },
    /**
     * @description action 게시판 댓글 등록
     * @param commit
     * @param payload 전달 받은 값
     */
    async [commonActionType.ACTION_COMMENT_ADD]({ commit }, payload) {
        try {
            await apiModule.postModule('/addComment', payload);
        } catch (e) {
            console.log('게시판 댓글 등록 실패');
        }
    },
    /**
     * @description action 게시판 댓글 수정
     * @param commit
     * @param payload 전달 받은 값
     */
    async [commonActionType.ACTION_COMMENT_UPDATE]({ commit }, payload) {
        try {
            await apiModule.postModule('/updateComment', payload);
        } catch (e) {
            console.log('게시판 댓글 수정 실패');
        }
    },
    /**
     * @description action 게시판 댓글 삭제
     * @param commit
     * @param payload 전달 받은 값
     */
    async [commonActionType.ACTION_COMMENT_DELETE]({ commit }, payload) {
        try {
            await apiModule.deleteModule(payload);
        } catch (e) {
            console.log('게시판 댓글 삭제 실패');
        }
    },
    /**
     * @description action 아이디 중복 확인
     * @param commit
     * @param payload 전달 받은 값
     */
    async [commonActionType.ACTION_ID_CHECK]({ commit }, payload) {
        try {
            // await apiModule.postModule('/dupleIdCheck', payload);
            await apiModule.postModule('/dupleIdCheck', payload).then((result) => {
                commit(commonMutationType.GET_ID_CHECK, result.data.result);
            });
        } catch (e) {
            console.log('중복 체크 실패');
        }
    },
    /**
     * @description action 회원가입
     * @param commit
     * @param payload 전달 받은 값
     */
    async [commonActionType.ACTION_ADD_USER]({ commit }, payload) {
        try {
            await apiModule.postModule('/addUserInfo', payload);
        } catch (e) {
            console.log('회원가입 실패');
        }
    },
};

export default actions;
