// import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import * as userServices from '~/services/userServices';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import styles from './Login.module.scss';
import Button from '~/components/Button';
import { updateUser } from '~/redux/userSlice';

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

  const handleGetUserDetail = async (id, accessToken) => {
    //sau khi login thì lấy info user đã login
    const res = await userServices.getDetailUser(id, accessToken);
    console.log(res);
    dispatch(updateUser({ ...res?.data, accessToken: accessToken })); //dispatch action(payload)
  };

  const dataLogin = { email, password };
  const handleLogin = () => {
    const fetchApi = async () => {
      const result = await userServices.login(dataLogin);
      setResult(result);
      if (result.status === 'OK') {
        localStorage.setItem('access_token', result.accessToken);
        if (result?.accessToken) {
          const decoded = jwtDecode(result?.accessToken);
          if (decoded.id) {
            handleGetUserDetail(decoded.id, result.accessToken);
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
      </div>
    </div>
  );
}

export default Login;