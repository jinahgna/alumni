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
				console.log('state.boardViewData', state.boardViewData);
				console.log('payload', payload);
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
};

export default mutations;
