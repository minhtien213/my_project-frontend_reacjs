import config from '~/config';
import Home from '~/pages/Home';
import Search from '~/pages/Search';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Phone from '~/pages/Phone';
import Laptop from '~/pages/Laptop';
import Tablet from '~/pages/Tablet';
// import { HeaderOnly } from '~/layouts'; //import layout riêng để thêm vào field layout

const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.phone, component: Phone },
  { path: config.routes.laptop, component: Laptop },
  { path: config.routes.tablet, component: Tablet },
  { path: config.routes.search, component: Search },
  { path: config.routes.login, component: Login, layout: null },
  { path: config.routes.register, component: Register, layout: null },
];

const privateRoutes = [{}];

export { privateRoutes, publicRoutes };
