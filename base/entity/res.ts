
export enum CodeType{
    SUCCESS='0000',//成功
    FAIL='1111',//失败
    EMPTY='0204',//数据为空
}



export interface ResType{
    code: CodeType,
    message?:string,
    data?:any,
}

export class ResError{
    private code:CodeType;
    private  message?='';
    constructor(error:Error){
        this.message = error.message;
        this.code = CodeType.FAIL;
    }
}

export class ResSuccess{
    private code:CodeType;
    private message?='';
    private data:any;

    constructor(message?:string,data?:any){
        this.code = CodeType.SUCCESS;
        this.message = message;
        this.data = data;
    }

}

export class ResEmpty{
    private code:CodeType;
    private message?='';
   constructor (){
       this.message="数据为空";
       this.code = CodeType.EMPTY;
   }
}

