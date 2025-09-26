import activitiesData from "@/services/mockData/activities.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class ActivityService {
    constructor() {
        this.activities = [...activitiesData];
    }

    async getAll() {
        await delay(300);
        // Sort by timestamp descending (newest first)
        return [...this.activities].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }

    async getById(id) {
        await delay(200);
        const activity = this.activities.find(a => a.Id === parseInt(id));
        if (!activity) {
            throw new Error("Activity not found");
        }
        return { ...activity };
    }

    async create(activityData) {
        await delay(400);
        const newActivity = {
            Id: Math.max(...this.activities.map(a => a.Id)) + 1,
            ...activityData,
            timestamp: new Date().toISOString()
        };
        this.activities.push(newActivity);
        return { ...newActivity };
    }

    async update(id, activityData) {
        await delay(350);
        const index = this.activities.findIndex(a => a.Id === parseInt(id));
        if (index === -1) {
            throw new Error("Activity not found");
        }
        this.activities[index] = {
            ...this.activities[index],
            ...activityData
        };
        return { ...this.activities[index] };
    }

    async delete(id) {
        await delay(250);
        const index = this.activities.findIndex(a => a.Id === parseInt(id));
        if (index === -1) {
            throw new Error("Activity not found");
        }
        const deleted = this.activities.splice(index, 1);
        return deleted[0];
    }
}

export const activityService = new ActivityService();