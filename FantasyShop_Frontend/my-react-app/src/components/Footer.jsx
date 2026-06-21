import "./Footer.css";

function Footer() {

  return (

    <footer className="footer">

      <section className="footer-about">

        <div className="footer-about-content">

          <h2>Fantasy Shop</h2>

          <p>
            Fantasy Shop was created as a store for roleplayers, collectors, and fantasy enthusiasts.
            Our goal is to gather equipment, weapons, armor, and adventuring gear for people who love classic tabletop worlds.
          </p>

          <p>
            The store started with a simple idea: making it easier to find fantasy-inspired products in one place.
            Here you can find items for roleplaying, campaigns, character building, and collections.
          </p>

          <p>
            We are continuously working to expand the selection, so the store can offer more categories and better options for both new and experienced players.
          </p>

        </div>

      </section>

      <section className="footer-info">

        <div className="footer-info-content">

          <div className="footer-column">

            <h3>Information</h3>

            <p>About us</p>
            <p>Terms and conditions</p>
            <p>Customer service</p>
            <p>Privacy policy</p>

          </div>

          <div className="footer-column">

            <h3>Contact</h3>

            <p>Email: support@fantasyshop.dk</p>
            <p>Telefon: +45 12 34 56 78</p>
            <p>Adresse: Eventyrvej 7, 2800 Lyngby</p>

          </div>

          <div className="footer-column">

            <h3>Store</h3>

            <p>Fantasy Shop ApS</p>
            <p>CVR: 12345678</p>
            <p>Denmark</p>

          </div>

        </div>

      </section>

      <section className="footer-bottom">

        <p>© 2026 Fantasy Shop</p>

      </section>

    </footer>
  );
}

export default Footer;