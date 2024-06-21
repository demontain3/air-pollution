import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto, UpdateDeviceOwnerDto } from './dto/update-device.dto';
import { AUTH_SERVICE, ExtendedFindOptions, User } from '@app/common';
import { DeviceDocument } from './entities/device.entity';
import { DevicesRepository } from './device.repository';
import { BaseService } from 'apps/calibrate/base/calibrate.base.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DevicesService extends BaseService<
  DeviceDocument,
  DevicesRepository
> {
  constructor(
    private readonly devicesRepository: DevicesRepository,
    @Inject(AUTH_SERVICE)
    private readonly usersService: ClientProxy,
    private readonly configService: ConfigService,
  ) {
    super(devicesRepository);
  }

  async create(createDeviceDto: CreateDeviceDto): Promise<DeviceDocument> {
    const { owner, ...rest } = createDeviceDto;
    const device = new DeviceDocument();
    Object.assign(device, rest);

    if (owner) {
      const userObservable = this.usersService.send('get_user_by_id', {
        owner,
      });
      const user = await firstValueFrom(userObservable);
      if (!user) {
        throw new BadRequestException(`User with ID ${owner} not found`);
      }
      device.owner = owner;
      const res = await this.usersService.send('allocate_device_to_user', {
        owner,
        deviceId: device.serialNo,
      });
      await firstValueFrom(res)
    }
    return await this.devicesRepository.create(device);
  }

  async findAll(
    options: ExtendedFindOptions<DeviceDocument>,
  ): Promise<{ data: DeviceDocument[]; total: number }> {
    const result = await this.devicesRepository.find(options.query);
    const data = result;
    const total = result.length;
    return { data, total };
  }

  async findOne(id: string): Promise<DeviceDocument> {
    const device = await this.devicesRepository.findOne({ _id: id });
    if (!device) {
      throw new NotFoundException(`DeviceDocument with ID ${id} not found`);
    }
    return device;
  }

  async findOneBySerialNo(serialNo: string): Promise<DeviceDocument> {
    const device = await this.devicesRepository.findOne({ serialNo: serialNo });
    if (!device) {
      throw new NotFoundException(
        `DeviceDocument with serialNo ${serialNo} not found`,
      );
    }
    return device;
  }

  async update(
    id: string,
    updateDeviceDto: UpdateDeviceDto,
  ): Promise<DeviceDocument> {
    const device = await this.findOne(id);

    if (updateDeviceDto.serialNo !== undefined) {
      device.serialNo = updateDeviceDto.serialNo;
    }
    if (updateDeviceDto.type !== undefined) {
      device.type = updateDeviceDto.type;
    }
    // if (updateDeviceDto.owner !== undefined) {
    //   device.owner = updateDeviceDto.owner;
    // }

    await this.devicesRepository.findOneAndUpdate({ id: device._id }, device);
    return device;
  }

  async setUserAndGetSensorToken(
    id: string,
    updateDeviceDto: UpdateDeviceOwnerDto,
  ): Promise<{ device: DeviceDocument; token: string }> {
    const device = await this.findOne(id);
    if (updateDeviceDto.owner !== undefined) {
      device.owner = updateDeviceDto.owner;
    }
    const userId = device.owner;
    const res = await this.usersService.send('allocate_device_to_user', {
      id: userId,
      deviceId: device.serialNo,
    });
    await firstValueFrom(res);
    const savedDevice = await this.devicesRepository.findOneAndUpdate(
      { _id: device._id },
      device,
    );

    // Generate a unique encrypted token
    const secretKeyHex = this.configService.get('DEVICE_ENCRYPTION_TOKEN'); // Replace with your actual secret key
    const secretKey = Buffer.from(secretKeyHex, 'hex');
    const iv = randomBytes(16); // Initialization vector
    const cipher = createCipheriv('aes-256-cbc', secretKey, iv);
    const timestamp = Date.now();

    let tokenData = {
      ssid: device.serialNo,
      userId: device.owner,
      timestamp: timestamp,
    };

    let token =
      iv.toString('hex') +
      cipher.update(JSON.stringify(tokenData), 'utf8', 'hex');
    token += cipher.final('hex');

    return { device: savedDevice, token };
  }

  async remove(id: string): Promise<void> {
    const device = await this.findOne(id);
    if (!device) {
      throw new NotFoundException(`DeviceDocument with ID ${id} not found`);
    }
    await this.devicesRepository.findOneAndDelete({ id });
  }
}
