import { Component,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './core/services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(private srv: UsersService, private router: Router){
    if (!this.srv.isUserLoggedIn()) {
      this.router.navigate(['/login']);     
  
    }
    this.router.navigate(['/']);
    
  }
  
}
