import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../_services/generalService/general.service';
import { ReactiveFormsModule, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

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
    model: new FormControl('', Validators.required),
    color: new FormControl('', Validators.required)
  })

  constructor(
    public generalService: GeneralService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form.controls['model'].valueChanges.pipe(takeUntil(this.destroy)).subscribe((value) => {
      this.generalService.setSelectedModel(value);

      if (this.generalService.selectedModelColor) { // update selected color if there was one already selected
        this.generalService.setSelectedModelColor(this.generalService.selectedModelColor.code);
        this.form.controls['color'].setValue(this.generalService.selectedModelColor?.code ?? ''); // default value if there's no selected color
      }
    });

    this.form.controls['color'].valueChanges.pipe(takeUntil(this.destroy)).subscribe((value) => {
      this.generalService.setSelectedModelColor(value);
    });
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.complete();
  }
}
