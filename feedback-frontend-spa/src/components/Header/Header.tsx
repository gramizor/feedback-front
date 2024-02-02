import './Header.css'

const Header = () => {
    return (
        <div>
            <nav className="header">
                <a className="nav-link" href="#/">Группы</a>
                <a className="nav-link" href="#/about">О нас</a>
            </nav>
        </div>
    );
}

export default Header;