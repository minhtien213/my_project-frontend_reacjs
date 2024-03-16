import classNames from 'classnames/bind';
import styles from '../Phone/Phone.module.scss';
import * as productServices from '~/services/productServices';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function Tablet() {
  const [tablet, setTablet] = useState([]);
  const [loadmore, setLoadmore] = useState(true);
  const [pageCurrent, setPageCurrent] = useState(1);

  useEffect(() => {
    const fetchTablet = async () => {
      const dataTablet = await productServices.search('tablet', 'type', 1, pageCurrent);
      if (pageCurrent >= dataTablet.totalPages) {
        setLoadmore(false);
      }
      setTablet((prev) => [...prev, ...dataTablet.data]);
    };
    fetchTablet();
  }, [pageCurrent]);

  const handleClick = () => {
    setPageCurrent(pageCurrent + 1);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        {tablet.map((item) => {
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

export default Tablet;