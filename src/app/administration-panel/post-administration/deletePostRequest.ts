export class DeletePostRequest
{
    postId: string;

    constructor(id: string){
        this.postId = id;
    }
}