import { getRepository } from 'typeorm'
import Orphanage from '../models/Orphanage'

import { Request, Response } from 'express'

export default {
  async index(req: Request, res: Response) {
    const orphanageRepository = getRepository(Orphanage)

    const orphanages = await orphanageRepository.find()

    return res.status(200).json(orphanages)
  },

  async show(req: Request, res: Response) {
    const { id } = req.params

    const orphanageRepository = getRepository(Orphanage)

    const orphanage = await orphanageRepository.findOneOrFail(id)

    return res.status(200).json(orphanage)
  },


  async create(req: Request, res: Response) {
    try {
      const {
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends,
      } = req.body
    
      const orphanageRepository = getRepository(Orphanage)
    
      const orphanage = orphanageRepository.create({
        name,
        latitude,
        longitude,
        about,
        instructions,
        opening_hours,
        open_on_weekends
      })
    
      await orphanageRepository.save(orphanage)
  
      return res.status(201).json(orphanage)
    } catch (error) {
      return res.status(501).json({ error })
    }
  }
}