import * as yup from 'yup';

import Auction from '../models/Auction';

class AuctionController {
  async index(request, response) {
    const { page = 1 } = request.query;
    const limit = 20;
    const auctions = await Auction.findAll({
      attributes: [
        'id',
        'name',
        'value',
        'is_used',
        'completed_at',
        'openning_date',
        'is_completed',
      ],
      offset: (page - 1) * limit,
      limit,
    });
    return response.json(auctions);
  }

  async show(request, response) {
    const auction = await Auction.findByPk(request.params.id, {
      attributes: [
        'id',
        'name',
        'value',
        'is_used',
        'completed_at',
        'openning_date',
        'is_completed',
      ],
    });
    return response.json(auction);
  }

  async store(request, response) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      value: yup.number().required(),
      is_used: yup.boolean().required(),
    });
    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const { id, name, value, is_used, openning_date } = await Auction.create({
      ...request.body,
      responsabler_id: request.userLoggedId,
    });
    return response.json({ id, name, value, is_used, openning_date });
  }

  async update(request, response) {
    const schema = yup.object().shape({
      name: yup.string(),
      value: yup.number(),
      is_used: yup.boolean(),
    });
    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const auction = await Auction.findOne({
      where: {
        responsabler_id: request.userLoggedId,
        id: request.params.id,
      },
    });
    if (!auction) {
      return response.status(400).json({ error: 'Auction not found' });
    }

    const {
      id,
      name,
      value,
      is_used,
      openning_date,
      completed_at,
      is_completed,
    } = await auction.update(request.body);
    return response.json({
      id,
      name,
      value,
      is_used,
      openning_date,
      completed_at,
      is_completed,
    });
  }
}

export default new AuctionController();
