import {Schema,model,Model,Document,SchemaTypes} from "mongoose";


// id(可选参数，传入位修改，不传入位新增)
// num(车位编号)
// parkId:停车场id
// name:车库名称
// status:0,1(0开启，1关闭)
// type:0,1(车库类型 0：平面车库 1:立体车库)
// count:(车位数)
// barnArr:(车库)：json对象数组(包含floor,count，楼层和)
const schema = new Schema({
    num:{//车位编号
        type:String
    },
    parkId:{//停车场id
        type:SchemaTypes.ObjectId,
        ref:'park'
    },
    name:{
        type:String
    },
    status:{
        type:String,
        default:'0'
    },
    type:{
        type:String,
        default:'0'
    },
    count:{//车位数
        type:String
    },
    barnArr:{//车库
        type:Array
    }
})


export const SlotModel:Model<Document,{}> = model('slot',schema);

interface SlotType{
    id?:string,
    num:string,
    parkId:string,
    name:string,
    status:string,
    type:string,
    count:string,
    barnArr?:string
}

class Slot{
    public async save ({id,num,parkId,name,status,type,count,barnArr}:SlotType){
        let barns = []
        if(barnArr){
            barns  = JSON.parse(barnArr);
        }

        if(id){
            let result  = await SlotModel.findByIdAndUpdate({_id:id},{num,parkId,name,status,type,count,barnArr:barns});
            return Promise.resolve(result);
        }else{
            let slot = new SlotModel({num,parkId,name,status,type,count,barnArr:barns});
            let result  = await slot.save();
            return Promise.resolve(result);
        }
    }
    public async findList(pageNum:string='0',pageSize:string='10'){
        let result  = await SlotModel.find().populate({path:"parkId",slect:"parkName"})
        .limit(Number(pageSize)).skip(Number(pageNum)*Number(pageSize));

        return Promise.resolve(result);
    }
}

export default new Slot();