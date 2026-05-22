import sqlite3

# Function to connect to SQLite database and fetch data
def check_database(db_name):
    # Connect to SQLite database
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()

    print(f"\n📊 Connected to {db_name} database\n")

    # Query to get all tables in the database
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()

    # Print all tables
    print("🔎 Tables in database:")
    for table in tables:
        print(f"- {table[0]}")

    # Query and print all rows in 'user' table
    cursor.execute("SELECT * FROM user")
    users = cursor.fetchall()

    print(f"\n🧑‍💻 User Data:")
    for user in users:
        print(f"User ID: {user[0]}, Email: {user[1]}, Password: {user[2]}")

    # Query and print all rows in 'itinerary' table
    cursor.execute("SELECT * FROM itinerary")
    itineraries = cursor.fetchall()

    print(f"\n📝 Itinerary Data:")
    for itinerary in itineraries:
        print(f"ID: {itinerary[0]}, User ID: {itinerary[1]}, Destination: {itinerary[2]}, Days: {itinerary[3]}")

    # Close connection
    conn.close()

# Run the function for both databases
check_database("instance/tripplanner.db")
check_database("instance/users.db")
