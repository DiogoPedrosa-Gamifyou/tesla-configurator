import { Routes } from '@angular/router';
import { Step1Component } from './steps/step-1/step-1.component';
import { Step2Component } from './steps/step-2/step-2.component';
import { Step3Component } from './steps/step-3/step-3.component';

export const routes: Routes = [
  {
    path: 'step1',
    component: Step1Component
  },
  {
    path: 'step2',
    component: Step2Component
  },
  {
    path: 'step3',
    component: Step3Component
  },
  {
    path: '**',
    component: Step1Component
  },
];
