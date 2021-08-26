import { Request, Response } from 'express';
import { BadRequestError } from '../errors/bad-request-error';
import { Op } from 'sequelize';
import { Pricelist } from '../models/pricelist';
import { VehicleYear } from '../models/vehicleyear';

export class VehicleYearController {
  static async show(req: Request, res: Response) {
    const { id, year } = req.query;

    let where: any = {};

    if (id) where.id = id;
    if (year) where.year = { [Op.like]: `%${year}%` };

    const vehicleYears = await VehicleYear.findAll({
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
      data: vehicleYears,
      message: 'success get vehicle years',
    });
  }

  static async showById(req: Request, res: Response) {
    const { id } = req.params;

    const vehicleYear = await VehicleYear.findByPk(id, {
      include: [
        {
          model: Pricelist,
          as: 'pricelist',
        },
      ],
    });

    if (!vehicleYear) throw new BadRequestError('vehicle year not found');

    return res.json({
      error: false,
      data: vehicleYear,
      message: 'success get vehicle year',
    });
  }

  static async create(req: Request, res: Response) {
    const { year } = req.body;

    const existingVehicleYear = await VehicleYear.findOne({
      where: {
        year,
      },
    });

    if (existingVehicleYear) throw new BadRequestError('vehicle year already exist');

    const vehicleYear = await VehicleYear.create({
      year,
    });

    return res.status(200).json({
      error: false,
      data: vehicleYear,
      message: 'Successfully create new vehicle year',
    });
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const { year } = req.body;

    const vehicleYear = await VehicleYear.findByPk(id);
    if (!vehicleYear) throw new BadRequestError('vehicle year not found');

    vehicleYear.year = year;
    vehicleYear.save();

    return res.json({
      error: false,
      data: vehicleYear,
      message: 'vehicle year updated',
    });
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params;

    const vehicleYear = await VehicleYear.findByPk(id);
    if (!vehicleYear) throw new BadRequestError('vehicle year not found');

    await vehicleYear.destroy();

    return res.json({
      error: false,
      data: vehicleYear,
      message: 'vehicle year deleted',
    });
  }
}
