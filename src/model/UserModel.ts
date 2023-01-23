export class UserModel {
  name:String;
  email:String;
  token?:String;
  id: Number;
  password?:String
  constructor({name,email,id,token,password}:{name :String,email:String,token?:String,id:Number,password?:String}){
    this.name = name;
    this.email = email;
    this.id = id;
    this.token = token;
    this.password= password;
  }

}