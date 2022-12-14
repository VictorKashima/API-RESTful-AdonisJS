import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {v4 as uuidv4} from 'uuid'

import MyDevDay from 'App/Models/MyDevDay'
import Application from "@ioc:Adonis/Core/Application"

export default class MyDevDaysController {
    private validationOptions = {
        types: ["image"],
        size: "2MB",
    }

    public async store({request, response}: HttpContextContract) {

        const body = request.body()

        const image = request.file('image', this.validationOptions)

        if(image) {
            const imageName = `${uuidv4()}.${image.extname}`

            await image.move(Application.tmpPath('uploads'), {
                name: imageName
            })

            body.image = imageName
        }

        const day = await MyDevDay.create(body)

        response.status(201)

        return {
            message: "Dia criado com sucesso!",
            data: day,
        }
    }

    public async index() {

        const days = await MyDevDay.all()

        return {
            data: days,
        }

    }


    public async show({params}: HttpContextContract) {

        const day = await MyDevDay.findOrFail(params.id)

        return {
            data: day,
        }

    }

    public async destroy({params}: HttpContextContract) {
        const day = await MyDevDay.findOrFail(params.id)

        await day.delete()

        return {
            message: `Momento ${params.id} excluído com sucesso`,
            data: day,
        }
    }

    public async update({params, request}: HttpContextContract) {

        const body = request.body()
        const day = await MyDevDay.findOrFail(params.id)
        
        day.title = body.title
        day.text = body.text

        if (day.image != body.image || !day.image) {
            const image = request.file('image', this.validationOptions)

            if (image) {
                const imageName = `${uuidv4()}.${image.extname}`

                await image.move(Application.tmpPath('uploads'), {
                    name: imageName,
                })
                day.image = imageName
            }
        }

        await day.save()

        return {
            message: `Momento ${params.id} atualizado!`,
            data: day,
        }
 
    }
}