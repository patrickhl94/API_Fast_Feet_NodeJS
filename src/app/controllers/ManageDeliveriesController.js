import { Op } from 'sequelize';
import { startOfDay, endOfDay } from 'date-fns';
import Recipients from '../models/Recipients';
import Deliveries from '../models/Deliveries';
import Signature from '../models/Signature';

class ManageDeliveriesController {
  async index(req, res) {
    const { id, delivered } = req.query;

    const deliveries = await Deliveries.findAll({
      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date:
          delivered === 'S'
            ? {
                [Op.ne]: null,
              }
            : null,
      },
      attributes: ['id', 'product', 'start_date', 'end_date.'],
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
            'neighborhood',
            'zip_code',
          ],
        },
      ],
    });

    if (!deliveries)
      return res
        .status(401)
        .json({ erro: 'Deliveries not found with past data.' });

    return res.json(deliveries);
  }

  async update(req, res) {
    const { start_date, end_date, id, signature_id } = req.body;
    const date = new Date();

    // CONTA QUANTAS ENGREGAS NO DIA JA FORAM RETIRADAS
    const countDeliveriesToday = await Deliveries.count({
      where: {
        start_date: {
          [Op.between]: [startOfDay(new Date(date)), endOfDay(new Date(date))],
        },
      },
    });

    // VERIFICA SE JÁ EXISTE 5 ENTREGAS COM DATA DE SAÍDA (start_date) NO DIA
    if (countDeliveriesToday >= 5)
      return res.status(401).json({
        erro:
          'Deliveryman already accomplished the maximum of five (05) delivered today.',
      });

    // VERIFICA SE O ID DA ASSINATURA FOI INSERIDO CASO TENHA UMA DATA DE ENTREGA
    if (end_date && !signature_id)
      return res.status(401).json({
        erro: 'To finalize the delivery, insert the ID the signature.',
      });

    // VERIFICA SE O ID DA ASSINATURA É VÁLIDO.
    if (signature_id) {
      const signature = await Signature.findByPk(signature_id);

      if (!signature)
        return res.status(401).json({ erro: 'ID signature invalid.' });
    }

    await Deliveries.update(
      { start_date, end_date },
      {
        where: { id },
      }
    );

    return res.json({ msg: 'Updated with success.' });
  }
}

export default new ManageDeliveriesController();
