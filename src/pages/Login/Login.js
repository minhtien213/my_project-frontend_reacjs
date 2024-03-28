// import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import * as userServices from '~/services/userServices';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import styles from './Login.module.scss';
import Button from '~/components/Button';
import Input from '~/components/Input';
import { updateUser } from '~/redux/userSlice';

const cx = classNames.bind(styles);

function Login() {
  const [email, setEmail] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [result, setResult] = useState({});
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //show/hide password
  const handleShowPass = () => {
    setShowPassword(!showPassword);
  };

  //get user info login
  const getUserDetail = async (id, access_token) => {
    try {
      const user = await userServices.getDetailUser(id, access_token);
      if (user) {
        dispatch(updateUser(user.data));
      } else {
        console.error('Error');
      }
    } catch (error) {
      console.error('Error"', error);
    }
  };

  //handle login
  const handleLogin = () => {
    const data_login = { email, password };
    const fetchApi = async () => {
      const result = await userServices.login(data_login);
      setResult(result);
      if (result.status === 'OK') {
        localStorage.setItem('access_token', result.access_token);
        if (result?.access_token) {
          const decoded = jwtDecode(result?.access_token);
          if (decoded.id) {
            getUserDetail(decoded.id, result.access_token);
            const previous_path = localStorage.getItem('previous_path');
            navigate(previous_path ? `${previous_path}` : '/');
            localStorage.removeItem('previous_path');
          }
        }
      }
    };
    fetchApi();
  };

  useEffect(() => {
    if (!email || !password) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [email, password]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <h2 className={cx('login-label')}>Đăng nhập</h2>
        <form className={cx('form-login')}>
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

          {result.status === 'ERR' && <span className={cx('message')}>{result.message}</span>}
        </form>

        <Button disabled={disabledBtn} className={cx('submit')} primary onClick={handleLogin}>
          Đăng nhập
        </Button>

        <div className={cx('isMember-forgetpass')}>
          <div className={cx('isMember')}>
            <p className={cx('isMember-label')}>Chưa có tài khoản?</p>
            <Link className={cx('register-btn')} to={'/sign-up'}>
              Đăng kí ngay
            </Link>
          </div>
          <div className={cx('forgetpass')}>
            <p className={cx('forgetpass-label')}>Quên mật khẩu?</p>
            <Link className={cx('forgetpass-btn')} to={'/reset-password'}>
              Khôi phục
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
