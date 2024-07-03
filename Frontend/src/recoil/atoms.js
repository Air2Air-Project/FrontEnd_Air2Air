import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: JSON.parse(localStorage.getItem('USER')) || null, // 새로고침 시 로컬 스토리지에서 사용자 정보 가져오기
  effects_UNSTABLE: [
    ({ onSet }) => { //atom의 상태가 변경될 때 로컬 스토리지에 해당값을 동기화
      onSet(newValue => { //변경될 때 호출된다.
        if (newValue) {
          localStorage.setItem('USER', JSON.stringify(newValue));
        } else {
          localStorage.removeItem('USER');
        }
      });
    },
  ],
});

export const userLocationState = atom({
  key: 'userLocationState',
  default: localStorage.getItem('USER_LOCATION') || null,
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet(newValue => {
        if (newValue) {
          localStorage.setItem('USER_LOCATION', newValue);
        }
      });
    },
  ],
});

export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: JSON.parse(localStorage.getItem('IS_LOGGED_IN')) || false,
  effects_UNSTABLE: [
    ({ onSet }) => {
      onSet(newValue => {
        localStorage.setItem('IS_LOGGED_IN', JSON.stringify(newValue));
      });
    },
  ],
});

export const alertState = atom({
  key: 'alertState',
  default: [],
});

export const alertCountState = atom({
  key: 'alertCountState',
  default: (() => {
    const savedAlertCount = localStorage.getItem('alertCount');
    return savedAlertCount !== null ? parseInt(savedAlertCount, 10) : 0;
  })(),
  effects: [
    ({ onSet }) => {
      onSet(newValue => {
        localStorage.setItem('alertCount', newValue);
      });
    },
  ],
});
export const alertLoadingState = atom({
  key: 'alertLoadingState',
  default: true,
});
