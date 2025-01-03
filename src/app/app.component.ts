import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <h1>MODE STYLE</h1>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'Front-End-PWeb';
}
