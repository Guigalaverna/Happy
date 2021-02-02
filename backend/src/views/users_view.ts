import User from "../models/User";

export default {
  render(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  },

  renderWithToken(user: User, token: String) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token: token,
    };
  },

  renderMany(users: User[]) {
    return users.map((user) => this.render(user));
  },
};
