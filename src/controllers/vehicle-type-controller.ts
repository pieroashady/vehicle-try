import { Request, Response } from 'express';
import { BadRequestError } from '../errors/bad-request-error';
import { Op } from 'sequelize';
import { VehicleType } from '../models/vehicletype';

export class VehicleTypeController {
  static async show(req: Request, res: Response) {
    const { id, name, vehicle_brand_id } = req.query;

    let where: any = {};

    if (id) where.id = id;
    if (name) where.name = { [Op.like]: `%${name}%` };
    if (vehicle_brand_id) where.vehicle_brand_id = vehicle_brand_id;

    const vehicleTypes = await VehicleType.findAll({ where });

    return res.json({
      error: false,
      data: vehicleTypes,
      message: 'success get vehicle types',
    });
  }

  static async showById(req: Request, res: Response) {
    const { id } = req.params;

    const vehicleType = await VehicleType.findByPk(id);
    if (!vehicleType) throw new BadRequestError('vehicle type not found');

    return res.json({
      error: false,
      data: vehicleType,
      message: 'success get vehicle brand',
    });
  }

  static async create(req: Request, res: Response) {
    const { name, vehicle_brand_id } = req.body;

    const existingVehicleType = await VehicleType.findOne({
      where: {
        name,
        vehicle_brand_id,
      },
    });

    if (existingVehicleType) throw new BadRequestError('vehicle type already exist');

    const vehicleType = await VehicleType.create({
      name,
      vehicle_brand_id,
    });

    return res.status(200).json({
      error: false,
      data: vehicleType,
      message: 'vehicle type created',
    });
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, vehicle_brand_id } = req.body;

    const vehicleType = await VehicleType.findByPk(id);
    if (!vehicleType) throw new BadRequestError('vehicle type not found');

    const existingVehicleType = await VehicleType.findOne({
      where: {
        name,
        vehicle_brand_id,
      },
    });

    if (existingVehicleType) throw new BadRequestError('vehicle type already exist');

    vehicleType.name = name;
    vehicleType.vehicle_brand_id = vehicle_brand_id;
    vehicleType.save();

    return res.json({
      error: false,
      data: vehicleType,
      message: 'vehicle type updated',
    });
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const vehicleType = await VehicleType.findByPk(id);
    if (!vehicleType) throw new BadRequestError('vehicle type not found');

    await vehicleType.destroy();

    return res.json({
      error: false,
      data: vehicleType,
      message: 'vehicle type deleted',
    });
  }
}
