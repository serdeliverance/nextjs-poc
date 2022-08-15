import { MongoClient } from 'mongodb'
import MeetupDetail from '../../components/meetups/MeetupDetail'

function MeetupDetails (props) {
  return (
        <MeetupDetail
          image={props.image}
          title={props.title}
          address={props.address}
          description={props.description}
        />
  )
}

export async function getStaticPaths () {
  const client = await MongoClient.connect(process.env.DB_URL)
  const db = client.db()

  const meetupCollection = db.collection('meetup')

  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray()

  client.close()

  return {
    fallback: false, // set to true indicates that all paths are set here, so asking for a different one returns 404
    paths: meetups.map(meetup => ({ params: { meetupId: meetup.id } }))
  }
}

export async function getStaticProps (context) {
  // fetch data for a single meetup

  const client = await MongoClient.connect(process.env.DB_URL)
  const db = client.db()

  const meetupCollection = db.collection('meetup')

  const meetupId = context.params.meetupId

  const meetup = await meetupCollection.findOne({ id: meetupId })

  return {
    props: {
      id: meetup.id,
      title: meetup.title,
      description: meetup.description,
      image: meetup.image
    }
  }
}

export default MeetupDetails
