import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  users: any[] = []; // Asegúrate de que users sea un array de User

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUsers();
    
  }

  getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (result) => {console.log(result), this.users = result},
      error: (error) => console.log(error)
    });
  }

}
