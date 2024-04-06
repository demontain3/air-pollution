import { Test, TestingModule } from '@nestjs/testing';
import { SensorDatasService } from './sensor_datas.service';

describe('SensorDatasService', () => {
  let service: SensorDatasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SensorDatasService],
    }).compile();

    service = module.get<SensorDatasService>(SensorDatasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
