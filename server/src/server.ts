import express, { application } from 'express';
import cors from 'cors';

import { PrismaClient } from '@prisma/client'
import { convertHoursStringToMinutes } from './utils/convert-hours-string-to-minutes';
import { convertMinutesToHoursString } from './utils/convert-minutes-to-hours-string';

const app = express();

app.use(express.json())
app.use(cors())

const prisma = new PrismaClient()

app.get('/games', async (req, res) => {
    const games = await prisma.game.findMany({
        include: {
            _count: {
                select: {
                    Ads: true,
                }
            }
        }
    })

    return res.json(games)
})

app.post('/games/:gameId/ads', async (req, res) => {

    const gameId = req.params.gameId
    const body:any = req.body

    const ad = await prisma.ad.create({
        data: {
            gameId,
            name: body.name,
            yearsPlaying: body.yearsPlaying,
            discord: body.discord,
            hourEnd: convertHoursStringToMinutes(body.hourEnd),
            hourStart: convertHoursStringToMinutes(body.hourStart),
            useVoiceChannel: body.useVoiceChannel,
            weekDays: body.weekDays.join(','),
        } 
    })
    
    return res.status(201).json(ad)
})
 
app.get('/games/:id/ads', async (req, res) => {
    const gameId = req.params.id;

    const ads = await prisma.ad.findMany({
        select: {
            id: true,
            name: true,
            weekDays: true,
            useVoiceChannel: true,
            yearsPlaying: true,
            hourStart: true,
            hourEnd: true,
        },
        where: {
            gameId
        },
        orderBy: {
            createdAt: 'desc',
        }
    })

    return res.json(ads.map(ad => {
        return {
            ...ad,
            weekDays: ad.weekDays.split(','),
            hourStart: convertMinutesToHoursString(ad.hourStart),
            hourEnd: convertMinutesToHoursString(ad.hourEnd),
        }
    }))
})
 
app.get('/games/:id/discord', async (req, res) => {
    const adId = req.params.id;

    const ad = await prisma.ad.findUniqueOrThrow({
        select: {
            discord: true,
        },
        where: {
            id: adId
        }
    })

    return res.json({
        discord: ad.discord,
    })
 })

app.listen(3000)