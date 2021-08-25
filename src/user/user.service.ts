import { HttpService, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo:Repository<User>,
    private httpService: HttpService
  ){}

  async createOne(createUserDto: CreateUserDto) {
    const newUser = this.userRepo.create(createUserDto);
    await this.userRepo.save(newUser);
    return newUser;
  }

  async findAll():Promise<User[]> {
    return this.userRepo.find();
  }

  async findOneUser(id: string):Promise<User> {
    const user = await this.userRepo.findOne(id);
    if(!user) throw new NotFoundException("USER NOT FOUND");
    return user

  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOneUser(id);
    if(updateUserDto.age) user.age = updateUserDto.age;
    if(updateUserDto.isActive) user.isActive = updateUserDto.isActive;

    await this.userRepo.update({id:user.id},updateUserDto);
    return await this.findOneUser(id);
  }

  async remove(id: string) {
    await this.findOneUser(id);
    try {
      await this.userRepo.delete({ id });
      return { deleted: true };
    } catch (err) {
      return { deleted: false, message: err.message };
    }
  }

  async findByName(username: string) {
    return await this.userRepo.findOne({
        where: {
            username: username,
        },
    });
    }

  findAllUsers(): Observable<AxiosResponse<User[]>> {
      return this.httpService.get('http://localhost:3000/user');
    }
}
