// import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Order.module.scss';
import { useSelector } from 'react-redux';

const cx = classNames.bind(styles);

function Order() {
  const list_order = useSelector((state) => state.order);
  console.log(list_order);
  return (
    <div className={cx('wrapper')}>
      <h1>Order page</h1>
    </div>
  );
}

export default Order;
