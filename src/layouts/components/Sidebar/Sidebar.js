//phần sidebar
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import {
  HomeIcon,
  UserGroupIcon,
  FollowingIcon,
  LiveIcon,
  DiscoverIcon,
  ProfileIcon,
} from '~/components/Icons';
import config from '~/config';
import AccountsFollow from '~/components/AccountsFollow';

const cx = classNames.bind(styles);

function Sidebar() {
  return (
    <aside className={cx('wrapper')}>
      <Menu>
        <MenuItem to={config.routes.home} title="Dành cho bạn" icon={<HomeIcon />} />
        <MenuItem to={config.routes.following} title="Đang Follow" icon={<FollowingIcon />} />
        <MenuItem to="/friend" title="Bạn bè" icon={<UserGroupIcon />} />
        <MenuItem to="/discover" title="Khám phá" icon={<DiscoverIcon />} />
        <MenuItem to="/live" title="LIVE" icon={<LiveIcon />} />
        <MenuItem to={config.routes.profile} title="Hồ sơ" icon={<ProfileIcon />} />
      </Menu>
      <AccountsFollow label='Các tài khoản đang follow'/>
    </aside>
  );
}

export default Sidebar;
