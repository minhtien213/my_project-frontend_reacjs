import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import Tippy from '@tippyjs/react/headless'; // different import path!
import { Wrapper as PopperWrapper } from '~/components/Popper';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';
import { useState } from 'react';
import HeaderMenu from './HeaderMenu';

const cx = classNames.bind(styles);

const defaultFn = () => {}; //gán fc rỗng cho onChange để nếu không truyền prop onChange vẫn không báo lỗi

function Menu({ children, items = [], onChange = defaultFn() }) {
  const [history, setHistory] = useState([{ data: items }]);
  const currentMenu = history[history.length - 1]; //luôn hiển thị item cuối trong history

  function renderItems() {
    return currentMenu.data.map((item, index) => {
      return (
        <MenuItem
          key={index}
          data={item}
          onClick={() => {
            const isParentMenu = !!item.children;
            if (isParentMenu) {
              //nếu là isParentMenu thì thêm vào mảng history
              setHistory((prev) => [...prev, item.children]); //thêm vào mảng history sẽ render lại và hiển thị item cuối
            } else {
              //nếu không
              onChange(item); //trả về item click
            }
          }}
        />
      );
    });
  }

  //trở lại menu trước
  const handleBack = () => {
    setHistory((prev) => prev.slice(0, prev.length - 1));
  };

  //trở lại menu cấp 1 khi blur ra khỏi menu
  const handleReset = () => {
    setHistory((prev) => prev.slice(0, 1));
  };

  //render kết quả search
  const renderResult = (attrs) => (
    <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
      <PopperWrapper>
        {history.length > 1 && <HeaderMenu title={currentMenu.title} onBack={handleBack} />}
        <div className={cx('menu-body')}>{renderItems()}</div>
      </PopperWrapper>
    </div>
  );

  return (
    <Tippy
      delay={[0, 500]} //delay hiện menu 0s, ẩn 0.5s
      interactive //true - false: tương tác được với element trong tippy
      placement="bottom-end" //vị trí tooltip
      // visible
      offset={[25, 10]} //vị trí lệch x, y so với element
      hideOnClick={false} //không ẩn tooltip khi click vào element
      render={renderResult}
      onHide={handleReset} //trả về menu đầu tiên trong mảng history sau khi di chuột ra khỏi icon menu
    >
      {children}
    </Tippy>
  );
}

Menu.prototype = {
  children: PropTypes.node.isRequired,
  items: PropTypes.array,
  onChange: PropTypes.func,
};
export default Menu;
