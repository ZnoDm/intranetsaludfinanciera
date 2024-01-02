import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage = localStorage;
  constructor() { }

  get(key: string): string {
    return this.storage.getItem(key);
  }

  set(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  getJson(key: string): any {
    let json = null;
    try {
      json = JSON.parse(this.get(key));
    } catch(e) {}
   return json;
  }

  setJson(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    this.storage.removeItem(key);
  }
}
