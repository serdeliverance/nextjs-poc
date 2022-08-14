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
  return {
    fallback: false, // set to true indicates that all paths are set here, so asking for a different one returns 404
    paths: [
      {
        params: {
          meetupId: 'm1'
        }
      }, {
        params: {
          meetupId: 'm2'
        }
      }
    ]
  }
}

export async function getStaticProps (context) {
  // fetch data for a single meetup

  const meetupId = context.params.meetupId

  return {
    props: {
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/540px-Stadtbild_M%C3%BCnchen.jpg',
      id: meetupId,
      title: 'First Meetup',
      address: 'Some Street 5, Some City',
      description: 'This is a first meetup'
    }
  }
}

export default MeetupDetails
