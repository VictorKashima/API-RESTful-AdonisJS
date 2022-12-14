import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import MyDevDay from 'App/Models/MyDevDay'
import Coment from 'App/Models/Coment'

export default class ComentsController {

    public async store({request, params, response}: HttpContextContract) {
        const body = request.body()
        const dayId = params.MyDevDayId

        await MyDevDay.findOrFail(dayId)

        body.MyDevDayId = dayId

        const comment = await Coment.create(body)

        response.status(201)

        return {
            message: `Comentário ${dayId} adicionado com sucesso!`,
            data: comment,
        }

    }

}