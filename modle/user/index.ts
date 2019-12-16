import {Schema,model, Model,Document,SchemaTypes,DocumentToObjectOptions} from "mongoose";

enum StatusType{
    OPEN,
    COLSE,
} 

const schema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        default:'666666'
    },
    nickname:{
        type:String,
        default:"后台用户"
    },
    status:{
        type:StatusType,
        default:StatusType.OPEN
    },
    role:{
        type:SchemaTypes.ObjectId,
        ref:"role"
    }
        
});


export const UserModel:Model<Document,{}> = model('user',schema);

interface userType{
    username:string,
    password:string,
    nickname? :string,
    rest?:any[]
}

class User{
    /**
     * 新增用户
     * @param param0 
     */
    public  async save({username,password,...rest}:userType){
        console.log("添加用户"+username+password);
        console.log(rest);
        const result = await this.findOne({username});
        if(!result){
            const user = await new UserModel({username,password,...rest});
            console.log(user)
            const result = await user.save();
            console.log(result);
            return Promise.resolve(result);
        }else{
            console.log("用户已存在")
            return Promise.reject(new Error('该用户已存在'))
        }
    }
    /**
     * 删除用户
     */
    public async deleteById(id:string){
        const result  = await UserModel.findByIdAndDelete(id);
        return Promise.resolve(result);
    }

    public async findOne(info:any):Promise<Document|null>{
        console.log(info);
        const result = await UserModel.findOne(info);
        console.log(result);
        return result;
    }

    /**
     * 查询管理员对应的列表
     */
    public async findUserList(pageNum:number=0,pageSize:number=10){
        const result = await UserModel.find().populate({path:'role',select:'name'}).limit(pageSize).skip(pageNum*pageSize);
        return Promise.resolve(result);
    }

    /**
     * 通过id修改数据
     * @param id 
     * @param update 
     */
    public async updateById(id:string,update:{}){
        const result  = await UserModel.findByIdAndUpdate(id,update);
        return Promise.resolve(result);
    }


    

}

export default new User();