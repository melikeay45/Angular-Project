export interface ApiResult<T> {
  data: T;
  message: string;
  success: boolean;
}
