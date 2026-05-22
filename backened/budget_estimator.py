# budget_estimator.py

METRO_CITIES = [
    "mumbai", "delhi", "bangalore", "bengaluru", "hyderabad",
    "chennai", "kolkata", "pune", "ahmedabad", "surat"
]

TIER2_CITIES = [
    "jaipur", "lucknow", "kanpur", "nagpur", "indore", "bhopal",
    "visakhapatnam", "patna", "vadodara", "agra", "nashik",
    "amritsar", "varanasi", "coimbatore", "jodhpur", "madurai",
    "kochi", "chandigarh", "goa", "panaji", "rajkot"
]

HOTEL_RATES = {
    "metro": {"budget": 1200, "standard": 3500, "luxury": 9000},
    "tier2": {"budget": 800,  "standard": 2200, "luxury": 5500},
    "tier3": {"budget": 600,  "standard": 1500, "luxury": 3500},
}

FOOD_RATES = {
    "metro": {"budget": 600,  "standard": 1200, "luxury": 2500},
    "tier2": {"budget": 400,  "standard": 800,  "luxury": 1800},
    "tier3": {"budget": 300,  "standard": 600,  "luxury": 1400},
}

ACTIVITY_RATES = {
    "metro": {"budget": 300, "standard": 800,  "luxury": 2000},
    "tier2": {"budget": 200, "standard": 600,  "luxury": 1500},
    "tier3": {"budget": 150, "standard": 400,  "luxury": 1200},
}

TRANSPORT_COSTS = {
    "agra|mumbai":           5000,
    "agra|delhi":            800,
    "agra|jaipur":           700,
    "agra|lucknow":          900,
    "bangalore|chennai":     1500,
    "bangalore|goa":         2000,
    "bangalore|hyderabad":   1200,
    "bangalore|mumbai":      2500,
    "bangalore|pune":        2000,
    "chennai|hyderabad":     1200,
    "chennai|kolkata":       3500,
    "chennai|mumbai":        3000,
    "delhi|jaipur":          800,
    "delhi|lucknow":         1200,
    "delhi|mumbai":          3000,
    "delhi|varanasi":        1500,
    "delhi|amritsar":        1200,
    "delhi|chandigarh":      800,
    "goa|mumbai":            1500,
    "goa|pune":              1200,
    "hyderabad|mumbai":      2500,
    "hyderabad|pune":        1800,
    "jaipur|mumbai":         2500,
    "kolkata|mumbai":        4000,
    "kolkata|patna":         1000,
    "lucknow|varanasi":      700,
    "mumbai|pune":           800,
    "mumbai|nashik":         700,
    "mumbai|ahmedabad":      1500,
    "chennai|coimbatore":    900,
    "chennai|madurai":       1000,
    "kochi|bangalore":       1800,
    "kochi|chennai":         1500,
}

def get_city_tier(city):
    city = city.lower().strip()
    if city in METRO_CITIES:
        return "metro"
    elif city in TIER2_CITIES:
        return "tier2"
    else:
        return "tier3"

def get_transport_cost(source, destination):
    src = source.lower().strip()
    dst = destination.lower().strip()

    if src == dst:
        return 0

    key = "|".join(sorted([src, dst]))
    if key in TRANSPORT_COSTS:
        return TRANSPORT_COSTS[key]

    # Fallback by tier
    tier_base = {
        ("metro", "metro"):  3000,
        ("metro", "tier2"):  2000,
        ("metro", "tier3"):  1500,
        ("tier2", "metro"):  2000,
        ("tier2", "tier2"):  1200,
        ("tier2", "tier3"):  900,
        ("tier3", "metro"):  1500,
        ("tier3", "tier2"):  900,
        ("tier3", "tier3"):  700,
    }
    return tier_base.get((get_city_tier(src), get_city_tier(dst)), 1500)

def estimate_budget(source, destination, days, hotel_type):
    hotel_type = hotel_type.lower().strip()
    if hotel_type not in ["budget", "standard", "luxury"]:
        hotel_type = "standard"

    days      = max(1, int(days))
    dest_tier = get_city_tier(destination)

    transport  = get_transport_cost(source, destination)
    hotel      = HOTEL_RATES[dest_tier][hotel_type] * days
    food       = FOOD_RATES[dest_tier][hotel_type] * days
    activities = ACTIVITY_RATES[dest_tier][hotel_type] * days
    total      = transport + hotel + food + activities

    return {
        "source":               source.title(),
        "destination":          destination.title(),
        "days":                 days,
        "hotel_type":           hotel_type.title(),
        "destination_tier":     dest_tier,
        "total_estimated_cost": total,
        "breakdown": {
            "transport":  transport,
            "hotel":      hotel,
            "food":       food,
            "activities": activities,
        }
    }