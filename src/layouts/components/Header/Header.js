//phần header
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; //import list icon
import {
  faMoon,
  faGear,
  faSignOut,
  faUser,
  faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import Search from '../Search';
import config from '~/config';
import Image from '~/components/Image';

const cx = classNames.bind(styles); //bind object styles trả về biến cx

//menu chưa login
const MENU_ITEMS = [
  {
    icon: <FontAwesomeIcon icon={faMoon} />,
    title: 'Chế độ tối',
  },
  {
    icon: <FontAwesomeIcon icon={faSignOut} />,
    title: 'Đăng nhập',
    to: '/sign-in',
    border: true, //field tạo border
  },
];

//menu đã login
const MENU_ITEMS_LOGIN = [
  {
    icon: <FontAwesomeIcon icon={faUser} />,
    title: 'Quản lí tài khoản',
    to: '/',
  },
  {
    icon: <FontAwesomeIcon icon={faGear} />,
    title: 'Cài đặt',
    to: '/settings',
  },
  {
    icon: <FontAwesomeIcon icon={faSignOut} />,
    title: 'Đăng xuất',
    to: '/sign-in',
    border: true, //field tạo border
  },
];

function Header() {
  const user = useSelector((state) => state.user);
  //xử lí khi click vào menu item
  const handleMenuChange = (menuItem) => {
    // switch (menuItem.type) {
    //   case 'language':
    //     //logic thay đổi ngôn ngữ...
    //     break;
    //   default:
    // }
  };

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <div className={cx('logo')}>
          <Link to={config.routes.home}>
            <img className={cx('logo-img')} src={images.logo} alt="logo" />
          </Link>
        </div>

        <div className={cx('search')}>
          <Search />
        </div>

        <div className={cx('actions')}>
          {!user ? (
            <>
              <Button primary>Đăng nhập</Button>
            </>
          ) : (
            <div className={cx('actions-login')}>
              <Tippy content="Giỏ hàng" placement="bottom">
                <FontAwesomeIcon className={cx('actions-cart-icon')} icon={faCartShopping} />
              </Tippy>
              <div className={cx('info-login')}>
                <Menu items={user ? MENU_ITEMS_LOGIN : MENU_ITEMS} onChange={handleMenuChange}>
                  <div className={cx('info-login')}>
                    <Link to={config.routes.profile}>
                      <Image className={cx('actions-avatar-img')} src="" alt="avatar" />
                    </Link>
                    <span className={cx('name-login')}>{user.name}</span>
                  </div>
                </Menu>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
