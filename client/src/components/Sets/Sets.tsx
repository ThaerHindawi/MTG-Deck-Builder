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
    <>
    <div className="wrapper">
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
                  <td className="name-col">
                    <Link to={`/search?order=set&q=e:${set.code}`}>
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
      </div>
    </>
  );
}

export default Sets;
