import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  httpClient = inject(HttpClient)
  users:any[] = []
  ngOninit():void{
    this.fetchUsers();
  }
  fetchUsers(){
    this.httpClient.get('https://localhost:3000/api/users').subscribe((users:any)=>{
      console.log(users);
      this.users = users;
    })
  }
}

