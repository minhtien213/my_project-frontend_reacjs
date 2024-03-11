import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function HeaderMenu({ title, onBack }) {
  return (
    <div className={cx('header-menu')}>
      <button className={cx('header-back-btn')} onClick={onBack}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <h4 className={cx('header-title')}>{title}</h4>
    </div>
  );
}

HeaderMenu.prototype = {
  title: PropTypes.string.isRequired,
  onBack: PropTypes.func.isRequired,
};
export default HeaderMenu;
