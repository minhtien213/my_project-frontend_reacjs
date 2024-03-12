//phần sidebar
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import config from '~/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faLaptop,
  faPhone,
  faTable,
  faTabletAndroid,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Sidebar() {
  return (
    <aside className={cx('wrapper')}>
      <Menu>
        <MenuItem
          to={config.routes.home}
          title="Trang chủ"
          icon={<FontAwesomeIcon icon={faHome} />}
        />
        <MenuItem
          to={config.routes.phone}
          title="Điện thoại"
          icon={<FontAwesomeIcon icon={faPhone} />}
        />
        <MenuItem
          to={config.routes.laptop}
          title="Laptop"
          icon={<FontAwesomeIcon icon={faLaptop} />}
        />
        <MenuItem
          to={config.routes.tablet}
          title="Máy tính bảng"
          icon={<FontAwesomeIcon icon={faTabletAndroid} />}
        />
      </Menu>
    </aside>
  );
}

export default Sidebar;
