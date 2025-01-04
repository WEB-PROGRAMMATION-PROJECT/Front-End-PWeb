import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HomeHeaderComponent} from './Home/home-header/home-header.component';
import {HomeContentComponent} from './Home/content/home-content/home-content.component';
import {HomeFooterComponent} from './Home/home-footer/home-footer.component';
import {TopDesignersComponent} from './Home/content/top-designers/top-designers.component';
import {NavbarComponent} from './widgets/navbar/navbar.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeFooterComponent, NavbarComponent,HttpClientModule],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Front-End-PWeb';
}
