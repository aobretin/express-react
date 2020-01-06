import {Property} from "@tsed/common";
import {Model, ObjectID} from "@tsed/mongoose";

export class Note {
  @Property()
  title?: string;

  @Property()
  description?: string;

  @Property()
  tags?: string[];
}
@Model()
export class NoteModel extends Note {
    @ObjectID("id")
    _id: string;

    @Property()
    title: string;

    @Property()
    description: string;

    @Property()
    tags: string[];
}