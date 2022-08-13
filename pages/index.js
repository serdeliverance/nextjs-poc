import MeetupList from '../components/meetups/MeetupList'

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A first meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/540px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 5, Some city',
    description: 'This is a first meetup'
  },
  {
    id: 'm2',
    title: 'A second meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/540px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Some address 5, Some city',
    description: 'This is a second meetup'
  }
]

function HomePage (props) {
  return <MeetupList meetups={props.meetups} />
}

export async function getStaticProps () {
  // fetch data from API
  return {
    props: {
      meetups: DUMMY_MEETUPS
    }
  }
}

export default HomePage
