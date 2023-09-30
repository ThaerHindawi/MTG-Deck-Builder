import "./Contact.Page.css";

function AboutPage() {

    return (
        <>
            <div className="contact-container">

                <h2 className="page-heading">Meet The Developers</h2>

                <div className="contact-cards">

                <article>
                    <div className="card-contact">
                        <img className="dev-photo" src="https://avatars.githubusercontent.com/u/53184833?v=4"></img>
                        <div className="dev-details">
                            <h3 className="dev-name">Thaer Hendawi</h3>
                            <p className="sub">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, aut.</p>
                            <div className="dev-socials">
                                <a href="" className="btn">LinkedIn</a>
                                <a href="" className="btn">Github</a>
                                <a href="" className="btn">Portfolio</a>
                            </div>
                        </div>
                    </div>
                </article>

                <article>
                    <div className="card-contact">
                        <img className="dev-photo" src="https://avatars.githubusercontent.com/u/133508999?v=4"></img>
                        <div className="dev-details">
                            <h3 className="dev-name">Derek McElroy</h3>
                            <p className="sub">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, aut.</p>
                            <div className="dev-socials">
                                <a href="" className="btn">LinkedIn</a>
                                <a href="" className="btn">Github</a>
                                <a href="" className="btn">Portfolio</a>
                            </div>
                        </div>
                    </div>
                </article>

                <article>
                    <div className="card-contact">
                        <img className="dev-photo" src="https://avatars.githubusercontent.com/u/102481202?v=4"></img>
                        <div className="dev-details">
                            <h3 className="dev-name">Chris Braid</h3>
                            <p className="sub">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, aut.</p>
                            <div className="dev-socials">
                                <a href="" className="btn">LinkedIn</a>
                                <a href="" className="btn">Github</a>
                                <a href="" className="btn">Portfolio</a>
                            </div>
                        </div>
                    </div>
                </article>

                <article>
                    <div className="card-contact">
                        <img className="dev-photo" src="https://avatars.githubusercontent.com/u/110037799?v=4"></img>
                        <div className="dev-details">
                            <h3 className="dev-name">Brett Heiney-Martin</h3>
                            <p className="sub">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis, aut.</p>
                            <div className="dev-socials">
                                <a href="" className="btn">LinkedIn</a>
                                <a href="" className="btn">Github</a>
                                <a href="" className="btn">Portfolio</a>
                            </div>
                        </div>
                    </div>
                </article>


                </div>

            </div>
        </>
    )

}

export default AboutPage;