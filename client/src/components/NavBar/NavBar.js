import { NavLink } from "react-router-dom";
import "./NavBar.css";
import HomeIcon from "../../assets/images/HomeIcon";
import CardIcon from "../../assets/images/CardIcon";
import PieCircleIcon from "../../assets/images/PieCircleIcon";
import PlusCircleIcon from "../../assets/images/PlusCircleIcon";

const NavBar = () => {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to="/">
                        <HomeIcon />
                        <p className="is-active">Home</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/all-transactions">
                        <CardIcon />
                        <p className="is-active">Transactions</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/add-transactions">
                        <PlusCircleIcon />
                        <p className="is-active">Add</p>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/report">
                        <PieCircleIcon />
                        <p className="is-active">Report</p>
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
