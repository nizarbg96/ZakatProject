import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, exhaustMap, take, tap } from 'rxjs/operators';
import { BankAccountUser } from 'app/core/user/bankAccountUser.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
export interface BankAccountBalance {
  balanceAmount: number;
  balanceDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class AddBankAccountService {
  bankAccountUser = new BehaviorSubject<BankAccountUser>(null);

  constructor(private http: HttpClient) {}
  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB0hAHuPIntDspWQq7vmiH4KW4tKubG2W4',
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(errorRes => {
          let errorMessage = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(errorMessage);
          }
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email exists already';
          }
          return throwError(errorMessage);
        })
      );
  }
  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB0hAHuPIntDspWQq7vmiH4KW4tKubG2W4',
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap(resData => {
          this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        })
      );
  }
  fetchBalances() {
    return this.bankAccountUser.pipe(
      take(1),
      exhaustMap(bankAccountUser => {
        return this.http.get<BankAccountBalance[]>(
          'https://bankaccount-rest.firebaseio.com/users/' + bankAccountUser.id + '/balances.json',
          {
            params: new HttpParams().set('auth', bankAccountUser.token)
          }
        );
      })
    );
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const bankAccountUser = new BankAccountUser(email, userId, token, expirationDate);
    this.bankAccountUser.next(bankAccountUser);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}
