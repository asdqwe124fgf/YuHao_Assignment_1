# AWorld
This node.js module simulates an E-Waste Recycling system for AWorld

Based on the [AWorld](https://www.aworld.org/) app, a UN-backed platform that helps people track and reduce their environmental footprint and take climate actions.

## Files

| File | Purpose |
|---|---|
| `Yuhao_AWorld_Ewasterecycling.js` | The node module. Contains the dummy data (users and their records), the rules, and the functions below. |
| `app.js` | A demo app that requires `Yuhao_AWorld_Ewasterecycling.js` and calls every function. This is the file you start. |

## How to run

```
nodemon app
```

No packages need to be installed.

## Data set

The dummy data is the `users` array in `Yuhao_AWorld_Ewasterecycling.js`. Each user holds their own records:

```javascript
{
  userId: "U001",
            name: "Alicia Tan",
            points: 420,
            activities: [
                { type, carbonSavedKg, points}
            ],
            recycling: [
                { item, weightKg, status}
            ],
            challenges: [
                { name, progress, target, completed}
            ],
            redemptions: [
                { reward, pointsUsed}
            ]
}
```

## Functions

| Feature | Function | Description |
|---|---|---|
| Activity Tracker | `logActivity(userId, type)` | Logs a sustainable activity (e.g. `cycling`), records the CO2 saved and awards points. |
| Recycling Manager | `logRecycling(userId, item, weightKg)` | Logs an item for recycling. Checks the item is accepted and within the user's quota, then awards points by weight. Items that are not accepted are refused. |
| Challenge Manager | `joinChallenge(userId, name)` | Joins a challenge such as `Plastic-Free Week`. |
| Challenge Manager | `updateChallengeProgress(userId, name, amount)` | Adds to challenge progress. Completing a challenge awards bonus points once. |
| Rewards Manager | `redeemReward(userId, reward)` | Redeems a reward if the user has enough points, deducting the points. |

Every function returns a short message, so errors such as an unknown user or not enough points are reported instead of crashing.

## Example

```javascript
const aworld = require("./Yuhao_AWorld_Ewasterecycling.js");

// Activity tracker
console.log(aworld.logActivity("U001", "cycling"));

// Recycling tracker
console.log(aworld.logRecycling("U001", "plastic", 5));

// Adding challenges
console.log(aworld.joinChallenge("U001", "Pedal Power"));

// Challenge progress
console.log(aworld.updateChallengeProgress("U001", "Plastic-Free Week", 1));

// Redeem Rewards
console.log(aworld.redeemReward("U002", "Reusable Water Bottle"));
```

## Declaration of AI Use

Generative AI was used to:

- generate ideas for the module's functions (activity tracker, recycling tracker, adding challenges, challenge progress and rewards management)
- generate mock (dummy) data used to simulate the database in `Yuhao_AWorld_Ewasterecycling.js`.

## References

- AWorld: https://www.aworld.org/
- Github README: https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax