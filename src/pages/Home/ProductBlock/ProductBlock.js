import classNames from 'classnames/bind';
import styles from '../Home.module.scss';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import Image from '~/components/Image';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function PhoneBlock({ title, type, to, listItems }) {
  const [showScrollLeftBtn, setShowScrollLeftBtn] = useState(false);
  const [showScrollRightBtn, setShowScrollRightBtn] = useState(true);
  const phoneRef = useRef();
  const cardRef = useRef();
  const scrollLeftBtn = useRef();
  const scrollRightBtn = useRef();

  const handleScrollLeft = () => {
    phoneRef.current.scrollLeft -= 660;
    setShowScrollRightBtn(true);
    setShowScrollLeftBtn(false);
  };

  const handleScrollRight = () => {
    phoneRef.current.scrollLeft += 660;
    setShowScrollRightBtn(false);
    setShowScrollLeftBtn(true);
  };

  return (
    <>
      <div className={cx('type-prd')}>
        <h2 className={cx('type-prd-title')}>{title}</h2>
      </div>
      <div className={cx(`scroll-${type}`)}>
        <div ref={phoneRef} className={cx(`${type}`)}>
          {listItems.map((item) => {
            return (
              <div key={item.id} ref={cardRef} className={cx('card')}>
                <Image src={item.images[0]} className={cx('card-img')} alt="" />
                <div className={cx('card-info')}>
                  <h3 className={cx('card-title')}>{item.name}</h3>
                  <p className={cx('card-price')}>{item.price}đ</p>
                  <Button primary className={cx('show-detail-btn')}>
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            );
          })}
          <div className={cx('loadmore')}>
            <Link to={to}>
              <FontAwesomeIcon className={cx('loadmore-btn')} icon={faArrowRight} />
            </Link>
          </div>
        </div>

        {showScrollLeftBtn && (
          <FontAwesomeIcon
            ref={scrollLeftBtn}
            onClick={handleScrollLeft}
            className={cx(`scroll-left-${type}-btn`)}
            icon={faArrowAltCircleLeft}
          />
        )}
        {showScrollRightBtn && (
          <FontAwesomeIcon
            ref={scrollRightBtn}
            onClick={handleScrollRight}
            className={cx(`scroll-right-${type}-btn`)}
            icon={faArrowAltCircleRight}
          />
        )}
      </div>
    </>
  );
}

export default PhoneBlock;
