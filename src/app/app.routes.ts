import { Routes } from '@angular/router';
import { Step1Component } from './steps/step-1/step-1.component';
import { Step2Component } from './steps/step-2/step-2.component';
import { Step3Component } from './steps/step-3/step-3.component';
import { inject } from '@angular/core';
import { GeneralService } from './_services/generalService/general.service';

export const routes: Routes = [
  {
    path: 'step1',
    component: Step1Component
  },
  {
    path: 'step2',
    component: Step2Component,
    canActivate: [() => inject(GeneralService).checkStepValidity(0)]
  },
  {
    path: 'step3',
    component: Step3Component,
    canActivate: [() => inject(GeneralService).checkStepValidity(1)]
  },
  {
    path: '**',
    component: Step1Component
  },
];
