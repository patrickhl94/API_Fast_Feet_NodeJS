import Deliverman from '../models/Deliverman';
import Deliveries from '../models/Deliveries';

class ManageDeliveriesController {
  async index(req, res) {
    const deliveries = await Deliveries.findAll({
      where: {
        deliveryman_id: req.params.id,
        canceled_at: null,
        end_date: null,
      },
    });

    return res.json(deliveries);
  }
}

export default new ManageDeliveriesController();
