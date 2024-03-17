import { useLoaderData,json } from 'react-router';

import EventsList from '../components/EventsList';

function EventsPage() {
  const data = useLoaderData();
  
  if(data.isError){
    return <p>{data.message}</p>
  }
  // console.log(events);
  const events = data.events;

  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export default EventsPage;

export async function loader() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // setError('Fetching events failed.');
    // return {isError:true, message: 'Could not fetch events'};

    // throw new Response(JSON.stringify({message: 'Could not fetch events'}),{status:500})
    throw json(
      {
        message: 'Could not fetch events'
      },
      {
        status:500
      }
    )
    
  } else {
    // const resData = await response.json();
    // return resData.events;
    return response;
  }
}