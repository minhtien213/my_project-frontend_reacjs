/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import HeadlessTippy from '@tippyjs/react/headless'; // different import path!
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; //import list icon
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons';

import * as searchServices from '~/services/searchService';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountItem from '~/components/ProductItem';
import { useDebounce } from '~/hooks';
import { SearchIcon } from '~/components/Icons';

const cx = classNames.bind(styles);

function Search() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loadingIcon, setloadingIcon] = useState(false);

  const debouncedValue = useDebounce(searchValue, 500); //delay thời gian nhập input value

  const inputRef = useRef();

  useEffect(() => {
    if (!debouncedValue.trim()) {
      return;
    }
    const fetchApi = async () => {
      setloadingIcon(true);

      const result = await searchServices.search(debouncedValue);

      setSearchResult(result);
      setloadingIcon(false);
    };
    fetchApi();
  }, [debouncedValue]);

  //click vào icon xóa
  const clearInputValue = () => {
    setSearchValue('');
    inputRef.current.focus();
  };

  //khi blur ra khỏi khối searchResult
  const handleHideSearchResult = () => {
    setShowResult(false);
  };

  //không cho nhập dấu cách đầu tiên
  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(' ')) {
      setSearchValue(searchValue);
    }
  };

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
                <AccountItem key={result.name} data={result} />
              ))}
            </PopperWrapper>
          </div>
        )}
        onClickOutside={handleHideSearchResult} //click ra khỏi khối search result
      >
        <div className={cx('search')}>
          <input
            ref={inputRef}
            value={searchValue}
            placeholder="nhập tên sản phẩm cần tìm..."
            spellCheck={false}
            onChange={handleChange}
            onFocus={() => setShowResult(true)}
          />
          {!!searchValue &&
            !loadingIcon && ( //button khi có giá trị trong searchValue - convert sang boolean
              <button className={cx('clear-btn')} onClick={clearInputValue}>
                <FontAwesomeIcon icon={faCircleXmark} />
              </button>
            )}

          {loadingIcon && <FontAwesomeIcon className={cx('loading-icon')} icon={faSpinner} />}
          <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
            <SearchIcon />
          </button>
        </div>
      </HeadlessTippy>
    </div>
  );
}

export default Search;
