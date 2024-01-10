import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GeneralService } from './_services/generalService/general.service';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  constructor(
    public generalService: GeneralService
    ) {}

  ngOnInit(): void {
    this.generalService.getModels().subscribe();
  }
}
