import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './AccountsFollow.module.scss';

import AccountFollowItem from './AccountFollowItem';

const cx = classNames.bind(styles);

const data = [
  {
    nickname: 'minhtien213',
    name: 'Minh Tien',
    tick: true,
    image:
      '',
  },
  {
    nickname: 'minhtien213',
    name: 'Minh Tien',
    tick: false,
    image:
      '',
  },
  {
    nickname: 'minhtien213',
    name: 'Minh Tien',
    tick: true,
    image:
      '',
  },
];

function AccountsFollow({ label }) {
  return (
    <div className={cx('wrapper')}>
      <h2 className={cx('label')}>{label}</h2>
      {data.map((item, index) => {
        return <AccountFollowItem key={index} data={item} />;
      })}
      <p className={cx('load-more')}>Xem thêm</p>
    </div>
  );
}

AccountsFollow.propTypes = {
  label: PropTypes.string.isRequired,
};

export default AccountsFollow;
