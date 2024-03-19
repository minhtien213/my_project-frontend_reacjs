import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';
// import * as productServices from '~/services/productServices';
// import { useEffect, useState } from 'react';
// import Button from '~/components/Button';
// import { useDispatch, useSelector } from 'react-redux';
// import CardProduct from '~/components/ProductCard';

const cx = classNames.bind(styles);

function ProductDetail() {
  return <div className={cx('wrapper')}>Product Detail</div>;
}

export default ProductDetail;
