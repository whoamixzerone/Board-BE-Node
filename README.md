# Board-BE-Node
초심의 마음으로 Node.js 게시판 구현  

## 프로젝트 소개
이전 회사에서는 백엔드 사용이 전혀 없어서 개인적으로 공부를 했었어야 했는데 안주하는 바람에 많이 잊어버렸다.

그래서 웹 프로그래밍을 처음 할 때 가장 많이 하는 게시판 구현을 통해서 다시 초심 마음으로 배우려고 한다.

마침 Node.js도 처음 사용해 본다.  
개인 공부 및 프로젝트이기 때문에 한 단계, 한 단계씩 목표를 잡고 구현을 해보려고 한다.

프론트 엔드는 react로 구현된 오픈 소스를 사용하여 지금은 백엔드에만 집중하려고 한다.

## 사용 기술(Skill)
* Node.js
* MySQL(sequelize)
* jest(test)

## 프로젝트 기능
* 게시판 - CRUD, 조회수, 댓글
* 사용자 - 회원가입, 로그인, 로그아웃, 세션, 권한

프로젝트의 기능은 한 단계씩 증가 시키면서 구현을 하려고 한다.

👉 [프로젝트 ToDo](https://github.com/whoamixzerone/Board-BE-Node/blob/main/TODO.md)

## 요구사항
### eslint, prettier 코드 스타일 일관성
### 유닛 테스트 작성
### 게시판 관리
* 게시글 생성
    * 제목, 내용을 입력하여 생성(with 조회수)
    * 제목, 내용은 필수 입력사항
* 게시글 수정
* 게시글 삭제
    * 삭제된 게시글 복구 가능
* 게시글 복구
* 게시글 상세
    * 상세보기하면 조회수가 1 증가(횟수 제한 없음)
* 게시글 목록
### 유저 관리
* 회원 가입
    * 이메일을 id로 사용
    * 이메일, 비밀번호, 이름 입력하여 가입
    * 이메일, 비밀번호, 이름 필수 입력사항
* 로그인
    * JWT Token 사용
    * access_token, refresh_token 사용
    * refresh_token은 유저 데이터에 저장
* 로그아웃
    * refresh_token 삭제

## Postman API
👉 [Postman](https://documenter.getpostman.com/view/21399959/UzBjtoAV)

## API 설계
![api-design](https://user-images.githubusercontent.com/67082984/174292989-a8a60a2a-cd43-4804-802f-109b1f686ef4.png)

## DB 설계
👉 [DB 설계](https://github.com/whoamixzerone/Board-BE-Node/wiki#DB%20%EC%84%A4%EA%B3%84)
