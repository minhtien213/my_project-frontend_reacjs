import { Fragment, useEffect } from 'react'; //thẻ chứa để ôm các react element
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { jwtDecode } from 'jwt-decode';
import { DefaultLayout } from '~/layouts';
import { updateUser } from '~/redux/userSlice';
import * as userServices from '~/services/userServices';
import { updateSearchValue } from '~/redux/productSlice';
import { getLocalStorage, setLocalStorage } from '~/utils/localStorageUtils';

function App() {
  const dispatch = useDispatch(); //dispatch payload

  //get user info login
  const getUserDetail = async (id, access_token) => {
    try {
      const user = await userServices.getDetailUser(id, access_token);
      if (user) {
        dispatch(updateUser(user.data));
        // setLocalStorage('user', user.data);
      } else {
        console.error('Error');
      }
    } catch (error) {
      console.error('Error"', error);
    }
  };

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');

    if (access_token) {
      const decoded = jwtDecode(access_token);
      if (decoded.id) {
        getUserDetail(decoded.id, access_token);
      }
    }
    const searchValue = getLocalStorage('searchValue');
    if (searchValue) {
      const currentPage = 1;
      dispatch(updateSearchValue([searchValue, currentPage]));
    }
  }, [dispatch]); //update store khi reload page

  // useEffect(() => {
  //   const user = getLocalStorage('user');
  //   if (user) {
  //     dispatch(updateUser(user));
  //   }
  //   const searchValue = getLocalStorage('searchValue');
  //   if (searchValue) {
  //     dispatch(updateSearchValue([searchValue, 1]));
  //   }
  // }, [dispatch]); //update store khi reload page

  return (
    <Router>
      <div className="app">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component; //tạo component Page nhận từng route.component khi lặp qua publicRoutes
            let Layout = DefaultLayout; //component Layout mặc định

            if (route.layout) {
              Layout = route.layout; //nếu có field layout riêng
            } else if (route.layout === null) {
              Layout = Fragment; //nếu không có field layout
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
