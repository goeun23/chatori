

import { paths } from '@/config/paths';

const NotFoundRoute = () => {
  return (
    <div className="mt-52 flex flex-col items-center font-semibold">
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <link to={paths.home.getHref()} replace>
        Go to Home
      </link>
    </div>
  );
};

export default NotFoundRoute;
