
// // utils/placeUtils.js
// // Common keywords that indicate a place follows
// const KNOWN_PLACE_KEYWORDS = [
//   " in ",
//   " at ",
//   " near ",
//   " to ",
//   " into ",
//   " explore ",
//   " visit ",
//   " located in ",
//   " around ",
//   " towards ",
//   " on ",
// ];

// // Extract short place name from activity (string OR object)
// export function extractPlaceName(activity) {
//   if (!activity) return null;

//   // Support both string and structured object
//   const text =
//     typeof activity === "string"
//       ? activity
//       : activity.description || activity.title || "";

//   if (!text) return null;

//   const lower = text.toLowerCase();

//   // 1️⃣ Try to match with known keywords
//   for (let keyword of KNOWN_PLACE_KEYWORDS) {
//     if (lower.includes(keyword)) {
//       const parts = text.split(new RegExp(keyword, "i"));
//       if (parts[1]) {
//         // take the chunk after keyword → stop at first punctuation/comma
//         const place = parts[1].split(/[.,-]/)[0].trim();
//         if (place && place.length > 2) return capitalizeWords(place);
//       }
//     }
//   }

//   // 2️⃣ Fallback: try last 2 words (common for "Old Manali", "Agra Fort")
//   const words = text.trim().split(" ");
//   if (words.length >= 2) {
//     const lastTwo = words.slice(-2).join(" ");
//     if (lastTwo.length > 3) return capitalizeWords(lastTwo);
//   }

//   // 3️⃣ Fallback: return first word (title-based if available)
//   if (typeof activity === "object" && activity.title) {
//     return capitalizeWords(activity.title.split(" ")[0]);
//   }

//   const firstWord = words[0];
//   if (firstWord && firstWord.length > 2) {
//     return capitalizeWords(firstWord);
//   }

//   return null;
// }

// function capitalizeWords(str) {
//   return str.replace(/\b\w/g, (c) => c.toUpperCase());
// }






// // Common keywords that indicate a place follows
// const KNOWN_PLACE_KEYWORDS = [
//   " in ",
//   " at ",
//   " near ",
//   " to ",
//   " into ",
//   " explore ",
//   " visit ",
//   " located in ",
//   " around ",
//   " towards ",
//   " on ",
// ];

// // Extract short place name from activity description/title
// export function extractPlaceName(activity) {
//   if (!activity) return null;

//   // ✅ If activity is an object, prefer .title, fallback to .description
//   const description =
//     typeof activity === "string"
//       ? activity
//       : activity.title || activity.description || "";

//   if (!description || typeof description !== "string") return null;

//   const text = description.toLowerCase();

//   // 1️⃣ Try to match with known keywords
//   for (let keyword of KNOWN_PLACE_KEYWORDS) {
//     if (text.includes(keyword)) {
//       const parts = description.split(new RegExp(keyword, "i"));
//       if (parts[1]) {
//         // take the chunk after keyword → stop at first punctuation/comma
//         const place = parts[1].split(/[.,-]/)[0].trim();
//         if (place && place.length > 2) return capitalizeWords(place);
//       }
//     }
//   }

//   // 2️⃣ Fallback: try last 2 words (common for "Old Manali", "Agra Fort")
//   const words = description.trim().split(" ");
//   if (words.length >= 2) {
//     const lastTwo = words.slice(-2).join(" ");
//     if (lastTwo.length > 3) return capitalizeWords(lastTwo);
//   }

//   // 3️⃣ Fallback: return first word if it's meaningful
//   const firstWord = words[0];
//   if (firstWord && firstWord.length > 2) {
//     return capitalizeWords(firstWord);
//   }

//   return null;
// }

// function capitalizeWords(str) {
//   return str.replace(/\b\w/g, (c) => c.toUpperCase());
// }



// Common keywords that indicate a place follows
const KNOWN_PLACE_KEYWORDS = [
  " in ",
  " at ",
  " near ",
  " to ",
  " into ",
  " explore ",
  " visit ",
  " located in ",
  " around ",
  " towards ",
  " on ",
];

// Extract short place name from activity description/title
export function extractPlaceName(activity) {
  if (!activity) return null;

  // ✅ If activity is an object, prefer .title, fallback to .description
  const description =
    typeof activity === "string"
      ? activity
      : activity.title || activity.description || "";

  if (!description || typeof description !== "string") return null;

  const text = description.toLowerCase();

  // 1️⃣ Try to match with known keywords
  for (let keyword of KNOWN_PLACE_KEYWORDS) {
    if (text.includes(keyword)) {
      const parts = description.split(new RegExp(keyword, "i"));
      if (parts[1]) {
        // take the chunk after keyword → stop at first punctuation/comma
        const place = parts[1].split(/[.,-]/)[0].trim();
        if (place && place.length > 2) return capitalizeWords(place);
      }
    }
  }

  // 2️⃣ Fallback: try last 2 words (common for "Old Manali", "Agra Fort")
  const words = description.trim().split(" ");
  if (words.length >= 2) {
    const lastTwo = words.slice(-2).join(" ");
    if (lastTwo.length > 3) return capitalizeWords(lastTwo);
  }

  // 3️⃣ Fallback: return first word if it's meaningful
  const firstWord = words[0];
  if (firstWord && firstWord.length > 2) {
    return capitalizeWords(firstWord);
  }

  return null;
}

function capitalizeWords(str) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}
