import { Outlet } from 'react-router-dom';
import EventsNavigation from '../components/EventsNavigation';

function EventsNavigationLayout() {
    return <>
        <EventsNavigation />
        <Outlet />
    </>
}

export default EventsNavigationLayout;
