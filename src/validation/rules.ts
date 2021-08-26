export default class Rules {
  static auth = {
    name: "required|string",
    password: "required|alpha_num",
  };
}
