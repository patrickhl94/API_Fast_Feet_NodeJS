import Recipients from '../models/Recipients';
import Deliveries from '../models/Deliveries';

class ManageDeliveriesController {
  async index(req, res) {
    const deliveries = await Deliveries.findAll({
      where: {
        deliveryman_id: req.params.id,
        canceled_at: null,
        end_date: null,
      },
      attributes: ['id', 'product'],
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
}

export default new ManageDeliveriesController();
