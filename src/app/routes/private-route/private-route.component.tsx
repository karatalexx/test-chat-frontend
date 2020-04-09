import React, { ComponentType, Fragment, PureComponent } from 'react';
import { Redirect, RouteComponentProps } from 'react-router';
import { Route } from 'react-router-dom';
import { injectDependencies } from '../../hoc/inject-dependencies';
import { LocalStorageService } from '../../services/local-storage/local-storage.service';

type Props = {
  component: ComponentType<RouteComponentProps<any>>;
  layout: ComponentType;
};

class PrivateRouteComponent extends PureComponent<Props> {
  renderRoute = (props: RouteComponentProps<{}>) => {
    const { component: Component, layout } = this.props;
    const Layout: ComponentType = layout || Fragment;

    if (!LocalStorageService.get('access_token')) {
      return <Redirect to="/login" />;
    }

    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };

  render() {
    const { layout, component, ...rest } = this.props;

    return <Route {...rest} render={this.renderRoute} />;
  }
}

export const PrivateRoute = injectDependencies({})(PrivateRouteComponent);
