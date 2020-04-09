import React, { PureComponent, ComponentType, Fragment } from 'react';
import { Route } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

type Props = {
  component: ComponentType<RouteComponentProps<any>>;
  layout: ComponentType;
};

class PublicRouteComponent extends PureComponent<Props> {
  renderRoute = (props: RouteComponentProps<{}>) => {
    const { component: Component, layout } = this.props;
    const Layout: ComponentType = layout || Fragment;

    return (
      <Layout>
        <Component {...props} />
      </Layout>
    );
  };

  render() {
    const { component, ...rest } = this.props;

    return <Route {...rest} render={this.renderRoute} />;
  }
}

export const PublicRoute = PublicRouteComponent;
