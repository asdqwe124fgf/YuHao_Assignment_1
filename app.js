const aworld = require("./Yuhao_AWorld_Ewasterecycling.js");

console.log("--- A: Activity tracker ---");
console.log(aworld.logActivity("U001", "cycling"));
console.log(aworld.logActivity("U001", "unknown activity"));          // unknown activity
console.log(aworld.logActivity("U003", "cycling"));                  // user not found

console.log("--- B: Recycling tracker ---");
console.log(aworld.logRecycling("U001", "plastic", 5));
console.log(aworld.logRecycling("U001", "furniture", 20));           // not accepted
console.log(aworld.logRecycling("U001", "plastic", 50));             // over quota

console.log("--- C: Adding Challenge to do ---");
console.log(aworld.joinChallenge("U001", "Pedal Power"));

console.log("--- D: Challenge Progress ---")
console.log(aworld.updateChallengeProgress("U001", "Plastic-Free Week", 1));  // 6/7
console.log(aworld.updateChallengeProgress("U001", "Plastic-Free Week", 1));  // 7/7 -> bonus

console.log("--- E: Redeem Rewards ---");
console.log(aworld.redeemReward("U002", "Reusable Water Bottle"));
console.log(aworld.redeemReward("U002", "Plant a Tree Donation"));   // not enough points
console.log(aworld.redeemReward("U002", "Free Car"));                // unknown reward