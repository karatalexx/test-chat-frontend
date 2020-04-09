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
        <button className="button is-primary">
          <strong>{currentUser.username}</strong>
        </button>

        <button
          className="button is-primary"
          onClick={() => this.handleClickLogout(currentUser.id)}
        >
          <strong>Logout</strong>
        </button>
      </Fragment>
    );
  };

  guestMenu = () => {
    return (
      <Fragment>
        <Link to={'/signup'} className="button is-primary">
          <strong>Sign up</strong>
        </Link>

        <Link to={'/login'} className="button is-light">
          <strong>Log in</strong>
        </Link>
      </Fragment>
    );
  };

  render() {
    const { currentUser } = this.props;

    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link to={'/'} className="navbar-item">
            <h4 className="title is-4">Test app</h4>
          </Link>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <Link to={'/chat'} className="navbar-item">
              Chat
            </Link>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">{currentUser ? this.userMenu() : this.guestMenu()}</div>
            </div>
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
