import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import * as productServices from '~/services/productServices';
import { useEffect, useState } from 'react';
import Button from '~/components/Button';
import { useDispatch, useSelector } from 'react-redux';
import { updateSearchValue } from '~/redux/productSlice';
import CardProduct from '~/components/ProductCard';
import Loading from '~/components/Loading';

const cx = classNames.bind(styles);

function Search() {
  const [searchResult, setSearchResult] = useState([]);
  const [loadmore, setLoadmore] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [prevSearchKeyword, setPrevSearchKeyword] = useState(null);
  const [loading, setLoading] = useState(true);

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
        const dataSearch = await productServices.search(search, 'name', 2, pageCurrent);
        // console.log(dataSearch);
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

      setLoading(false);
      fetchProduct();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, pageCurrent]);

  if (loading) {
    return <Loading />;
  }

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
          (trang {pageCurrent}/{totalPages})
        </p>
      </div>

      <div className={cx('content')}>
        {searchResult.length > 0 &&
          searchResult.map((item, index) => {
            return <CardProduct key={index} item={item} />;
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
