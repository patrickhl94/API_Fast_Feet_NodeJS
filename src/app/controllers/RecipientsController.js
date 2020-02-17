import * as Yup from 'yup';
import Recipients from '../models/Recipients';

class RecipientsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number_address: Yup.number().required(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      zip_code: Yup.number().required(),
      complement: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ erro: 'Validation fails' });
    }
    const recipients = await Recipients.create(req.body);

    return res.json(recipients);
  }

  async update(req, res) {
    const { name } = req.body;
    const recipients = await Recipients.update(req.body, { where: { name } });

    if (!recipients[0]) {
      return res.status(401).json({ erro: 'Recipients not found' });
    }

    return res.status(200).json({ message: 'Updated recipient' });
  }
}

export default new RecipientsController();
