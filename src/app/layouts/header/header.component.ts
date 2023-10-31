import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userEmail?: string;
  isLoggedIn$!: Observable<boolean>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (storedUser !== null) {
      const user = JSON.parse(storedUser);
      this.userEmail = user.providerData[0].email;
      console.log(this.userEmail);
    } else {
      console.log('User not found in local storage');
    }
    this.isLoggedIn$ = this.authService.isLoggenIn();
  }
  onLogout() {
    this.authService.logOut();
  }
}
