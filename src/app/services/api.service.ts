import axios, { AxiosInstance, AxiosRequestConfig, AxiosTransformer } from 'axios';
import { LocalStorageService } from './local-storage/local-storage.service';

class ApiService {
  // ['constructor']: typeof ApiService;

  /**
   * Store dispatch
   */
  public static dispatch: any = null;

  /*
   * Path relative for base url
   */
  protected static serviceBaseUrl: string;

  /**
   * Client instance
   */
  public static client: AxiosInstance;

  /**
   * Default client configuration
   */
  protected static clientConfig: AxiosRequestConfig = {
    baseURL: 'http://localhost:3001/api/v1',
    transformRequest: ApiService.transformRequest,
  };

  /**
   * Stringify object
   * @param data
   */
  protected static stringify(data: any): any {
    return JSON.stringify(data);
  }

  /**
   * Create new client instance
   *
   * @param clientConfig
   */
  public static createClient(clientConfig: AxiosRequestConfig = this.clientConfig): AxiosInstance {
    return axios.create(clientConfig);
  }

  /**
   * Request transformer
   *
   * @param data
   * @param headers
   */
  public static transformRequest(data: any, headers?: any): AxiosTransformer | AxiosTransformer[] {
    return data;
  }

  /**
   * Response transformer
   *
   * @param data
   */
  public static transformResponse({ data }: any): any {
    return data;
  }

  /**
   * Handle errors after catch
   */
  public static handleError(error: any): any {
    throw error;
  }

  /**
   * Request method GET
   *
   * @param url
   * @param config
   */
  public static get(url: string, config?: AxiosRequestConfig): any {
    return this.client.get(url, config).then(this.transformResponse).catch(this.handleError);
  }

  /**
   * Request method POST
   *
   * @param url
   * @param data
   * @param config
   */
  public static post(url: string, data: any, config?: AxiosRequestConfig): any {
    return this.client.post(url, data, config).then(this.transformResponse).catch(this.handleError);
  }

  /**
   * Request method PATCH
   *
   * @param url
   * @param config
   */
  public static patch(url: string, config?: AxiosRequestConfig): any {
    return this.client.patch(url, config).then(this.transformResponse).catch(this.handleError);
  }

  /**
   * Request method PUT
   *
   * @param url
   * @param data
   * @param config
   */
  public static put(url: string, data: any, config?: AxiosRequestConfig): any {
    return this.client.put(url, data, config).then(this.transformResponse).catch(this.handleError);
  }

  /**
   * Request method DELETE
   *
   * @param url
   * @param config
   */
  public static delete(url: string, config?: AxiosRequestConfig): any {
    return this.client.delete(url, config).then(this.transformResponse).catch(this.handleError);
  }
}

ApiService.client = ApiService.createClient();
ApiService.client.interceptors.response.use(
  (response) => response,
  (e) => Promise.reject(e)
);
ApiService.client.interceptors.request.use(
  (config) => {
    const access_token = LocalStorageService.get('access_token');

    if (access_token !== null) {
      config.headers.Authorization = `Bearer ${access_token}`;
    }

    return config;
  },
  (e) => Promise.reject(e)
);

export { ApiService };
