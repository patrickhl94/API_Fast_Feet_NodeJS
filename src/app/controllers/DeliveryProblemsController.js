import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import DeliveryProblems from '../models/DeliveryProblems';
import Deliveries from '../models/Deliveries';
import Deliverman from '../models/Deliverman';

import Mail from '../../lib/Mail';

class DeliveryProblemsController {
  async store(req, res) {
    const problem = await DeliveryProblems.create(req.body);

    return res.json(problem);
  }

  async show(req, res) {
    const { delivery_id } = req.params;

    const problems = await DeliveryProblems.findAll({
      where: { delivery_id },
      attributes: ['id', 'description'],
      include: [
        {
          model: Deliveries,
          as: 'deliveries',
          attributes: ['product', 'start_date', 'end_date', 'canceled_at'],
        },
      ],
    });

    if (!problems[0])
      return res
        .status(400)
        .json({ erro: 'No problems registred for this ID.' });

    return res.json(problems);
  }

  async index(req, res) {
    const problems = await DeliveryProblems.findAll({
      attributes: ['id', 'description'],
      include: [
        {
          model: Deliveries,
          as: 'deliveries',
          attributes: ['product', 'start_date', 'end_date', 'canceled_at'],
        },
      ],
    });

    if (!problems[0])
      return res.status(400).json({ erro: 'No problems registred.' });

    return res.json(problems);
  }

  async update(req, res) {
    const { canceled_at } = req.body;
    const { problem_id } = req.params;

    const problem = await DeliveryProblems.findByPk(problem_id, {
      attributes: ['id'],
      include: [
        {
          model: Deliveries,
          as: 'deliveries',
          attributes: ['id', 'product'],
          include: [
            {
              model: Deliverman,
              as: 'deliverman',
              attributes: ['name', 'email'],
            },
          ],
        },
      ],
    });

    if (!problem)
      return res
        .status(401)
        .json({ erro: 'There is no problem for the given ID' });

    await Deliveries.update(
      { canceled_at },
      {
        where: { id: Number(problem.deliveries.id) },
      }
    );

    /**
     * ENVIO DE EMAIL
     */
    const date_cacel = format(
      parseISO(canceled_at),
      "'Dia' dd 'de' MMMM', às' HH:MM'h'",
      {
        locale: pt,
      }
    );

    await Mail.sendMail({
      to: `${problem.deliveries.deliverman.name} <${problem.deliveries.deliverman.email}>`,
      subject: `Entrega FAST FET cancelada.`,
      template: `canceledDelivery`,
      context: {
        name: problem.deliveries.deliverman.name,
        id: problem.deliveries.id,
        product: problem.deliveries.product,
        canceled_date: date_cacel,
      },
    });

    return res.json({ msg: 'Delivery canceled successfully' });
  }
}

export default new DeliveryProblemsController();
