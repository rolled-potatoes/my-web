import Main from 'pages/Main';
import Login from 'pages/Login';

const navigationDatas = [
  {
    url: 'login',
    title: '로그인',
    Component: Login,
  },
  {
    url: '/',
    title: '메인',
    Component: Main,
  },
];

export default navigationDatas;
