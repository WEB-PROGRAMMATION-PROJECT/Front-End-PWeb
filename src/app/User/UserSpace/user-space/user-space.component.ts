import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {UserInfo, UserService} from '../../../services/User/user.service';



@Component({
  selector: 'app-user-space',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-space.component.html',
  styleUrls: ['./user-space.component.scss']
})
export class UserSpaceComponent implements OnInit {
   userInfo :UserInfo ;
    userId=1;
  constructor(private userService : UserService) {}

  ngOnInit() {
    this.userService.getUserInfo(this.userId).subscribe((data) => {
      this.userInfo = data;
    });
    // Initialisation des données utilisateur
  }
}
