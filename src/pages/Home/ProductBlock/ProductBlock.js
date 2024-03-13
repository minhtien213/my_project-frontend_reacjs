import classNames from 'classnames/bind';
import styles from '../Home.module.scss';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

import logo from '~/assets/images/logo.png';
import Image from '~/components/Image';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft, faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function PhoneBlock({ title, to }) {
  const phoneRef = useRef(null);

  const handleScrollLeft = () => {
    phoneRef.current.scrollLeft -= 880;
  };
  const handleScrollRight = () => {
    phoneRef.current.scrollLeft += 880;
  };
  return (
    <div className={cx('scroll-phone')}>
      <div className={cx('type-prd')}>
        <h2 className={cx('type-prd-title')}>{title}</h2>
        <Link className={cx('type-prd-loadmore')} to={to}>
          Xem tất cả...
        </Link>
      </div>
      <div ref={phoneRef} className={cx('phone')}>
        <div className={cx('card')}>
          <Image src={logo} className={cx('card-img')} alt="" />
          <div className={cx('card-info')}>
            <h3 className={cx('card-title')}>Card title</h3>
            <p className={cx('card-price')}>1.000.000đ</p>
            <Button primary className={cx('show-detail-btn')}>
              Xem chi tiết
            </Button>
          </div>
        </div>
        <div className={cx('card')}>
          <Image src={logo} className={cx('card-img')} alt="" />
          <div className={cx('card-info')}>
            <h3 className={cx('card-title')}>Card title</h3>
            <p className={cx('card-price')}>1.000.000đ</p>
            <Button primary className={cx('show-detail-btn')}>
              Xem chi tiết
            </Button>
          </div>
        </div>
        <div className={cx('card')}>
          <Image src={logo} className={cx('card-img')} alt="" />
          <div className={cx('card-info')}>
            <h3 className={cx('card-title')}>Card title</h3>
            <p className={cx('card-price')}>1.000.000đ</p>
            <Button primary className={cx('show-detail-btn')}>
              Xem chi tiết
            </Button>
          </div>
        </div>
        <div className={cx('card')}>
          <Image src={logo} className={cx('card-img')} alt="" />
          <div className={cx('card-info')}>
            <h3 className={cx('card-title')}>Card title</h3>
            <p className={cx('card-price')}>1.000.000đ</p>
            <Button primary className={cx('show-detail-btn')}>
              Xem chi tiết
            </Button>
          </div>
        </div>
        <div className={cx('card')}>
          <Image src={logo} className={cx('card-img')} alt="" />
          <div className={cx('card-info')}>
            <h3 className={cx('card-title')}>Card title</h3>
            <p className={cx('card-price')}>1.000.000đ</p>
            <Button primary className={cx('show-detail-btn')}>
              Xem chi tiết
            </Button>
          </div>
        </div>
        <div className={cx('card')}>
          <Image src={logo} className={cx('card-img')} alt="" />
          <div className={cx('card-info')}>
            <h3 className={cx('card-title')}>Card title</h3>
            <p className={cx('card-price')}>1.000.000đ</p>
            <Button primary className={cx('show-detail-btn')}>
              Xem chi tiết
            </Button>
          </div>
        </div>
        <div className={cx('card')}>
          <Image src={logo} className={cx('card-img')} alt="" />
          <div className={cx('card-info')}>
            <h3 className={cx('card-title')}>Card title</h3>
            <p className={cx('card-price')}>1.000.000đ</p>
            <Button primary className={cx('show-detail-btn')}>
              Xem chi tiết
            </Button>
          </div>
        </div>

        <FontAwesomeIcon
          onClick={handleScrollLeft}
          className={cx('scroll-left-btn')}
          icon={faArrowAltCircleLeft}
        />
        <FontAwesomeIcon
          onClick={handleScrollRight}
          className={cx('scroll-right-btn')}
          icon={faArrowAltCircleRight}
        />
      </div>
    </div>
  );
}

export default PhoneBlock;
