import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Model, ModelColor } from '../../_models/models.model';

import { Step } from '../../_models/steps.model';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private stepsSubject: BehaviorSubject<Array<Step>> = new BehaviorSubject<Array<Step>>([]);
  public steps$: Observable<Array<Step>> = this.stepsSubject.asObservable();

  constructor() {
    this.stepsSubject.next([
      {
        id: 'step1',
        text: 'Step 1',
        valid: false
      },
      {
        id: 'step2',
        text: 'Step 2',
        valid: false
      },
      {
        id: 'step3',
        text: 'Step 3',
        valid: false
      }
    ]);
  }

  public get steps(): Array<Step> {
    return this.stepsSubject.value;
  }

  public trackByFn<T>(item: T): string {
    return (item as Model).code || (item as ModelColor).code;
  }

  public checkStepValidity(stepIndex: number): boolean {
    return this.steps[stepIndex - 1 > 0 ? stepIndex - 1: stepIndex].valid;
  }
}
