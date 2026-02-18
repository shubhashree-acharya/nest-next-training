import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findByUsername(username);
        if (user && await bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.username, sub: user.id };
        return {
            user,
            access_token: this.jwtService.sign(payload),
        };
    }
    async signup(userData: { name: string; username: string; email: string; password: string }) {
        const newUser = await this.userService.signup(userData);
        // Immediately issue JWT after signup
        const payload = { username: newUser.username, sub: newUser.id };
        return {
            user: { id: newUser.id, username: newUser.username, email: newUser.email },
            access_token: this.jwtService.sign(payload),
        };
    }
}
