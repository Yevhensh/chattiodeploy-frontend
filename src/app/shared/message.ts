
import {User} from "./user";

export class Message {
  public id: number;
  public value: string;
  public dateTime: Date;
  public user: User;

  constructor() {
  }
}
