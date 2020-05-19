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
	/**
	 * @description 게시글 상세
	 * @param state
	 * @param payload 전달 받은 값: object
	 */
	[commonMutationType.SET_BOARD_DETAIL](state, payload) {
		try {
			if (typeof payload === 'object') {
				state.boardViewData = payload;
			}
		} catch (e) {
			console.error(`[commonMutationType.SET_BOARD_DETAIL] error: ${e}`);
		}
	},
	/**
	 * @description 게시글 댓글
	 * @param state
	 * @param payload 전달 받은 값: object
	 */
	[commonMutationType.SET_BOARD_COMMENT](state, payload) {
		try {
			if (typeof payload === 'object') {
				state.boardCommentData = payload;
			}
		} catch (e) {
			console.error(`[commonMutationType.SET_BOARD_COMMENT] error: ${e}`);
		}
	},
	/**
	 * @description 게시글 등록
	 * @param state
	 * @param payload 전달 받은 값: object
	 */
	[commonMutationType.SET_BOARD_ADD](state, payload) {
		try {
			if (typeof payload === 'object') {
				state.boardAdd = payload;
			}
		} catch (e) {
			console.error(`[commonMutationType.SET_BOARD_ADD] error: ${e}`);
		}
	},
	/**
	 * @description 게시글 수정
	 * @param state
	 * @param payload 전달 받은 값: object
	 */
	[commonMutationType.SET_BOARD_UPDATE](state, payload) {
		try {
			if (typeof payload === 'object') {
				state.boardUpdate = payload;
			}
		} catch (e) {
			console.error(`[commonMutationType.SET_BOARD_UPDATE] error: ${e}`);
		}
	},
	/**
	 * @description 게시글 삭제
	 * @param state
	 * @param payload 전달 받은 값: object
	 */
	[commonMutationType.SET_BOARD_DELETE](state, payload) {
		try {
			if (typeof payload === 'object') {
				state.boardDelete = payload;
			}
		} catch (e) {
			console.error(`[commonMutationType.SET_BOARD_DELETE] error: ${e}`);
		}
	},
	/**
	 * @description 댓글 등록
	 * @param state
	 * @param payload 전달 받은 값: object
	 */
	[commonMutationType.SET_COMMENT_ADD](state, payload) {
		try {
			if (typeof payload === 'object') {
				state.commentAdd = payload;
			}
		} catch (e) {
			console.error(`[commonMutationType.SET_COMMENT_ADD] error: ${e}`);
		}
	},
	/**
	 * @description 댓글 수정
	 * @param state
	 * @param payload 전달 받은 값: object
	 */
	[commonMutationType.SET_COMMENT_UPDATE](state, payload) {
		try {
			if (typeof payload === 'object') {
				state.commentUpdate = payload;
			}
		} catch (e) {
			console.error(`[commonMutationType.SET_COMMENT_UPDATE] error: ${e}`);
		}
	},
	/**
	 * @description 댓글 삭제
	 * @param state
	 * @param payload 전달 받은 값: object
	 */
	[commonMutationType.SET_COMMENT_DELETE](state, payload) {
		try {
			if (typeof payload === 'object') {
				state.commentDelete = payload;
			}
		} catch (e) {
			console.error(`[commonMutationType.SET_COMMENT_DELETE] error: ${e}`);
		}
	},
};

export default mutations;