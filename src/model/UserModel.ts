export class UserModel {
  name:String;
  email:String;
  token?:String;
  id: Number;
  constructor(name:String,email:String,id:Number,token?: String){
    this.name = name;
    this.email = email;
    this.id = id;
    this.token = token;
  }

}