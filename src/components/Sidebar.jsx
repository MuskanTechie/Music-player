import {
  FaHome,
  FaMusic,
  FaHeart,
  FaList
} from "react-icons/fa";

function Sidebar({ activeSection, setActiveSection }) {

  const menuItems = [
    {
      name: "Home",
      icon: <FaHome />,
      section: "home"
    },
    {
      name: "All Songs",
      icon: <FaMusic />,
      section: "all"
    },
    {
      name: "Favorites",
      icon: <FaHeart />,
      section: "favorites"
    },
    {
      name: "Playlist",
      icon: <FaList />,
      section: "playlist"
    }
  ];

  return (
    <aside className="sidebar">

      <div className="logo">
        <FaMusic />
        <span>Melody</span>
      </div>

      <nav className="sidebar-nav">

        {menuItems.map((item) => (
          <a
            href="#"
            key={item.section}
            className={
              activeSection === item.section
                ? "active"
                : ""
            }
            onClick={(e) => {
              e.preventDefault();
              setActiveSection(item.section);
            }}
          >
            {item.icon}
            <span>{item.name}</span>
          </a>
        ))}

      </nav>

    </aside>
  );
}

export default Sidebar;