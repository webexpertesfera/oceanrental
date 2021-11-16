import { NgUser } from '@appstrax/ng-auth';

export class User {
    id!: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: string;

    static fromNgUser(ngUser: NgUser): User {
        const user = new User();
        user.id = ngUser.id;
        user.firstName = ngUser.firstName;
        user.lastName = ngUser.lastName;
        user.email = ngUser.email;

        return user;
    }
}
