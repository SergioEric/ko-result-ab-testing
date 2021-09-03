import connectToDatabase from "../../src/db.connection";

const dbName = "ab-test";

const collection_name = "co-preliminary-lead";

module.exports = async (req, res) => {
  if (req.method != "POST") {
    return res.status(404).json({ message: "GET Http method not allowed" });
  }
  // frontend ensure that we allways have information for
  // contact_name, phone, email and contact_type
  const {
    contact_name,
    phone,
    email,
    contact_type,
    agent_name = null,
    agent_phone = null,
    agent_type = null,
    other_agent = null,
  } = req.body;

  const map = {
    contact_name,
    phone,
    email,
    contact_type,
    agent_name,
    agent_phone,
    agent_type,
    other_agent,
    date: new Date().toGMTString(),
  };
  const client = await connectToDatabase;
  const db = client.db(dbName);

  const collection = db.collection(collection_name);

  try {
    collection.insertOne(map, function (err, r) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          data: null,
          message: "We couldn't save the data form",
        });
      } else {
        return res.status(200).json({
          data: true,
          message: "Form saved, we will get in touch soon",
        });
      }
    });
  } catch (e) {
    return res.status(500).json({
      data: null,
      message: "We couldn't save the data form",
    });
  }
};
