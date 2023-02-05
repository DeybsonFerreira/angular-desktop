import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedObjectsService {
  private objectToShare: any;

  setObject(object: any) {
    this.objectToShare = object;
  }

  getObject() {
    return this.objectToShare;
  }
}
