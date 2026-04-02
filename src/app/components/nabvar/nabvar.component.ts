import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-nabvar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nabvar.component.html',
  styleUrl: './nabvar.component.scss'
})
export class NabvarComponent {

  constructor(public themeService: ThemeService) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

}
