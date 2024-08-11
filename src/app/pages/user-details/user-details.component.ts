import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { User } from '../../interface/user';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  route:ActivatedRoute=inject(ActivatedRoute);
  userId=-1;
  user: User|null= null;
  constructor(private userService: UserService) {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });
  }

  async ngOnInit(): Promise<void> {
      await this.getUser();
  }
  
  async getUser(): Promise<void> {
      this.userService.getUser(this.userId).subscribe({
        next: (result) => {console.log(result), this.user = result},
        error: (error) => console.log(error)
      });
  }
}
