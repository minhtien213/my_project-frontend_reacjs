import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { publicRoutes, privateRoutes } from '~/routes';
import { jwtDecode } from 'jwt-decode';
import { DefaultLayout } from '~/layouts';
import { updateUser } from '~/redux/userSlice';
import * as userServices from '~/services/userServices';
import { updateSearchValue } from '~/redux/productSlice';
import config from '~/config';
import Loading from '~/components/Loading';

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const isLoggedIn = user.name === '' ? false : true;

  useEffect(() => {
    const initApp = async () => {
      const access_token = localStorage.getItem('access_token');
      if (access_token) {
        const decoded = jwtDecode(access_token);
        if (decoded.id) {
          const user = await userServices.getDetailUser(decoded.id, access_token);
          if (user) {
            dispatch(updateUser(user.data));
          } else {
            console.error('Error');
          }
        }
      }
      const searchValue = localStorage.getItem('searchValue');
      if (searchValue) {
        const currentPage = 1;
        dispatch(updateSearchValue([searchValue, currentPage]));
      }
      setLoading(false);
    };
    initApp();
  }, [dispatch]); //update store khi reload page

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <div className="app">
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component; //tạo component Page nhận từng route.component
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

          {privateRoutes.map((route, index) => {
            const Page = route.component;
            let Layout = DefaultLayout;

            if (route.layout) {
              Layout = route.layout;
            } else if (route.layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  isLoggedIn ? (
                    <Layout>
                      <Page />
                    </Layout>
                  ) : (
                    <Navigate
                      to={{
                        pathname: `${config.routes.login}`,
                        // state: { from: window.location.pathname }, //lưu địa chỉ URL trước khi chuyển hướng
                      }}
                    />
                  )
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
