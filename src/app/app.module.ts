import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ClearComponent } from './pages/clear/clear.component';
import { NgAuthModule } from '@appstrax/ng-auth';
import { environment } from 'src/environments/environment';
import { APP_BASE_HREF } from '@angular/common';
import { allIcons, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { NgxStripeModule } from 'ngx-stripe';
import { GoogleTagManagerModule } from 'angular-google-tag-manager';

@NgModule({
  declarations: [AppComponent, ClearComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    NgbModule,
    NgAuthModule.forRoot({
      apiKey: environment.authApiKey,
    }),
    NgxBootstrapIconsModule.pick(allIcons),
    GoogleTagManagerModule.forRoot({
      id: 'GTM-T3XQN93',
    }),
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/rental' },
    { provide: 'googleTagManagerId', useValue: 'GTM-T3XQN93' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
