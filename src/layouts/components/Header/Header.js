//phần header
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'; // optional
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; //import list icon
import { faSignOut, faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import styles from './Header.module.scss';
import images from '~/assets/images';
import Button from '~/components/Button';
import Menu from '~/components/Popper/Menu';
import Search from '../Search';
import config from '~/config';
import Image from '~/components/Image';
import { resetUser } from '~/redux/userSlice';

const cx = classNames.bind(styles); //bind object styles trả về biến cx

function Header() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const avatarImg = user.images[0];

  const MENU_ITEMS = [
    {
      icon: <FontAwesomeIcon icon={faUser} />,
      title: 'Quản lí tài khoản',
      type: 'profile',
      to: `/my-profile/${user._id}`,
    },
    {
      icon: <FontAwesomeIcon icon={faSignOut} />,
      title: 'Đăng xuất',
      // to: `${config.routes.login}`,
      type: 'logout',
      border: true, //field tạo border
    },
  ];

  const handleLogout = () => {
    dispatch(resetUser());
    localStorage.clear();
    navigate('/sign-in');
  };

  //xử lí khi click vào menu item
  const handleMenuChange = (menuItem) => {
    switch (menuItem.type) {
      case 'logout':
        handleLogout();
        break;
      default:
    }
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
          {user.name === '' ? (
            <>
              <Button primary to={'/sign-in'}>
                Đăng nhập
              </Button>
            </>
          ) : (
            <div className={cx('actions-login')}>
              <Tippy content="Giỏ hàng" placement="bottom">
                <FontAwesomeIcon className={cx('actions-cart-icon')} icon={faCartShopping} />
              </Tippy>
              <div className={cx('info-login')}>
                <Menu items={MENU_ITEMS} onChange={handleMenuChange}>
                  <div className={cx('info-login')}>
                    <Link to={config.routes.profile}>
                      <Image className={cx('actions-avatar-img')} src={`${process.env.REACT_APP_BASE_URL_BACKEND}/${avatarImg}`} alt="avatar" />
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
