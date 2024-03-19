import classNames from 'classnames/bind';
import styles from './ProductCard.module.scss';
import { faStar } from '@fortawesome/free-solid-svg-icons';

import Image from '~/components/Image';
import Button from '~/components/Button';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function CardProduct({ item = {}, size }) {
  const cardRef = useRef();
  return (
    <div className={cx('wrapper', size)}>
      <div key={item.id} ref={cardRef} className={cx('card')}>
        <Link to={`/detail/${item.name}`}>
          <Image src={item.images[0]} className={cx('card-img')} alt={item.name} />
        </Link>
        <div className={cx('card-info')}>
          <h3 className={cx('card-title')}>{item.name}</h3>
          <div className={cx('card-price-rating')}>
            <p className={cx('card-price')}>{item.price}đ</p>
            <p className={cx('card-rating')}>
              {item.rating} <FontAwesomeIcon icon={faStar} className={cx('card-rating-star')} />
            </p>
          </div>
          <Button primary to={`/detail/${item.name}`} className={cx('show-detail-btn')}>
            Xem chi tiết
          </Button>
        </div>
      </div>
    </div>
  );
}

export default CardProduct;
