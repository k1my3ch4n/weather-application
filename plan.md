# Weather Application 개발 계획

## Phase 1: 프로젝트 초기화

- [x] Next.js 프로젝트 생성
- [x] FSD 아키텍처 설정 및 path alias 추가
- [x] @tanstack/react-query, axios 의존성 설치
- [x] Github Actions CI 설정

## Phase 2: 기본 구조 설정

- [x] Tanstack Query Provider 생성
- [x] Root Layout에 providers 설정
- [x] 반응형 글로벌 스타일 설정

## Phase 3: API 연동

- [x] Kakao REST API axios 인스턴스 설정
- [x] OpenWeatherMap REST API axios 인스턴스 설정
- [x] useCoordinates hook 생성 (주소 → 좌표)
- [x] useWeather hook 생성 (현재 날씨)
- [x] useForecast hook 생성 (시간대별 예보)
- [x] API 프록시용 route 추가 (kakao, owm)
- [x] 클라이언트/서버 axios 인스턴스 분리

## Phase 4: 즐겨찾기 기능

- [x] useFavorites hook 생성 (localStorage 연동)
- [x] FavoriteCard 컴포넌트 생성
- [x] 즐겨찾기 추가/삭제 기능
- [x] 즐겨찾기 nickname 변경 기능
- [x] IconButton 공용 컴포넌트 생성

## Phase 5: 역지오코딩 및 위치 기반

- [x] useGeolocation hook 생성 (브라우저 위치 정보)
- [x] useReverseGeocode hook 생성 (좌표 → 주소)
- [x] WeatherDashboard 위젯 컴포넌트 생성
- [x] useWeatherDashboard 통합 hook 생성
- [x] 메인 페이지에 역지오코딩 적용

## Phase 6: UI/UX 개선

### 6-1. 시맨틱 HTML

- [x] Modal, FavoriteCard, FavoriteList에 semantic html 적용
- [x] CurrentWeather, HourlyForecast, ForecastItem에 적용
- [x] IconButton, InfoLabel, WeatherDashboard에 적용

### 6-2. 스켈레톤 UI

- [x] Skeleton 공용 컴포넌트 생성
- [x] FavoriteCard, CurrentWeather, HourlyForecast 스켈레톤 생성
- [x] WeatherDashboard에 스켈레톤 적용

### 6-3. 리팩토링

- [x] useWeatherDashboard 관심사별 분리
- [x] react-hot-toast 적용 (alert 대체)
- [x] 반응형 폰트 사이즈 수정

### 6-4. 날씨 API 개선

- [x] 최저/최고 기온을 전체 데이터에서 가져오기
- [x] FavoriteList 즐겨찾기 아이콘 추가

## Phase 7: 버그 수정 및 안정화

### 7-1. 스크롤 및 메타데이터

- [x] 위치 기반 역지오코딩 버그 수정 (requestLocation 호출 누락)
- [x] 시간대별 날씨 스크롤 페이드 효과 추가
- [x] 메타데이터 및 언어 설정 수정 (ko)

### 7-2. 위치 UX 개선

- [x] 위치 로딩 중 기본 주소가 잠깐 보이는 버그 수정
- [x] 위치 정보 없을 때 검색 유도 UI 표시
- [x] LocationSearchPrompt 컴포넌트 분리
- [x] API 에러 처리 및 로깅 추가

## Phase 8: 배포 및 문서화

- [x] Vercel 배포 설정
- [x] plan.md 개발 계획서 정리
- [x] README 업데이트 (실행 방법, 기술 스택, 구현 기능, 기술 의사결정)
