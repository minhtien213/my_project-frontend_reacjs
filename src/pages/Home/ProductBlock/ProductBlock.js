import classNames from 'classnames/bind';
import styles from '../Home.module.scss';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import CardProduct from '../../../components/ProductCard/ProductCard';

const cx = classNames.bind(styles);

function PhoneBlock({ title, type, to, listItems }) {
  const [showScrollLeftBtn, setShowScrollLeftBtn] = useState(false);
  const [showScrollRightBtn, setShowScrollRightBtn] = useState(true);
  const phoneRef = useRef();
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
          {listItems.map((item, index) => {
            return <CardProduct key={index} item={item} size="home-page-size" />;
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
