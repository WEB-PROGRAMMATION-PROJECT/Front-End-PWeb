import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HomeHeaderComponent} from './Home/home-header/home-header.component';
import {HomeContentComponent} from './Home/home-content/home-content.component';
import {HomeFooterComponent} from './Home/home-footer/home-footer.component';
import {TopDesignersComponent} from './Home/top-designers/top-designers.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HomeHeaderComponent, HomeContentComponent, HomeFooterComponent, TopDesignersComponent],
  templateUrl: './app.component.html',
  standalone: true,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Front-End-PWeb';
}
