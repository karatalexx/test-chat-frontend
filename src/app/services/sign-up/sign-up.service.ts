import { ApiService } from '../api.service';
import { TSignUpPayload } from './sign-up.service.types';

/**
 * Sign up service
 */
export class SignUpService extends ApiService {
  /**
   * Sign up attempt
   *
   * @param payload
   */
  public static attempt(payload: TSignUpPayload) {
    return this.post('/signup', JSON.stringify(payload), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
