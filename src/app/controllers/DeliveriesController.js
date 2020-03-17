import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Deliveries from '../models/Deliveries';
import Deliverman from '../models/Deliverman';
import Recipients from '../models/Recipients';
import Avatar from '../models/Avatar';
import Signature from '../models/Signature';

import Mail from '../../lib/Mail';

class DeliveriesController {
  async store(req, res) {
    const { deliveryman_id, recipient_id } = req.body;

    const deliverman = await Deliverman.findByPk(deliveryman_id);

    if (!deliverman)
      return res
        .status(401)
        .json({ erro: 'Not found deliverman with this ID.' });

    const recipients = await Recipients.findByPk(recipient_id, {
      attributes: [
        'id',
        'name',
        'street',
        'number_address',
        'complement',
        'city',
        'state',
        'zip_code',
      ],
    });

    if (!recipients)
      return res
        .status(401)
        .json({ erro: 'Not found recipients with this ID.' });

    const deliveries = await Deliveries.create(req.body);

    // const hourStart = startOfHour(deliveries.createdAt);

    const start_data = format(
      deliveries.createdAt,
      "'Dia' dd 'de' MMMM', às' HH:mm'h'",
      {
        locale: pt,
      }
    );

    console.log(start_data);
    // Envio de E-MAIL
    await Mail.sendMail({
      to: `${deliverman.name} <${deliverman.email}>`,
      subject: `Nova entrega FAST FEET disponível para você.`,
      template: 'delivery',
      context: {
        name: deliverman.name,
        id: deliveries.id,
        product: deliveries.product,
        street: recipients.street,
        number_address: recipients.number_address,
        neighborhood: 'Resistencia', // INSERIR BAIRRO NA TABEL
        city: recipients.city,
        state: recipients.state,
        zip_code: recipients.zip_code,
        complement: recipients.complement,
        date_start: start_data,
      },
    });

    return res.json(deliveries);
  }

  async index(req, res) {
    const deliveries = await Deliveries.findAll({
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
      include: [
        {
          model: Recipients,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number_address',
            'complement',
            'city',
            'state',
            'zip_code',
          ],
        },
        {
          model: Deliverman,
          as: 'deliverman',
          attributes: ['name', 'email'],
          include: [
            {
              model: Avatar,
              as: 'avatar',
              attributes: ['url', 'name', 'path'],
            },
          ],
        },
        {
          model: Signature,
          as: 'signature',
          attributes: ['url', 'name', 'path'],
        },
      ],
    });
    return res.json(deliveries);
  }

  async update(req, res) {
    const { id, deliveryman_id, recipient_id, signature_id } = req.body;

    const deliverman = await Deliverman.findByPk(deliveryman_id);

    if (!deliverman)
      return res
        .status(401)
        .json({ erro: 'Not found deliverman with this ID.' });

    const recipients = await Recipients.findByPk(recipient_id);

    if (!recipients)
      return res
        .status(401)
        .json({ erro: 'Not found recipients with this ID.' });

    const signature = await Signature.findByPk(recipient_id);

    if (signature_id && !signature)
      return res
        .status(401)
        .json({ erro: 'Not found signature with this ID.' });

    const deliveries = await Deliveries.update(req.body, {
      where: { id },
    });

    if (!deliveries[0])
      return res
        .status(401)
        .json({ erro: 'Not found deliveries with this ID.' });

    return res.status(401).json({ erro: 'Updated deliveries with success.' });
  }

  async destroy(req, res) {
    const { id } = req.params;

    const deliveries = await Deliveries.destroy({ where: { id } });

    if (!deliveries)
      return res
        .status(401)
        .json({ erro: 'Not found deliveries with this ID' });

    return res.json({ erro: 'Deleted delivery with success' });
  }
}

export default new DeliveriesController();
