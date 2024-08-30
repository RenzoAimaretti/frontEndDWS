import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { UserService } from '../../services/user.service';
import { User } from '../../interface/user';
import { SearchComponent } from '../search/search.component'; 

@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule, SearchComponent]
})
export class ShowUsersComponent implements OnInit {
  users: User[] = [];
  query: string = '';

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(params => {
      if (params['query']) {
        this.query = params['query'];
        this.searchUsers();
      }
    });
  }

  async searchUsers(): Promise<void> {
    if (this.query) {
      this.userService.searchUsers(this.query).subscribe(users => {
        this.users = users;
      });
    }
  }
}


