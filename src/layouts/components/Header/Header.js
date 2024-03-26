//phần header
// import Tippy from '@tippyjs/react';
import { useEffect, useState } from 'react';
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
import CartItem from './CartItem';
import { updateOrder } from '~/redux/orderSlice';

const cx = classNames.bind(styles); //bind object styles trả về biến cx

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showCart, setShowCart] = useState(false);
  const [orderBtn, setOrderBtn] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(null);

  const user = useSelector((state) => state.user);
  const avatarImg = user.images[0];

  //load cart quantity
  useEffect(() => {
    setCartQuantity(user.cart.length);
    if (user.cart.length === 0) {
      setOrderBtn(true);
    } else {
      setOrderBtn(false);
    }
  }, [user]);

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

  //log out
  const handleLogout = () => {
    dispatch(resetUser());
    localStorage.clear();
    navigate('/sign-in');
  };

  //handleclick menu item
  const handleMenuChange = (menuItem) => {
    switch (menuItem.type) {
      case 'logout':
        handleLogout();
        break;
      default:
    }
  };

  //show/hide cart component
  const handleHideCart = () => {
    setShowCart(!showCart);
  };

  //get total price
  const getTotalPrice = (price) => {
    setTotalPrice(price);
  };

  //get list order
  const getListOrder = (list_order) => {
    if (list_order.length === 0) {
      setOrderBtn(true);
    } else {
      setOrderBtn(false);
      dispatch(updateOrder({ list_order, totalPrice }));
    }
  };

  //handle order
  const handleOrder = () => {
    setShowCart(false);
    navigate('/order');
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
              <div className={cx('actions-cart')} onClick={() => setShowCart(!showCart)}>
                <FontAwesomeIcon className={cx('actions-cart-icon')} icon={faCartShopping} />
                <p className={cx('actions-cart-quantity')}>{cartQuantity}</p>
              </div>
              <div className={cx('info-login')}>
                <Menu items={MENU_ITEMS} onChange={handleMenuChange}>
                  <div className={cx('info-login')}>
                    <Link to={`/my-profile/${user._id}`}>
                      <Image
                        className={cx('actions-avatar-img')}
                        src={`${process.env.REACT_APP_BASE_URL_BACKEND}/${avatarImg}`}
                        alt="avatar"
                      />
                    </Link>
                    <span className={cx('name-login')}>{user.name}</span>
                  </div>
                </Menu>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CART component */}
      {showCart && (
        <div className={cx('cart')}>
          <div className={cx('cart-overlay')} onClick={handleHideCart}></div>
          <div className={cx('cart-content')}>
            {user.cart.length !== 0 ? (
              <>
                <div className={cx('cart-items')}>
                  <CartItem
                    data={user.cart}
                    getTotalPrice={getTotalPrice}
                    getListOrder={getListOrder}
                  />
                </div>
                <div className={cx('cart-total-price')}>
                  <>
                    Tổng tiền tạm tính: <p className={cx('total-price')}>{totalPrice}đ</p>
                  </>
                </div>
              </>
            ) : (
              <p className={cx('cart-empty-mes')}>Bạn chưa có sản phẩm nào trong giỏ hàng.</p>
            )}
            <div className={cx('cart-action')}>
              <button className={cx('cart-action-cancel')} onClick={handleHideCart}>
                Hủy
              </button>
              <Button disabled={orderBtn} className={cx('cart-action-order')} onClick={handleOrder}>
                Thanh toán
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
