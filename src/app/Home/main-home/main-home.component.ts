import { Component } from '@angular/core';
import {HomeContentComponent} from '../content/home-content/home-content.component';
import {HomeHeaderComponent} from '../home-header/home-header.component';
import {TopDesignersComponent} from '../content/top-designers/top-designers.component';

@Component({
  selector: 'app-main-home',
  imports: [
    HomeContentComponent,
    HomeHeaderComponent,
    TopDesignersComponent
  ],
  templateUrl: './main-home.component.html',
  standalone: true,
  styleUrl: './main-home.component.css'
})
export class MainHomeComponent {

}
