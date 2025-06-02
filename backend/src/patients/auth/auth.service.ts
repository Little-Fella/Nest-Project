import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PatientsService } from '../patients.service';
import { Patient } from '../patient.entity';

// Создадим интерфейс для возвращаемого пользователя без пароля
export type SafePatient = Omit<Patient, 'password' | 'hashPassword' | 'comparePassword'>;

@Injectable()
export class AuthService {
    constructor(
        private patientsService: PatientsService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, pass: string): Promise<SafePatient | null> {
        const user = await this.patientsService.findByEmail(email);
        if (user && await user.comparePassword(pass)) {
            const { password, hashPassword, comparePassword, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: SafePatient) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email
            }
        };
    }
}