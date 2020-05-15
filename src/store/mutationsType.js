/**
 * @description store의 각 module별 mutation type 관리
 */

const commonMutationType = {
	SET_BOARD_LIST: 'SET_BOARD_LIST', // 게시글 리스트
	SET_BOARD_DETAIL: 'SET_BOARD_DETAIL', // 게시글 상세
	SET_BOARD_COMMENT: 'SET_BOARD_COMMENT', // 게시글 댓글
	SET_BOARD_ADD: 'SET_BOARD_ADD', // 게시글 등록
	SET_BOARD_UPDATE: 'SET_BOARD_UPDATE', // 게시글 수정
	SET_BOARD_DELETE: 'SET_BOARD_DELETE', // 게시글 삭제
};

export default commonMutationType;