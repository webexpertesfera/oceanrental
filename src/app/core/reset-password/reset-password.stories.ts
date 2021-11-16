import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { NgAuthModule, NgAuthService } from '@appstrax/ng-auth';
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { moduleMetadata } from '@storybook/angular';
import { environment } from 'src/environments/environment';
import { ResetPasswordComponent } from './reset-password.component';

export default {
    title: 'Core/Reset-Password',
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

export const resetPassword = () => ({
    component: ResetPasswordComponent,
    props: {},
});
