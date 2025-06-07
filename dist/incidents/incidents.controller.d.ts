import { IncidentsService } from './incidents.service';
import { CreateIncidentDto } from './Dto/create-incident.dto';
export declare class IncidentsController {
    private readonly service;
    constructor(service: IncidentsService);
    findAll(): Promise<import("./Entities/incident.entity").Incident[]>;
    findOne(id: string): Promise<import("./Entities/incident.entity").Incident | null>;
    create(dto: CreateIncidentDto, file: Express.Multer.File): Promise<import("./Entities/incident.entity").Incident>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
