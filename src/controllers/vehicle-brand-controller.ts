import { Request, Response } from 'express';
import { BadRequestError } from '../errors/bad-request-error';
import { Op } from 'sequelize';
import { VehicleBrand } from '../models/vehiclebrand';
import { VehicleType } from '../models/vehicletype';
import { VehicleModel } from '../models/vehiclemodel';
import { Pricelist } from '../models/pricelist';

export class VehicleBrandController {
  static async show(req: Request, res: Response) {
    const { id, name } = req.query;

    let where: any = {};

    if (id) where.id = id;
    if (name) where.name = { [Op.like]: `%${name}%` };

    const vehicleBrand = await VehicleBrand.findAll({ where });

    return res.json({
      error: false,
      data: vehicleBrand,
      message: 'success get vehicle brands',
    });
  }

  static async showWithEagerLoad(req: Request, res: Response) {
    const vehicleBrandRelation = await VehicleBrand.findAll({
      include: [
        {
          model: VehicleType,
          as: 'vehicle_types',
          include: [
            {
              model: VehicleModel,
              as: 'vehicle_models',
              include: [
                {
                  model: Pricelist,
                  as: 'pricelist',
                },
              ],
            },
          ],
        },
      ],
    });

    return res.json({
      error: false,
      data: vehicleBrandRelation,
      message: 'success get vehicle brands',
    });
  }

  static async showById(req: Request, res: Response) {
    const { id } = req.params;

    const vehicleBrand = await VehicleBrand.findByPk(id);
    if (!vehicleBrand) throw new BadRequestError('vehicle brand not found');

    return res.json({
      error: false,
      data: vehicleBrand,
      message: 'success get vehicle brand',
    });
  }

  static async showByIdWithEagerLoad(req: Request, res: Response) {
    const { id } = req.params;

    const vehicleBrands = await VehicleBrand.findByPk(id, {
      include: [
        {
          model: VehicleType,
          as: 'vehicle_types',
          include: [
            {
              model: VehicleModel,
              as: 'vehicle_models',
              include: [
                {
                  model: Pricelist,
                  as: 'pricelist',
                },
              ],
            },
          ],
        },
      ],
    });

    if (!vehicleBrands) throw new BadRequestError('vehicle brand not found');

    return res.json({
      error: false,
      data: vehicleBrands,
      message: 'success get vehicle brands',
    });
  }

  static async create(req: Request, res: Response) {
    const { name } = req.body;

    const existingVehicleBrand = await VehicleBrand.findOne({
      where: {
        name,
      },
    });

    if (existingVehicleBrand) throw new BadRequestError('vehicle brand already exist');

    const vehicleBrand = await VehicleBrand.create({
      name,
    });

    return res.status(200).json({
      error: false,
      data: vehicleBrand,
      message: 'vehicle brand created',
    });
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;

    const vehicleBrand = await VehicleBrand.findByPk(id);
    if (!vehicleBrand) throw new BadRequestError('vehicle brand not found');

    const existingVehicleBrand = await VehicleBrand.findOne({
      where: {
        name,
      },
    });

    if (existingVehicleBrand) throw new BadRequestError('vehicle brand already exist');

    vehicleBrand.name = name;
    vehicleBrand.save();

    return res.json({
      error: false,
      data: vehicleBrand,
      message: 'vehicle brand updated',
    });
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const vehicleBrand = await VehicleBrand.findByPk(id);
    if (!vehicleBrand) throw new BadRequestError('vehicle brand not found');

    await vehicleBrand.destroy();

    return res.json({
      error: false,
      data: vehicleBrand,
      message: 'vehicle brand deleted',
    });
  }
}
