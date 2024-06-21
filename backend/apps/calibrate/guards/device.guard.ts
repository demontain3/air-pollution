import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { createDecipheriv } from 'crypto';
import { firstValueFrom } from 'rxjs';
import { AUTH_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DeviceGuard implements CanActivate {
  constructor(
    @Inject(AUTH_SERVICE)
    private readonly usersService: ClientProxy,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    let token = null;
    if (request?.headers?.authorization) {
      // Extract the token from the Authorization header
      const authHeader = request.headers.authorization;
      const match = authHeader.match(/Bearer (.*)/i);
      if (match) {
        token = match[1];
      }
    }
    if (!token) {
      return false;
    }

    // Decrypt the token
    const secretKeyHex = this.configService.get('DEVICE_ENCRYPTION_TOKEN'); // Replace with your actual secret key
    const secretKey = Buffer.from(secretKeyHex, 'hex');
    const iv = Buffer.from(token.slice(0, 32), 'hex'); // Assuming the IV is the first 16 bytes of the token
    const encryptedToken = token.slice(32);
    
    // In the DeviceGuard class
    const decipher = createDecipheriv('aes-256-cbc', secretKey, iv);
    let decrypted = decipher.update(encryptedToken, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    console.log(decrypted);
    let decryptedObject = JSON.parse(decrypted);
   
    const { ssid: serialNo, userId: owner } = decryptedObject;

    // Get the user by ID
    const userObservable = this.usersService.send('get_user_by_id', { owner });
    const user = await firstValueFrom(userObservable);
    // Check if the user exists and if the user's deviceId matches the serial number
    return user && user.deviceId === serialNo;
  }
}
