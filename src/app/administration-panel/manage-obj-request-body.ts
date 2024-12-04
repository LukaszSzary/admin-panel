export class ManageObjRequestBody{
    postId: string | null;
    commentId: string | null;

    constructor  (postId: string | null = null, commentId: string | null = null){
        this.postId = postId;
        this.commentId = commentId;
    }
}