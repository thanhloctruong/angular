import { Observable } from "rxjs";

export interface WithData<IDetailParams, IListParams, IData, Object> {
  detail(params: IDetailParams): Observable<Object>;
  list(params: IListParams): Observable<Array<Object>>;
  save(params: IData): Observable<Object>;
  update(params: IData): Observable<Object>;
}

export interface WithAuth<L, R, F, P, U> {
  user: U | undefined;
  login(data: L): Observable<any>;
  register(data: R): Observable<any>;
  profile(): Observable<any> | Promise<any>;
  forgotPassword(data: F): Observable<any>;
  resetPassword(data: P): Observable<any>;
  changePassword(data: P): Observable<any>;
  refreshToken(): Observable<any>;
  isAuthenticated(): Observable<boolean> | Promise<boolean> | boolean;
}
