import express from "express";
import db from "./database/connection";
import hourToMinutes from "./utils/convertHourToMinutes";

const routes = express.Router();

routes.get("/connection", async (req, res) => {
  const [con] = await db("connections").count("* as total");
  res.json(con);
});

routes.post("/connection", async (req, res) => {
  const { user_id } = req.body;

  await db("connections").insert({ user_id });
  res.status(201).send("Success");
});

routes.get("/classes", async (req, res) => {
  const filters = req.query;

  // if (!filters.week_day || !filters.time)
  //   return res.status(400).json({ error: "Missing filters to search classes" });

  // const minutes = hourToMinutes(filters.time as string);

  const classes = await db("classes")
    // .whereExists(function () {
    //   this.from("class_schedule")
    //     .whereRaw("class_schedule.class_id = classes.id")
    //     .where("week_day", "=", Number(filters.week_day))
    //     .where("from", "<=", minutes)
    //     .where("to", ">", minutes);
    // })
    .where("classes.subject", "like", `%${(filters.subject as string) || ""}%`)
    .join("users", "user_id", "=", "users.id");

  return res.json(classes);
});

routes.post("/classes", async (req, res) => {
  const { name, avatar, whatsapp, bio, subject, cost, schedule } = req.body;

  const trx = await db.transaction();

  try {
    const [user_id] = await trx("users").insert({
      name,
      avatar,
      whatsapp,
      bio,
    });

    const [class_id] = await trx("classes").insert({ subject, cost, user_id });

    const classSchedule = schedule.map(({ week_day, from, to }: any) => {
      return {
        class_id,
        week_day,
        from: hourToMinutes(from),
        to: hourToMinutes(to),
      };
    });

    await trx("class_schedule").insert(classSchedule);

    trx.commit();
    return res.status(201).send("Success");
  } catch (err) {
    trx.rollback();
    return res.status(400).json({ error: "Error while creating new class." });
  }
});

export default routes;
