import sqlite3
import os
from datetime import datetime

def migrate_users_and_itineraries():
    """Migrate users and itineraries from users.db to tripplanner.db"""
    
    print("🔄 Starting database migration...")
    
    # Connect to both databases
    source_conn = sqlite3.connect('instance/users.db')
    target_conn = sqlite3.connect('instance/tripplanner.db')
    
    source_cursor = source_conn.cursor()
    target_cursor = target_conn.cursor()
    
    try:
        # 1. Create user table in tripplanner.db if it doesn't exist
        target_cursor.execute('''
            CREATE TABLE IF NOT EXISTS user (
                id INTEGER PRIMARY KEY,
                email VARCHAR(120) UNIQUE NOT NULL,
                password VARCHAR(200) NOT NULL
            )
        ''')
        
        # 2. Create itinerary table in tripplanner.db if it doesn't exist
        target_cursor.execute('''
            CREATE TABLE IF NOT EXISTS itinerary (
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
                trip_title VARCHAR(200),
                trip_status VARCHAR(20) DEFAULT 'upcoming',
                created_at DATETIME,
                FOREIGN KEY (user_email) REFERENCES user (email)
            )
        ''')
        
        # 3. Migrate users
        source_cursor.execute("SELECT * FROM user")
        users = source_cursor.fetchall()
        
        print(f"📦 Migrating {len(users)} users...")
        for user in users:
            try:
                target_cursor.execute(
                    "INSERT OR IGNORE INTO user (id, email, password) VALUES (?, ?, ?)",
                    user
                )
            except sqlite3.IntegrityError:
                print(f"⚠️  User {user[1]} already exists, skipping...")
        
        # 4. Migrate itineraries
        source_cursor.execute("SELECT * FROM itinerary")
        itineraries = source_cursor.fetchall()
        
        print(f"📦 Migrating {len(itineraries)} itineraries...")
        for itinerary in itineraries:
            try:
                target_cursor.execute('''
                    INSERT OR IGNORE INTO itinerary 
                    (id, user_email, destination, days, budget, interests, plan_json, 
                     start_date, end_date, travel_days, experience_days, trip_title, trip_status, created_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ''', itinerary)
            except sqlite3.IntegrityError:
                print(f"⚠️  Itinerary {itinerary[0]} already exists, skipping...")
        
        # 5. Commit changes
        target_conn.commit()
        print("✅ Migration completed successfully!")
        
        # 6. Verify migration
        target_cursor.execute("SELECT COUNT(*) FROM user")
        user_count = target_cursor.fetchone()[0]
        
        target_cursor.execute("SELECT COUNT(*) FROM itinerary")
        itinerary_count = target_cursor.fetchone()[0]
        
        print(f"📊 Verification: {user_count} users, {itinerary_count} itineraries in target database")
        
    except Exception as e:
        print(f"❌ Migration failed: {e}")
        target_conn.rollback()
    finally:
        source_conn.close()
        target_conn.close()

if __name__ == "__main__":
    migrate_users_and_itineraries()