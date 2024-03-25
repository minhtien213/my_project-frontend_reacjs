// import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Admin.module.scss';
// import config from '~/config';
// import { useEffect, useState } from 'react';
// import * as productServices from '~/services/productServices';

const cx = classNames.bind(styles);

function Admin() {
  return (
    <div className={cx('wrapper')}>
      <h1>Admin page</h1>
    </div>
  );
}

export default Admin;
