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
};

export default getters;
