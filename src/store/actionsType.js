/**
 * @description store의 각 action별 action type 관리
 */

const commonActionType = {
    ACTION_BOARD_LIST: 'ACTION_BOARD_LIST', // 게시글 리스트 조회
    ACTION_BOARD_DETAIL: 'ACTION_BOARD_DETAIL', // 게시글 상세 조회
    ACTION_BOARD_COMMENT: 'ACTION_BOARD_COMMENT', // 댓글 조회
    ACTION_BOARD_ADD: 'ACTION_BOARD_ADD', // 게시물 등록
    ACTION_BOARD_UPDATE: 'ACTION_BOARD_UPDATE', // 게시물 수정
    ACTION_BOARD_DELETE: 'ACTION_BOARD_DELETE', // 게시물 삭제
    ACTION_COMMENT_ADD: 'ACTION_COMMENT_ADD', // 댓글 등록
    ACTION_COMMENT_UPDATE: 'ACTION_COMMENT_UPDATE', // 댓글 수정
    ACTION_COMMENT_DELETE: 'ACTION_COMMENT_DELETE', // 댓글 삭제
    ACTION_ID_CHECK: 'ACTION_ID_CHECK', // 중복아이디 체크
    ACTION_ADD_USER: 'ACTION_ADD_USER', // 회원가입
    ACTION_USER_LIST: 'ACTION_USER_LIST', // 사용자 목록
    ACTION_UPDATE_PERMISSION: 'ACTION_UPDATE_PERMISSION', // 회원가입 승인
};

export default commonActionType;