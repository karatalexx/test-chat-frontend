import React, { ReactElement } from 'react';
import { Switch } from 'react-router-dom';
import { PublicRoute } from './public-route/public-route.component';
import { PrivateRoute } from './private-route/private-route.component';
import { DefaultLayout } from '../templates/layouts/default/default-layout.component';
import { Home } from '../pages/home/home.component';
import { Chat } from '../pages/chat/chat.component';
import { SignUp } from '../pages/sign-up/sign-up.component';
import { Login } from '../pages/login/login.component';

const routesList: any = [
  {
    path: '/',
    level: PublicRoute,
    exact: true,
    layout: DefaultLayout,
    component: Home,
  },
  {
    path: '/chat',
    level: PrivateRoute,
    exact: true,
    layout: DefaultLayout,
    component: Chat,
  },
  {
    path: '/signup',
    level: PublicRoute,
    exact: true,
    layout: DefaultLayout,
    component: SignUp,
  },
  {
    path: '/login',
    level: PublicRoute,
    exact: true,
    layout: DefaultLayout,
    component: Login,
  },
];

export function Routes(): ReactElement {
  return (
    <Switch>
      {routesList.map((route: any, i: any) => {
        const { level: Level, path, component, layout, ...rest } = route;

        return <Level key={i} path={path} component={component} layout={layout} {...rest} />;
      })}
    </Switch>
  );
}
