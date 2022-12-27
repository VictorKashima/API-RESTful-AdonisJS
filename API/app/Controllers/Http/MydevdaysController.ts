import {v4 as uuidv4} from 'uuid'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Mydevday from 'App/Models/Mydevday'
import Application from '@ioc:Adonis/Core/Application'

export default class MydevdaysController {

    private validationOptions = {
        types: ["image"],
        size: "2mb",
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

        const mydevday = await Mydevday.create(body)


        response.status(201)

        return {
            message: `Dia criado com sucesso! ID:${mydevday.id}`,
            data: mydevday,
        }
    }

    public async index() {

        const mydevdays = await Mydevday.query().preload('comments')
        
        return {
            data: mydevdays,
        }
    }

    public async show({params}: HttpContextContract) {

        const mydevday = await Mydevday.findOrFail(params.id)

        await mydevday.load('comments')

        return {
            data: mydevday,
        }
    }

    public async destroy({params}: HttpContextContract) {

        const mydevday = await Mydevday.findOrFail(params.id)

        await mydevday.delete()

        return {
            message: `Momento com ID:${params.id} deletado com sucesso!`,
            data: mydevday,
        }
    }

    public async update({params, request}: HttpContextContract) {

        const body = request.body()
        const mydevday = await Mydevday.findOrFail(params.id)

        mydevday.title = body.title
        mydevday.text = body.text

        if (mydevday.image != body.image || !mydevday.image) {
            const image = request.file('image', this.validationOptions)

            if (image) {
                const imageName = `${uuidv4()}.${image.extname}`

                await image.move(Application.tmpPath('uploads'), {
                    name: imageName,
                })
    
                mydevday.image = imageName
            }
        }

        await mydevday.save()

        return {
            message: `Momento ID:${params.id} atualizado com sucesso!`,
            data: mydevday,
        }
    }

}