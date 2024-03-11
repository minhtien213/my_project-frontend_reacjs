import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

const Button = forwardRef(
  (
    {
      to,
      href,
      primary = false,
      outline = false,
      text = false,
      rounded = false,
      small = false,
      large = false,
      disabled = false,
      children,
      className, //thêm className custom
      leftIcon,
      rightIcon,
      onClick,
      ...passProps
    },
    ref,
  ) => {
    let Component = 'button';
    const props = {
      onClick,
      ...passProps, //các props như target...
    };

    // xóa các event khi có class disabled
    if (disabled) {
      Object.keys(props).forEach((key) => {
        if (key.startsWith('on') && typeof props[key] === 'function') {
          delete props[key];
        }
      });
    }

    if (to) {
      //nếu có to thì gán giá trị của to cho props.to và chuyển button thành thẻ Link(router nội bộ)
      props.to = to;
      Component = Link;
    } else if (href) {
      //nếu có href thì gán giá trị của href cho props.href và chuyển thành thẻ a
      props.href = href;
      Component = 'a';
    }

    const classes = cx('wrapper', {
      [className]: className, //lấy giá trị className làm key
      primary,
      outline,
      text,
      rounded,
      disabled,
      small,
      large,
    });

    return (
      <Component ref={ref} className={classes} {...props}>
        {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
        <span className={cx('title')}>{children}</span>
        {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
      </Component>
    );
  },
);

Button.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  primary: PropTypes.bool,
  outline: PropTypes.bool,
  text: PropTypes.bool,
  rounded: PropTypes.bool,
  small: PropTypes.bool,
  large: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  onClick: PropTypes.func,
};
export default Button;
