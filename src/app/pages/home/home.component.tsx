import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { injectDependencies } from '../../hoc/inject-dependencies';
import './home.scss';

type Props = {};
type State = Readonly<typeof initialState>;

const initialState = {};

class HomeComponent extends Component<Props> {
  readonly state: State = initialState;

  render() {
    return (
      <div>
        <section className="hero is-medium has-text-centered">
          <div className="hero-body">
            <div className="container">
              <Link to={'/chat'} className="button is-link is-large">
                Chat app
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export const Home = injectDependencies({
  mapStateToProps: (state: import('../../store/root.reducer').AppState) => ({}),
  mapDispatchToProps: (dispatch: Dispatch) => bindActionCreators({}, dispatch),
})(HomeComponent);
