import config from '~/config';
import Home from '~/pages/Home';
import Search from '~/pages/Search';
import Login from '~/pages/Login';
import ResetPass from '~/pages/ResetPass';
import Register from '~/pages/Register';
import Phone from '~/pages/Phone';
import Laptop from '~/pages/Laptop';
import Tablet from '~/pages/Tablet';
import Profile from '~/pages/Profile';
import ProductDetail from '~/pages/ProductDetail';
import { HeaderOnly } from '~/layouts'; //import layout riêng để thêm vào field layout

const publicRoutes = [
  { path: config.routes.home, component: Home },
  { path: config.routes.phone, component: Phone },
  { path: config.routes.laptop, component: Laptop },
  { path: config.routes.tablet, component: Tablet },
  { path: config.routes.detail, component: ProductDetail, layout: HeaderOnly },
  { path: config.routes.profile, component: Profile },
  { path: config.routes.search, component: Search },
  { path: config.routes.login, component: Login, layout: HeaderOnly },
  { path: config.routes.resetpass, component: ResetPass, layout: HeaderOnly },
  { path: config.routes.register, component: Register, layout: HeaderOnly },
];

const privateRoutes = [{}];

export { privateRoutes, publicRoutes };
