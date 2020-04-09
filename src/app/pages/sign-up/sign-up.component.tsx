import React, { ChangeEvent, Component, MouseEvent } from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import clsx from 'clsx';
import { injectDependencies } from '../../hoc/inject-dependencies';
import { SignUpRequestAction } from '../../store/modules/sign-up/sign-up.actions';
import './sign-up.scss';

type Props = {
  signUpRequest: (payload: any) => void;
};
type State = Readonly<typeof initialState>;

const initialState = {
  username: '',
  email: '',
  password: '',
  formErrors: { username: '', email: '', password: '' },
};

class SignUpComponent extends Component<Props, State> {
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
   * Form fields validation
   *
   * @param fieldName
   * @param value
   */
  validateField(fieldName: string, value: string) {
    let errors = this.state.formErrors;

    switch (fieldName) {
      case 'username':
        errors.username = value.length < 5 ? 'Nickname must be at least 5 characters long!' : '';
        break;

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

  /**
   * Handle submit button click
   *
   * @param ev
   */
  handleSubmit = (ev: MouseEvent<HTMLButtonElement>): void => {
    const { username, email, password } = this.state;
    this.props.signUpRequest({
      username,
      email,
      password,
    });
  };

  render() {
    const { username, email, password, formErrors } = this.state;

    return (
      <div>
        <h1 className="title is-h1">Sign up</h1>
        <div className="field">
          <label className="label">Nickname</label>
          <div className="control">
            <input
              type="text"
              name="username"
              value={username}
              className={clsx('input', { 'is-danger': formErrors.username.length > 0 })}
              onChange={this.handleInputChange}
            />
          </div>
          {formErrors.username.length > 0 && (
            <p className="help is-danger"> {formErrors.username}</p>
          )}
        </div>

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

export const SignUp = injectDependencies({
  mapStateToProps: (state: import('../../store/root.reducer').AppState) => ({}),
  mapDispatchToProps: (dispatch: Dispatch) =>
    bindActionCreators(
      {
        signUpRequest: (payload) => new SignUpRequestAction(payload),
      },
      dispatch
    ),
})(SignUpComponent);
