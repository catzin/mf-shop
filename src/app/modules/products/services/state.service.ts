import { Injectable, WritableSignal, signal } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  public activeSidenavOption : BehaviorSubject<string> = new BehaviorSubject('');

  constructor() { }
}
