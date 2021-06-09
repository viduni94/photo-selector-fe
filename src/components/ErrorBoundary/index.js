import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import messages from 'utils/messages';

class ErrorBoundary extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
    };
  }

  componentDidCatch(error) {
    this.setState({ hasError: true, error });
  }

  render() {
    const { hasError, error } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <>
          <h1>{messages.error.text}</h1>
          <p>{error}</p>
          <button type="button" onClick={() => window.location.reload()}>
            {messages.error.buttonText}
          </button>
        </>
      );
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.object,
};

ErrorBoundary.defaultProps = {
  children: {},
};

export default ErrorBoundary;
