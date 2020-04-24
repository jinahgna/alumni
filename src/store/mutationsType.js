/**
 * @description store의 각 module별 mutation type 관리
 */

const commonMutationType = {
    SET_BOARD_LIST: 'SET_BOARD_LIST', // 게시글 리스트
    SET_BOARD_DETAIL: 'SET_BOARD_DETAIL', // 게시글 상세
    SET_BOARD_COMMENT: 'SET_BOARD_COMMENT', // 게시글 댓글
};

export default commonMutationType;
