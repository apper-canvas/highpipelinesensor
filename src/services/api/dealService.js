import dealsData from "@/services/mockData/deals.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class DealService {
    constructor() {
        this.deals = [...dealsData];
    }

    async getAll() {
        await delay(300);
        return [...this.deals];
    }

    async getById(id) {
        await delay(200);
        const deal = this.deals.find(d => d.Id === parseInt(id));
        if (!deal) {
            throw new Error("Deal not found");
        }
        return { ...deal };
    }

    async create(dealData) {
        await delay(400);
        const newDeal = {
            Id: Math.max(...this.deals.map(d => d.Id)) + 1,
            ...dealData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        this.deals.push(newDeal);
        return { ...newDeal };
    }

    async update(id, dealData) {
        await delay(350);
        const index = this.deals.findIndex(d => d.Id === parseInt(id));
        if (index === -1) {
            throw new Error("Deal not found");
        }
        this.deals[index] = {
            ...this.deals[index],
            ...dealData,
            updatedAt: new Date().toISOString()
        };
        return { ...this.deals[index] };
    }

    async delete(id) {
        await delay(250);
        const index = this.deals.findIndex(d => d.Id === parseInt(id));
        if (index === -1) {
            throw new Error("Deal not found");
        }
        const deleted = this.deals.splice(index, 1);
        return deleted[0];
    }
}

export const dealService = new DealService();