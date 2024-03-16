import { Navigate, useNavigate, useParams } from "react-router-dom";

function EventDetailPage() {
const param = useParams();
const navigate = useNavigate();
function editHandler() {
    navigate(`/events/${param.eventId}/edit`);
}
    return (
        <>
        <h1>EventDetailPage</h1>
        <p>Event Id: {param.eventId}</p>
        <button onClick={editHandler}>Edit</button>
        </>
    );

}

export default EventDetailPage;