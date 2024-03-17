import { Navigate, useNavigate, useParams, json, useLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

function EventDetailPage() {
    const param = useParams();
    const navigate = useNavigate();
    const data = useLoaderData();

    function editHandler() {

        navigate(`/events/${param.eventId}/edit`);
    }
    return (
        <EventItem event={data.event} />
    );

}

export default EventDetailPage;

export async function loader({request, params}) {
    const response = await fetch(`http://localhost:8080/events/${params.eventId}`);

    if(!response.ok){
        throw json (
            {message: 'Could not fetch this event data'},
            {status:500}
        )
    } else {
        return response;
    }
}