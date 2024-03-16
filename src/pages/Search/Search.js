import classNames from 'classnames/bind';
import styles from '../Phone/Phone.module.scss';
import * as productServices from '~/services/productServices';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import Image from '~/components/Image';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchValue } from '~/redux/productSlice';

const cx = classNames.bind(styles);

function Search() {
  const [searchResult, setSearchResult] = useState([]);
  const [loadmore, setLoadmore] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [prevSearchKeyword, setPrevSearchKeyword] = useState(null);

  const dispatch = useDispatch(); //dispatch payload
  const search = useSelector((state) => state.product.searchValue);
  const pageCurrent = useSelector((state) => state.product.pageCurrent);

  useEffect(() => {
    if (search !== null) {
      //check thay đổi search value
      if (prevSearchKeyword !== search) {
        setSearchResult([]);
        setPrevSearchKeyword(search);
      }
      const fetchProduct = async () => {
        const dataSearch = await productServices.search(search, 'name', 4, pageCurrent);
        console.log(dataSearch);
        if (dataSearch) {
          if (pageCurrent >= dataSearch.totalPages) {
            setLoadmore(false);
          } else {
            setLoadmore(true);
          }
          setTotalProducts(dataSearch.totalProducts);
          setTotalPages(dataSearch.totalPages);
          setSearchResult((prev) => [...prev, ...dataSearch.data]);
        }
      };
      fetchProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, pageCurrent]);

  const handleLoadmore = () => {
    dispatch(updateSearchValue([search, pageCurrent + 1]));
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('info-result')}>
        <p className={cx('info-result-label')}>
          Đã tìm thấy {totalProducts} kết quả phù hợp cho từ khóa:
        </p>
        <p className={cx('info-result-key')}>{search}</p>
        <p className={cx('info-result-totalPages')}>
          ({pageCurrent}/{totalPages})
        </p>
      </div>

      <div className={cx('content')}>
        {searchResult.length > 0 &&
          searchResult.map((item) => {
            return (
              <div key={item.id} className={cx('card')}>
                <Image src="" className={cx('card-img')} alt="" />
                <div className={cx('card-info')}>
                  <h3 className={cx('card-title')}>{item.name}</h3>
                  <p className={cx('card-price')}>{item.price}đ</p>
                  <Button primary className={cx('show-detail-btn')}>
                    Xem chi tiết
                  </Button>
                </div>
              </div>
            );
          })}
      </div>
      <div className={cx('loadmore')}>
        {loadmore && (
          <Button outline onClick={handleLoadmore}>
            Xem thêm sản phẩm
          </Button>
        )}
      </div>
    </div>
  );
}

export default Search;
