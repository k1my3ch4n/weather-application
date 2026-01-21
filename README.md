# 날씨 앱

현재 위치 기반 실시간 날씨 정보 및 시간대별 예보 서비스

## 프로젝트 실행 방법

### 1. 저장소 클론

```bash
git clone https://github.com/k1my3ch4n/weather-application.git
cd weather-application
```

### 2. 의존성 설치

```bash
npm install
```

### 3. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 환경 변수를 추가합니다:

```
KAKAO_REST_API_KEY=your_kakao_api_key
OWM_API_KEY=your_openweathermap_api_key
```

### 4. 개발 서버 실행

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

## 사용한 기술 스택

| 분류             | 기술                         |
| ---------------- | ---------------------------- |
| Framework        | Next.js 16 (App Router)      |
| Language         | TypeScript                   |
| Styling          | Tailwind CSS 4               |
| State Management | TanStack Query (React Query) |
| HTTP Client      | Axios                        |
| Toast            | react-hot-toast              |

## 구현한 기능

### 현재 날씨 표시

- 현재 기온, 체감 온도, 최저/최고 기온 표시
- 날씨 상태 아이콘 및 설명

### 시간대별 예보

- 3시간 단위 예보 정보
- 좌우 스크롤 및 페이드 효과로 UX 개선

### 위치 기반 서비스

- 브라우저 Geolocation API로 현재 위치 감지
- Kakao 역지오코딩으로 좌표 → 주소 변환
- 위치 권한 거부 시 검색 유도 UI 표시

### 위치 검색

- 한국 행정구역 기반 자동완성 검색
- 모달 형태의 검색 UI

### 즐겨찾기 관리

- 최대 6개 즐겨찾기 저장 (localStorage)
- 즐겨찾기 별명 수정 기능
- 각 즐겨찾기의 실시간 날씨 표시

## 프로젝트 구조 (FSD 아키텍처)

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API Route Handlers
│   └── page.tsx           # 메인 페이지
├── widgets/               # 페이지 조합 컴포넌트
│   └── weather-dashboard/
├── features/              # 기능 단위 모듈
│   ├── weather/          # 날씨 조회
│   ├── location/         # 위치 검색
│   └── favorites/        # 즐겨찾기
└── shared/               # 공용 모듈
    ├── api/              # API 인스턴스
    ├── ui/               # 공용 컴포넌트
    └── lib/              # 유틸리티, 훅
```

## 기술 의사결정 및 이유

### Next.js 16 (App Router)

- API Route Handlers 사용으로 별도 백엔드 없이 API 키를 안전하게 서버에서 관리
- 파일 기반 라우팅 으로 직관적인 페이지 구조 관리
- Vercel 을 사용해 간단하게 배포 가능 및 PR 머지시 자동으로 배포 가능

### react-hot-toast

- 간편하게 알림 표시 가능 및 커스터마이징 용이

### OpenWeatherMap API

- 현재 날씨 정보 및 시간대별 날씨 정보 표현 가능, 날씨 아이콘도 사용 가능

### Kakao Local API

- 좌표를 한국식 주소로 변환 가능해 국내 행정구역 검색에 최적화

### Browser Geolocation API

- 별도 라이브러리가 없어도 내장 API 로 사용자의 위치 좌표 획득
- 사용자 권한 동의 기반으로 작동해 개인정보 보호

### localStorage

- 즐겨찾기 데이터를 브라우저에 저장 가능해 별도 서버/DB 없이 데이터 관리 가능
- 새로고침 및 브라우저 재시작해도 데이터가 남아있음

### 정적 JSON 파일 기반 검색 자동완성

- 행정구역 데이터를 json으로 관리
- API 호출 없이 클라이언트에서 필터링

### Vercel

- 별도의 config 설정 없이 즉시 배포 가능
- Github 연동으로 PR 머지시 자동으로 배포 가능
