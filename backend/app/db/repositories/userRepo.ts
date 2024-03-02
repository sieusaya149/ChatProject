import sequelize from "../sequelizeConnection";
import Sequelize from 'sequelize';
import backendModel from "@viethung/backend-models";
import { UserDto, UserUpdateDto } from "./userDto";
import Logger from "@viethung/logger";
const Users = backendModel.Users;


export class UserRepo {
  static async createUser(newUser: UserDto) {
    try {
      const user = await Users.create(newUser);
      Logger.info(`User ${user.id} has been created`);
      return user;
    } catch (error) {
      throw new Error(`${error}`);
    }
  } 

  static async getUser(userId: string) {
    try {
      const user = await Users.findOne({where: {id: userId}});
      if (!user) {
        throw new Error(`User not found`);
      }
      return user;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  static async updateUser(userId: string, updatedUser: UserUpdateDto) {    
    try {
      const user = await Users.findOne({where: {id: userId}});
      if (!user) {
        throw new Error(`User not found`);
      }
      await user.update(updatedUser);
      return user;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  static async deleteUser(userId: string) {
    try {
      const user = await Users.findOne({where: {id: userId}});
      if (!user) {
        throw new Error(`User not found`);
      }
      await user.destroy();
      return user;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  static async getUserList() {  
    try {
      const userList = await Users.findAll();
      return userList;
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}