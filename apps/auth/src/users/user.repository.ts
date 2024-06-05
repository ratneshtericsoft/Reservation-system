import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserDocument } from "./models/user.schema";
import { Model } from "mongoose";

@Injectable()
export class UserRepository extends AbstractRepository<UserDocument>{
    protected logger: Logger = new Logger(UserDocument.name)
    constructor(@InjectModel(UserDocument.name) userModel: Model<UserDocument>){
        super(userModel)
    }
}
