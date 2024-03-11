import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './AccountsFollow.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function AccountFollowItem({ data = {} }) {
  return (
    <div className={cx('account-item')}>
      <img className={cx('avatar')} src={data.image} alt="" />
      <div className={cx('info')}>
        <span className={cx('nickname')}>
          {data.nickname}
          {data.tick && <FontAwesomeIcon className={cx('check-icon')} icon={faCheckCircle} />}
        </span>
        <p className={cx('name')}>{data.name}</p>
      </div>
    </div>
  );
}
AccountFollowItem.propTypes = {
  data: PropTypes.object.isRequired,
};
export default AccountFollowItem;
