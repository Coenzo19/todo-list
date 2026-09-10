import {Link} from 'react-router'

export default function NotFoundPage() {
  return (
    <div>
      <h2>404: Not Found</h2>
      <Link className="linkButton" to="/">
        Go Back
      </Link>
    </div>
  );
}
