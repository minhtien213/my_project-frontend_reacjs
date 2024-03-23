import classNames from 'classnames/bind';
import styles from './Phone.module.scss';
import * as productServices from '~/services/productServices';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import CardProduct from '~/components/ProductCard';

const cx = classNames.bind(styles);

function Phone() {
  const [phone, setPhone] = useState([]);
  const [loadmore, setLoadmore] = useState(true);
  const [pageCurrent, setPageCurrent] = useState(1);

  useEffect(() => {
    const fetchPhone = async () => {
      const pageSize = 4;
      const dataPhone = await productServices.search('phone', 'type', pageSize, pageCurrent);
      if (pageCurrent >= dataPhone.totalPages) {
        setLoadmore(false);
      }
      setPhone((prev) => [...prev, ...dataPhone.data]);
      // setPhoneFilter((prev) => [...prev, ...dataPhone.data]);
    };
    fetchPhone();
  }, [pageCurrent]);

  const handleClick = () => {
    setPageCurrent(pageCurrent + 1);
  };

  // const handleChangeSelect = (value) => {
  //   switch (value) {
  //     case 'apple':
  //       const apples = phoneFilter.filter((item) => {
  //         return item.brand === 'apple';
  //       });
  //       setPhone(apples);
  //       break;
  //     case 'vivo':
  //       const vivos = phoneFilter.filter((item) => {
  //         return item.brand === 'vivo';
  //       });
  //       setPhone(vivos);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('filters')}>
        <p className={cx('filters-label')}>Lọc theo: </p>
        <select
          // onChange={(e) => handleChangeSelect(e.target.value)}
          className={cx('filters-select')}
          name="brand"
        >
          <option value="">---Thương hiệu---</option>
          <option value="apple">Apple</option>
          <option value="vivo">Vivo</option>
          <option value="samsung">Samsung</option>
        </select>
      </div>
      <div className={cx('content')}>
        {phone.map((item, index) => {
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

export default Phone;
