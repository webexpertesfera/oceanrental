import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { NgAuthModule, NgAuthService } from '@appstrax/ng-auth';
import { moduleMetadata } from '@storybook/angular';
import { environment } from 'src/environments/environment';
import { SignUpComponent } from './sign-up.component';

export default {
    title: 'Core/Signup',
    decorators: [
        moduleMetadata({
            declarations: [],
            imports: [
                CommonModule,
                RouterTestingModule,
                NgAuthModule.forRoot({ apiKey: environment.authApiKey }),
            ],
            providers: [NgAuthService],
        }),
    ],
};

export const signup = () => ({
    component: SignUpComponent,
    props: {},
});
