module.exports = {

    // Dummy data (simulated database): each user holds their own records
    users: [
        {
            userId: "U001",
            name: "Alicia Tan",
            points: 420,
            activities: [
                { type: "public_transport", carbonSavedKg: 2.4, points: 20 }
            ],
            recycling: [
                { item: "laptop", weightKg: 2.5, status: "accepted" }
            ],
            challenges: [
                { name: "Plastic-Free Week", progress: 5, target: 7, completed: false }
            ],
            redemptions: [
                { reward: "Reusable Shopping Bag", pointsUsed: 80 }
            ]
        },
        {
            userId: "U002",
            name: "Ben Lim",
            points: 650,
            activities: [
                { type: "cycling", carbonSavedKg: 2.6, points: 30 },
                { type: "meat_free_meal", carbonSavedKg: 1.5, points: 15 }
            ],
            recycling: [
                { item: "plastic", weightKg: 3, status: "accepted" },
                { item: "paper", weightKg: 4, status: "accepted" }
            ],
            challenges: [
                { name: "Pedal Power", progress: 3, target: 5, completed: false }
            ],
            redemptions: []
        }
    ],

    // Points and CO2 saved for each activity
    activityRules: {
        cycling:           { carbonSavedKg: 2.6, points: 30 },
        public_transport:  { carbonSavedKg: 2.4, points: 20 },
        meat_free_meal:    { carbonSavedKg: 1.5, points: 15 },
        air_dried_laundry: { carbonSavedKg: 0.7, points: 8 },
        reusable_bag:      { carbonSavedKg: 0.1, points: 3 }
    },

    // Points per kg, CO2 saved per kg, and the most kg a user can recycle of each item
    recyclingRules: {
        laptop:  { pointsPerKg: 25, carbonSavedPerKg: 2.0, quotaKg: 10 },
        battery: { pointsPerKg: 30, carbonSavedPerKg: 2.5, quotaKg: 5 },
        plastic: { pointsPerKg: 10, carbonSavedPerKg: 1.5, quotaKg: 20 },
        paper:   { pointsPerKg: 5,  carbonSavedPerKg: 0.9, quotaKg: 40 },
        glass:   { pointsPerKg: 8,  carbonSavedPerKg: 0.3, quotaKg: 30 },
        metal:   { pointsPerKg: 12, carbonSavedPerKg: 4.0, quotaKg: 20 }
    },

    // Target and bonus points for each challenge
    challengeRules: {
        "Plastic-Free Week": { target: 7,  bonusPoints: 100 },
        "Pedal Power":       { target: 5,  bonusPoints: 100 },
        "Recycle Champion":  { target: 10, bonusPoints: 150 }
    },

    // Points needed for each reward
    rewardCosts: {
        "Reusable Shopping Bag": 80,
        "Reusable Water Bottle": 300,
        "$5 Eco-Store Voucher": 500,
        "Plant a Tree Donation": 800
    },

    // Finds a user by id (returns null if not found)
    findUser(userId) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i].userId === userId) {
                return this.users[i];
            }
        }
        return null;
    },

    // Activity tracker: records a sustainable activity and adds its points to the user
    // Function A
    logActivity(userId, type) {
        let user = this.findUser(userId);
        if (user === null) {
            return "User not found.";
        }
        let rule = this.activityRules[type];
        if (rule === undefined) {
            return "Unknown activity.";
        }
        user.activities.push({
            type: type,
            carbonSavedKg: rule.carbonSavedKg,
            points: rule.points
        });
        user.points = user.points + rule.points;
        return "Activity logged. Total points: " + user.points;
    },

    // Recycling tracker: checks the item is accepted and within the user's quota,
    // then records the recycling and adds points based on the weight
    // Function B
    logRecycling(userId, item, weightKg) {
        let user = this.findUser(userId);
        if (user === null) {
            return "User not found.";
        }
        let rule = this.recyclingRules[item];
        if (rule === undefined) {
            return "This item is not accepted.";
        }
        let usedKg = 0;
        for (let i = 0; i < user.recycling.length; i++) {
            if (user.recycling[i].item === item) {
                usedKg = usedKg + user.recycling[i].weightKg;
            }
        }
        if (usedKg + weightKg > rule.quotaKg) {
            return "Quota exceeded. You can only recycle " + (rule.quotaKg - usedKg) + "kg more " + item + ".";
        }
        let pointsEarned = weightKg * rule.pointsPerKg;
        user.recycling.push({ item: item, weightKg: weightKg, status: "accepted" });
        user.points = user.points + pointsEarned;
        return "Recycling logged. Points earned: " + pointsEarned;
    },

    // Adding Challenge to do: adds a new challenge (with 0 progress) to the user
    // Function C
    joinChallenge(userId, name) {
        let user = this.findUser(userId);
        if (user === null) {
            return "User not found.";
        }
        let rule = this.challengeRules[name];
        if (rule === undefined) {
            return "Challenge not found.";
        }
        for (let i = 0; i < user.challenges.length; i++) {
            if (user.challenges[i].name === name) {
                return "You have already joined this challenge.";
            }
        }
        user.challenges.push({ name: name, progress: 0, target: rule.target, completed: false });
        return "Joined " + name + ". Goal: " + rule.target;
    },

    // Challenge Progress: adds to the progress and gives bonus points once the target is reached
    // Function D
    updateChallengeProgress(userId, name, amount) {
        let user = this.findUser(userId);
        if (user === null) {
            return "User not found.";
        }
        let challenge = null;
        for (let i = 0; i < user.challenges.length; i++) {
            if (user.challenges[i].name === name) {
                challenge = user.challenges[i];
                break;
            }
        }
        if (challenge === null) {
            return "You have not joined this challenge.";
        }
        if (challenge.completed === true) {
            return "Challenge already completed.";
        }
        challenge.progress = challenge.progress + amount;
        if (challenge.progress >= challenge.target) {
            challenge.progress = challenge.target;
            challenge.completed = true;
            user.points = user.points + this.challengeRules[name].bonusPoints;
            return "Challenge completed! Bonus points: " + this.challengeRules[name].bonusPoints;
        }
        return "Progress: " + challenge.progress + "/" + challenge.target;
    },

    // Rewards claim: checks the user has enough points and deducts them to redeem a reward
    // Function E
    redeemReward(userId, reward) {
        let user = this.findUser(userId);
        if (user === null) {
            return "User not found.";
        }
        let cost = this.rewardCosts[reward];
        if (cost === undefined) {
            return "Reward not found.";
        }
        if (user.points < cost) {
            return "Not enough points. You have " + user.points + " but need " + cost + ".";
        }
        user.points = user.points - cost;
        user.redemptions.push({ reward: reward, pointsUsed: cost });
        return "Redeemed " + reward + " successfully!";
    }

};