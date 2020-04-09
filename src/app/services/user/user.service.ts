import { ApiService } from '../api.service';

export class UserService extends ApiService {

  /**
   * Get current user
   */
  public static current() {
    return this.get('/user');
  }
}
