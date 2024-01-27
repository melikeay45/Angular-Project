//Kullanıcının giriş bilgileri
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
  decodeToken: any;

  //Kullanıcı giriş yapıpyapmadığını döndürür
  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token !== null && !this.IsTokenExpired(token);
  }

  //Tokenın hala geçerli olup olmadığını döndürür
  IsTokenExpired(token: string): boolean {
    const tokenPayload = this.DecodeToken(token);
    const expirationDate = new Date(tokenPayload.exp * 1000); // Unix zaman damgası
    return expirationDate <= new Date(); // Şu anki zaman karşılaştırması
  }

  //Tokenı decode eder ve giriş yapan kullanıcının bilgilerini bulundurur
  DecodeToken(token: string): any {
    try {
      const playload = jwtDecode(token);
      this.decodeToken = JSON.stringify(playload);
      return playload;
    } catch (Error) {
      console.error('Token decode error:', Error);
      return null;
    }
  }
}
