import sqlite3

def check_table_structure(db_path, table_name):
    """Check the structure of a table in the database"""
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    try:
        # Get table structure
        cursor.execute(f"PRAGMA table_info({table_name})")
        columns = cursor.fetchall()
        
        print(f"\n📋 Table structure for '{table_name}' in {db_path}:")
        for col in columns:
            print(f"  - {col[1]} ({col[2]}) - PK: {col[5]}")
            
        # Get row count
        cursor.execute(f"SELECT COUNT(*) FROM {table_name}")
        count = cursor.fetchone()[0]
        print(f"  Rows: {count}")
        
    except sqlite3.Error as e:
        print(f"❌ Error checking {table_name}: {e}")
    finally:
        conn.close()

# Check both databases
print("🔍 Checking database structures...")

# Check tripplanner.db tables
check_table_structure("instance/tripplanner.db", "user")
check_table_structure("instance/tripplanner.db", "itinerary")

# Check users.db tables  
check_table_structure("instance/users.db", "user")
check_table_structure("instance/users.db", "itinerary")