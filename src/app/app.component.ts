import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GeneralService } from './_services/general/general.service';
import { NavbarComponent } from './navbar/navbar.component';
import { ModelsService } from './_services/models/models.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(
    public generalService: GeneralService,
    public modelsService: ModelsService,
    ) {}

  ngOnInit(): void {
    this.modelsService.getModels().subscribe();
  }
}
