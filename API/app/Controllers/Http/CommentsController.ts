import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'
import Mydevday from 'App/Models/Mydevday'

export default class CommentsController {

    public async store({request, params, response}: HttpContextContract) {

        const body = request.body()
        const mydevdayId = params.mydevdayId

        await Mydevday.findOrFail(mydevdayId)

        body.mydevdayId = mydevdayId

        const comment = await Comment.create(body)

        response.status(201)

        return {
            message: `Comentário adicionado com sucesso! No dia com ID:${mydevdayId}`,
            data: comment,
        }

    }

}