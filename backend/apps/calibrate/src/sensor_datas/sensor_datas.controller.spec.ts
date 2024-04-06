import { Test, TestingModule } from '@nestjs/testing';
import { SensorDatasController } from './sensor_datas.controller';
import { SensorDatasService } from './sensor_datas.service';

describe('SensorDatasController', () => {
  let controller: SensorDatasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SensorDatasController],
      providers: [SensorDatasService],
    }).compile();

    controller = module.get<SensorDatasController>(SensorDatasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
