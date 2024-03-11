import config from '~/config';
import Home from '~/pages/Home';
import Search from '~/pages/Search';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
// import { HeaderOnly } from '~/layouts'; //import layout riêng để thêm vào field layout

const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.search, component: Search, layout: null },
  { path: config.routes.login, component: Login, layout: null },
  { path: config.routes.register, component: Register, layout: null },
];

const privateRoutes = [{}];

export { privateRoutes, publicRoutes };
