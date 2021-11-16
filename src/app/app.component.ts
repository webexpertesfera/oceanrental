import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { GoogleTagManagerService } from 'angular-google-tag-manager';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private gtmService: GoogleTagManagerService
  ) {}

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        const gtmTag = {
          event: 'page',
          pageName: (evt as NavigationEnd).url,
        };
        this.gtmService.pushTag(gtmTag);
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
