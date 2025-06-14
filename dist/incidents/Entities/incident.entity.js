"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Incident = void 0;
const typeorm_1 = require("typeorm");
let Incident = class Incident {
    id;
    type;
    description;
    latitude;
    longitude;
    mediaUrls;
    timestamp;
};
exports.Incident = Incident;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Incident.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 100 }),
    __metadata("design:type", String)
], Incident.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], Incident.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)('double'),
    __metadata("design:type", Number)
], Incident.prototype, "latitude", void 0);
__decorate([
    (0, typeorm_1.Column)('double'),
    __metadata("design:type", Number)
], Incident.prototype, "longitude", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { nullable: true }),
    __metadata("design:type", Array)
], Incident.prototype, "mediaUrls", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Incident.prototype, "timestamp", void 0);
exports.Incident = Incident = __decorate([
    (0, typeorm_1.Entity)('incidents')
], Incident);
//# sourceMappingURL=incident.entity.js.map