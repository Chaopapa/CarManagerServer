import {Schema,model, Model,Document,SchemaTypes} from "mongoose";
import {UserModel} from "../user"
import { ResEmpty } from "../../base/entity/res";
 
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
    park:{
        type:SchemaTypes.ObjectId
    },
    resourceId:{
        type:Array    
    },
    count:{
        type:Number,
    }
});


const RoleModel:Model<Document,{}> = model('role',schema);

interface roleType{
    name:string,
    desc?:string,
    resourceId?:string,
    park?:any

}

class Role{
    /**
     * 新增角色
     * @param param0 
     */
    public  async save({name,desc,park,resourceId}:roleType){
            
            let resourceIdArr:any[] = []
            if(resourceId){
                resourceIdArr= (resourceId as string).split(',');
            }
            console.log(resourceIdArr);
            const role = await new RoleModel({name,desc,park,resourceId:resourceIdArr});
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
    public async findRoleList(pageNum:number=0,pageSize:number=10){
       
        let result =await  RoleModel.find()
        .limit(pageSize).skip(pageSize*pageNum)
        .populate({path:'addUser',select:'nickname'})
        ;

        let  resultPromise:Promise<any>[] =await result.map(async (item) => {
            let resItem = item.toObject();
            let count  = await this.countRoleUser(resItem._id);
            resItem.count =count;
            return resItem;
        });

        
        return Promise.all(resultPromise).then(result=>{
            return Promise.resolve(result);
        }).catch(err=>{
            return Promise.reject(err);
        })
        
    }

    /**
     * 查询角色的user数
     */

    public async countRoleUser(role:string){
        let count  = await UserModel.count({role});
        return count;
    }

    /**
     * 删除用户
     * 
     */
    public async  deleteRole(id:string){
        let count  = await this.countRoleUser(id);

        if(count>0){
            return Promise.reject(new Error('该角色存在用户不可删除'));
        }

        const result  =  await RoleModel.findByIdAndDelete(id);

        return Promise.resolve(result);
    }



}

export default new Role();