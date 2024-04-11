import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
  async findById(id: number): Promise<User> {
    return await this.userRepository.findOne({ where: { id } });
  }
  async findByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({ where: { username } });
  }
  async create(user: User): Promise<User> {
    const tempUser = await this.userRepository.create(user);
    return this.userRepository.save(tempUser);
  }
  async update(id: number, user: Partial<User>): Promise<User> {
    await this.userRepository.update(id, user);
    return await this.findById(id);
  }
  async remove(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
  async findProfile(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      relations: {
        profile: true,
      },
    });
  }
}
