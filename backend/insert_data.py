import sqlite3

# Connect to database
conn = sqlite3.connect("instance/tripplanner.db")
cursor = conn.cursor()

# Create tables if not exist
cursor.execute("""
CREATE TABLE IF NOT EXISTS transport_costs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source TEXT,
    destination TEXT,
    mode TEXT, -- flight, train, bus
    avg_cost INTEGER
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS hotel_costs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    city TEXT,
    hotel_type TEXT, -- budget, midrange, luxury
    avg_cost INTEGER
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS food_costs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    city TEXT,
    avg_daily_cost INTEGER
)
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS activity_costs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    city TEXT,
    activity TEXT,
    avg_cost INTEGER
)
""")

# =======================
# Insert sample data
# =======================

# ---- Transport ----
cursor.execute("INSERT INTO transport_costs (source, destination, mode, avg_cost) VALUES (?, ?, ?, ?)",
               ("delhi", "jaipur", "train", 500))
cursor.execute("INSERT INTO transport_costs (source, destination, mode, avg_cost) VALUES (?, ?, ?, ?)",
               ("delhi", "jaipur", "bus", 400))
cursor.execute("INSERT INTO transport_costs (source, destination, mode, avg_cost) VALUES (?, ?, ?, ?)",
               ("delhi", "goa", "flight", 6000))
cursor.execute("INSERT INTO transport_costs (source, destination, mode, avg_cost) VALUES (?, ?, ?, ?)",
               ("goa", "mumbai", "flight", 3000))
cursor.execute("INSERT INTO transport_costs (source, destination, mode, avg_cost) VALUES (?, ?, ?, ?)",
               ("chennai", "hyderabad", "train", 700))
cursor.execute("INSERT INTO transport_costs (source, destination, mode, avg_cost) VALUES (?, ?, ?, ?)",
               ("chennai", "hyderabad", "flight", 3500))


# ---- Hotels - Delhi ----
cursor.execute("INSERT INTO hotel_costs (city, hotel_type, avg_cost) VALUES (?, ?, ?)", ("delhi", "budget", 1300))
cursor.execute("INSERT INTO hotel_costs (city, hotel_type, avg_cost) VALUES (?, ?, ?)", ("delhi", "midrange", 3500))
cursor.execute("INSERT INTO hotel_costs (city, hotel_type, avg_cost) VALUES (?, ?, ?)", ("delhi", "luxury", 12000))

# ---- Hotels - Jaipur ----
cursor.execute("INSERT INTO hotel_costs (city, hotel_type, avg_cost) VALUES (?, ?, ?)", ("jaipur", "budget", 1000))
cursor.execute("INSERT INTO hotel_costs (city, hotel_type, avg_cost) VALUES (?, ?, ?)", ("jaipur", "midrange", 3000))
cursor.execute("INSERT INTO hotel_costs (city, hotel_type, avg_cost) VALUES (?, ?, ?)", ("jaipur", "luxury", 8000))

# ---- Hotels - Goa ----
cursor.execute("INSERT INTO hotel_costs (city, hotel_type, avg_cost) VALUES (?, ?, ?)", ("goa", "budget", 2000))
cursor.execute("INSERT INTO hotel_costs (city, hotel_type, avg_cost) VALUES (?, ?, ?)", ("goa", "midrange", 5000))
cursor.execute("INSERT INTO hotel_costs (city, hotel_type, avg_cost) VALUES (?, ?, ?)", ("goa", "luxury", 15000))

# ---- Hotels - Hyderabad ----
cursor.execute("INSERT INTO hotel_costs (city, hotel_type, avg_cost) VALUES (?, ?, ?)", ("hyderabad", "budget", 1100))
cursor.execute("INSERT INTO hotel_costs (city, hotel_type, avg_cost) VALUES (?, ?, ?)", ("hyderabad", "midrange", 3200))
cursor.execute("INSERT INTO hotel_costs (city, hotel_type, avg_cost) VALUES (?, ?, ?)", ("hyderabad", "luxury", 9000))

# ---- Food ----
cursor.execute("INSERT INTO food_costs (city, avg_daily_cost) VALUES (?, ?)", ("delhi", 700))
cursor.execute("INSERT INTO food_costs (city, avg_daily_cost) VALUES (?, ?)", ("jaipur", 500))
cursor.execute("INSERT INTO food_costs (city, avg_daily_cost) VALUES (?, ?)", ("goa", 1200))
cursor.execute("INSERT INTO food_costs (city, avg_daily_cost) VALUES (?, ?)", ("chennai", 650))
cursor.execute("INSERT INTO food_costs (city, avg_daily_cost) VALUES (?, ?)", ("hyderabad", 750))


# ---- Activities - Delhi ----
cursor.execute("INSERT INTO activity_costs (city, activity, avg_cost) VALUES (?, ?, ?)", ("delhi", "red fort", 50))
cursor.execute("INSERT INTO activity_costs (city, activity, avg_cost) VALUES (?, ?, ?)", ("delhi", "india gate", 0))

# ---- Activities - Jaipur ----
cursor.execute("INSERT INTO activity_costs (city, activity, avg_cost) VALUES (?, ?, ?)", ("jaipur", "amber fort", 100))
cursor.execute("INSERT INTO activity_costs (city, activity, avg_cost) VALUES (?, ?, ?)", ("jaipur", "hawa mahal", 50))

# ---- Activities - Goa ----
cursor.execute("INSERT INTO activity_costs (city, activity, avg_cost) VALUES (?, ?, ?)", ("goa", "beach water sports", 1500))
cursor.execute("INSERT INTO activity_costs (city, activity, avg_cost) VALUES (?, ?, ?)", ("goa", "dudhsagar falls", 200))

# ---- Activities - Hyderabad ----
cursor.execute("INSERT INTO activity_costs (city, activity, avg_cost) VALUES (?, ?, ?)", ("hyderabad", "charminar", 30))
cursor.execute("INSERT INTO activity_costs (city, activity, avg_cost) VALUES (?, ?, ?)", ("hyderabad", "golconda fort", 50))


# Commit and close
conn.commit()
conn.close()

print("✅ Database updated with sample cost data (mumbai, bangalore, agra)!")
