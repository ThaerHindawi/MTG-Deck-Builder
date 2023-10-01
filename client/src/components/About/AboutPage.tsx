import "./About.Page.css";

const developers = [
    {
        name: "Thaer Hendawi",
        role: "Front-End / React API Integration",
        imgSrc: "https://avatars.githubusercontent.com/u/53184833?v=4",
        socialLinks: [
            { name: "LinkedIn", link: "https://www.linkedin.com/in/thaer-hindawi/" },
            { name: "Github", link: "https://github.com/ThaerHindawi" },
            { name: "Portfolio", link: "https://www.thaerhendawi.com/" },
        ],
    },
    {
        name: "Derek McElroy",
        role: "Project Manager",
        imgSrc: "https://avatars.githubusercontent.com/u/133508999?v=4",
        socialLinks: [
            { name: "LinkedIn", link: "https://www.linkedin.com/in/dmcelroy1985/" },
            { name: "Github", link: "https://github.com/Dmcelroy85" },
            { name: "Portfolio", link: "Derek-McElroy.com" },
        ],
    },
    {
        name: "Chris Braid",
        role: "Front-End Designer",
        imgSrc: "https://avatars.githubusercontent.com/u/102481202?v=4",
        socialLinks: [
            { name: "LinkedIn", link: "https://www.linkedin.com/in/chrisbraid1/" },
            { name: "Github", link: "https://github.com/burningxbeard" },
            { name: "Portfolio", link: "https://burningxbeard.github.io/" },
        ],
    },
    {
        name: "Brett Heiney-Martin",
        role: "Back-End Integration / Database Design",
        imgSrc: "https://avatars.githubusercontent.com/u/110037799?v=4",
        socialLinks: [
            { name: "LinkedIn", link: "https://www.linkedin.com/in/btheiney/" },
            { name: "Github", link: "https://github.com/btheiney" },
            { name: "Portfolio", link: "https://btheiney.github.io/" },
        ],
    }
];

function AboutPage() {
    return (
        <>
            <div className="about">
                <h2 className="page-heading">About MTG Deck Builder</h2>
                <p>For the final project for <a href="">WeCanCodeIT's (WCCI)</a> Full-Stack Development Bootcamp, our team successfully created an advanced Magic The Gathering (MTG) Deck Builder Website. This comprehensive online platform serves a dual purpose: aiding MTG enthusiasts in the seamless creation and management of personalized decks, while also providing a community hub for MTG players to share their unique deck creations.
                <br /><br />This projects source code is available on <a href="">GitHub</a>
                <br />Card information and pricing provided by <a href="https://scryfall.com/">Scryfall.com</a></p>
            </div>
            

            <div className="contact-container">
                <h2 className="page-heading">Meet The Developers</h2>

                <div className="contact-cards">
                    {developers.map((developer, index) => (
                        <article key={index}>
                            <div className="card-contact">
                                <img className="dev-photo" src={developer.imgSrc} alt={`Photo of ${developer.name}`} />
                                <div className="dev-details">
                                    <div className="title-box">
                                        <h2 className="dev-name">{developer.name}</h2>
                                        <h5 className="implementation">{developer.role}</h5>
                                    </div>
                                    <div className="dev-socials">
                                        {developer.socialLinks.map((link, i) => (
                                            <a key={i} href={link.link} className="social-btn">
                                                {link.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </>
    );
}

export default AboutPage;
