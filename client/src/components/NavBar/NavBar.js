import { Link } from "react-router-dom";
import "./NavBar.css";
const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">
                        <img
                            className="icons-nav"
                            src="/images/homeIcon.svg"
                            alt="home icon"
                        />
                    </Link>
                </li>
                <li>
                    <Link to="/all-transactions">
                        <img
                            className="icons-nav"
                            src="/images/credit-card-icon.svg"
                            alt="transaction icon"
                        />
                    </Link>
                </li>
                <li>
                    <Link to="/add-transaction">
                        <img
                            className="icons-nav"
                            src="/images/plus-circle-icon.svg"
                            alt="add transaction icon"
                        />
                    </Link>
                </li>
                <li>
                    <Link to="/report">
                        <img
                            className="icons-nav"
                            src="/images/pie-chart-icon.svg"
                            alt="report icon"
                        />
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
