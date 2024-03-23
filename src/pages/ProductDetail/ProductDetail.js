import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';
import * as productServices from '~/services/productServices';
import * as userServices from '~/services/userServices';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '~/components/Button';
import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '~/redux/userSlice';
import { setLocalStorage } from '~/utils/localStorageUtils';

const cx = classNames.bind(styles);

function ProductDetail() {
  const dispatch = useDispatch();
  const [result, setResult] = useState({});
  const [disabledAddCartBtn, setDisabledAddCartBtn] = useState(false);
  const [resultCartBtn, setResultCartBtn] = useState('Thêm vào giỏ hàng');
  const [quantity, setQuantity] = useState(1);

  //get state redux
  const user = useSelector((state) => state.user);
  const userId = user._id;
  const productId = result._id;
  const access_token = localStorage.getItem('access_token');

  //disabled add cart button
  useEffect(() => {
    if (user.cart.length === 0) {
      setDisabledAddCartBtn(false);
      setResultCartBtn('Thêm vào giỏ hàng');
    }
    const prdInCart = [];
    user.cart.forEach((item) => {
      prdInCart.push(item.productId._id);
      if (prdInCart.includes(productId)) {
        setDisabledAddCartBtn(true);
        setResultCartBtn('Đã thêm vào giỏ hàng');
      } else {
        setDisabledAddCartBtn(false);
        setResultCartBtn('Thêm vào giỏ hàng');
      }
    });
  }, [user, productId]);

  // get parameters value
  const { name } = useParams();

  //get product detail
  useEffect(() => {
    const fetchData = async () => {
      const result = await productServices.getDetailProduct(name);
      if (result) {
        setResult(result.data);
      }
    };
    fetchData();
  }, [name]);

  //btn orrder button
  const handleOrrder = async () => {};

  //add cart
  const handleAddCart = async (e) => {
    const data = { userId, productId, quantity };
    const result = await userServices.addCart(access_token, data);
    if (result) {
      setResultCartBtn(result.message);
      setDisabledAddCartBtn(true);
      dispatch(updateUser(result.data));
      setLocalStorage('user', result.data);
    }
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('product-img')}>
        <div className={cx('product-img-larger')}>
          <Image className={cx('product-img-largerimg')} src="" alt="" />
          <FontAwesomeIcon className={cx('faAngleLeft')} icon={faAngleLeft} />
          <FontAwesomeIcon className={cx('faAngleRight')} icon={faAngleRight} />
        </div>
        <div className={cx('product-img-small')}>
          <Image className={cx('product-img-smallimg', 'active')} src="" alt="" />
          <Image className={cx('product-img-smallimg')} src="" alt="" />
          <Image className={cx('product-img-smallimg')} src="" alt="" />
          <Image className={cx('product-img-smallimg')} src="" alt="" />
          <Image className={cx('product-img-smallimg')} src="" alt="" />
        </div>
      </div>

      <div className={cx('product-info')}>
        <div className={cx('product-detail')}>
          <h1 className={cx('product-name')}>{result?.name}</h1>
          <div className={cx('product-price')}>
            <h3 className={cx('product-price-saled')}>{result?.price}đ</h3>
            <h3 className={cx('product-price-cost')}>{result?.price}đ</h3>
          </div>

          <p className={cx('product-des')}>Mô tả: {result?.description}</p>

          <div className={cx('product-quantity')}>
            <label htmlFor="quantity">Số lượng:</label>
            <input
              className={cx('product-quantity-input')}
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              max="10"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>
        <div className={cx('product-btn')}>
          <Button primary onClick={handleOrrder}>
            Mua ngay
          </Button>
          <Button disabled={disabledAddCartBtn} outline onClick={handleAddCart}>
            {/* {resultCart.status === 'OK' ? 'Đã thêm vào giỏ hàng' : 'Thêm vào giỏ hàng'} */}
            {/* Thêm vào giỏ hàng */}
            {resultCartBtn}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
