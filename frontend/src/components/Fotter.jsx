import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-brand">
                    <h2>NearNest</h2>
                    <p>Helping people find their perfect rental home with ease.</p>
                </div>

                <div className="footer-contact">
                    <h3>Contact</h3>
                    <p><strong>Phone:</strong> 8639538077</p>
                    <p><strong>Email:</strong> ashwith9492@gmail.com</p>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2026 NearNest. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;