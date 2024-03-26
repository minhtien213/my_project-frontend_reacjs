import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import * as userServices from '~/services/userServices';
import { updateUser } from '~/redux/userSlice';
import { useSelector, useDispatch } from 'react-redux';

const cx = classNames.bind(styles);

function CartItem({ data = [], getTotalPrice, getListOrder }) {
  const dispatch = useDispatch();
  const [listChecked, setListChecked] = useState([]);
  const [carts, setCarts] = useState([]);
  const userId = useSelector((state) => state.user._id);
  const access_token = localStorage.getItem('access_token');
  const list_order = useSelector((state) => state.order.list_order);

  //assign state carts = data[]
  useEffect(() => {
    setCarts(data);
  }, [data]);

  //set checked checkbox load component
  useEffect(() => {
    if (list_order.length > 0) {
      list_order.forEach((item) => {
        setListChecked((prev) => [...prev, item.productId._id]);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carts]);

  //delete cart item
  const handleDeleteCartItem = (cartItemId) => {
    if (cartItemId !== '') {
      const fetchData = async () => {
        const dataCartItemRemove = { userId, cartItemId };
        const result = await userServices.removeCartItem(access_token, dataCartItemRemove);
        if (result) {
          dispatch(updateUser(result.data));
        }
      };
      fetchData();
    }
  };

  //handle change checkbox
  const handleChangeCheckbox = (e) => {
    const cartItemId = e.target.value;
    setListChecked((prev) => {
      const isChecked = prev.includes(cartItemId); //theo dõi checkbox đã checked hay chưa
      if (isChecked) {
        return prev.filter((item) => item !== cartItemId); //nếu đã checked thì loại cartItemId đó ra khỏi mảng checked
      } else {
        return [...prev, cartItemId]; //nếu chưa thì giữ các cartItemId cũ và thêm cartItemId mới
      }
    });
  };

  //total price + list order
  useEffect(() => {
    let totalPrice = 0;
    if (listChecked.length !== 0) {
      const list_order = carts.filter((item) => listChecked.includes(item.productId._id));
      getListOrder(list_order);

      list_order.forEach(
        (item) => (totalPrice += parseFloat(item.productId.price * item.quantity)),
      );
    } else {
      totalPrice = 0;
      getListOrder([]);
    }
    getTotalPrice(totalPrice);
  }, [listChecked, carts, getTotalPrice, getListOrder]);

  //handle change input quantity
  const handleChangeInputQuantity = (e, cartItemId) => {
    const newQuantity = e.target.value;
    setCarts((prev) =>
      prev.map((item) => {
        if (item.productId._id === cartItemId) {
          return { ...item, quantity: newQuantity };
        } else {
          return item;
        }
      }),
    );
  };

  return (
    <>
      {carts?.map((item, index) => {
        return (
          <div key={index} className={cx('cart-item')}>
            <div className={cx('cart-prd-info')}>
              <input
                type="checkbox"
                checked={listChecked.includes(item.productId._id)}
                name={`checkbox-${index}`}
                value={item.productId._id}
                onChange={handleChangeCheckbox}
              />

              <h3 htmlFor={`quantity_${index}`}>{item.productId.name}</h3>
              <p className={cx('cart-prd-price')}>{item.productId.price}đ</p>
              <input
                className={cx('cart-prd-input')}
                type="number"
                id={`quantity_${index}`}
                name={index}
                min="1"
                max="10"
                value={item.quantity}
                onChange={(e) => handleChangeInputQuantity(e, item.productId._id)}
              />
            </div>

            <div
              className={cx('cart-delete')}
              data-id={item._id}
              onClick={(e) => handleDeleteCartItem(e.currentTarget.dataset.id)}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </div>
          </div>
        );
      })}
    </>
  );
}

export default CartItem;
