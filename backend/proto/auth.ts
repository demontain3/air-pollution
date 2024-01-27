/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Timestamp } from "../google/protobuf/timestamp";

export const protobufPackage = "auth";

export interface CreateUserDto {
  username: string;
  password: string;
  email: string;
  category: string;
}

export interface UpdateUserDto {
  id: string;
  email: string;
  username: string;
  /** Admin can update these fields */
  role: string;
  status: string;
}

export interface UserProfileEditDto {
  id: string;
  email: string;
  username: string;
}

export interface UpdateProfilePictureDto {
  id: string;
  profilePicture: Uint8Array;
}

export interface VerifyOTPDto {
  id: string;
  otp: string;
}

export interface ForgotPasswordDto {
  email: string;
}

export interface ResetPasswordDto {
  id: string;
  newPassword: string;
}

export interface FindOneUserDto {
  id: string;
}

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
  category: string;
  /** Additional fields like role and status */
  role: string;
  status: string;
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
}

export interface Otp {
  id: string;
  code: string;
  expires: Timestamp | undefined;
  used: boolean;
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
}

export interface Empty {
}

export interface Users {
  users: User[];
}

export interface QueryManyUsersDto {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  ascending: boolean;
  filterBy: string;
  filterValue: string;
}

export interface PaginatedUsers {
  users: User[];
  totalUsers: number;
}

export const AUTH_PACKAGE_NAME = "auth";

export interface UserServiceClient {
  createUser(request: CreateUserDto): Observable<User>;

  findAllUsers(request: Empty): Observable<Users>;

  findOneUser(request: FindOneUserDto): Observable<User>;

  updateUser(request: UpdateUserDto): Observable<User>;

  removeUser(request: FindOneUserDto): Observable<User>;

  userProfileEdit(request: UserProfileEditDto): Observable<User>;

  updateProfilePicture(request: UpdateProfilePictureDto): Observable<User>;

  logout(request: Empty): Observable<Empty>;

  verifyOtp(request: VerifyOTPDto): Observable<Empty>;

  forgotPassword(request: ForgotPasswordDto): Observable<Empty>;

  resetPassword(request: ResetPasswordDto): Observable<Empty>;

  queryManyUsers(request: QueryManyUsersDto): Observable<PaginatedUsers>;
}

export interface UserServiceController {
  createUser(request: CreateUserDto): Promise<User> | Observable<User> | User;

  findAllUsers(request: Empty): Promise<Users> | Observable<Users> | Users;

  findOneUser(request: FindOneUserDto): Promise<User> | Observable<User> | User;

  updateUser(request: UpdateUserDto): Promise<User> | Observable<User> | User;

  removeUser(request: FindOneUserDto): Promise<User> | Observable<User> | User;

  userProfileEdit(request: UserProfileEditDto): Promise<User> | Observable<User> | User;

  updateProfilePicture(request: UpdateProfilePictureDto): Promise<User> | Observable<User> | User;

  logout(request: Empty): Promise<Empty> | Observable<Empty> | Empty;

  verifyOtp(request: VerifyOTPDto): Promise<Empty> | Observable<Empty> | Empty;

  forgotPassword(request: ForgotPasswordDto): Promise<Empty> | Observable<Empty> | Empty;

  resetPassword(request: ResetPasswordDto): Promise<Empty> | Observable<Empty> | Empty;

  queryManyUsers(request: QueryManyUsersDto): Promise<PaginatedUsers> | Observable<PaginatedUsers> | PaginatedUsers;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "createUser",
      "findAllUsers",
      "findOneUser",
      "updateUser",
      "removeUser",
      "userProfileEdit",
      "updateProfilePicture",
      "logout",
      "verifyOtp",
      "forgotPassword",
      "resetPassword",
      "queryManyUsers",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
