export interface ApiError {
  code?: string | number;
  message: string;
}

export interface ApiResult<T> {
  success: boolean;
  data?: T;
  error?: ApiError;
}
