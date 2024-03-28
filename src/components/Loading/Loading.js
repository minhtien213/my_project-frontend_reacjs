import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Loading() {
  return (
    <>
      <div className="loading">
        <FontAwesomeIcon className="loading-icon" icon={faSpinner} />
      </div>
    </>
  );
}

export default Loading;
