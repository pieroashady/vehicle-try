export class PricelistRules {
  static create = {
    code: 'required|string',
    price: 'required|integer',
    vehicle_year_id: 'required|integer',
    vehicle_model_id: 'required|integer',
  };

  static update = {
    code: 'required|string',
    price: 'required|integer',
    vehicle_year_id: 'required|integer',
    vehicle_model_id: 'required|integer',
  };
}
