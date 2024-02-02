/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Timestamp } from "../../../../google/protobuf/timestamp";

export const protobufPackage = "auth";

export interface Error {
  code: string;
  message: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  username: string;
  password: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  error: Error | undefined;
}

export interface CreateUserRequest {
  username: string;
  password: string;
  email: string;
  category: string;
  profilePicture: string;
}

export interface UpdateUserRequest {
  email: string;
  username: string;
  category: string;
  /** Admin can update these fields */
  role: string;
  status: string;
}

export interface UserProfileEditRequest {
  email: string;
  username: string;
  category: string;
}

export interface UpdateProfilePictureRequest {
  profilePicture: string;
}

export interface VerifyOTPRequest {
  otp: string;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  id: string;
  newPassword: string;
}

export interface FindOneUserRequest {
  id: string;
}

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  category: string;
  profilePicture: string;
  /** Additional fields like role and status */
  role: string;
  status: string;
  createdAt: Timestamp | undefined;
  updatedAt: Timestamp | undefined;
}

export interface Otp {
  id: number;
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

export interface QueryManyUsersRequest {
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
  createUser(request: CreateUserRequest): Observable<User>;

  findAllUsers(request: Empty): Observable<Users>;

  findOneUser(request: FindOneUserRequest): Observable<User>;

  updateUser(request: UpdateUserRequest): Observable<User>;

  removeUser(request: FindOneUserRequest): Observable<User>;

  userProfileEdit(request: UserProfileEditRequest): Observable<User>;

  updateProfilePicture(request: UpdateProfilePictureRequest): Observable<User>;

  logout(request: Empty): Observable<Empty>;

  verifyOtp(request: VerifyOTPRequest): Observable<Empty>;

  forgotPassword(request: ForgotPasswordRequest): Observable<Empty>;

  resetPassword(request: ResetPasswordRequest): Observable<Empty>;

  queryManyUsers(request: QueryManyUsersRequest): Observable<PaginatedUsers>;

  login(request: LoginRequest): Observable<LoginResponse>;

  signup(request: SignupRequest): Observable<Empty>;
}

export interface UserServiceController {
  createUser(request: CreateUserRequest): Promise<User> | Observable<User> | User;

  findAllUsers(request: Empty): Promise<Users> | Observable<Users> | Users;

  findOneUser(request: FindOneUserRequest): Promise<User> | Observable<User> | User;

  updateUser(request: UpdateUserRequest): Promise<User> | Observable<User> | User;

  removeUser(request: FindOneUserRequest): Promise<User> | Observable<User> | User;

  userProfileEdit(request: UserProfileEditRequest): Promise<User> | Observable<User> | User;

  updateProfilePicture(request: UpdateProfilePictureRequest): Promise<User> | Observable<User> | User;

  logout(request: Empty): Promise<Empty> | Observable<Empty> | Empty;

  verifyOtp(request: VerifyOTPRequest): Promise<Empty> | Observable<Empty> | Empty;

  forgotPassword(request: ForgotPasswordRequest): Promise<Empty> | Observable<Empty> | Empty;

  resetPassword(request: ResetPasswordRequest): Promise<Empty> | Observable<Empty> | Empty;

  queryManyUsers(request: QueryManyUsersRequest): Promise<PaginatedUsers> | Observable<PaginatedUsers> | PaginatedUsers;

  login(request: LoginRequest): Promise<LoginResponse> | Observable<LoginResponse> | LoginResponse;

  signup(request: SignupRequest): Promise<Empty> | Observable<Empty> | Empty;
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
      "login",
      "signup",
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
