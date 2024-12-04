import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { LoginService } from '../login/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-administration-panel',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './administration-panel.component.html',
  styleUrl: './administration-panel.component.css'
})
export class AdministrationPanelComponent {

  private loginService = inject(LoginService);
  private snackBar = inject(MatSnackBar);

  logOut(){
    alert('implement logout')

    this.loginService.logOut().subscribe({
      next: (response) =>  {
        
      },
      error: (error) => {
        this.openSnackBar('Error, please try again later');
        console.log(error);
      },
    });

  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
