import mongoose,{Document,Schema} from 'mongoose'

export interface IUser extends Document{
    fullName:string;
    phoneNumber:number;
    address:string;
    email:string;
    password:string;
    avatar:string
}

const UserSchema = new Schema<IUser>({
    fullName:{type:String,required:true},
    address:{type:String,required:true},
    avatar:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    phoneNumber:{type:Number,required:true},
})
export const UserModel=mongoose.model<IUser>('User',UserSchema) 