import {Outlet} from 'react-router';

export const ErrorBoundary = () => {
    return <div>Something went worng!</div>;
}

const AppRoot = () => {
    return (
        <Outlet/>
    )
}

export default AppRoot;