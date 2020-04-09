import { ApiService } from '../api.service';
import { TAuthenticate } from './authentication.service.types';

/**
 * Authentication service
 */
export class AuthenticationService extends ApiService {
  /**
   * Authenticate
   *
   * @param payload
   */
  public static authenticate(payload: TAuthenticate) {
    return this.post('/auth', JSON.stringify(payload), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
