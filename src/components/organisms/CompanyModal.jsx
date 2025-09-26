import { useState, useEffect } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import FormField from "@/components/molecules/FormField";
import { companyService } from "@/services/api/companyService";
import { toast } from "react-toastify";

const CompanyModal = ({ company, onClose, onSave }) => {
    const [formData, setFormData] = useState({
        name: "",
        industry: "",
        size: "Small",
        website: "",
        phone: "",
        address: "",
        notes: ""
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const sizes = ["Small", "Medium", "Large", "Enterprise"];

    useEffect(() => {
        if (company) {
            setFormData({
                name: company.name || "",
                industry: company.industry || "",
                size: company.size || "Small",
                website: company.website || "",
                phone: company.phone || "",
                address: company.address || "",
                notes: company.notes || ""
            });
        }
    }, [company]);

    const validate = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Company name is required";
        if (!formData.industry.trim()) newErrors.industry = "Industry is required";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            setLoading(true);
            if (company) {
                await companyService.update(company.Id, formData);
                toast.success("Company updated successfully");
            } else {
                await companyService.create(formData);
                toast.success("Company created successfully");
            }
            onSave();
            onClose();
        } catch (err) {
            toast.error("Failed to save company");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {company ? "Edit Company" : "Add New Company"}
                            </h3>
                            <Button variant="ghost" size="sm" onClick={onClose}>
                                <ApperIcon name="X" className="w-5 h-5" />
                            </Button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <FormField
                                label="Company Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                error={errors.name}
                                required
                                placeholder="Enter company name..."
                            />

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormField
                                    label="Industry"
                                    name="industry"
                                    value={formData.industry}
                                    onChange={handleChange}
                                    error={errors.industry}
                                    required
                                    placeholder="e.g. Technology, Healthcare"
                                />
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Company Size <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        name="size"
                                        value={formData.size}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
                                    >
                                        {sizes.map(size => (
                                            <option key={size} value={size}>
                                                {size}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <FormField
                                label="Website"
                                name="website"
                                type="url"
                                value={formData.website}
                                onChange={handleChange}
                                error={errors.website}
                                placeholder="https://example.com"
                            />

                            <FormField
                                label="Phone"
                                name="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange}
                                error={errors.phone}
                                placeholder="+1 (555) 123-4567"
                            />

                            <FormField
                                label="Address"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                error={errors.address}
                                placeholder="Enter company address..."
                            />

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Notes
                                </label>
                                <textarea
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200"
                                    placeholder="Add any notes about this company..."
                                />
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <Button type="button" variant="outline" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={loading}>
                                    {loading ? "Saving..." : company ? "Update Company" : "Add Company"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyModal;