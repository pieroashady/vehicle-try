export default class AuthRules {
  static signUp = {
    name: 'required|string',
    password: 'required|alpha_num',
    is_admin: 'required|boolean',
  };

  static signIn = {
    name: 'required|string',
    password: 'required|alpha_num',
  };
}
