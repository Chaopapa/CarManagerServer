
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

