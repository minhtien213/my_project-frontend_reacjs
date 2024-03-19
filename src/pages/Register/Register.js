// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import Button from '~/components/Button';
import Input from '~/components/Input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import * as userServices from '~/services/userServices';

const cx = classNames.bind(styles);

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [result, setResult] = useState({});
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

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

  const handleRegister = async () => {
    const data_register = { name, email, password, passwordConfirm };
    const result = await userServices.register(data_register);
    setResult(result);
    if (result.status === 'OK') {
      setName('');
      setEmail('');
      setPassword('');
      setPasswordConfirm('');
    }
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <h2 className={cx('register-label')}>Đăng ký</h2>
        <form className={cx('form-register')}>
          <Input
            label="Tên của bạn:"
            id="name"
            data={name}
            setData={setName}
            placeholder="nhập tên"
          />

          <Input
            label="Email:"
            id="email"
            data={email}
            setData={setEmail}
            placeholder="nhập email"
          />

          <div className={cx('password-group')}>
            <Input
              label="Mật khẩu:"
              type={showPassword ? 'text' : 'password'}
              id="password"
              data={password}
              setData={setPassword}
              placeholder="nhập mật khẩu"
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
            <Input
              label="Xác nhận mật khẩu:"
              type={showPasswordConfirm ? 'text' : 'password'}
              id="password-confirm"
              data={passwordConfirm}
              setData={setPasswordConfirm}
              placeholder="nhập xác nhận mật khẩu"
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
          {result.status === 'ERR' && <span className={cx('error-mesage')}>{result.message}</span>}
          {result.status === 'OK' && (
            <p className={cx('success-btn')}>
              <span className={cx('success-mesage')}>{result.message}</span>
              <Link className={cx('sigin-btn')} to={'/sign-in'}>
                Đăng nhập
              </Link>
            </p>
          )}
        </form>

        <Button disabled={disabledBtn} className={cx('submit')} primary onClick={handleRegister}>
          Đăng ký
        </Button>
        <div className={cx('isMember')}>
          <p className={cx('label')}>Đã có tài khoản?</p>
          <Link className={cx('loginBtn')} to={'/sign-in'}>
            Đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
