import { Schema, SchemaTypes, model } from "mongoose";

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
    countId: {
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
    countId: string,
    street: string,
    state: string
    longitud?: string,
    latitute?: string,
    ruleArr: string|string[],
    addUser: {
        type: string
    },
    ruleId?: string

}

class Park {
    public async saveOrUpdate(params: ParkType) {
        params.ruleArr = (params.ruleArr as string).split(',')
        if (params.ruleId) {//修改
            let _id = params.ruleId;
            delete params.ruleId;
            let result = await ParkModel.findByIdAndUpdate({_id},params);
            return Promise.resolve(result);
        }else{//新增
            let park  = new ParkModel(params);
            let result  =await park.save();
            return Promise.resolve(result);
        }
    }
}

export default new Park();