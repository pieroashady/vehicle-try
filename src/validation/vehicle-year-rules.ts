export class VehicleYearRules {
  static create = {
    year: 'required|integer|min:0',
  };

  static update = {
    year: 'required|integer|min:0',
  };
}
