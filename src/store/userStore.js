import Recoil from 'recoil';

export const userState = Recoil.atom({
    key: 'userState',
    default: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
});