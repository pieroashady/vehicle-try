import { Request, Response } from 'express';
import { BadRequestError } from '../errors/bad-request-error';
import { Op } from 'sequelize';
import { Pricelist } from '../models/pricelist';
import { VehicleYear } from '../models/vehicleyear';
import { VehicleModel } from '../models/vehiclemodel';

export class PricelistController {
  static async show(req: Request, res: Response) {
    const { id, code, price, vehicle_year_id, vehicle_model_id } = req.query;

    let where: any = {};

    if (id) where.id = id;
    if (code) where.code = { [Op.like]: `%${code}%` };
    if (price) where.price = price;
    if (vehicle_year_id) where.vehicle_year_id = vehicle_year_id;
    if (vehicle_model_id) where.vehicle_model_id = vehicle_model_id;

    const pricelist = await Pricelist.findAll({
      where,
      include: [
        {
          model: VehicleYear,
          as: 'vehicle_year',
        },
        {
          model: VehicleModel,
          as: 'vehicle_models',
        },
      ],
    });

    return res.json({
      error: false,
      data: pricelist,
      message: 'success get pricelist',
    });
  }

  static async showById(req: Request, res: Response) {
    const { id } = req.params;

    const pricelist = await Pricelist.findByPk(id, {
      include: [
        {
          model: VehicleYear,
          as: 'vehicle_year',
        },
        {
          model: VehicleModel,
          as: 'vehicle_models',
        },
      ],
    });
    if (!pricelist) throw new BadRequestError('pricelist not found');

    return res.json({
      error: false,
      data: pricelist,
      message: 'success get pricelist',
    });
  }

  static async create(req: Request, res: Response) {
    const { code, price, vehicle_year_id, vehicle_model_id } = req.body;

    const existingCode = await Pricelist.findOne({
      where: { code },
    });

    if (existingCode) throw new BadRequestError('pricelist code already exist');

    const existingVehicleType = await Pricelist.findOne({
      where: {
        code,
        price,
        vehicle_year_id,
        vehicle_model_id,
      },
    });

    if (existingVehicleType) throw new BadRequestError('pricelist already exist');

    const pricelist = await Pricelist.create({
      code,
      price,
      vehicle_year_id,
      vehicle_model_id,
    });

    return res.status(200).json({
      error: false,
      data: pricelist,
      message: 'Successfully create new pricelist',
    });
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { code, price, vehicle_year_id, vehicle_model_id } = req.body;

    const pricelist = await Pricelist.findByPk(id);
    if (!pricelist) throw new BadRequestError('pricelist not found');

    const existingPricelist = await Pricelist.findOne({
      where: {
        code,
        price,
        vehicle_year_id,
        vehicle_model_id,
      },
    });

    if (existingPricelist) throw new BadRequestError('pricelist already exist');

    pricelist.code = code;
    pricelist.price = price;
    pricelist.vehicle_year_id = vehicle_year_id;
    pricelist.vehicle_model_id = vehicle_model_id;
    pricelist.save();

    return res.json({
      error: false,
      data: pricelist,
      message: 'pricelist updated',
    });
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const pricelist = await Pricelist.findByPk(id);
    if (!pricelist) throw new BadRequestError('pricelist not found');

    await pricelist.destroy();

    return res.json({
      error: false,
      data: pricelist,
      message: 'pricelist deleted',
    });
  }
}
