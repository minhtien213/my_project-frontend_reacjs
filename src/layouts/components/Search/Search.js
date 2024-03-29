/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import HeadlessTippy from '@tippyjs/react/headless'; // different import path!
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; //import list icon
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import config from '~/config';
import * as productServices from '~/services/productServices';
import { updateSearchValue } from '~/redux/productSlice';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import ProductItem from '~/components/ProductItem';
import { useDebounce } from '~/hooks';
import { SearchIcon } from '~/components/Icons';
import { setLocalStorage } from '~/utils/localStorageUtils';

const cx = classNames.bind(styles);

function Search() {
  const inputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loadingIcon, setloadingIcon] = useState(false);

  const debouncedValue = useDebounce(searchValue, 500);

  //delete search value
  const clearInputValue = () => {
    setSearchValue('');
    inputRef.current.focus();
  };

  //searchResult on blur event
  const handleHideSearchResult = () => {
    setShowResult(false);
  };

  //do not allow the first space to be entered
  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };

  //click search button
  const handleSeacrh = () => {
    const currentPage = 1;
    dispatch(updateSearchValue([debouncedValue, currentPage]));
    setLocalStorage('searchValue', debouncedValue);
    navigate(config.routes.search);
  };

  //handle search
  useEffect(() => {
    if (!debouncedValue.trim()) {
      return;
    }
    const fetchApi = async () => {
      setloadingIcon(true);
      const result = await productServices.search(debouncedValue);
      setSearchResult(result.data);
      setloadingIcon(false);
    };
    fetchApi();
  }, [debouncedValue]);

  return (
    //bọc <div> hoặc <span> xung quanh phần tử tham chiếu sẽ giải quyết cảnh báo của tippy
    <div className={cx('search-result-block')}>
      <HeadlessTippy
        visible={showResult && !!searchValue && searchResult?.length > 0} //điều kiện để hiện Tippy
        interactive //true - false: tương tác được với element trong tippy
        placement="top"
        render={(attrs) => (
          <div className={cx('search-result')} tabIndex="-1" {...attrs}>
            <PopperWrapper>
              <h4 className={cx('search-title')}>Kết quả tìm kiếm sản phẩm</h4>
              {searchResult?.map((result) => (
                <ProductItem key={result.name} data={result} />
              ))}
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleHideSearchResult}
      >
        <div className={cx('search')}>
          <input
            name="search"
            ref={inputRef}
            value={searchValue}
            placeholder="nhập tên sản phẩm cần tìm..."
            spellCheck={false}
            onChange={handleChange}
            onFocus={() => setShowResult(true)}
          />
          {!!searchValue && !loadingIcon && (
            <button className={cx('clear-btn')} onClick={clearInputValue}>
              <FontAwesomeIcon icon={faCircleXmark} />
            </button>
          )}

          {loadingIcon && <FontAwesomeIcon className={cx('loading-icon')} icon={faSpinner} />}
          <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
            <div onClick={handleSeacrh}>
              <SearchIcon />
            </div>
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
