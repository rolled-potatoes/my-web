import Main from 'pages/Main';
import Login from 'pages/Login';

const navigationDatas = [
  {
    url: 'login',
    title: '로그인',
    Component: Login,
    isAuth: false,
  },
  {
    url: '/',
    title: '메인',
    Component: Main,
    isAuth: true,
  },
];

export default navigationDatas;
