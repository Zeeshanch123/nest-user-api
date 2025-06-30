import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    private users = [
        { id: '1', name: 'Zeeshan', email: 'zeeshan@gmail.com' },
        { id: '2', name: 'Ali', email: 'ali@gmail.com' },
        { id: '3', name: 'Salman', email: 'salman@gmail.com' },
    ];

    findAll() {
        return this.users;
    }
}
