// import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Order.module.scss';
// import config from '~/config';
// import { useEffect, useState } from 'react';
// import * as productServices from '~/services/productServices';

const cx = classNames.bind(styles);

function Order() {
  return (
    <div className={cx('wrapper')}>
      <h1>Order page</h1>
    </div>
  );
}

export default Order;
