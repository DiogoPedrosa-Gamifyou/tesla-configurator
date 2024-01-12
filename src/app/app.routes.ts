import { CanActivateFn, Router, Routes } from '@angular/router';
import { Step1Component } from './steps/step-1/step-1.component';
import { Step2Component } from './steps/step-2/step-2.component';
import { Step3Component } from './steps/step-3/step-3.component';
import { inject } from '@angular/core';
import { GeneralService } from './_services/general/general.service';

const canActivateFn: CanActivateFn = () => {
  const router = inject(Router);
  const canActivate = inject(GeneralService).checkStepValidity(0);

  if (!canActivate) {
    return router.createUrlTree(['step1']);
  }

  return true;
}

export const routes: Routes = [
  {
    path: 'step1',
    component: Step1Component
  },
  {
    path: 'step2',
    component: Step2Component,
    canActivate: [canActivateFn]
  },
  {
    path: 'step3',
    component: Step3Component,
    canActivate: [canActivateFn]
  },
  {
    path: '**',
    redirectTo: 'step1'
  },
];


