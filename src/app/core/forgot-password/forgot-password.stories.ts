import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { NgAuthModule, NgAuthService } from '@appstrax/ng-auth';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { moduleMetadata } from '@storybook/angular';
import { environment } from 'src/environments/environment';
import { ForgotPasswordComponent } from './forgot-password.component';

export default {
    title: 'Core/Forgot-Password',
    decorators: [
        moduleMetadata({
            declarations: [],
            imports: [
                CommonModule,
                RouterTestingModule,
                NgbModalModule,
                NgAuthModule.forRoot({ apiKey: environment.authApiKey }),
            ],
            providers: [NgbActiveModal, NgAuthService],
        }),
    ],
};

export const sendRequest = () => ({
    component: ForgotPasswordComponent,
    props: {},
});
