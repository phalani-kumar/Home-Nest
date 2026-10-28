
"use strict";

/* =========================================
   HOME NEST - SHARED JAVASCRIPT
   Frontend demonstration using localStorage
========================================= */

const PROPERTY_DATA = [
  {
    id: 1,
    name: "Modern Garden Villa",
    location: "Jubilee Hills, Hyderabad",
    type: "Villa",
    purpose: "buy",
    price: 38000000,
    priceLabel: "₹3.8 Cr",
    beds: 4,
    baths: 4,
    area: 3200,
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85",
    description: "Discover a thoughtfully designed modern villa with generous living spaces, attractive interiors, and room for family life. Its welcoming design offers a comfortable setting for relaxing and entertaining."
  },
  {
    id: 2,
    name: "The Skyline Residence",
    location: "Financial District, Hyderabad",
    type: "Apartment",
    purpose: "buy",
    price: 14500000,
    priceLabel: "₹1.45 Cr",
    beds: 3,
    baths: 3,
    area: 2100,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85",
    description: "A contemporary apartment with an elegant layout, spacious rooms, and a modern look. A great option for people looking for convenient city living."
  },
  {
    id: 3,
    name: "Calm Corner Apartment",
    location: "Kondapur, Hyderabad",
    type: "Apartment",
    purpose: "rent",
    price: 65000,
    priceLabel: "₹65,000 / month",
    beds: 3,
    baths: 2,
    area: 1650,
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
    description: "A bright and comfortable apartment designed for everyday convenience, with an inviting living area and a practical layout."
  },
  {
    id: 4,
    name: "Urban Nest Home",
    location: "Madhapur, Hyderabad",
    type: "House",
    purpose: "rent",
    price: 42000,
    priceLabel: "₹42,000 / month",
    beds: 2,
    baths: 2,
    area: 1200,
    image: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=85",
    description: "A welcoming home with a clean design and comfortable spaces, suitable for people who want a practical home in a connected neighbourhood."
  },
  {
    id: 5,
    name: "Willow Family Villa",
    location: "Tellapur, Hyderabad",
    type: "Villa",
    purpose: "buy",
    price: 26000000,
    priceLabel: "₹2.6 Cr",
    beds: 4,
    baths: 4,
    area: 2800,
    image: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=85",
    description: "A family-oriented villa with generous interiors, a welcoming atmosphere, and space to make long-lasting memories."
  },
  {
    id: 6,
    name: "The Amber Apartment",
    location: "Kokapet, Hyderabad",
    type: "Apartment",
    purpose: "buy",
    price: 9800000,
    priceLabel: "₹98 L",
    beds: 2,
    baths: 2,
    area: 1450,
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85",
    description: "A stylish apartment with warm interiors and a practical layout, designed to make everyday living feel comfortable and easy."
  }
];

const STORAGE_KEYS = {
  users: "homenest_users",
  currentUser: "homenest_current_user",
  favorites: "homenest_favorites",
  bookings: "homenest_bookings"
};

/* =========================================
   STORAGE HELPERS
========================================= */

function readStorage(key, fallback = []) {
  try {
    const stored = localStorage.getItem(key);
    return stored === null ? fallback : JSON.parse(stored);
  } catch (error) {
    console.error("Could not read browser storage:", error);
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("Could not save browser storage:", error);
    showToast("Could not save data in this browser.", "error");
    return false;
  }
}

function getCurrentUser() {
  return readStorage(STORAGE_KEYS.currentUser, null);
}

function getUserKey(prefix) {
  const user = getCurrentUser();
  return prefix + "_" + (user ? user.email.toLowerCase() : "guest");
}

function getFavorites() {
  return readStorage(getUserKey(STORAGE_KEYS.favorites), []);
}

function saveFavorites(favorites) {
  return writeStorage(getUserKey(STORAGE_KEYS.favorites), favorites);
}

function getBookings() {
  return readStorage(getUserKey(STORAGE_KEYS.bookings), []);
}

function saveBookings(bookings) {
  return writeStorage(getUserKey(STORAGE_KEYS.bookings), bookings);
}

function getProperty(id) {
  return PROPERTY_DATA.find(property => property.id === Number(id));
}

/* =========================================
   NOTIFICATIONS
========================================= */

function showToast(message, type = "success") {
  let container = document.getElementById("toastContainer");

  if (!container) {
    container = document.createElement("div");
    container.id = "toastContainer";
    container.className = "toast-container";
    container.setAttribute("aria-live", "polite");
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast" + (type === "error" ? " error" : "");
  toast.textContent = message;
  container.appendChild(toast);

  window.setTimeout(() => {
    toast.remove();
  }, 3500);
}

/* =========================================
   HEADER, FOOTER AND ANIMATIONS
========================================= */

function initializeNavigation() {
  const toggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");

  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.textContent = isOpen ? "✕" : "☰";
  });

  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "☰";
    });
  });
}

function initializeFooterYear() {
  document.querySelectorAll("#currentYear").forEach(element => {
    element.textContent = new Date().getFullYear();
  });
}

function initializeRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    elements.forEach(element => element.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(element => observer.observe(element));
}

/* =========================================
   PROPERTY CARD RENDERING
========================================= */

function formatPrice(property) {
  return property.priceLabel;
}

function createPropertyCard(property) {
  const favorites = getFavorites();
  const isFavorite = favorites.includes(property.id);

  const article = document.createElement("article");
  article.className = "property-card reveal visible";
  article.dataset.propertyId = String(property.id);

  const imageWrapper = document.createElement("div");
  imageWrapper.className = "property-image";

  const img = document.createElement("img");
  img.src = property.image;
  img.alt = property.name;
  img.loading = "lazy";

  const badge = document.createElement("span");
  badge.className = "property-badge" + (property.purpose === "rent" ? " badge-rent" : "");
  badge.textContent = property.purpose === "rent" ? "For Rent" : "For Sale";

  const favorite = document.createElement("button");
  favorite.type = "button";
  favorite.className = "favorite-btn" + (isFavorite ? " is-favorite" : "");
  favorite.dataset.favorite = String(property.id);
  favorite.setAttribute("aria-label", isFavorite ? "Remove from saved properties" : "Save property");
  favorite.setAttribute("aria-pressed", String(isFavorite));
  favorite.textContent = isFavorite ? "♥" : "♡";

  imageWrapper.append(img, badge, favorite);

  const info = document.createElement("div");
  info.className = "property-info";

  const location = document.createElement("p");
  location.className = "property-location";
  location.textContent = property.location;

  const title = document.createElement("h3");
  title.textContent = property.name;

  const price = document.createElement("p");
  price.className = "property-price";
  price.textContent = formatPrice(property);

  if (property.purpose === "rent") {
    const note = document.createElement("small");
    note.textContent = " / month";
    price.appendChild(note);
  }

  const meta = document.createElement("div");
  meta.className = "property-meta";
  meta.innerHTML =
    "<span>🛏 " + property.beds + " Beds</span>" +
    "<span>▱ " + property.baths + " Baths</span>" +
    "<span>⌂ " + property.area.toLocaleString("en-IN") + " sqft</span>";

  const details = document.createElement("a");
  details.className = "btn btn-outline btn-block";
  details.href = "property-details.html?id=" + property.id;
  details.textContent = "View Details";

  info.append(location, title, price, meta, details);
  article.append(imageWrapper, info);

  return article;
}

function renderPropertyCards(container, properties) {
  if (!container) return;

  container.replaceChildren();

  properties.forEach(property => {
    container.appendChild(createPropertyCard(property));
  });

  container.querySelectorAll(".favorite-btn").forEach(button => {
    button.addEventListener("click", () => {
      toggleFavorite(Number(button.dataset.favorite));
    });
  });
}

/* =========================================
   FAVOURITES
========================================= */

function toggleFavorite(propertyId) {
  const favorites = getFavorites();
  const alreadySaved = favorites.includes(propertyId);

  const updated = alreadySaved
    ? favorites.filter(id => id !== propertyId)
    : [...favorites, propertyId];

  if (!saveFavorites(updated)) return;

  document.querySelectorAll('[data-favorite="' + propertyId + '"]').forEach(button => {
    const saved = updated.includes(propertyId);

    button.classList.toggle("is-favorite", saved);
    button.textContent = saved ? "♥" : "♡";
    button.setAttribute("aria-pressed", String(saved));
    button.setAttribute("aria-label", saved ? "Remove from saved properties" : "Save property");
  });

  showToast(alreadySaved ? "Removed from saved properties." : "Property saved to your favourites.");

  if (document.getElementById("savedPropertiesGrid")) {
    renderDashboard();
  }
}

function initializeStaticFavorites() {
  const favorites = getFavorites();

  document.querySelectorAll(".favorite-btn[data-favorite]").forEach(button => {
    const id = Number(button.dataset.favorite);
    const saved = favorites.includes(id);

    button.classList.toggle("is-favorite", saved);
    button.textContent = saved ? "♥" : "♡";
    button.setAttribute("aria-pressed", String(saved));

    button.addEventListener("click", () => toggleFavorite(id));
  });

  const detailFavorite = document.getElementById("detailFavorite");

  if (detailFavorite) {
    const params = new URLSearchParams(window.location.search);
    const propertyId = Number(params.get("id") || 1);

    detailFavorite.dataset.favorite = String(propertyId);
    updateDetailFavorite(propertyId);
    detailFavorite.addEventListener("click", () => toggleFavorite(propertyId));
  }
}

function updateDetailFavorite(propertyId) {
  const button = document.getElementById("detailFavorite");
  if (!button) return;

  const saved = getFavorites().includes(Number(propertyId));
  button.classList.toggle("is-favorite", saved);
  button.textContent = saved ? "♥ Saved" : "♡ Save";
  button.setAttribute("aria-pressed", String(saved));
}

/* =========================================
   HOMEPAGE SEARCH
========================================= */

function initializeHomeSearch() {
  const form = document.getElementById("propertySearch");
  if (!form) return;

  form.addEventListener("submit", event => {
    event.preventDefault();

    const location = document.getElementById("homeLocation").value.trim();
    const purpose = document.getElementById("homePurpose").value;
    const type = document.getElementById("homeType").value;

    const params = new URLSearchParams();

    if (location) params.set("location", location);
    if (purpose !== "all") params.set("purpose", purpose);
    if (type !== "all") params.set("type", type);

    window.location.href = "properties.html" +
      (params.toString() ? "?" + params.toString() : "");
  });
}

/* =========================================
   PROPERTY FILTERS
========================================= */

function initializePropertyFilters() {
  const form = document.getElementById("propertyFilters");
  const grid = document.getElementById("propertyGrid");

  if (!form || !grid) return;

  const params = new URLSearchParams(window.location.search);

  const locationInput = document.getElementById("filterLocation");
  const purposeInput = document.getElementById("filterPurpose");
  const typeInput = document.getElementById("filterType");
  const bedsInput = document.getElementById("filterBedrooms");
  const priceInput = document.getElementById("filterPrice");

  locationInput.value = params.get("location") || "";
  purposeInput.value = params.get("purpose") || "all";
  typeInput.value = params.get("type") || "all";

  function applyFilters(event) {
    if (event) event.preventDefault();

    const location = locationInput.value.trim().toLowerCase();
    const purpose = purposeInput.value;
    const type = typeInput.value;
    const minBeds = bedsInput.value === "all" ? 0 : Number(bedsInput.value);
    const maxPrice = priceInput.value === "all" ? Infinity : Number(priceInput.value);

    const filtered = PROPERTY_DATA.filter(property => {
      const matchesLocation = property.location.toLowerCase().includes(location);
      const matchesPurpose = purpose === "all" || property.purpose === purpose;
      const matchesType = type === "all" || property.type === type;
      const matchesBeds = property.beds >= minBeds;
      const matchesPrice = property.purpose === "rent" && purpose === "rent"
        ? true
        : property.price <= maxPrice;

      return matchesLocation && matchesPurpose && matchesType && matchesBeds && matchesPrice;
    });

    renderPropertyCards(grid, filtered);

    const count = document.getElementById("resultsCount");
    if (count) {
      count.textContent = "Showing " + filtered.length +
        (filtered.length === 1 ? " property" : " properties");
    }

    const empty = document.getElementById("listingEmpty");
    if (empty) empty.classList.toggle("hidden", filtered.length > 0);
    grid.classList.toggle("hidden", filtered.length === 0);
  }

  form.addEventListener("submit", applyFilters);

  form.addEventListener("reset", () => {
    window.setTimeout(() => {
      locationInput.value = "";
      purposeInput.value = "all";
      typeInput.value = "all";
      bedsInput.value = "all";
      priceInput.value = "all";
      applyFilters();
    }, 0);
  });

  const emptyReset = document.getElementById("emptyReset");
  if (emptyReset) {
    emptyReset.addEventListener("click", () => {
      form.reset();
    });
  }

  applyFilters();
}

/* =========================================
   PROPERTY DETAILS
========================================= */

function initializePropertyDetails() {
  const image = document.getElementById("detailImage");
  if (!image) return;

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id") || 1);
  const property = getProperty(id) || PROPERTY_DATA[0];

  document.title = property.name + " | Home Nest";

  const setText = (elementId, value) => {
    const element = document.getElementById(elementId);
    if (element) element.textContent = value;
  };

  image.src = property.image;
  image.alt = property.name;

  setText("detailName", property.name);
  setText("detailLocation", property.location);
  setText("detailAddress", property.location + ", Telangana, India");
  setText("detailBeds", property.beds);
  setText("detailBaths", property.baths);
  setText("detailArea", property.area.toLocaleString("en-IN") + " sqft");
  setText("detailType", property.type);
  setText("detailPrice", property.priceLabel);
  setText("detailPriceNote", property.purpose === "rent" ? "Listed for rent" : "Listed for sale");
  setText("detailDescription", property.description);
  setText("detailNeighbourhood", "Located in " + property.location + ", with access to everyday conveniences and local amenities.");
  setText("detailBadge", property.purpose === "rent" ? "For Rent" : "For Sale");

  const badge = document.getElementById("detailBadge");
  if (badge) badge.classList.toggle("badge-rent", property.purpose === "rent");

  const hiddenId = document.getElementById("bookingPropertyId");
  if (hiddenId) hiddenId.value = String(property.id);

  const dateInput = document.getElementById("bookingDate");
  if (dateInput) {
    const today = new Date();
    const localToday = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
      .toISOString().split("T")[0];
    dateInput.min = localToday;
  }

  updateDetailFavorite(property.id);
}

/* =========================================
   SIGN-UP
========================================= */

function initializeSignup() {
  const form = document.getElementById("signupForm");
  if (!form) return;

  form.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim().toLowerCase();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("signupConfirm").value;

    if (password !== confirmPassword) {
      showToast("Passwords do not match.", "error");
      return;
    }

    if (password.length < 6) {
      showToast("Password must contain at least 6 characters.", "error");
      return;
    }

    const users = readStorage(STORAGE_KEYS.users, []);

    if (users.some(user => user.email === email)) {
      showToast("An account with this email already exists. Please log in.", "error");
      return;
    }

    /*
      Demo only: storing passwords in localStorage is not secure.
      Never use this approach for a real application.
    */
    users.push({ name, email, password });

    if (!writeStorage(STORAGE_KEYS.users, users)) return;

    writeStorage(STORAGE_KEYS.currentUser, { name, email });
    showToast("Account created successfully!");

    window.setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 700);
  });
}

/* =========================================
   LOGIN AND LOGOUT
========================================= */

function initializeLogin() {
  const form = document.getElementById("loginForm");
  if (!form) return;

  form.addEventListener("submit", event => {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim().toLowerCase();
    const password = document.getElementById("loginPassword").value;
    const users = readStorage(STORAGE_KEYS.users, []);

    const user = users.find(item =>
      item.email === email && item.password === password
    );

    if (!user) {
      showToast("Account not found or password is incorrect. Sign up first if needed.", "error");
      return;
    }

    writeStorage(STORAGE_KEYS.currentUser, {
      name: user.name,
      email: user.email
    });

    showToast("Login successful!");

    window.setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 600);
  });
}

function initializeLogout() {
  const button = document.getElementById("logoutButton");
  if (!button) return;

  button.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEYS.currentUser);
    showToast("You have logged out.");

    window.setTimeout(() => {
      window.location.href = "index.html";
    }, 500);
  });
}

/* =========================================
   BOOKING FORM
========================================= */

function initializeBookingForm() {
  const form = document.getElementById("bookingForm");
  if (!form) return;

  const user = getCurrentUser();

  if (user) {
    const nameInput = document.getElementById("bookingName");
    const emailInput = document.getElementById("bookingEmail");

    if (nameInput) nameInput.value = user.name || "";
    if (emailInput) emailInput.value = user.email || "";
  }

  form.addEventListener("submit", event => {
    event.preventDefault();

    const propertyId = Number(document.getElementById("bookingPropertyId").value);
    const property = getProperty(propertyId);

    if (!property) {
      showToast("Property could not be found.", "error");
      return;
    }

    const name = document.getElementById("bookingName").value.trim();
    const email = document.getElementById("bookingEmail").value.trim();
    const phone = document.getElementById("bookingPhone").value.trim();
    const date = document.getElementById("bookingDate").value;
    const guests = document.getElementById("bookingGuests").value;

    if (!name || !email || !phone || !date) {
      showToast("Please complete all required fields.", "error");
      return;
    }

    const bookings = getBookings();

    bookings.unshift({
      id: Date.now(),
      propertyId: property.id,
      propertyName: property.name,
      propertyImage: property.image,
      propertyLocation: property.location,
      propertyPrice: property.priceLabel,
      name,
      email,
      phone,
      date,
      guests: Number(guests),
      status: "Pending",
      createdAt: new Date().toISOString()
    });

    if (!saveBookings(bookings)) return;

    showToast("Your property visit request has been saved.");

    window.setTimeout(() => {
      window.location.href = "bookings.html";
    }, 700);
  });
}

/* =========================================
   DASHBOARD
========================================= */

function renderDashboard() {
  const user = getCurrentUser();
  const nameElement = document.getElementById("dashboardName");

  if (nameElement) {
    nameElement.textContent = user ? user.name.split(" ")[0] : "Explorer";
  }

  const favorites = getFavorites();
  const bookings = getBookings();

  const upcoming = bookings.filter(booking =>
    booking.status !== "Cancelled" &&
    booking.date >= getLocalDateString()
  );

  const savedCount = document.getElementById("savedCount");
  const bookingCount = document.getElementById("bookingCount");
  const upcomingCount = document.getElementById("upcomingCount");

  if (savedCount) savedCount.textContent = favorites.length;
  if (bookingCount) bookingCount.textContent = bookings.length;
  if (upcomingCount) upcomingCount.textContent = upcoming.length;

  const grid = document.getElementById("savedPropertiesGrid");

  if (grid) {
    const savedProperties = PROPERTY_DATA.filter(property => favorites.includes(property.id));
    renderPropertyCards(grid, savedProperties);

    const empty = document.getElementById("savedEmpty");
    if (empty) empty.classList.toggle("hidden", savedProperties.length > 0);
  }

  const tableBody = document.getElementById("dashboardBookings");

  if (tableBody) {
    tableBody.replaceChildren();

    if (bookings.length === 0) {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.colSpan = 4;
      cell.textContent = "You have not made any booking requests yet.";
      row.appendChild(cell);
      tableBody.appendChild(row);
    } else {
      bookings.slice(0, 5).forEach(booking => {
        const row = document.createElement("tr");

        const propertyCell = document.createElement("td");
        propertyCell.textContent = booking.propertyName;

        const dateCell = document.createElement("td");
        dateCell.textContent = formatDate(booking.date);

        const statusCell = document.createElement("td");
        const pill = document.createElement("span");
        pill.className = "status-pill" + (booking.status === "Cancelled" ? " cancelled" : "");
        pill.textContent = booking.status;
        statusCell.appendChild(pill);

        const detailsCell = document.createElement("td");
        const link = document.createElement("a");
        link.href = "property-details.html?id=" + booking.propertyId;
        link.className = "text-link";
        link.textContent = "View";
        detailsCell.appendChild(link);

        row.append(propertyCell, dateCell, statusCell, detailsCell);
        tableBody.appendChild(row);
      });
    }
  }
}

/* =========================================
   BOOKINGS PAGE
========================================= */

let activeBookingFilter = "all";

function getLocalDateString() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().split("T")[0];
}

function formatDate(dateString) {
  if (!dateString) return "Not specified";

  const date = new Date(dateString + "T00:00:00");

  if (Number.isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function getBookingCategory(booking) {
  if (booking.status === "Cancelled") return "cancelled";
  if (booking.date < getLocalDateString()) return "past";
  return "upcoming";
}

function renderBookings() {
  const list = document.getElementById("bookingList");
  if (!list) return;

  const bookings = getBookings();

  const allCount = document.getElementById("allBookingsCount");
  const upcomingCount = document.getElementById("upcomingBookingsCount");
  const cancelledCount = document.getElementById("cancelledBookingsCount");

  if (allCount) allCount.textContent = bookings.length;
  if (upcomingCount) {
    upcomingCount.textContent = bookings.filter(b => getBookingCategory(b) === "upcoming").length;
  }
  if (cancelledCount) {
    cancelledCount.textContent = bookings.filter(b => getBookingCategory(b) === "cancelled").length;
  }

  const filtered = bookings.filter(booking =>
    activeBookingFilter === "all" ||
    getBookingCategory(booking) === activeBookingFilter
  );

  list.replaceChildren();

  const empty = document.getElementById("bookingsEmpty");
  if (empty) empty.classList.toggle("hidden", filtered.length > 0);

  filtered.forEach(booking => {
    const article = document.createElement("article");
    article.className = "booking-item";

    const image = document.createElement("img");
    image.src = booking.propertyImage || "";
    image.alt = booking.propertyName || "Booked property";
    image.loading = "lazy";

    const info = document.createElement("div");

    const title = document.createElement("h3");
    title.textContent = booking.propertyName;

    const location = document.createElement("p");
    location.textContent = booking.propertyLocation || "";

    const price = document.createElement("p");
    price.textContent = booking.propertyPrice || "";

    const date = document.createElement("p");
    date.textContent = "Visit date: " + formatDate(booking.date);

    const status = document.createElement("span");
    const category = getBookingCategory(booking);
    status.className = "status-pill" +
      (category === "cancelled" ? " cancelled" : category === "past" ? " past" : "");
    status.textContent = booking.status === "Cancelled"
      ? "Cancelled"
      : category === "past" ? "Past visit" : booking.status;

    info.append(title, location, price, date, status);

    const actions = document.createElement("div");
    actions.className = "booking-item-actions";

    const detailsLink = document.createElement("a");
    detailsLink.className = "text-link";
    detailsLink.href = "property-details.html?id=" + booking.propertyId;
    detailsLink.textContent = "View property";

    actions.appendChild(detailsLink);

    if (booking.status !== "Cancelled" && category === "upcoming") {
      const cancelButton = document.createElement("button");
      cancelButton.type = "button";
      cancelButton.className = "btn btn-danger btn-small";
      cancelButton.textContent = "Cancel Request";

      cancelButton.addEventListener("click", () => {
        const confirmed = window.confirm("Are you sure you want to cancel this booking request?");
        if (!confirmed) return;

        const updated = getBookings().map(item =>
          item.id === booking.id
            ? { ...item, status: "Cancelled" }
            : item
        );

        if (saveBookings(updated)) {
          showToast("Booking request cancelled.");
          renderBookings();
        }
      });

      actions.appendChild(cancelButton);
    }

    article.append(image, info, actions);
    list.appendChild(article);
  });
}

function initializeBookingFilters() {
  const buttons = document.querySelectorAll("[data-booking-filter]");
  if (!buttons.length) return;

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      activeBookingFilter = button.dataset.bookingFilter;

      buttons.forEach(item => {
        item.classList.toggle("active", item === button);
      });

      renderBookings();
    });
  });
}

/* =========================================
   APPLICATION INITIALIZATION
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  initializeNavigation();
  initializeFooterYear();
  initializeRevealAnimations();

  initializeStaticFavorites();
  initializeHomeSearch();
  initializePropertyFilters();

  initializePropertyDetails();
  initializeSignup();
  initializeLogin();
  initializeLogout();
  initializeBookingForm();

  if (document.getElementById("savedPropertiesGrid")) {
    renderDashboard();
  }

  if (document.getElementById("bookingList")) {
    initializeBookingFilters();
    renderBookings();
  }
});


/* =========================================
   HOME NEST - ACCOUNT PAGES EXTENSION
   Add this section at the bottom of script.js
========================================= */

document.addEventListener("DOMContentLoaded", () => {
  initializeAccountSidebar();
  initializeAccountIdentity();
  initializeFavouritesPage();
  initializeProfilePage();
  initializeMessagesPage();
  initializeSettingsPage();
  initializeCompactCards();
});

/* Account-specific browser storage */

function getAccountStorageKey(name) {
  const user = getCurrentUser();
  const email = user && user.email
    ? user.email.toLowerCase()
    : "guest";

  return "homenest_" + name + "_" + email;
}

function getAccountData(name, fallback) {
  return readStorage(getAccountStorageKey(name), fallback);
}

function saveAccountData(name, value) {
  return writeStorage(getAccountStorageKey(name), value);
}

/* Sidebar menu on mobile */

function initializeAccountSidebar() {
  const button = document.getElementById("accountMenuToggle");
  const sidebar = document.getElementById("accountSidebar");

  if (!button || !sidebar) return;

  button.addEventListener("click", () => {
    const open = sidebar.classList.toggle("mobile-open");

    button.setAttribute("aria-expanded", String(open));
    button.textContent = open ? "✕" : "☰";
  });

  sidebar.querySelectorAll(".account-nav-link, .sidebar-home-link").forEach(link => {
    link.addEventListener("click", () => {
      sidebar.classList.remove("mobile-open");
      button.setAttribute("aria-expanded", "false");
      button.textContent = "☰";
    });
  });

  document.addEventListener("click", event => {
    if (
      window.innerWidth <= 760 &&
      sidebar.classList.contains("mobile-open") &&
      !sidebar.contains(event.target) &&
      !button.contains(event.target)
    ) {
      sidebar.classList.remove("mobile-open");
      button.setAttribute("aria-expanded", "false");
      button.textContent = "☰";
    }
  });
}

/* Display the signed-in user's details */

function initializeAccountIdentity() {
  const user = getCurrentUser();
  const profile = getAccountData("profile", {});

  const name = profile.name || (user && user.name) || "Home Explorer";
  const email = (user && user.email) || "Welcome to Home Nest";
  const initial = name.trim().charAt(0).toUpperCase() || "H";

  const nameElement = document.getElementById("sidebarUserName");
  const emailElement = document.getElementById("sidebarUserEmail");
  const avatar = document.getElementById("sidebarAvatar");
  const messageCount = document.getElementById("sidebarMessageCount");

  if (nameElement) nameElement.textContent = name;
  if (emailElement) emailElement.textContent = email;
  if (avatar) avatar.textContent = initial;

  if (messageCount) {
    messageCount.textContent = getAccountData("messages", []).length;
  }
}

/* Favourites page */

function initializeFavouritesPage() {
  const grid = document.getElementById("favouritesGrid");
  if (!grid) return;

  function renderFavourites() {
    const savedIds = getFavorites();

    const savedProperties = PROPERTY_DATA.filter(property =>
      savedIds.includes(property.id)
    );

    renderPropertyCards(grid, savedProperties);

    const empty = document.getElementById("favouritesEmpty");
    const count = document.getElementById("favouritesPageCount");

    if (empty) empty.classList.toggle("hidden", savedProperties.length > 0);

    if (count) {
      count.textContent = savedProperties.length +
        (savedProperties.length === 1 ? " property" : " properties");
    }
  }

  renderFavourites();

  /*
    The shared heart-button handler updates localStorage.
    Refresh this grid after a heart is clicked.
  */
  grid.addEventListener("click", event => {
    if (event.target.closest(".favorite-btn")) {
      window.setTimeout(renderFavourites, 0);
    }
  });
}

/* Profile page */

function initializeProfilePage() {
  const form = document.getElementById("profileForm");
  if (!form) return;

  const user = getCurrentUser();
  const savedProfile = getAccountData("profile", {});

  const nameInput = document.getElementById("profileName");
  const emailInput = document.getElementById("profileEmail");
  const phoneInput = document.getElementById("profilePhone");
  const locationInput = document.getElementById("profileLocation");
  const bioInput = document.getElementById("profileBio");

  const initialName = savedProfile.name || (user && user.name) || "";
  const initialEmail = (user && user.email) || "";

  nameInput.value = initialName;
  emailInput.value = initialEmail;
  phoneInput.value = savedProfile.phone || "";
  locationInput.value = savedProfile.location || "";
  bioInput.value = savedProfile.bio || "";

  function updateProfilePreview(name, email) {
    const displayName = document.getElementById("profileDisplayName");
    const displayEmail = document.getElementById("profileDisplayEmail");
    const avatar = document.getElementById("profileAvatar");

    if (displayName) displayName.textContent = name || "Home Explorer";
    if (displayEmail) displayEmail.textContent = email || "Welcome to Home Nest";
    if (avatar) avatar.textContent = name.trim().charAt(0).toUpperCase() || "H";
  }

  updateProfilePreview(initialName, initialEmail);

  form.addEventListener("reset", () => {
    window.setTimeout(() => {
      const profile = getAccountData("profile", {});
      const current = getCurrentUser();

      nameInput.value = profile.name || (current && current.name) || "";
      emailInput.value = (current && current.email) || "";
      phoneInput.value = profile.phone || "";
      locationInput.value = profile.location || "";
      bioInput.value = profile.bio || "";
    }, 0);
  });

  form.addEventListener("submit", event => {
    event.preventDefault();

    const name = nameInput.value.trim();

    if (!name) {
      showToast("Please enter your name.", "error");
      return;
    }

    const profile = {
      name,
      phone: phoneInput.value.trim(),
      location: locationInput.value.trim(),
      bio: bioInput.value.trim()
    };

    if (!saveAccountData("profile", profile)) return;

    /*
      Keep the demo user's display name in sync with the profile.
      This does not change their email or password.
    */
    if (user) {
      const updatedUser = { ...user, name };
      writeStorage(STORAGE_KEYS.currentUser, updatedUser);

      const users = readStorage(STORAGE_KEYS.users, []);
      const updatedUsers = users.map(item =>
        item.email.toLowerCase() === user.email.toLowerCase()
          ? { ...item, name }
          : item
      );

      writeStorage(STORAGE_KEYS.users, updatedUsers);
    }

    updateProfilePreview(name, initialEmail);
    initializeAccountIdentity();

    showToast("Your profile has been saved.");
  });
}

/* Messages page */

function initializeMessagesPage() {
  const form = document.getElementById("messageForm");
  const list = document.getElementById("messagesList");

  if (!form || !list) return;

  const messagesKey = "messages";

  function renderMessages() {
    const messages = getAccountData(messagesKey, []);
    list.replaceChildren();

    const empty = document.getElementById("messagesEmpty");
    const total = document.getElementById("messageTotal");

    if (empty) empty.classList.toggle("hidden", messages.length > 0);

    if (total) {
      total.textContent = messages.length +
        (messages.length === 1 ? " message" : " messages");
    }

    if (messages.length === 0) return;

    messages.forEach(message => {
      const article = document.createElement("article");
      article.className = "message-card";

      const title = document.createElement("h3");
      title.textContent = message.subject;

      const body = document.createElement("p");
      body.textContent = message.body;

      const date = document.createElement("p");
      date.className = "message-date";
      date.textContent = "Saved " + new Date(message.createdAt).toLocaleString("en-IN");

      article.append(title, body, date);
      list.appendChild(article);
    });

    const sidebarCount = document.getElementById("sidebarMessageCount");
    if (sidebarCount) sidebarCount.textContent = messages.length;
  }

  form.addEventListener("submit", event => {
    event.preventDefault();

    const subject = document.getElementById("messageSubject").value;
    const body = document.getElementById("messageBody").value.trim();

    if (!subject || !body) {
      showToast("Please complete the subject and message.", "error");
      return;
    }

    const messages = getAccountData(messagesKey, []);

    messages.unshift({
      id: Date.now(),
      subject,
      body,
      createdAt: new Date().toISOString()
    });

    if (!saveAccountData(messagesKey, messages)) return;

    form.reset();
    renderMessages();
    showToast("Your message has been saved in this browser.");
  });

  renderMessages();
}

/* Settings page */

function initializeSettingsPage() {
  const settingsButton = document.getElementById("saveSettings");
  const clearButton = document.getElementById("clearPersonalData");

  const settingInputs = document.querySelectorAll("[data-setting]");

  if (!settingsButton && !clearButton && settingInputs.length === 0) return;

  const defaultSettings = {
    bookingReminders: true,
    propertyUpdates: true,
    accountMessages: true,
    compactCards: false
  };

  function loadSettings() {
    const saved = getAccountData("settings", defaultSettings);
    const settings = { ...defaultSettings, ...saved };

    settingInputs.forEach(input => {
      input.checked = Boolean(settings[input.dataset.setting]);
    });

    applyCompactCardSetting(settings.compactCards);
  }

  function saveSettings() {
    const settings = {};

    settingInputs.forEach(input => {
      settings[input.dataset.setting] = input.checked;
    });

    if (!saveAccountData("settings", settings)) return;

    applyCompactCardSetting(settings.compactCards);

    const status = document.getElementById("settingsSavedStatus");
    if (status) {
      status.textContent = "Saved successfully at " +
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit"
        });
    }

    showToast("Your preferences have been saved.");
  }

  settingInputs.forEach(input => {
    input.addEventListener("change", saveSettings);
  });

  if (settingsButton) {
    settingsButton.addEventListener("click", saveSettings);
  }

  if (clearButton) {
    clearButton.addEventListener("click", () => {
      const confirmed = window.confirm(
        "Clear your favourites and messages saved in this browser? This cannot be undone."
      );

      if (!confirmed) return;

      saveFavorites([]);
      saveAccountData("messages", []);

      const settings = getAccountData("settings", defaultSettings);
      applyCompactCardSetting(settings.compactCards);

      showToast("Your favourites and messages have been cleared.");

      window.setTimeout(() => {
        window.location.reload();
      }, 500);
    });
  }

  loadSettings();
}

/* Optional compact property-card preference */

function applyCompactCardSetting(enabled) {
  document.body.classList.toggle("compact-property-cards", Boolean(enabled));
}

function initializeCompactCards() {
  const settings = getAccountData("settings", {
    compactCards: false
  });

  applyCompactCardSetting(settings.compactCards);
}

const yearElement = document.getElementById("currentYear");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}


/* ========================================
   ABOUT, SERVICES AND CONTACT PAGE
   ======================================== */

// Update the footer year on these pages
document.querySelectorAll(".info-year").forEach((element) => {
  element.textContent = new Date().getFullYear();
});

// Contact form demo
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const messageElement = document.getElementById("contactFormMessage");

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    if (messageElement) {
      messageElement.textContent =
        "Thank you! Your form has been validated successfully. This is a demo, so your enquiry was not sent or saved.";
    }

    contactForm.reset();
  });
}


