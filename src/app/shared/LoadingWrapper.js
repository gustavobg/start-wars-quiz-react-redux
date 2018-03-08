import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import classNames from 'classnames';
import './LoadingWrapper.scss';

const style = {
  container: {
    display: 'block',
    background: 'rgba(230, 230, 230, 0.5)'
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
    boxShadow: 'none'
  },
  smallIcon: {
    width: 36,
    height: 36
  },
  small: {
    width: 72,
    height: 72,
    padding: 16
  }
};


class LoadingWrapper extends React.Component {
  constructor() {
    super();
    this.state = {
      fetchingComplete: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isFetching === false && nextProps.isFetching === false) {
      this.setState({ fetchingComplete: true });
    }
    if (this.props.isFetching === true && nextProps.isFetching === false) {
      this.setState({ fetchingComplete: true });
    }
    if (this.props.isFetching === false && nextProps.isFetching === true) {
      this.setState({ fetchingComplete: false });
    }
  }
  render() {
    const {
      isFetching,
      className,
      showFetchingError,
      errorMessage,
      retryFetch,
      paper,
      containerStyle,
      children,
      progressProps
    } = this.props;

    let paperClassName = paper ? 'loading-block' : '';

    return (
      <div style={containerStyle} className={classNames(isFetching ? 'loading-wrapper is-loading' : 'loading-wrapper loading-done', className, this.state.fetchingComplete ? 'loading-done' : '', paperClassName)}>
        {showFetchingError ? (
          <div className={classNames('loading-wrapper-container')}>
            <div className="loading-wrapper-spinner">
              <h3 className="loading-error-message">{errorMessage}</h3>
            </div>
          </div>
        ) : (
          <div className={classNames('loading-wrapper-container', paperClassName)}>
            <div className="loading-wrapper-spinner">
              <CircularProgress {...progressProps}/>
            </div>
          </div>
        )}
        {children}
      </div>
    );
  }
}

LoadingWrapper.defaultProps = {
  showFetchingError: false,
  fetching: false,
  retryFetch: false,
  paper: false,
  errorMessage: 'Erro ao carregar :('
};

export default LoadingWrapper;
