import { MongoClient } from 'mongodb'
import MeetupList from '../components/meetups/MeetupList'

function HomePage (props) {
  return <MeetupList meetups={props.meetups} />
}

/*
  The page is generated in every request. One possible case
  is for user validation
*/
// export async function getServerSideProps () {
//   const req = context.req
//   const res = context.res

//   // fetch data from API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   }
// }

export async function getStaticProps () {
  // fetch data from API
  const client = await MongoClient.connect(process.env.DB_URL)
  const db = client.db()

  const meetupCollection = db.collection('meetup')

  const meetups = await meetupCollection.find().toArray()

  client.close()

  return {
    props: {
      meetups: meetups.map(meetup => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup.id
      }))
    }
  }
}

export default HomePage
