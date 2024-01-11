import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../_services/general/general.service';
import { ReactiveFormsModule, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { ModelsService } from '../../_services/models/models.service';

@Component({
  selector: 'app-step-1',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './step-1.component.html',
  styleUrl: './step-1.component.scss'
})
export class Step1Component implements OnInit {

  private destroy = new Subject<boolean>();

  public form = this.fb.group({
    model: new FormControl<string>('', Validators.required),
    color: new FormControl<string>('', Validators.required)
  });

  constructor(
    public generalService: GeneralService,
    public modelsService: ModelsService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form.controls['model'].setValue(this.modelsService.selectedModel?.code ?? '');
    this.form.controls['color'].setValue(this.modelsService.selectedModelColor?.code ?? '');

    this.subscribeInputChanges();
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }

  private subscribeInputChanges(): void {
    this.form.controls['model'].valueChanges.pipe(takeUntil(this.destroy)).subscribe((value) => {
      this.modelsService.setSelectedModel(value);

      if (this.modelsService.selectedModelColor) { // update selected color if there was one previously selected
        this.modelsService.setSelectedModelColor(this.modelsService.selectedModelColor.code);
        this.form.controls['color'].setValue(this.modelsService.selectedModelColor?.code);
      }
    });

    this.form.controls['color'].valueChanges.pipe(takeUntil(this.destroy)).subscribe((value) => {
      this.modelsService.setSelectedModelColor(value);
    });

    this.form.statusChanges.pipe(takeUntil(this.destroy)).subscribe(() => {
      this.validateStep();
    });
  }

  private validateStep(): void {
    this.generalService.steps[0].valid = this.form.valid;
  }
}
