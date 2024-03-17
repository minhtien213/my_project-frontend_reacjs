import classNames from 'classnames/bind';
import styles from '../Phone/Phone.module.scss';
import * as productServices from '~/services/productServices';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import CardProduct from '~/components/CardProduct';

const cx = classNames.bind(styles);

function Laptop() {
  const [laptop, setLaptop] = useState([]);
  const [loadmore, setLoadmore] = useState(true);
  const [pageCurrent, setPageCurrent] = useState(1);

  useEffect(() => {
    const fetchLaptop = async () => {
      const dataLaptop = await productServices.search('laptop', 'type', 1, pageCurrent);
      if (pageCurrent >= dataLaptop.totalPages) {
        setLoadmore(false);
      }
      setLaptop((prev) => [...prev, ...dataLaptop.data]);
    };
    fetchLaptop();
  }, [pageCurrent]);

  const handleClick = () => {
    setPageCurrent(pageCurrent + 1);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        {laptop.map((item, index) => {
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

export default Laptop;
