import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  private data: any = null;
  private user: any = null;

  constructor() { }

  clear(): void {
    this.data = null;
    this.user = null;
  }

  load(jwt: string): void {
    try {
      this.data = jwtDecode(jwt) as any;
      this.user = JSON.parse(this.data.userData);
    } catch (e) {
    }
  }

  isValid(): any {
    return !this.isExpired() && this.isValidAudience() && this.isValidIssuer();
  }

  getUser(): any {
    return this.user;
  }
  
  private isExpired(): boolean {
    if (this.data == null) {
      return true;
    }

    const date = this.getExpirationDate();
    if (date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }

  private getExpirationDate(): Date {
    if (this.data.exp === undefined) return null;

    const date = new Date(0); 
    date.setUTCSeconds(this.data.exp);
    return date;
  }

  private isValidAudience() {
    if (this.data.id === undefined) return false;
    return true;
  }

  private isValidIssuer() {
    if (this.data.email === undefined) return false;
    return true;
  }
}
