import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateEvent } from 'typeorm';
import { CreateProfileDto } from './dto/create-prifile.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Profile } from './profile.entity';
import { User } from './users.entity';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRespository: Repository<Profile>,
  ) {}

  getUsers() {
    return this.userRepository.find({
      relations: ['posts', 'profile']
    });
  }

  async getUser(id: number) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
      relations:['posts']
    });

    if (!userFound) {
      return new HttpException(
        'No se encontró el usuario',
        HttpStatus.NOT_FOUND,
      );
    }

    return userFound;
  }

  async createUser(user: CreateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        username: user.username,
      },
    });

    if (userFound) {
      return new HttpException(
        'El nombre de usuario ya se encuentra registrado',
        HttpStatus.CONFLICT,
      );
    }

    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async deleteUser(id: number) {
    const result = await this.userRepository.delete({
      id,
    });

    if (result.affected === 0) {
      return new HttpException(
        'No se encontró el usuario',
        HttpStatus.NOT_FOUND,
      );
    }

    return result;
  }

  async updateUser(id: number, user: UpdateUserDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });

    if (!userFound) {
      return new HttpException(
        'No se encontró el usuario',
        HttpStatus.NOT_FOUND,
      );
    }

    const updateUser = Object.assign(userFound, user);
    return this.userRepository.save(updateUser);
  }

  async createProfile(id: number, profile: CreateProfileDto) {
    const userFound = await this.userRepository.findOne({
      where: {
        id,
      },
    });
    if (!userFound) {
      return new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);
    }

    const newProfile = this.profileRespository.create(profile);
    const saveProfile = await this.profileRespository.save(newProfile);
    userFound.profile = saveProfile;
    return this.userRepository.save(userFound);
  }
}
