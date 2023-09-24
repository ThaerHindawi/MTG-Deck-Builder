import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import API_LOCAL_URL from "../../Utils/API_URL";
import { checkLogin } from "../../services/checkLogin";
import { useNavigate } from "react-router-dom";

function AddDeck() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState<IDeck>({
    deck_name: "",
  });

  const [message, setMessage] = useState(null);

  async function submit(e: FormEvent) {
    e.preventDefault();
    const res = await fetch(API_LOCAL_URL("decks/new"), {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    console.log(data)
    if (data.success) {
        setMessage(data.message);
    } else {
        setMessage(data.error);
    }

    formData.deck_name = ""
    setFormData(formData);
    
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const newFormData: IDeck = { ...formData };
    newFormData[e.target.id as keyof IDeck] = e.target.value;
    console.log(newFormData)
    setFormData(newFormData);
  }

  return (
    <div className="container">
      {<p>{message}</p>}
      <div className="row justify-content-md-center">
        <form onSubmit={submit}>
          <div className="form-group mb-2">
            <label>Deck Name</label>
            <input
              type="text"
              onChange={handleChange}
              value={formData.deck_name}
              className="form-control"
              id="deck_name"
              placeholder="Enter deck_name"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Deck
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddDeck;
