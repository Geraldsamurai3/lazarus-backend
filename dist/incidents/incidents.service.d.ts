import { Repository } from 'typeorm';
import { Incident } from './Entities/incident.entity';
import { CreateIncidentDto } from './Dto/create-incident.dto';
export declare class IncidentsService {
    private readonly repo;
    constructor(repo: Repository<Incident>);
    create(dto: CreateIncidentDto): Promise<Incident>;
    findAll(): Promise<Incident[]>;
    findOne(id: string): Promise<Incident | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
