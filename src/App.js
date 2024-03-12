import { Fragment, useEffect } from 'react'; //thẻ chứa để ôm các react element
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/layouts';
import { updateUser } from '~/redux/userSlice';
import { getLocalStorage } from '~/utils/localStorageUtils';

function App() {
  const dispatch = useDispatch(); //dispatch payload

  useEffect(() => {
    const user = getLocalStorage('user');
    if (user) {
      dispatch(updateUser(user));
    }
  }, [dispatch]); //update user khi reload page

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
