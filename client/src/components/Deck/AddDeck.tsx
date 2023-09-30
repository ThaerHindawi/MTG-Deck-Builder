import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import API_LOCAL_URL from "../../Utils/API_URL";
import { checkLogin } from "../../services/checkLogin";
import { useNavigate } from "react-router-dom";
import PrivateFetch from "../../services/PrivateFetch";
import { useJwt } from "react-jwt";
import "./decks.css"

function AddDeck() {
  const { isExpired } = useJwt(localStorage.getItem("token") || "");
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IDeck>({
    deck_name: "",
  });

  const [message, setMessage] = useState(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    const res = await PrivateFetch("POST", "decks/new", formData);

    console.log(res);
    if (res.success) {
      setMessage(res.message);
    } else {
      setMessage(res.error);
    }

    formData.deck_name = "";
    setFormData(formData);
  }

  function checkExpiredToken() {
    if (isExpired) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }

  useEffect(() => {
    checkExpiredToken();
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newFormData: IDeck = { ...formData };
    newFormData[e.target.id as keyof IDeck] = e.target.value;
    console.log(newFormData);
    setFormData(newFormData);
  }

  return (
    <div className="wrapper">
      {<p>{message}</p>}
      <div className="add-deck-container">
        <div className="form-group">
        <form onSubmit={submit}>
        <h2>Create New Deck</h2>
            <label>Deck Name</label>
            <input
              type="text"
              onChange={handleChange}
              value={formData.deck_name}
              id="deck_name"
              placeholder="Enter deck name"
            />
          <button type="submit" className="btn">
            Add Deck
          </button>
        </form>
        </div>
        </div>
      </div>
  );
}

export default AddDeck;
