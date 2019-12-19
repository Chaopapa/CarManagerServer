import { Schema, SchemaTypes, model, Document } from "mongoose";
import BillModel, { BillMode }  from "../bill";

const schema: Schema = new Schema({
    parkName: {
        type: String,
        required: true
    },
    provinceId: {
        type: String,
        required: true
    },

    cityId: {
        type: String,
        required: true
    },
    countyId: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    state: {
        type: String,
        default: '0'
    },
    longitude: {//经度
        type: String
    },
    latitude: {//纬度
        type: String,
    },
    ruleArr: {
        type: Array
    },
    addUser: {
        type: SchemaTypes.ObjectId
    }
});

export const ParkModel = model("park", schema);

interface ParkType {

    parkName: string,
    provinceId: string,
    cityId: string,
    countyId: string,
    street: string,
    state: string
    longitud?: string,
    latitute?: string,
    ruleArr: string|string[],
    addUser: {
        type: string
    },
    parkId?: string

}

class Park {
    public async saveOrUpdate(params: ParkType) {
        params.ruleArr = params.ruleArr?(params.ruleArr as string).split(','):[]
        if (params.parkId) {//修改
            let _id = params.parkId;
            delete params.parkId;
            let result = await ParkModel.findByIdAndUpdate({_id},params);
            return Promise.resolve(result);
        }else{//新增
            let park  = new ParkModel(params);
            let result  =await park.save();
            return Promise.resolve(result);
        }
    }

    public async selectAllPark(){
        return await ParkModel.find();
    }

    public async  findParkList(pageNum:string='0',pageSize:string='10'){
        console.log(pageNum,pageSize);
        let park  = await ParkModel.find().limit(Number(pageSize)).skip(Number(pageNum)*Number(pageSize));
        
        park.forEach(async (item:Document)=>{
            let ruleArr =(item as any).ruleArr;
            let ruleList  = await BillMode.find().in("_id",ruleArr);
             item.toObject().ruleList =ruleList;

        });
        
        return Promise.resolve(park);
        
        
    
    }
}

export default new Park();