import "./Footer.css"
import { FaSquareGithub, FaLinkedin } from "react-icons/fa6";
import { SiCodechef, SiCodeforces } from "react-icons/si";

function websiteclick(link) {
    window.open(`${link}`);
}

function Footer() {
    return (
        <>
            <div className="footer">
                <SiCodeforces className="icons" onClick={() => websiteclick("https://codeforces.com/profile/DP_is_tough")} />
                <FaSquareGithub className="icons" onClick={() => websiteclick("https://github.com/N0vice17")} />
                <p>Developed By Debojit Ganguly</p>
                <FaLinkedin className="icons" onClick={() => websiteclick("https://www.linkedin.com/in/debojit-ganguly-907771242/")} />
                <SiCodechef className="icons" onClick={() => websiteclick("https://www.codechef.com/users/developer_23")} />
            </div>
        </>
    );
}

export default Footer;