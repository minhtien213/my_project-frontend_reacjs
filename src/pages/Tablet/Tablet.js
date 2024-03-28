import classNames from 'classnames/bind';
import styles from '../Phone/Phone.module.scss';
import * as productServices from '~/services/productServices';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import CardProduct from '~/components/ProductCard';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);

function Tablet() {
  const [tablet, setTablet] = useState([]);
  const [loadmore, setLoadmore] = useState(true);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTablet = async () => {
      const pageSize = 4;
      const dataTablet = await productServices.search('tablet', 'type', pageSize, pageCurrent);
      if (pageCurrent >= dataTablet.totalPages) {
        setLoadmore(false);
      }
      setTablet((prev) => [...prev, ...dataTablet.data]);
    };
    setLoading(false);
    fetchTablet();
  }, [pageCurrent]);

  if (loading) {
    return <Loading />;
  }

  const handleClick = () => {
    setPageCurrent(pageCurrent + 1);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        {tablet.map((item, index) => {
          return <CardProduct key={index} item={item} />;
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
