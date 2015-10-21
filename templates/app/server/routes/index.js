import { Router } from 'express'

const router = Router()

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Hippy' })
})

export default router
