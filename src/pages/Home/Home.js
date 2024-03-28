// import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import PhoneBlock from './ProductBlock';
import config from '~/config';
import { useEffect, useState } from 'react';
import * as productServices from '~/services/productServices';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);

function Home() {
  const [phone, setPhone] = useState([]);
  const [laptop, setLaptop] = useState([]);
  const [tablet, seTablet] = useState([]);
  const [loading, setLoading] = useState(true);

  const pageSize = 6;

  useEffect(() => {
    const fetchPhone = async () => {
      const dataPhone = await productServices.search('phone', 'type', pageSize);
      if (dataPhone) {
        setPhone(dataPhone.data);
      }
      setLoading(false);
    };

    fetchPhone();
  }, []);

  useEffect(() => {
    const fetchLaptop = async () => {
      const dataLaptop = await productServices.search('laptop', 'type', pageSize);
      if (dataLaptop) {
        setLaptop(dataLaptop.data);
      }
      setLoading(false);
    };
    fetchLaptop();
  }, []);

  useEffect(() => {
    const fetchTablet = async () => {
      const dataTablet = await productServices.search('tablet', 'type', pageSize);
      if (dataTablet) {
        seTablet(dataTablet.data);
      }
      setLoading(false);
    };
    fetchTablet();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <PhoneBlock title="Điện thoại" type="phone" to={config.routes.phone} listItems={phone} />
        <PhoneBlock title="Laptop" type="laptop" to={config.routes.laptop} listItems={laptop} />
        <PhoneBlock
          title="Máy tính bảng"
          type="tablet"
          to={config.routes.tablet}
          listItems={tablet}
        />
      </div>
    </div>
  );
}

export default Home;
