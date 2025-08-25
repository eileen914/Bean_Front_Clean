# Bean - 카페 운영 플랫폼

카페 큐레이팅 서비스 **Bean(빈자리)** 의 프론트엔드 저장소입니다.  
React 기반으로 개발되었으며, Django REST API 백엔드와 연동됩니다.  

---

## ✨ 주요 기능
### 점주측 기능
- 회원가입 및 로그인 (JWT 인증 기반)
- 카페 등록 및 좌석 배치도 자동 생성
- 실시간 좌석 상태 업데이트
### 유저측 기능
- 지도 기반 카페 탐색
- 챗봇 ai로 자연어 기반 카페 탐색
- 실시간 좌석 상태 확인
- 빈 좌석 예약

---

## 🛠️ 기술 스택

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6.3.0-CA4245?logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.11.0-5A29E4?logo=axios&logoColor=white)
![react-cookie](https://img.shields.io/badge/react--cookie-8.0.1-FF9800?logo=react&logoColor=white)
![cookies](https://img.shields.io/badge/cookies-0.9.1-795548?logo=npm&logoColor=white)


## 📁 프로젝트 구조

```
src/
├── pages/           # 페이지 컴포넌트
│   ├── DefaultLanding.js
│   ├── CafeLanding.js
│   ├── CafeSignIn.js
│   ├── CafeRegister1.js
│   ├── CafeRegister2.js
│   ├── CafeMapCreating.js
│   └── CafeMapCreated.js
├── App.js           # 메인 앱 컴포넌트
├── index.js         # 진입점
└── index.css        # 전역 스타일
```

## 🎯 주요 기능

- **단계별 등록 프로세스**: 2단계로 나뉜 업체 등록
- **진행 상황 표시**: 현재 단계를 시각적으로 표시
- **폼 검증**: 필수 필드 검증 및 사용자 피드백
- **로딩 애니메이션**: 사용자 경험 향상을 위한 애니메이션
- **성공 피드백**: 등록 완료 시 축하 메시지 및 다음 단계 안내

## 📝 라우팅 흐름

```
Default Landing
    ↓ (카페를 운영하는 점주입니다)
Cafe Landing
    ↓ (로그인)
Cafe SignIn
    ↓ (업체 등록하기)
Cafe Register 1
    ↓ (업체 등록하기)
Cafe Register 2
    ↓ (업체 등록 완료하기)
Cafe Map Creating (3초 대기)
    ↓ (자동 이동)
Cafe Map Created
```
