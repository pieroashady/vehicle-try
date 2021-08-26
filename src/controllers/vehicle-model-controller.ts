import { Request, Response } from 'express';
import { BadRequestError } from '../errors/bad-request-error';
import { Op } from 'sequelize';
import { VehicleModel } from '../models/vehiclemodel';
import { Pricelist } from '../models/pricelist';

export class VehicleModelController {
  static async show(req: Request, res: Response) {
    const { id, name, vehicle_type_id } = req.query;

    let where: any = {};

    if (id) where.id = id;
    if (name) where.name = { [Op.like]: `%${name}%` };
    if (vehicle_type_id) where.vehicle_type_id = vehicle_type_id;

    const vehicleModels = await VehicleModel.findAll({
      where,
      include: [
        {
          model: Pricelist,
          as: 'pricelist',
        },
      ],
    });

    return res.json({
      error: false,
      data: vehicleModels,
      message: 'success get vehicle models',
    });
  }

  static async showById(req: Request, res: Response) {
    const { id } = req.params;

    const vehicleModel = await VehicleModel.findByPk(id, {
      include: [
        {
          model: Pricelist,
          as: 'pricelist',
        },
      ],
    });
    if (!vehicleModel) throw new BadRequestError('vehicle model not found');

    return res.json({
      error: false,
      data: vehicleModel,
      message: 'success get vehicle model',
    });
  }

  static async create(req: Request, res: Response) {
    const { name, vehicle_type_id } = req.body;

    const existingVehicleType = await VehicleModel.findOne({
      where: {
        name,
        vehicle_type_id,
      },
    });

    if (existingVehicleType) throw new BadRequestError('vehicle model already exist');

    const vehicleModel = await VehicleModel.create({
      name,
      vehicle_type_id,
    });

    return res.status(200).json({
      error: false,
      data: vehicleModel,
      message: 'Successfully create new vehicle model',
    });
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, vehicle_type_id } = req.body;

    const vehicleModel = await VehicleModel.findByPk(id);
    if (!vehicleModel) throw new BadRequestError('vehicle model not found');

    const existingVehicleType = await VehicleModel.findOne({
      where: {
        name,
        vehicle_type_id,
      },
    });

    if (existingVehicleType) throw new BadRequestError('vehicle model already exist');

    vehicleModel.name = name;
    vehicleModel.vehicle_type_id = vehicle_type_id;
    vehicleModel.save();

    return res.json({
      error: false,
      data: vehicleModel,
      message: 'vehicle model updated',
    });
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const vehicleModel = await VehicleModel.findByPk(id);
    if (!vehicleModel) throw new BadRequestError('vehicle model not found');

    await vehicleModel.destroy();

    return res.json({
      error: false,
      data: vehicleModel,
      message: 'vehicle model deleted',
    });
  }
}
