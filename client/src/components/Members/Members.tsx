import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PrivateFetch from "../../services/PrivateFetch";


function Members() {

    const [members, setMembers] = useState<IMember[]>()

    useEffect(() => {
        fetchMembers();
    }, []);

    async function fetchMembers() {
        const res = await PrivateFetch("GET", "members", null);
        console.log(res)
        setMembers(res);
    }

    return (
        <section className="container">
        <div className="cards">
          {members?.map((member) => {
            return (
              <div className="card" id={member.id + ""} key={member.id}>
                <Link to={`/members/${member.id}`}>
                  <h2>{member.username}</h2>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    );
}

export default Members;