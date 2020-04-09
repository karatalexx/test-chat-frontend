import React, { createElement } from 'react';
import { render } from 'react-dom';
import { App } from './app/App';
import './app/styles/index.scss';
import * as serviceWorker from './serviceWorker';

function bootstrap(): void {
  const mountTo = document.getElementById('root') as HTMLDivElement;
  render(<React.StrictMode>{createElement(App)}</React.StrictMode>, mountTo);
}

bootstrap();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
