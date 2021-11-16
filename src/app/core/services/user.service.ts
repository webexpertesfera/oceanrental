import { Injectable } from '@angular/core';
import { User } from 'src/app/booking/models/user';
import { environment } from 'src/environments/environment';
import { HttpService } from './http.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(private httpService: HttpService) { }

    async getUsers(): Promise<Array<User>> {
        const response = await this.httpService.get(`${environment.apiBaseUrl}/users`);
        if (!response.data) {
            throw new Error('Users not found');
        }
        return response.data.map((d: any) => {
            const user = new User();
            user.id = d.id;
            user.email = d.email;
            user.firstName = d.firstName;
            user.lastName = d.lastName;
            user.role = d.role;
            return user;
        });
    }

    async putUsers(row?: any): Promise<Array<any>> {
        const response = await this.httpService.put(
            `${environment.apiBaseUrl}/users/me`,
            row
        );
        if (!response.data) {
            throw new Error('User not found');
        }
        return response.data;
    }
}
