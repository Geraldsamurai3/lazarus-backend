import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Incident } from './Entities/incident.entity';
import { CreateIncidentDto } from './Dto/create-incident.dto';

@Injectable()
export class IncidentsService {
  private readonly logger = new Logger(IncidentsService.name);

  constructor(
    @InjectRepository(Incident)
    private readonly repo: Repository<Incident>,
  ) {}

  create(dto: CreateIncidentDto) {
    const incident = this.repo.create(dto);
    return this.repo.save(incident);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  remove(id: string) {
    return this.repo.delete(id);
  }

  /**
   * Se ejecuta cada hora y borra los incidentes
   * con timestamp anterior a 24 horas.
   */
  @Cron(CronExpression.EVERY_HOUR)
  async deleteOldIncidents(): Promise<void> {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const result = await this.repo.delete({
      timestamp: LessThan(cutoff),
    });
    this.logger.log(
      `Eliminados ${result.affected ?? 0} incidentes anteriores a ${cutoff.toISOString()}`,
    );
  }
}
