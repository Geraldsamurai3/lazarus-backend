export class CreateIncidentDto {
  type: string;
  description: string;
  latitude: number;
  longitude: number;
  mediaUrls?: string[];
}