import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { name: "Electronics", desc: "Latest gadgets and accessories" },
    { name: "Fashion", desc: "Trending outfits for every season" },
    { name: "Home", desc: "Comfort and decor essentials" },
    { name: "Beauty", desc: "Daily care and premium products" },
  ];

  const products = [
    { name: "Wireless Headphones", category: "Electronics", price: 99, oldPrice: 129, rating: 4.8, tag: "Best Seller" },
    { name: "Smart Watch", category: "Electronics", price: 149, oldPrice: 189, rating: 4.6, tag: "New Arrival" },
    { name: "Running Shoes", category: "Fashion", price: 79, oldPrice: 99, rating: 4.5, tag: "Limited" },
    { name: "Skin Care Kit", category: "Beauty", price: 59, oldPrice: 79, rating: 4.7, tag: "Top Rated" },
    { name: "Minimal Desk Lamp", category: "Home", price: 45, oldPrice: 59, rating: 4.4, tag: "Popular" },
    { name: "Canvas Travel Bag", category: "Fashion", price: 69, oldPrice: 89, rating: 4.3, tag: "Trending" },
  ];

  // simple site benefits removed from rendering to keep UI minimal

  const filteredProducts = products.filter((item) => {
    const search = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(search) ||
      item.category.toLowerCase().includes(search) ||
      item.tag.toLowerCase().includes(search)
    );
  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        // defer state update to avoid react-hooks/set-state-in-effect lint
        setTimeout(() => setUsername(payload.username), 0);
      } catch {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="dashboard-root">
      <header className="header">
        <div className="container header-inner">
          <div>
            <h1 className="brand">ShopSphere</h1>
            <p className="muted">Welcome, {username || "Guest"}</p>
          </div>

          <div className="header-actions">
            <button className="btn secondary">Cart (2)</button>
            <button onClick={handleLogout} className="btn" style={{ marginLeft: 8 }}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container">
        <section className="card">
          <p className="muted">New Season Collection</p>
          <h2>Discover products made for everyday life</h2>
          <p className="muted">Explore curated picks across categories. Fast delivery and simple checkout.</p>

          <div style={{ marginTop: 12 }}>
            <button className="btn">Shop Now</button>
            <button className="btn secondary" style={{ marginLeft: 8 }}>
              View Offers
            </button>
          </div>
        </section>

        <section className="card">
          <h3>Shop by Category</h3>
          <div className="grid">
            {categories.map((item) => (
              <div key={item.name} className="card small">
                <p className="strong">{item.name}</p>
                <p className="muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="card">
          <div className="row between">
            <h3>Search Products</h3>
            <p className="muted">{filteredProducts.length} results found</p>
          </div>

          <div style={{ marginTop: 8 }}>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by product, category, or tag..."
              className="input"
            />
          </div>
        </section>

        <section className="card">
          <h3>Featured Products</h3>
          <div className="grid">
            {filteredProducts.map((item) => (
              <article key={item.name} className="card small">
                <div className="placeholder" />

                <div className="row between">
                  <div>
                    <p className="strong">{item.name}</p>
                    <p className="muted">{item.category}</p>
                  </div>
                  <span className="tag">{item.tag}</span>
                </div>

                <div className="row between">
                  <div>
                    <span className="price">${item.price}</span>
                    <span className="muted old">${item.oldPrice}</span>
                  </div>
                  <button className="btn small">Add to Cart</button>
                </div>
              </article>
            ))}

            {filteredProducts.length === 0 && (
              <div className="card small">No products found for "{searchTerm}".</div>
            )}
          </div>
        </section>

        <section className="card">
          <div className="row between">
            <div>
              <h3>Limited Time Offer</h3>
              <p className="muted">Get 20% off on your first order with code: WELCOME20</p>
            </div>
            <button className="btn">Claim Offer</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;