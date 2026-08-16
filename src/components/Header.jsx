import { FaSearch } from "react-icons/fa";

function Header({ searchTerm, setSearchTerm }) {

  const hour = new Date().getHours();

  let greeting;

  if (hour >= 5 && hour < 12) {
  greeting = "Good Morning";
} else if (hour >= 12 && hour < 17) {
  greeting = "Good Afternoon";
} else if (hour >= 17 && hour < 21) {
  greeting = "Good Evening";
} else {
  greeting = "Good Night";
}

  return (
    <header className="header">

      <div>
        <h1>{greeting} 🎧</h1>

        <p>What do you want to listen to today?</p>
      </div>

      <div className="header-actions">

        <div className="search-box">
          <FaSearch />

          <input
            type="text"
            placeholder="Search songs, artists..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>


      </div>

    </header>
  );
}

export default Header;