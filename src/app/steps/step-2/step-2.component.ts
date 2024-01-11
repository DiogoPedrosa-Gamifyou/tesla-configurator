import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormControl, Validators } from '@angular/forms';
import { GeneralService } from '../../_services/generalService/general.service';
import { Subject, takeUntil } from 'rxjs';
import { ModelsService } from '../../_services/models/models.service';

@Component({
  selector: 'app-step-2',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step-2.component.html',
  styleUrl: './step-2.component.scss'
})
export class Step2Component implements OnInit, OnDestroy {

  private destroy = new Subject<boolean>();

  public form = this.fb.group({
    config: new FormControl<string>('', Validators.required),
    yoke: new FormControl<boolean>(false),
    towHitch: new FormControl<boolean>(false),
  });

  constructor(
    public generalService: GeneralService,
    public modelsService: ModelsService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.modelsService.getOptions().pipe(takeUntil(this.destroy)).subscribe();

    this.subscribeInputChanges();
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }

  private subscribeInputChanges(): void {
    this.form.statusChanges.pipe(takeUntil(this.destroy)).subscribe(() => {
      this.validateStep();
    });
  }

  private validateStep(): void {
    this.generalService.steps[1].valid = this.form.valid;
  }
}
