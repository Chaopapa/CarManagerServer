import { Schema, SchemaTypes, Model, model, Document } from "mongoose";

const shcema: Schema = new Schema({
    ruleNum: {
        type: String,
        required: true
    },

    ruleName: {
        type: String,
        required: true
    },
    userKind: {//用户类型
        type: String,
        required: true
    },

    billingMode: {//计费类型
        type: String,
        required: true
    },
    freeTime: {//免费时长
        type: String,
        required: true
    },
    costLimit: {//费用上限
        type: String,
        required: true

    },
    rule: {//计费规则
        type: String,
        required: true
    },

    defaultRule: {//默认规则
        type: Array
    },
    addUser: {//创建人
        type: SchemaTypes.ObjectId
    }
});

export const BillMode: Model<Document, {}> = model("bill", shcema);

interface BillType {
    ruleNum: string,
    ruleName: string,
    userKind: string,
    billingMode: string,
    freeTime: string,
    costLimit: string,
    rule: string,
    defaultRule?: string,
    addUser?: string,
    ruleId?: string,
}


class Bill {
    public async saveOrUpdate({ ruleId, ruleNum,ruleName, userKind, billingMode, freeTime,
        costLimit, rule, defaultRule, addUser
    }: BillType) {
        let defaultRuleArr = []
        if(defaultRule){
            defaultRuleArr  = JSON.parse(defaultRule);
        }

        

        if(ruleId){//存在id为修改
           
            let result = await  BillMode.findByIdAndUpdate({_id:ruleId},{ruleNum,ruleName,  userKind, billingMode, freeTime,
                costLimit, rule, defaultRule:defaultRuleArr, addUser});

            return Promise.resolve(result);
        }else{//不存在则为新增
            let bill  = new BillMode({ruleNum,ruleName,userKind, billingMode, freeTime,
                costLimit, rule, defaultRule:defaultRuleArr, addUser});
            let result  = await bill.save();
            
            return Promise.resolve(result);

        }
    }

    public async selectAllBill(){
        let result  = await BillMode.find();
        return Promise.resolve(result);
    }

    public async findById(id:string){
        return Promise.resolve(await BillMode.findById({_id:id}))
    }
}

export default new Bill();