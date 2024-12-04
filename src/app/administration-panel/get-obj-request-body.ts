export class GetObjectsRequestBody{
    page: number;
    pageSize: number;

    constructor  (page: number){
        this.page = page;
        this.pageSize = 15;
    }
}