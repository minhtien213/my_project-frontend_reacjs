import classNames from 'classnames/bind';
import styles from './Input.module.scss';

const cx = classNames.bind(styles);

function Input({ label, type = 'text', id, placeholder, data, setData }) {
  return (
    <div className={cx('wrapper')}>
      <label className={cx('label')} htmlFor={id}>
        {label}
      </label>
      <input
        value={data}
        id={id}
        className={cx('input')}
        type={type}
        onChange={(e) => setData(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );
}

export default Input;
