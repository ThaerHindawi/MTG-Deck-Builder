import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import PrivateFetch from "../../services/PrivateFetch";

function Member() {
  const location = useLocation();
  const [member, setMember] = useState<IMember>();

  useEffect(() => {
    fetchMember();
  }, []);

  async function fetchMember() {
    const res = await PrivateFetch("GET", location.pathname, null);
    console.log(res)
    setMember(res[0]);
  }

  return (
    <section className="container">
      <div className="card" id={member?.id + ""} key={member?.id}>
        <Link to={`/decks/member/${member?.id}`}><h2>{member?.username} Decks</h2></Link>
      </div>
    </section>
  );
}

export default Member;
