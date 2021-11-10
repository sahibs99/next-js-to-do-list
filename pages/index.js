import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/client";

export default function Home() {
  // Check if we have a valid JWT. If we do, we show our user a link to our "main" page and a log out option
  // Else, we show them the login option
  const [session, loading] = useSession();

  if (!session) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h1>Welcome to ToDo List</h1>
        <h3>Sign In?</h3>
        <button
          onClick={(e) => {
            e.preventDefault();
            signIn();
          }}
        >
          Sign In
        </button>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          margin: "20px",
        }}
      >
        <h1>Welcome {session.user.name}!</h1>
        <h3>Click Here to go to Your To Do List!</h3>
        <Link href="/main">
          <a>Click to go to Notes!</a>
        </Link>
        <br />
        <button
          style={{ margin: "25px" }}
          onClick={(e) => {
            e.preventDefault();
            signOut();
          }}
        >
          Log Out!
        </button>
      </div>
    );
  }
}
