import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {AppbarComponent} from "./layouts/appbar/appbar.component";
import { FooterComponent } from "./layouts/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AppbarComponent, RouterLink, RouterLinkActive, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'exam_project_work';
}
