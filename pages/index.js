import { MongoClient } from 'mongodb'
import MeetupList from '../components/meetups/MeetupList'
import Head from 'next/head'

function HomePage (props) {
  return (
    <>
      <Head>
        <title>React Meetups</title>
        <meta name='description' content='Browse a list of react meetups'/>
      </Head>
     <MeetupList meetups={props.meetups} />
    </>
  )
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
