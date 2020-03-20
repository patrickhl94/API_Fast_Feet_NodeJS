import { Op } from 'sequelize';
import Recipients from '../models/Recipients';
import Deliveries from '../models/Deliveries';

class ManageDeliveriesController {
  async index(req, res) {
    const { id, delivered } = req.query;

    const deliveries = await Deliveries.findAll({
      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date: null,
        start_date:
          delivered === 'S'
            ? {
                [Op.ne]: null,
              }
            : null,
      },
      attributes: ['id', 'product', 'start_date', 'end_date'],
      include: [
        {
          model: Recipients,
          as: 'recipient',
          attributes: [
            'name',
            'street',
            'number_address',
            'complement',
            'city',
            'state',
            'zip_code',
          ],
        },
      ],
    });

    if (!deliveries)
      return res
        .status(401)
        .json({ erro: 'Deliveries not found with past data' });

    return res.json(deliveries);
  }

  async update(req, res) {
    const {} = req.body;

    return res.json({});
  }
}

export default new ManageDeliveriesController();
