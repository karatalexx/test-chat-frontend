/**
 * Local storage service
 */
export class LocalStorageService {
  public static storage = window.localStorage;

  /**
   * Get from local storage
   *
   * @param field
   */
  public static get(field: string): string | null {
    try {
      const item = LocalStorageService.storage.getItem(field);

      return item ? JSON.parse(item) : null;
    } catch (e) {
      return null;
    }
  }

  /**
   * Set field to local storage
   *
   * @param key
   * @param value
   */
  public static set(key: string, value: string): void {
    try {
      LocalStorageService.storage.setItem(key, JSON.stringify(value));
    } catch (e) {}
  }

  /**
   * Remove field from local storage
   *
   * @param key
   */
  public static remove(key: string): void {
    LocalStorageService.storage.removeItem(key);
  }
}
