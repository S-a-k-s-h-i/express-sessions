import { Injectable } from '@nestjs/common';
import { User } from '../../../user/entities/user.entity';
import { UserService } from '../../../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
    ) {}

    /**
     * Method to validate user with username and password
     * @param username username
     * @param pass password
     * @returns any
     */
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByName(username);
        if (user && user.password === pass) {
            const {password,username,...rest} = user
            return rest;
        }
        return null;
    }

    // async login(user: User): Promise<any> {
    //     const payload = { name: user.username, sub: user.id };
    //     return {
    //         access_token: this.jwtService.sign(payload),
    //     };
    // }
}
