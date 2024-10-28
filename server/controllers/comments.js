import Comment from '../models/Comment.js'
import Post from '../models/Post.js'

// Создание комментария
export const createComment = async (req, res) => {
    try {
        const { postId, comment } = req.body

        if (!comment)
            return res.json({ message: 'Комментарий не может быть пустым' })

        const newComment = new Comment({ comment })
        await newComment.save()

        try {
            await Post.findByIdAndUpdate(postId, {
                $push: { comments: newComment._id },
            })
        } catch (error) {
            console.log(error)
        }

        res.json(newComment)
    } catch (error) {
        res.json({ message: 'Что-то пошло не так.' })
    }
}

// Удаление комментария
export const deleteComment = async (req, res) => {
    try {
        const { commentId, postId } = req.params;

        if (!commentId || !postId) {
            return res.status(400).json({ message: 'Некорректные данные' });
        }

        const deletedComment = await Comment.findByIdAndDelete(commentId);

        if (!deletedComment) {
            return res.status(404).json({ message: 'Комментарий не найден' });
        }

        await Post.findByIdAndUpdate(postId, {
            $pull: { comments: commentId },
        });

        res.json({ message: 'Комментарий удален' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Что-то пошло не так.' });
    }
};