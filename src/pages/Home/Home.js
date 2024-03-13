// import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import PhoneBlock from './ProductBlock';
import config from '~/config';

const cx = classNames.bind(styles);

function Home() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('content')}>
        <PhoneBlock title="Điện thoại" to={config.routes.phone} />
        <PhoneBlock title="Laptop" to={config.routes.laptop} />
        <PhoneBlock title="Máy tính bảng" to={config.routes.tablet} />
      </div>
    </div>
  );
}

export default Home;
