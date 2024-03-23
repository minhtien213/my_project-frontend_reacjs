import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import * as userServices from '~/services/userServices';
import { updateUser } from '~/redux/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setLocalStorage } from '~/utils/localStorageUtils';

const cx = classNames.bind(styles);

function CartItem({ data = [], getTotalPrice }) {
  const dispatch = useDispatch();
  const [cartItemId, setCartItemId] = useState('');
  const [listChecked, setListChecked] = useState([]);
  const userId = useSelector((state) => state.user._id);
  const access_token = localStorage.getItem('access_token');

  //set checked checkbox load component
  useEffect(() => {
    const totalPrices = [];
    data.forEach((item) => {
      setListChecked((prev) => [...prev, item.productId._id]);
      const pr = item.productId.price;
      const sl = item.quantity;
      const tl = pr * sl;
      totalPrices.push(tl);
    });
    const total = totalPrices.reduce((acc, cur) => acc + cur, 0);
    getTotalPrice(total);
  }, [data]);

  //get id cartitem
  const handleDeleteCartItem = (cartItem_id) => {
    setCartItemId(cartItem_id);
  };

  //delete cart item
  useEffect(() => {
    if (cartItemId !== '') {
      const fetchData = async () => {
        const dataCartItemRemove = { userId, cartItemId };
        const result = await userServices.removeCartItem(access_token, dataCartItemRemove);
        if (result) {
          dispatch(updateUser(result.data));
          setLocalStorage('user', result.data);
        }
      };
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItemId]);

  const handleChangeCheckox = (e) => {
    const cartItemId = e.target.value;
    setListChecked((prev) => {
      //thay đổi list cartItemId checked
      const isChecked = prev.includes(cartItemId); //theo dõi checkbox đã checked hay chưa
      if (isChecked) {
        return prev.filter((item) => item !== cartItemId); //nếu đã checked thì loại cartItemId đó ra khỏi mảng checked
      } else {
        return [...prev, cartItemId]; //nếu chưa thì giữ các cartItemId cũ và thêm cartItemId mới
      }
    });
  };

  useEffect(() => {
    //handle orrder
  }, [listChecked]);

  return (
    <>
      {data?.map((item, index) => {
        return (
          <div key={index} className={cx('cart-item')}>
            <div className={cx('cart-prd-info')}>
              <input
                type="checkbox"
                checked={listChecked.includes(item.productId._id)}
                name={`checkbox-${index}`}
                value={item.productId._id}
                onChange={handleChangeCheckox}
              />

              <h3 htmlFor={`quantity_${index}`}>{item.productId.name}</h3>
              <p className={cx('cart-prd-price')}>{item.productId.price}</p>
              <input
                className={cx('cart-prd-input')}
                type="number"
                id={`quantity_${index}`}
                name={index}
                min="1"
                max="10"
                defaultValue={item.quantity}
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
