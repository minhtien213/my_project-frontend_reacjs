import { Fragment } from 'react'; //thẻ chứa để ôm các react element
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/layouts';
function App() {
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
