import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router';

import EventsList from '../components/EventsList';

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{textAlign: 'center'}}>Loading</p>}>
      <Await resolve={events} >
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  )
}

export default EventsPage;



async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');
  console.log(response)
  if (!response.ok) {
    // setError('Fetching events failed.');
    // return {isError:true, message: 'Could not fetch events'};

    // throw new Response(JSON.stringify({message: 'Could not fetch events'}),{status:500})
    throw json(
      {
        message: 'Could not fetch events'
      },
      {
        status: 500
      }
    )

  } else {
    const resData = await response.json()
    return resData.events;
    // return response;
  }
}

export function loader() {
  // const loadEvents()
  return defer({
    events: loadEvents()
  })
}