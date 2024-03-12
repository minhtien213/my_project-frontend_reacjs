//Component cho từng item trong search results
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './ProductItem.module.scss';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function ProductItem({ data }) {
  return (
    <Link to={`/`} className={cx('wrapper')}>
      <Image className={cx('image')} src={data.image} alt={data.name} />
      <div className={cx('info')}>
        <h4 className={cx('name')}>{data.name}</h4>
        <span className={cx('price')}>{data.price}</span>
      </div>
    </Link>
  );
}

ProductItem.propTypes = {
  data: PropTypes.object.isRequired,
};
export default ProductItem;
