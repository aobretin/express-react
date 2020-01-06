import {Property} from "@tsed/common";
import {Model, ObjectID} from "@tsed/mongoose";

@Model()
export class Note {
  @ObjectID("id")
  _id: string;

  @Property()
  title: string;

  @Property()
  description: string;

  @Property()
  tags: string[];
}