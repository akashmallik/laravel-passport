import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formData = new FormData();

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit(value) {
    this.formData.append('grant_type', 'password');
    this.formData.append('client_id', '2');
    this.formData.append('client_secret', 'GmGrfvNcNsoSUjHkiYPN5rxMxcCVQNuheorFnu7R');
    this.formData.append('username', 'toakashmallik@gmail.com');
    this.formData.append('password', 'admin@123');

    this.authService.login(this.formData).subscribe(
      reponse => {
        console.log(reponse);
      },
      error => console.log(error)
    );

  }

}
