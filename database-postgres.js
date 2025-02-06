import { randomUUID } from "node:crypto";
import { sql } from "./db.js";

export class DatabasePostgres {
  #videos = new Map();

  async list(search) {
    let videos;

    if (search)
      videos = await sql`
        select * 
          from videos
        where title like ${'%'+search+'%'}`;
    else
      videos = await sql`
        select * 
          from videos`;

    return videos;
  }

  async create(video) {
    const videoId = randomUUID();
    const { title, description, duration } = video;

    await sql`
      insert into videos 
      (id, title, description, duration)
      values
      (${videoId}, ${title}, ${description}, ${duration})`;
  }

  async update(id, video) {}

  async delete(id) {
    await sql`
      delete from videos
       where id = ${id}`;
  }
}
