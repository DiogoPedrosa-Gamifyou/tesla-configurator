import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormControl, Validators } from '@angular/forms';
import { GeneralService } from '../../_services/generalService/general.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-step-2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step-2.component.html',
  styleUrl: './step-2.component.scss'
})
export class Step2Component implements OnInit, OnDestroy {

  private destroy = new Subject<boolean>();

  constructor(
    public generalService: GeneralService
  ) { }

  ngOnInit(): void {
    this.generalService.getOptions().pipe(takeUntil(this.destroy)).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }
}
