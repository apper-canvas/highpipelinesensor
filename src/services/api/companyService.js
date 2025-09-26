import companiesData from "@/services/mockData/companies.json";

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class CompanyService {
    constructor() {
        this.companies = [...companiesData];
    }

    async getAll() {
        await delay(300);
        return [...this.companies];
    }

    async getById(id) {
        await delay(200);
        const company = this.companies.find(c => c.Id === parseInt(id));
        if (!company) {
            throw new Error("Company not found");
        }
        return { ...company };
    }

    async create(companyData) {
        await delay(400);
        const newCompany = {
            Id: Math.max(...this.companies.map(c => c.Id)) + 1,
            ...companyData,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        this.companies.push(newCompany);
        return { ...newCompany };
    }

    async update(id, companyData) {
        await delay(350);
        const index = this.companies.findIndex(c => c.Id === parseInt(id));
        if (index === -1) {
            throw new Error("Company not found");
        }
        this.companies[index] = {
            ...this.companies[index],
            ...companyData,
            updatedAt: new Date().toISOString()
        };
        return { ...this.companies[index] };
    }

    async delete(id) {
        await delay(250);
        const index = this.companies.findIndex(c => c.Id === parseInt(id));
        if (index === -1) {
            throw new Error("Company not found");
        }
        const deleted = this.companies.splice(index, 1);
        return deleted[0];
    }
}

export const companyService = new CompanyService();