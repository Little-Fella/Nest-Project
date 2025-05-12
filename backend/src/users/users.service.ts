import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.query('SELECT * FROM users');
  }

  async findOne(id: number): Promise<User> {
    return this.usersRepository.query('SELECT * FROM users WHERE id = $1', [id]);
  }

  async create(user: Partial<User>): Promise<User> {
    const result = await this.usersRepository.query(
      'INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *',
      [user.username, user.password, user.role],
    );
    return result[0];
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    const result = await this.usersRepository.query(
      'UPDATE users SET username = $1, password = $2, role = $3 WHERE id = $4 RETURNING *',
      [user.username, user.password, user.role, id],
    );
    return result[0];
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.query('DELETE FROM users WHERE id = $1', [id]);
  }
}