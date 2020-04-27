const getters = {
	/**
	 * @description 게시판 리스트 조회
	 * @returns state.screen.boardViewData 리스트 조회 완료 상태
	 */
	boardListData: (state) => state.boardListData,
	/**
	 * @description 게시판 상세 조회
	 * @returns state.screen.boardViewData 게시판 상세 조회 완료 상태
	 */
	boardViewData: (state) => state.boardViewData,
	/**
	 * @description 게시판 댓글 조회
	 * @returns state.screen.boardCommentData 게시판 댓글 조회 완료 상태
	 */
	boardCommentData: (state) => state.boardCommentData,
	/**
	 * @description 게시판 등록
	 * @returns state.screen.boardAdd 게시판 등록 완료 상태
	 */
	boardAdd: (state) => state.boardAdd,
};

export default getters;
