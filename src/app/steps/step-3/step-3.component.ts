import { Component } from '@angular/core';
import { ModelsService } from '../../_services/models/models.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-step-3',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './step-3.component.html',
  styleUrl: './step-3.component.scss'
})
export class Step3Component {

  public towHitchCost: number = 1000;
  public yokeCost: number = 1000;

  constructor(
    public modelsService: ModelsService
  ) {}
}
