import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../interface/user';
import { SearchComponent } from '../search/search.component.js';

@Component({
  selector: 'app-show-users',
  standalone: true,
  imports: [CommonModule, RouterModule, SearchComponent],
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit {
  users: User[] = [];
  query: string = '';


  constructor(private userService: UserService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['query']) {
        this.query = params['query'];
        this.searchUsers();
      }
    });
  }

  searchUsers(): void {
    if (this.query) {
      this.userService.searchUsers(this.query).subscribe(users => {
        this.users = users;
      });
    }
  }
}
