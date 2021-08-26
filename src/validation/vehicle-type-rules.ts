export class VehicleTypeRules {
  static create = {
    name: 'required|string',
    vehicle_brand_id: 'required|integer',
  };

  static update = {
    name: 'required|string',
    vehicle_brand_id: 'required|integer',
  };
}
