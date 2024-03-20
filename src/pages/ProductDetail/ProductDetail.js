import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';
import * as productServices from '~/services/productServices';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import Image from '~/components/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
// import { useDispatch, useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function ProductDetail() {
  const [result, setResult] = useState();

  console.log(result);

  useEffect(() => {
    const fetchData = async () => {
      const pathname = window.location.pathname;
      const parts = pathname.split('/');
      const name = parts[parts.length - 1];
      const result = await productServices.getDetailProduct(name);
      if (result) {
        setResult(result.data);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('product-img')}>
        <div className={cx('product-img-larger')}>
          <Image className={cx('product-img-largerimg')} src="" alt="" />
          <FontAwesomeIcon className={cx('faAngleLeft')} icon={faAngleLeft} />
          <FontAwesomeIcon className={cx('faAngleRight')} icon={faAngleRight} />
        </div>
        <div className={cx('product-img-small')}>
          <Image className={cx('product-img-smallimg')} src="" alt="" />
          <Image className={cx('product-img-smallimg')} src="" alt="" />
          <Image className={cx('product-img-smallimg')} src="" alt="" />
          <Image className={cx('product-img-smallimg')} src="" alt="" />
          <Image className={cx('product-img-smallimg')} src="" alt="" />
        </div>
      </div>

      <div className={cx('product-info')}>
        <div className={cx('product-detail')}>
          <h1 className={cx('product-name')}></h1>
          <div className={cx('product-price')}>
            <h3 className={cx('product-price-saled')}></h3>
            <h3 className={cx('product-price-cost')}></h3>
          </div>
          <p className={cx('product-des')}></p>
        </div>
        <div className={cx('product-btn')}>
          <Button primary>Mua ngay</Button>
          <Button outline>Thêm vào giỏ hàng</Button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
