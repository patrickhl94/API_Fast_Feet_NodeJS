import Recipients from '../models/Recipients';

class RecipientsController {
  async store(req, res) {
    const recipients = await Recipients.create(req.body);

    return res.json(recipients);
  }

  async update(req, res) {
    const { name } = req.body;
    // AINDA NÃO FUNCIONA O UPDATED
    const recipients = await Recipients.update({ where: { name } });

    return res.json(recipients);
  }
}

export default new RecipientsController();
