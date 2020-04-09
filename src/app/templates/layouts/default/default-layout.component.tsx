import React, { PureComponent, ReactChild } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { injectDependencies } from '../../../hoc/inject-dependencies';
import { Header } from '../../partials/header/header.component';
import { AppState } from '../../../store/root.reducer';
import { GetCurrentUserRequestAction } from '../../../store/modules/user/user.actions';
import { rootSelector } from '../../../store/selectors';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';

type Props = {
  children: ReactChild;
  match: any;
  getCurrentUserRequest: () => any;
  currentUser: any;
};

class DefaultLayoutComponent extends PureComponent<Props> {
  componentDidMount(): void {
    const access_token = LocalStorageService.get('access_token');
    const { currentUser, getCurrentUserRequest } = this.props;

    if (access_token !== null && !currentUser) return getCurrentUserRequest();
  }

  render() {
    const { children } = this.props;

    return (
      <div className="container is-fullhd">
        <Header />
        {children}
      </div>
    );
  }
}

export const DefaultLayout = injectDependencies({
  mapStateToProps: (state: AppState) => ({
    currentUser: rootSelector.getCurrentUser(state),
  }),
  mapDispatchToProps: (dispatch: Dispatch<any>) => {
    return bindActionCreators(
      {
        getCurrentUserRequest: () => new GetCurrentUserRequestAction(),
      },
      dispatch
    );
  },
  location: true,
})(DefaultLayoutComponent);
