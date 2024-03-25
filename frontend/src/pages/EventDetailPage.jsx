import { defer, json, redirect, useRouteLoaderData, Await } from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventDetailPage() {

    const {event, events} = useRouteLoaderData('event-detail');
    return (
        <>
        <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>} >

            <Await resolve={event}  >
                {loadEvent => <EventItem event={loadEvent} />}
            </Await>
        </Suspense>

        <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>} >
            <Await resolve={events}>
            {loadEvents => <EventsList events={loadEvents} />}            
            </Await>
        </Suspense>
        </>
    );

}

export default EventDetailPage;

async function loadEvent(id) {

    const response = await fetch(`http://localhost:8080/events/${id}`);
    console.log(response)
    if (!response.ok) {
        throw json(
            { message: 'Could not fetch this event data' },
            { status: 500 }
        )
    } else {
        // return response;
        const resData = await response.json()
      return resData.event;
    }

}

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
  


export async function loader({ request, params }) {
    const id = params.eventId;

    return defer({
        event: await loadEvent(id),
        events: loadEvents()
      })

}

export async function action({ request, params }) {
    const response = await fetch(`http://localhost:8080/events/${params.eventId}`, {
        method: request.method,
    });

    if (!response.ok) {
        throw json(
            { message: 'Could not fetch this event data' },
            { status: 500 }
        )
    }

    return redirect('/events');
}


