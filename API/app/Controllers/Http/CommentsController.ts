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

    public async index() {

        const comments = await Comment.all()
        
        return {
            data: comments,
        }
    }

    public async show({params}: HttpContextContract) {

        const comment = await Comment.findOrFail(params.id)

        return {
            data: comment,
        }
    }

    public async destroy({params}: HttpContextContract) {

        const comment = await Comment.findOrFail(params.id)

        await comment.delete()

        return {
            message: `Comentário com ID:${params.id} deletado com sucesso!`,
            data: comment,
        }
    }

    public async update({params, request}: HttpContextContract) {

        const body = request.body()
        const comment = await Comment.findOrFail(params.id)

        comment.userName = body.userName
        comment.userComment = body.userComment

        await comment.save()

        return {
            message: `Comentário com ID:${params.id} atualizado com sucesso!`,
            data: comment,
        }
    }

}