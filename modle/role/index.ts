import {Schema,model, Model,Document,SchemaTypes} from "mongoose";
import {UserModel} from "../user"
 
const schema = new Schema({
    name:{
        type:String,
        required:true,

    },
    addUser:{//添加人
        type:SchemaTypes.ObjectId,
        ref:'user'
    }, 
    desc:{
        type:String
    },
    resourceId:{
        type:Array    
    }
});


const RoleModel:Model<Document,{}> = model('role',schema);

interface roleType{
    name:string,
    resourceId?:string[]
}

class Role{
    /**
     * 新增角色
     * @param param0 
     */
    public  async save({name,resourceId}:roleType){
            const role = await new RoleModel({name,resourceId});
            const result = await role.save();
            return Promise.resolve(result);  
    }

    /**
     * 查询所有角色
     */
    public async findRoleAll(){
        const result  = await RoleModel.find();
        return Promise.resolve(result);
    }


    /**
     * 查看所有角色列表
     */
    public async findRoleList(){
       
        const result =await  RoleModel.find().populate({path:'addUser',select:'nickname'});
        let res = null;
        if(result){
            res = result.map( async (item:any)=>{
                const count  = await UserModel.count({'role':item._id});
                return item.count=count;
            })
        }
        return res;
       
    }

}

export default new Role();