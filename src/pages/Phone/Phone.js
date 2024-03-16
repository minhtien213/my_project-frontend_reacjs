import classNames from 'classnames/bind';
import styles from './Phone.module.scss';
import * as productServices from '~/services/productServices';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function Phone() {
  const [phone, setPhone] = useState([]);
  const [loadmore, setLoadmore] = useState(true);
  const [pageCurrent, setPageCurrent] = useState(1);

  useEffect(() => {
    const fetchPhone = async () => {
      const dataPhone = await productServices.search('phone', 'type', 4, pageCurrent);
      if (pageCurrent >= dataPhone.totalPages) {
        setLoadmore(false);
      }
      setPhone((prev) => [...prev, ...dataPhone.data]);
    };
    fetchPhone();
  }, [pageCurrent]);

  const handleClick = () => {
    setPageCurrent(pageCurrent + 1);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        {phone.map((item) => {
          return (
            <div key={item.id} className={cx('card')}>
              <Image src="" className={cx('card-img')} alt="" />
              <div className={cx('card-info')}>
                <h3 className={cx('card-title')}>{item.name}</h3>
                <p className={cx('card-price')}>{item.price}đ</p>
                <Button primary className={cx('show-detail-btn')}>
                  Xem chi tiết
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <div className={cx('loadmore')}>
        {loadmore && (
          <Button outline onClick={handleClick}>
            Xem thêm sản phẩm
          </Button>
        )}
      </div>
    </div>
  );
}

export default Phone;
