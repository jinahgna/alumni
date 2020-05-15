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
	/**
	 * @description 게시판 수정
	 * @returns state.screen.boardUpdate 게시판 수정 완료 상태
	 */
	boardUpdate: (state) => state.boardUpdate,
	/**
	 * @description 게시판 삭제
	 * @returns state.screen.boardDelete 게시판 삭제 완료 상태
	 */
	boardDelete: (state) => state.boardDelete,
};

export default getters;