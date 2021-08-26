export class VehicleModelRules {
  static create = {
    name: 'required|string',
    vehicle_type_id: 'required|integer',
  };

  static update = {
    name: 'required|string',
    vehicle_type_id: 'required|integer',
  };
}
