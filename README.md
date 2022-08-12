# Board-BE-Node
초심의 마음으로 Node.js 게시판 구현  

## 프로젝트 소개
이전 회사에서는 백엔드 사용이 전혀 없어서 개인적으로 공부를 했었어야 했는데 안주하는 바람에 많이 잊어버렸다.

그래서 웹 프로그래밍을 처음 할 때 가장 많이 하는 게시판 구현을 통해서 다시 초심 마음으로 배우려고 한다.

마침 Node.js도 처음 사용해 본다.  
개인 공부 및 프로젝트이기 때문에 한 단계, 한 단계씩 목표를 잡고 구현을 해보려고 한다.

프론트 엔드는 react로 구현된 오픈 소스를 사용하여 지금은 백엔드에만 집중하려고 한다.

## 사용 기술(Skill)
<p><img alt ="icon" wide ="60" height="60" src="https://www.svgrepo.com/show/354118/nodejs.svg" />
<img alt= "icon" wide="60" height="60" src ="https://techstack-generator.vercel.app/mysql-icon.svg" />
<img alt ="icon" wide ="60" height="60" src="https://www.svgrepo.com/show/374071/sequelize.svg" />
<img src="https://techstack-generator.vercel.app/jest-icon.svg" alt="icon" width="60" height="60" />
<img src="https://techstack-generator.vercel.app/eslint-icon.svg" alt="icon" width="60" height="60" /><img src="https://techstack-generator.vercel.app/prettier-icon.svg" alt="icon" width="60" height="60" /></p>

## 프로젝트 기능
* 게시판 - CRUD, 조회수, 댓글
* 사용자 - 회원가입, 로그인, 로그아웃

프로젝트의 기능은 한 단계씩 증가 시키면서 구현을 하려고 한다.

👉 [프로젝트 ToDo](https://github.com/whoamixzerone/Board-BE-Node/blob/main/TODO.md)

## 요구사항
### eslint, prettier 코드 스타일 일관성
### 유닛 테스트 작성
### 인증 및 검증
* 토큰 인증
* 게시글 검증
   * 작성한 작성자만 수정,삭제,복구 가능
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
   * access_token 사용    
* 로그아웃
   * 클라이언트에서 삭제
* 토큰 재발급
   * 만료 시 재발급 요청

## Postman API
👉 [Postman](https://documenter.getpostman.com/view/21399959/UzBjtoAV)

## API 설계
* 게시판 관리  
![board-post-api](https://user-images.githubusercontent.com/67082984/184362915-6292e011-a6c9-4597-b7a3-0757de10299d.png)

* 유저 관리  
![board-user-api](https://user-images.githubusercontent.com/67082984/184362947-f38a8785-19e6-4475-8d96-beece419997c.png)



## DB 설계
![simple-board-erd](https://user-images.githubusercontent.com/67082984/183644324-66b6445d-6779-49b1-a27a-089ad57f124b.png)
