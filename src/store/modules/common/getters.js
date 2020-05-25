const getters = {
	/**
	 * @description 게시판 리스트 조회
	 * @returns state.screen.boardViewData 리스트 조회 완료 상태
	 */
	boardListData: (state) => state.boardListData,
	/**
	 * @description 공지사항 리스트 조회
	 * @returns state.screen.boardViewData 리스트 조회 완료 상태
	 */
	noticeListData: (state) => state.noticeListData,
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
	 * @description 아이디 중복 체크
	 * @returns state.screen.idCheck 게시판 댓글 조회 완료 상태
	 */
	idCheck: (state) => state.idCheck,
	/**
	 * @description 사용자 리스트
	 * @returns state.screen.userList 사용자리스트 조회 완료 상태
	 */
	userList: (state) => state.userList,
	/**
	 * @description 사용자 상세조회
	 * @returns state.screen.userDetail 사용자 상세 조회 완료 상태
	 */
	userDetail: (state) => state.userDetail,
	/**
	 * @description 로그인 여부 조회
	 * @returns state.screen.login 로그인 상태
	 */
	login: (state) => state.login,
};

export default getters;
