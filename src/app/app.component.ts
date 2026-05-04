import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NabvarComponent } from './components/nabvar/nabvar.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NabvarComponent, FooterComponent, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mi-app';
}
