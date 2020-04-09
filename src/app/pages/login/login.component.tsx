import React, { ChangeEvent, Component, MouseEvent } from 'react';
import clsx from 'clsx';
import { bindActionCreators, Dispatch } from 'redux';
import { injectDependencies } from '../../hoc/inject-dependencies';
import { LoginRequestAction } from '../../store/modules/authentication/authentication.actions';
import './login.scss';

type Props = {
  loginRequest: (payload: any) => void;
};
type State = Readonly<typeof initialState>;

const initialState = {
  email: '',
  password: '',
  formErrors: { email: '', password: '' },
};

class LoginComponent extends Component<Props, State> {
  readonly state: State = initialState;

  componentDidMount(): void {}

  /**
   * Handle Input change
   *
   * @param ev
   */
  handleInputChange = (ev: ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { name, value },
    } = ev;
    return this.setState(
      {
        [name as any]: value,
      } as Pick<State, keyof State>,
      () => {
        this.validateField(name, value);
      }
    );
  };

  /**
   * Handle submit button click
   *
   * @param ev
   */
  handleSubmit = (ev: MouseEvent<HTMLButtonElement>): void => {
    const { email, password } = this.state;
    this.props.loginRequest({
      email,
      password,
    });
  };

  /**
   * Form fields validation
   *
   * @param fieldName
   * @param value
   */
  validateField(fieldName: string, value: string) {
    let errors = this.state.formErrors;
    switch (fieldName) {
      case 'email':
        const validEmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        errors.email = validEmailRegex.test(value) ? '' : 'Email is not valid!';
        break;

      case 'password':
        errors.password = value.length < 5 ? 'Password must be at least 5 characters long!' : '';
        break;
      default:
        break;
    }

    this.setState({ formErrors: errors });
  }

  render() {
    const { email, password, formErrors } = this.state;

    return (
      <div>
        <h1 className="title is-h1">Login</h1>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              type="email"
              name="email"
              value={email}
              className={clsx('input', { 'is-danger': formErrors.email.length > 0 })}
              onChange={this.handleInputChange}
            />
          </div>
          {formErrors.email.length > 0 && <p className="help is-danger"> {formErrors.email}</p>}
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              type="password"
              name="password"
              value={password}
              className={clsx('input', { 'is-danger': formErrors.password.length > 0 })}
              onChange={this.handleInputChange}
            />
          </div>
          {formErrors.password.length > 0 && (
            <p className="help is-danger"> {formErrors.password}</p>
          )}
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" onClick={this.handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export const Login = injectDependencies({
  mapStateToProps: (state: import('../../store/root.reducer').AppState) => ({}),
  mapDispatchToProps: (dispatch: Dispatch) =>
    bindActionCreators(
      {
        loginRequest: (payload) => new LoginRequestAction(payload),
      },
      dispatch
    ),
})(LoginComponent);
