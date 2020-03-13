import Deliverman from '../models/Deliverman';
import Avatar from '../models/Avatar';

class DelivermanController {
  async store(req, res) {
    const deliveryman = await Deliverman.create(req.body);
    return res.json(deliveryman);
  }

  async index(req, res) {
    const deliveryman = await Deliverman.findAll();

    if (!deliveryman[0]) {
      return res.status(401).json({ erro: 'Are no registered deliverers' });
    }

    return res.json(deliveryman);
  }

  async show(req, res) {
    const { email } = req.query;

    const deliveryman = await Deliverman.findOne({ where: { email } });

    if (!deliveryman) {
      return res.status(401).json({ erro: 'Are no registered deliveryman' });
    }

    return res.json(deliveryman);
  }

  async update(req, res) {
    const { id } = req.params;
    const { avatar_id } = req.body;

    // verifica se o avatar existe
    const avatar = await Avatar.findByPk(req.body.avatar_id);

    if (avatar_id !== null && !avatar) {
      return res.status(401).json({ erro: 'Avatar not found with this ID ' });
    }

    // atualiza o avatar se o avatar retornar um array diferente de vazio
    const deliveryman = await Deliverman.update(req.body, {
      where: { id },
    });

    // verifica o stado do array retornado
    if (!deliveryman[0]) {
      return res
        .status(401)
        .json({ erro: 'Deliveryman not found with this ID ' });
    }

    return res.json({ erro: 'Deliveryman updated with success.' });
  }

  async destroy(req, res) {
    const { id } = req.params;
    const deliveryman = await Deliverman.destroy({ where: { id } });

    if (!deliveryman) {
      return res
        .status(401)
        .json({ erro: 'Deliveryman not found with this ID ' });
    }
    return res.json({ message: 'Deliveryman deleted with success' });
  }
}

export default new DelivermanController();
