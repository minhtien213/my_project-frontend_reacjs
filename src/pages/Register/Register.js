// import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const navigate = useNavigate();

  const handleShowPass = () => {
    setShowPassword(!showPassword);
  };
  const handleShowPassConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  useEffect(() => {
    if (!name || !email || !password || !passwordConfirm) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [name, email, password, passwordConfirm]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('overlay')}></div>
      <div className={cx('container')}>
        <h2 className={cx('register-label')}>Đăng ký</h2>
        <div className={cx('form-register')}>
          <label className={cx('name-label')} htmlFor="name">
            Tên của bạn:
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className={cx('name')}
            placeholder="nhập tên"
          />

          <label className={cx('email-label')} htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className={cx('email')}
            placeholder="nhập email"
          />

          <div className={cx('password-group')}>
            <label className={cx('password-label')} htmlFor="password">
              Mật khẩu:
            </label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type={showPassword ? 'text' : 'password'}
              className={cx('password')}
              placeholder="nhập mật khẩu"
              id="password"
            />
            {showPassword && (
              <FontAwesomeIcon className={cx('faEye-icon')} icon={faEye} onClick={handleShowPass} />
            )}
            {!showPassword && (
              <FontAwesomeIcon
                className={cx('faEyeSlash-icon')}
                icon={faEyeSlash}
                onClick={handleShowPass}
              />
            )}
          </div>

          <div className={cx('password-confirm-group')}>
            <label className={cx('password-confirm-label')} htmlFor="password-confirm">
              Xác nhận mật khẩu:
            </label>
            <input
              value={passwordConfirm}
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
              }}
              type={showPasswordConfirm ? 'text' : 'password'}
              className={cx('password')}
              placeholder="nhập xác nhận mật khẩu"
              id="password-confirm"
            />
            {showPasswordConfirm && (
              <FontAwesomeIcon
                className={cx('faEye-icon-confirm')}
                icon={faEye}
                onClick={handleShowPassConfirm}
              />
            )}
            {!showPasswordConfirm && (
              <FontAwesomeIcon
                className={cx('faEyeSlash-icon-confirm')}
                icon={faEyeSlash}
                onClick={handleShowPassConfirm}
              />
            )}
          </div>
        </div>

        <Button disabled={disabledBtn} className={cx('submit')} primary>
          Đăng ký
        </Button>
      </div>
    </div>
  );
}

export default Register;