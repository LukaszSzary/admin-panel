import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-administration-panel',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './administration-panel.component.html',
  styleUrl: './administration-panel.component.css'
})
export class AdministrationPanelComponent {

}
