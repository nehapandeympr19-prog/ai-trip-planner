import sqlite3
import os

def fixed_migration():
    print("🔄 Starting fixed database migration...")
    
    # Connect to both databases
    source_conn = sqlite3.connect('instance/users.db')
    target_conn = sqlite3.connect('instance/tripplanner.db')
    
    source_cursor = source_conn.cursor()
    target_cursor = target_conn.cursor()
    
    try:
        # 1. DROP existing tables in target database (clean slate)
        print("🗑️  Removing old table structures...")
        target_cursor.execute("DROP TABLE IF EXISTS itinerary")
        target_cursor.execute("DROP TABLE IF EXISTS user")
        
        # 2. Create user table (same structure as users.db)
        print("📦 Creating user table...")
        target_cursor.execute('''
            CREATE TABLE user (
                id INTEGER PRIMARY KEY,
                email VARCHAR(120) UNIQUE NOT NULL,
                password VARCHAR(200) NOT NULL
            )
        ''')
        
        # 3. Create itinerary table with user_email (same structure as users.db)
        print("📦 Creating itinerary table...")
        target_cursor.execute('''
            CREATE TABLE itinerary (
                id INTEGER PRIMARY KEY,
                user_email VARCHAR(120) NOT NULL,
                destination VARCHAR(120) NOT NULL,
                days INTEGER NOT NULL,
                budget VARCHAR(50) NOT NULL,
                interests VARCHAR(250) NOT NULL,
                plan_json TEXT NOT NULL,
                start_date VARCHAR(20),
                end_date VARCHAR(20),
                travel_days INTEGER,
                experience_days INTEGER,
                created_at DATETIME
            )
        ''')
        
        # 4. Migrate users
        source_cursor.execute("SELECT * FROM user")
        users = source_cursor.fetchall()
        
        print(f"👥 Migrating {len(users)} users...")
        for user in users:
            target_cursor.execute(
                "INSERT INTO user (id, email, password) VALUES (?, ?, ?)",
                user
            )
            print(f"   → User: {user[1]}")
        
        # 5. Migrate itineraries
        source_cursor.execute("SELECT * FROM itinerary")
        itineraries = source_cursor.fetchall()
        
        print(f"🗺️  Migrating {len(itineraries)} itineraries...")
        for itinerary in itineraries:
            target_cursor.execute('''
                INSERT INTO itinerary 
                (id, user_email, destination, days, budget, interests, plan_json, 
                 start_date, end_date, travel_days, experience_days, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ''', itinerary)
            print(f"   → Itinerary {itinerary[0]}: {itinerary[2]} for {itinerary[1]}")
        
        # 6. Commit changes
        target_conn.commit()
        print("✅ Migration completed successfully!")
        
        # 7. Verify
        target_cursor.execute("SELECT COUNT(*) FROM user")
        user_count = target_cursor.fetchone()[0]
        
        target_cursor.execute("SELECT COUNT(*) FROM itinerary")
        itinerary_count = target_cursor.fetchone()[0]
        
        print(f"📊 Final counts: {user_count} users, {itinerary_count} itineraries")
        
        # 8. Verify relationships
        print("\n🔗 Testing relationships...")
        target_cursor.execute('''
            SELECT u.email, COUNT(i.id) 
            FROM user u 
            LEFT JOIN itinerary i ON u.email = i.user_email 
            GROUP BY u.email
        ''')
        user_itineraries = target_cursor.fetchall()
        
        for email, count in user_itineraries:
            print(f"   → {email}: {count} itineraries")
        
    except Exception as e:
        print(f"❌ Migration failed: {e}")
        target_conn.rollback()
        raise
    finally:
        source_conn.close()
        target_conn.close()

if __name__ == "__main__":
    fixed_migration()