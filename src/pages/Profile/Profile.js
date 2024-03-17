import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import Input from '~/components/Input';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import Image from '~/components/Image';
import { useSelector } from 'react-redux';
import * as userServices from '~/services/userServices';
import { useDispatch } from 'react-redux';
import { updateUser } from '~/redux/userSlice';
import { setLocalStorage } from '~//utils/localStorageUtils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const access_token = localStorage.getItem('access_token');

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setAddress(user.address || '');
    }
  }, [user]);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [showPassForm, setShowPassForm] = useState(false);
  const [address, setAddress] = useState('');
  const [result, setResult] = useState({});
  const [resultChangePass, setResultChangePass] = useState({});
  const [changePassBtn, setChangePassBtn] = useState(true);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  useEffect(() => {
    if (!email || !name) {
      setDisabledBtn(true);
    } else {
      setDisabledBtn(false);
    }
  }, [email, name]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data_update = { name, phone, email, address };
    const id = user._id;
    const result = await userServices.updateUser(id, access_token, data_update);
    setResult(result);
    if (result.status === 'OK') {
      setLocalStorage('user', result.data);
      dispatch(updateUser(result?.data));
    }
  };

  const showChangePassForm = (e) => {
    e.preventDefault();
    setShowPassForm(!showPassForm);
    setChangePassBtn(!changePassBtn);
  };

  const handleChangePass = async (e) => {
    e.preventDefault();
    const pass_update = { password, newPassword, passwordConfirm };
    const id = user._id;
    const result_change_pass = await userServices.changePass(id, access_token, pass_update);
    if (result_change_pass) {
      setResultChangePass(result_change_pass);
    }
    if (result_change_pass.status === 'OK') {
      setTimeout(() => {
        setShowPassForm(!showPassForm);
        setPassword('');
        setNewPassword('');
        setPasswordConfirm('');
        setChangePassBtn(!changePassBtn);
      }, 2000);
    }
  };

  const handleCancel = () => {
    setShowPassForm(!showPassForm);
    setChangePassBtn(!changePassBtn);
    setPassword('');
    setNewPassword('');
    setPasswordConfirm('');
  };

  const handleShowPass = () => {
    setShowPassword(!showPassword);
  };
  const handleShowNewPass = () => {
    setShowNewPassword(!showNewPassword);
  };
  const handleShowPassConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  return (
    <div className={cx('wrapper')}>
      <form className={cx('profile-form')}>
        <h2 className={cx('profile-form-title')}>Thông tin tài khoản</h2>
        <Input label="Họ và Tên: " id="name" data={name} setData={setName} required />
        <Input label="Email: " type="email" id="email" data={email} setData={setEmail} />
        <Input label="Số điện thoại: " id="phone" data={phone} setData={setPhone} />
        <Input label="Địa chỉ: " id="address" data={address} setData={setAddress} />
        {result.status === 'ERR' ? <p className={cx('error-mesage')}>{result.message}</p> : ''}
        <Button disabled={disabledBtn} primary onClick={handleUpdate}>
          Cập nhật thông tin
        </Button>
        {result.status === 'OK' ? (
          <small className={cx('success-mesage')}>{result.message}</small>
        ) : (
          ''
        )}
        <div className={cx('change-password')}>
          {changePassBtn && (
            <Button onClick={showChangePassForm} text>
              Thay đổi mật khẩu
            </Button>
          )}
          {showPassForm && (
            <p>
              <h3 className={cx('profile-form-title')}>Thay đổi mật khẩu</h3>
              <div className={cx('change-password-form')}>
                <div className={cx('password-old')}>
                  <Input
                    placeholder="nhập mật khẩu cũ"
                    label="Mật khẩu cũ:"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    data={password}
                    setData={setPassword}
                  />
                  {showPassword && (
                    <FontAwesomeIcon
                      className={cx('faEye-icon')}
                      icon={faEye}
                      onClick={handleShowPass}
                    />
                  )}
                  {!showPassword && (
                    <FontAwesomeIcon
                      className={cx('faEyeSlash-icon')}
                      icon={faEyeSlash}
                      onClick={handleShowPass}
                    />
                  )}
                </div>

                <div className={cx('new-password-group')}>
                  <Input
                    placeholder="nhập mật khẩu mới"
                    type={showNewPassword ? 'text' : 'password'}
                    label="Mật khẩu mới:"
                    id="newpass"
                    data={newPassword}
                    setData={setNewPassword}
                  />
                  {showNewPassword && (
                    <FontAwesomeIcon
                      className={cx('faEye-icon-confirm')}
                      icon={faEye}
                      onClick={handleShowNewPass}
                    />
                  )}
                  {!showNewPassword && (
                    <FontAwesomeIcon
                      className={cx('faEyeSlash-icon-confirm')}
                      icon={faEyeSlash}
                      onClick={handleShowNewPass}
                    />
                  )}
                </div>

                <div className={cx('password-confirm-group')}>
                  <Input
                    placeholder="xác nhận mật khẩu"
                    label="Xác nhận mật khẩu mới:"
                    type={showPasswordConfirm ? 'text' : 'password'}
                    id="newpass_confirm"
                    data={passwordConfirm}
                    setData={setPasswordConfirm}
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

                {resultChangePass.status === 'ERR' ? (
                  <p className={cx('error-mesage')}>{resultChangePass.message}</p>
                ) : (
                  ''
                )}
                <Button primary onClick={handleChangePass}>
                  Xác nhận
                </Button>
                <Button text onClick={handleCancel}>
                  Hủy
                </Button>
                {resultChangePass.status === 'OK' ? (
                  <small className={cx('success-mesage')}>{resultChangePass.message}</small>
                ) : (
                  ''
                )}
              </div>
            </p>
          )}
        </div>
      </form>
      <div className={cx('avatar')}>
        <h3 className={cx('avatar-title')}>Ảnh đại diện</h3>
        <Image className={cx('avatar-img')} src="" alt="" />
        <Button primary>Cập nhật ảnh</Button>
      </div>
    </div>
  );
}

export default Profile;
