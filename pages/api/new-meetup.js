import { MongoClient } from 'mongodb'

// api/new-meetup
// POST /api/new-meetup

async function handler (req, res) {
  if (req.method === 'POST') {
    const data = req.body

    const client = await MongoClient.connect(process.env.DB_URL)
    const db = client.db()

    const meetupCollection = db.collection('meetup')

    await meetupCollection.insertOne(data)

    client.close()

    res.status(201).json({ message: 'Meetup created' })
  }
}

export default handler
