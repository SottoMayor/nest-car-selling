import { Test, TestingModule } from "@nestjs/testing";
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { VehicleDataService } from './vehicle-data.service';

describe("Users controller", () => {
    let controller: ReportsController;

    let fakeReportsService: Partial<ReportsService>;
    let fakeVehicleDataService: Partial<VehicleDataService>;

    beforeEach( async () => {
        fakeReportsService = {
            createEstimate: () => {},
            createReport: () => {},
            validateReport: () => {}
        }
        fakeVehicleDataService = {
            getVehicleData: () => {}
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [ ReportsController ],
            providers: [
                {
                    provide: ReportsService,
                    useValue: fakeReportsService
                },
                {
                    provide: VehicleDataService,
                    useValue: fakeVehicleDataService
                }
            ]
        }).compile();

        controller = module.get<ReportsController>(ReportsController);
    })

    it('Should be defined', () => {
        expect(controller).toBeDefined();
    })

})