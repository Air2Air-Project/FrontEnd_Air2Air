# FrontEnd_Air2Air
## 프로젝트 개요
### 주제: 경남 지역 대기 오염 물질 예측 및 알람 시스템
### 개발 목적: 이 프로젝트는 경남 지역 주민들에게 실시간 대기 오염 정보를 제공하여, 건강을 보호하고 생활의 질을 향상시키는 것을 목표로 합니다. 이를 통해 대기 오염에 대한 대응 능력을 강화하고, 환경 인식을 증진시키는 데 기여할 것입니다.<br/>
### 개발 배경 및 필요성: 현재 대기 정보 서비스는 주로 대기 오염 수치를 등급(좋음, 보통, 나쁨)으로만 표현하여, 사용자가 대기 오염의 실제 수치를 정확하게 이해하는 데 어려움을 겪고 있습니다. 또한, 많은 서비스가 미세먼지와 초미세먼지의 예측 정보만 제공하며, 아황산가스, 이산화질소, 일산화탄소 등의 중요한 오염 물질에 대한 정보는 누락되는 경우가 많습니다. 이러한 제한된 정보는 사용자가 대기 오염에 대한 종합적인 이해를 방해하고, 적절한 대처를 어렵게 만듭니다.
<br/>
## 개발환경
- ### 개발 기간: 2024.07.01 ~ 2024.07.28
- ### 프로젝트 팀 구성: 이영인(Backend), 김우정(FrontEnd), 배지현(FrontEnd), 이세련(DataAnalysis)
- ### 개발환경: IDE(Visual Studio Code), 브라우저(Chrome), 프로그래밍 언어(Javascript)
- ### 사용기술: React, Recoil, Axios, Tailwind, HTML5<br><br>
## 주요기능 <a href="https://youtu.be/zqDrgOylsWw">[전체 시연동영상]</a> <br>
1. 실시간 대기오염요소 제공 페이지
- 경남 지역의 미세먼지, 초미세먼지, 오존, 이산화황, 일산화탄소, 이산화질소 농도를 실시간으로 제공
- 미세먼지 측정소의가 있는 읍,면,동의 위치를 폴리곤으로 지도위에 그려 시각화
- 측정소의 실시간 바람 속도, 돌풍, 풍향 정보 제공
- 사용자가 관심 지역을 선택하여 해당 지역의 대기오염 정보를 조회 가능<br><br>
![실시간정보](https://github.com/user-attachments/assets/b5d1d77f-6f38-483b-97d6-6c09a68d2715)<br><br><br>
2. 6가지 대기공해요소 예측 페이지
- 6가지 대기공해요소 농도를 1,2,3시간 후 예측
- 예측 데이터를 시각적으로 표현하여 사용자가 쉽게 이해할 수 있도록 제공<br><br>
![예측 ](https://github.com/user-attachments/assets/52b8579d-7237-42a6-b292-bd08ba8b4a62)<br><br><br>
3. 도시공해지수, 대기환경지수, 야외활동지수 표현 및 알람페이지
- 각 지수를 실시간으로 계산하여 시각적으로 표현 및 제공
-  특정기준을 초과할 경우 사용자에게 경고 알림 제공<br><br>
![알람](https://github.com/user-attachments/assets/f87a3025-bebc-4af2-a079-842df114ed29)<br><br><br>
5. 문의게시판 페이지
- 사용자가질문,의견,건의사항등을게시할수있는게시판제공
- 관리자와 사용자가 상호작용할 수 있는 기능 제공
- 게시물 작성, 수정, 삭제 기능<br><br>
![게시판](https://github.com/user-attachments/assets/5850cd93-613b-4a49-ab67-79ae51ad43fb)<br><br><br>
## 개발과정
### 24.05.28 ~ 24.06.28

