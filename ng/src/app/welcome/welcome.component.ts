import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  user: any = {
    name: null,
  };

  constructor(private autService: AuthService) { }

  ngOnInit() {
    this.autService.getUserInfo().subscribe(
      respose => {
        this.user = respose;
      },
      error => console.log(error)
    );
  }

  logout() {
    console.log('work');
    this.autService.logout().subscribe();
  }

}
