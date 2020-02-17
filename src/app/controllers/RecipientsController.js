import Recipients from '../models/Recipients';

class RecipientsController {
  async store(req, res) {
    const recipients = await Recipients.create(req.body);

    return res.json(recipients);
  }

  async update(req, res) {
    const { name } = req.body;
    const recipients = await Recipients.update(req.body, { where: { name } });

    if (recipients === 0) {
      return res.status(401).json({ erro: 'Recipients not found' });
    }

    return res.json(recipients);
  }
}

export default new RecipientsController();
