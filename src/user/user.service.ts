import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerService } from '../customer/customer.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private customerService: CustomerService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    //si tiene el customerId
    if (createUserDto.customerId) {
      const customer = await this.customerService.findOne(
        createUserDto.customerId,
      );
      //esto es para relacionar el customer con el user
      newUser.customer = customer;
    }
    return this.userRepository.save(newUser);
  }

  findAll() {
    return this.userRepository.find({
      //para buscar la relacion
      relations: ['customer'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
