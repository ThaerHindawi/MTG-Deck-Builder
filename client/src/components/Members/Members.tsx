import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PrivateFetch from "../../services/PrivateFetch";

import "./Members.css";

const randomImages = [
  "https://storage.googleapis.com/archidekt-card-images/plist/0e259db1-14db-4314-998c-6a076a28d8cb_art_crop.jpg",
  "https://storage.googleapis.com/archidekt-card-images/ltc/dd4a00ff-2206-4e12-a0ab-61ed82c9e6c5_art_crop.jpg",
  "https://storage.googleapis.com/archidekt-card-images/c21/3cae9bae-bcea-4b4b-965f-8b14339e724b_art_crop.jpg",
  "https://storage.googleapis.com/archidekt-card-images/ltr/b83261ba-c239-4b6a-88eb-bdfc411916b3_art_crop.jpg",
  "https://storage.googleapis.com/archidekt-card-images/woe/844e29e9-e870-4433-ad63-0ff918a3e41a_art_crop.jpg",
  "https://storage.googleapis.com/archidekt-card-images/c17/7c6e803a-451c-4aa6-97a2-400077f32c47_art_crop.jpg",
  "https://storage.googleapis.com/archidekt-card-images/woc/79e4242c-a53a-4287-976b-8e545888a1fa_art_crop.jpg",
  "https://storage.googleapis.com/archidekt-card-images/cmm/6270c798-a3ba-4826-b0a9-82f7e12890f6_art_crop.jpg",
  "https://storage.googleapis.com/archidekt-card-images/ltr/a14c4b29-3363-45ce-9190-0f79e1a0ef7f_art_crop.jpg",
  "https://storage.googleapis.com/topdekt-user/images/archidekt_deck_card_shadow.jpg",
];

function Members() {
  const [members, setMembers] = useState<IMember[]>();

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    const res = await PrivateFetch("GET", "members", null);
    console.log(res);
    setMembers(res);
  }

  return (
    <section className="container">
      <div className="cards-member">
        {members?.map((member) => {
          return (
            <div className="card-member" id={member.id + ""} key={member.id}>
              <Link to={`/decks/member/${member.id}`}>
                <img src={randomImages[Math.floor(Math.random() * 10)]} alt={member.username} />
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
