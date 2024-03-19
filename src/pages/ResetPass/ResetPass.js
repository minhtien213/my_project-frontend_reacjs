// import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import * as userServices from '~/services/userServices';
import styles from './ResetPass.module.scss';
import Button from '~/components/Button';
import Input from '~/components/Input';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Reset() {
  const access_token = localStorage.getItem('access_token');

  const [result, setResult] = useState({});
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);

  const handleShowPass = () => {
    setShowNewPassword(!showNewPassword);
  };
  const handleShowPassConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    const pass_reset = { email, newPassword, passwordConfirm };
    const result = await userServices.resetPass(access_token, pass_reset);
    setResult(result);
    if (result.status === 'OK') {
      setEmail('');
      setNewPassword('');
      setPasswordConfirm('');
    }
  };

  useEffect(() => {
    if (!newPassword || !email || !passwordConfirm) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [email, newPassword, passwordConfirm]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <h2 className={cx('login-label')}>Khôi phục mật khẩu</h2>
        <form className={cx('form-reset')}>
          <Input
            label="Email:"
            id="email"
            data={email}
            setData={setEmail}
            placeholder="nhập email để tìm kiếm tài khoản"
          />

          <div className={cx('password-group')}>
            <Input
              label="Mật khẩu mới:"
              type={showNewPassword ? 'text' : 'password'}
              id="newpassword"
              data={newPassword}
              setData={setNewPassword}
              placeholder="nhập mật khẩu mới"
            />
            {showNewPassword && (
              <FontAwesomeIcon className={cx('faEye-icon')} icon={faEye} onClick={handleShowPass} />
            )}
            {!showNewPassword && (
              <FontAwesomeIcon
                className={cx('faEyeSlash-icon')}
                icon={faEyeSlash}
                onClick={handleShowPass}
              />
            )}
          </div>

          <div className={cx('password-confirm-group')}>
            <Input
              label="Xác nhận mật khẩu mới:"
              id="passwordConfirm"
              type={showPasswordConfirm ? 'text' : 'password'}
              data={passwordConfirm}
              setData={setPasswordConfirm}
              placeholder="nhập lại mật khẩu mới"
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
            <p>
              <span className={cx('success-mesage')}>{result.message}</span>
              <Link className={cx('sigin-btn')} to={'/sign-in'}>
                Đăng nhập
              </Link>
            </p>
          )}
        </form>

        <div className={cx('submit-reset')}>
          <Button disabled={disabledBtn} className={cx('submit')} primary onClick={handleReset}>
            Khôi phục
          </Button>
          <Button className={cx('cancel')} text to={'/sign-in'}>
            Hủy
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Reset;
