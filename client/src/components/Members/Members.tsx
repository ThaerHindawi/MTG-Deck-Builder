import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PrivateFetch from "../../services/PrivateFetch";

import "./Members.css" ;

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
      <div className="wrapper">
        <section className="container">
          <h2 className="members-title">Site Members</h2>
        <div className="cards-member">
          {members?.map((member) => {
            return (
              <div className="card-member" id={member.id + ""} key={member.id}>
                <Link to={`/decks/member/${member.id}`}>
                  <img src="https://storage.googleapis.com/archidekt-card-images/ltc/dd4a00ff-2206-4e12-a0ab-61ed82c9e6c5_art_crop.jpg" alt={member.username} />
                  <h2>{member.username}</h2>
                </Link>
              </div>
            );
          })}
        </div>
      </section>
      
    </div>
    );
}

export default Members;