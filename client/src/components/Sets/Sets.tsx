import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Sets.css";
import Loader from "../Loader/Loader";

function Sets() {
  const API_URL = () => {
    return `https://api.scryfall.com/sets`;
  };

  const [sets, setSets] = useState<ISet[]>();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSets();
  }, []);

  async function fetchSets() {
    const res = await fetch(API_URL());
    const data = await res.json();
    setSets(data.data);
    setIsLoading(false);
  }

  return (
<<<<<<< HEAD
    <>
    <div className="wrapper">
=======
    <div className="sets">
>>>>>>> c0cf3c95d11c8bee4351c4feddeec6f3ca90b0e0
      {isLoading ? (
        <Loader />
      ) : (
        <table className="sets-table">
          <thead>
            <tr className="table-header">
              <th>Name</th>
              <th>Cards</th>
              <th>Release Date</th>
              <th>Code</th>
              <th>Set Type</th>
            </tr>
          </thead>
          <tbody>
            {sets?.map((set) => {
              return (
                <tr key={set.id}>
<<<<<<< HEAD
                  <td className="name-col">
                    <Link to={`/search?order=set&q=e:${set.code}`}>
=======
                  <td>
                    <Link className="set-name" to={`/search?order=set&q=e:${set.code}`}>
>>>>>>> c0cf3c95d11c8bee4351c4feddeec6f3ca90b0e0
                      <img
                        className="set-icon"
                        src={set.icon_svg_uri}
                        alt={set.name}
                      />
                      {set.name}
                    </Link>
                  </td>
                  <td>{set.card_count}</td>
                  <td>{set.released_at}</td>
                  <td>{set.code}</td>
                  <td>{set.set_type}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        
      )}
<<<<<<< HEAD
      </div>
    </>
=======
    </div>
>>>>>>> c0cf3c95d11c8bee4351c4feddeec6f3ca90b0e0
  );
}

export default Sets;
