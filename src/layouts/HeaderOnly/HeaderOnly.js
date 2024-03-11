//file layout mặc định của các trang web chỉ có phần Header
import PropTypes from 'prop-types';
import Header from '~/layouts/components/Header';

function HeaderOnly({ children }) {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

HeaderOnly.propTypes = {
  children: PropTypes.node.isRequired,
}
export default HeaderOnly;

//{children} - chứa nội dung động của website
//<Header /> - các phần không load lại khi nội dung thay đổi
