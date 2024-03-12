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
import { updateUser } from '~/redux/userSlice';
import { setLocalStorage } from '~//utils/localStorageUtils';

const cx = classNames.bind(styles);

function Login() {
  const [email, setEmail] = useState('');
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [result, setResult] = useState({});
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); //điều hướng trang
  const dispatch = useDispatch(); //dispatch payload

  const handleShowPass = () => {
    setShowPassword(!showPassword);
  };

  const handleGetUserDetail = async (id, access_token) => {
    // //sau khi login thì lấy info user đã login
    try {
      const data = await userServices.getDetailUser(id, access_token);
      if (data) {
        const user = await userServices.getDetailUser(id, access_token);
        dispatch(updateUser(user.data)); //dispatch action(payload)
        setLocalStorage('user', user.data);
      } else {
        console.error('Error');
      }
    } catch (error) {
      console.error('Error"', error);
    }
  };

  const data_login = { email, password };
  const handleLogin = () => {
    const fetchApi = async () => {
      const result = await userServices.login(data_login);
      setResult(result);
      if (result.status === 'OK') {
        localStorage.setItem('access_token', result.access_token);
        if (result?.access_token) {
          const decoded = jwtDecode(result?.access_token);
          if (decoded.id) {
            handleGetUserDetail(decoded.id, result.access_token);
          }
        }
        navigate('/'); //login success
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
      <div className={cx('overlay')}></div>
      <div className={cx('container')}>
        <h2 className={cx('login-label')}>Đăng nhập</h2>
        <form className={cx('form-login')}>
          <label className={cx('email-label')} htmlFor="email">
            Email:
          </label>
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            className={cx('email')}
            id="email"
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

          {result.status === 'ERR' && <span className={cx('message')}>{result.message}</span>}
        </form>

        <Button disabled={disabledBtn} className={cx('submit')} primary onClick={handleLogin}>
          Đăng nhập
        </Button>

        <div className={cx('isMember')}>
          <p className={cx('label')}>Chưa có tài khoản?</p>
          <Link className={cx('registerBtn')} to={'/sign-up'}>Đăng kí ngay</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
