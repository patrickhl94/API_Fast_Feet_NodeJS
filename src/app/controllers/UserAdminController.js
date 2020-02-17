import UserAdmin from '../models/UserAdmin';

class UserAdminController {
  async show(req, res) {
    const userAdmin = await UserAdmin.findAll();

    return res.json(userAdmin);
  }
}

export default new UserAdminController();
