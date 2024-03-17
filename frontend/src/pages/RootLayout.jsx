import {Outlet} from 'react-router-dom'
import MainNavigation from '../components/MainNavigation'

function RootLayout() {
    // const navigation = useNavigation();

    
    return (
        <>
            <MainNavigation />
            <main>
                {/* {navigation.state === 'loading' && <h1>Loading ...</h1>} */}
                <Outlet />
            </main>
        </>
    )
}

export default RootLayout;