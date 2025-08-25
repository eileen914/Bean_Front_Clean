# Bean - 카페 운영 플랫폼

카페 큐레이팅 서비스 **Bean(빈자리)** 의 프론트엔드 저장소입니다.  
React 기반으로 개발되었으며, Django REST API 백엔드와 연동됩니다.  


## 주요 기능

### 점주측 기능
- 회원가입 및 로그인 (JWT 인증 기반)
- 카페 등록 및 좌석 배치도 자동 생성
- 실시간 좌석 상태 업데이트

### 유저측 기능
- 지도 기반 카페 탐색
- 챗봇 AI로 자연어 기반 카페 검색
- 실시간 좌석 상태 확인
- 빈 좌석 예약


## 🛠️ 기술 스택

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-6.3.0-CA4245?logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.11.0-5A29E4?logo=axios&logoColor=white)
![react-cookie](https://img.shields.io/badge/react--cookie-8.0.1-FF9800?logo=react&logoColor=white)
![cookies](https://img.shields.io/badge/cookies-0.9.1-795548?logo=npm&logoColor=white)


## 실행 방법

### 저장소 클론
```bash
git clone https://github.com/cho58/bean-frontend.git
cd bean-frontend
```

### 패키지 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm start
```


## 연동 안내

이 프론트엔드 프로젝트는 백엔드 API 서버 및 모바일 앱과 연동되어 동작합니다.

- **백엔드 저장소 (Django REST API)** → [Bean Backend](https://github.com/ajy121650/beanBack)  
- **모바일 앱 저장소 (React Native / Expo)** → (추가 예정)

> ⚠️ 프론트엔드 실행 시 반드시 백엔드 서버가 실행 중이어야 합니다.


## 프로젝트 구조

```
Bean_Front_Clean/
├── public/                      # 정적 파일 (index.html 등)
├── src/
│   ├── apis/                    # API 호출 모듈
│   ├── assets/                  # 이미지, 아이콘 등 정적 자원
│   ├── components/              # 재사용 가능한 UI 컴포넌트
│   │   ├── RatingTag/           # 별점 태그 컴포넌트
│   │   ├── CafeList.*           # 개별 카페 카드 UI
│   │   ├── ChairDetection.*     # 도면 제작을 위한 의자 요소 감지 컴포넌트
│   │   ├── DetailMap.jsx        # 개별 카페 위치 나타내는 지도 컴포넌트
│   │   ├── Kakaomap.jsx         # 검색된 카페 위치 나타내는 지도 컴포넌트
│   │   ├── MenuDropdown.jsx     # 점주측에서 사용하는 메뉴 드롭다운
│   │   ├── SeatMetaCard.선스

본 프로젝트의 모든 권리는 프로젝트 팀 **조미유양반김** 에게 있습니다.  
무단 복제 및 배포를 금지합니다.

