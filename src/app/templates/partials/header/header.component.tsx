import React, { Fragment, PureComponent } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import { injectDependencies } from '../../../hoc/inject-dependencies';
import { rootSelector } from '../../../store/selectors';
import './header.scss';
import { LogoutRequestAction } from '../../../store/modules/authentication/authentication.actions';

type Props = {
  currentUser: any;
  logoutRequest: (payload: any) => void;
};

class HeaderComponent extends PureComponent<Props> {
  /**
   * Handle logout click
   */
  handleClickLogout = (currentUserId: number) => this.props.logoutRequest(currentUserId);

  userMenu = () => {
    const { currentUser } = this.props;
    return (
      <Fragment>
        <div className="navbar-item is-size-5 has-text-weight-semibold">{currentUser.username}</div>
        <Link to={'/chat'} className="navbar-item is-size-5 has-text-weight-semibold has-text-link">
          Chat
        </Link>
        <a
          onClick={() => this.handleClickLogout(currentUser.id)}
          className="navbar-item is-size-5 has-text-weight-semibold has-text-link"
        >
          <strong>Logout</strong>
        </a>
      </Fragment>
    );
  };

  guestMenu = () => {
    return (
      <Fragment>
        <Link to={'/chat'} className="navbar-item is-size-5 has-text-weight-semibold has-text-link">
          Chat
        </Link>
        <Link
          to={'/signup'}
          className="navbar-item is-size-5 has-text-weight-semibold has-text-link"
        >
          <strong>Sign up</strong>
        </Link>

        <Link
          to={'/login'}
          className="navbar-item is-size-5 has-text-weight-semibold has-text-link"
        >
          <strong>Log in</strong>
        </Link>
      </Fragment>
    );
  };

  render() {
    const { currentUser } = this.props;

    return (
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <Link to={'/'} className="navbar-item">
              <h3 className="title is-3">Test app</h3>
            </Link>

            <span className="navbar-burger burger" data-target="navbarMenu">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id="navbarMenu" className="navbar-menu">
            <div className="navbar-end">{currentUser ? this.userMenu() : this.guestMenu()}</div>
          </div>
        </div>
      </nav>
    );
  }
}

export const Header = injectDependencies({
  mapStateToProps: (state: import('../../../store/root.reducer').AppState) => {
    return {
      currentUser: rootSelector.getCurrentUser(state),
    };
  },
  mapDispatchToProps: (dispatch: Dispatch<any>) =>
    bindActionCreators(
      {
        logoutRequest: (payload: any) => new LogoutRequestAction(payload),
      },
      dispatch
    ),
})(HeaderComponent);
