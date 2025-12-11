
export const DEPARTMENTS = [
    "Engineering",
    "Design",
    "Product Management",
    "Marketing",
    "Sales",
    "Customer Support",
    "Human Resources",
    "Finance",
    "Legal",
    "Operations",
    "Data Science",
    "Information Technology",
    "Business Development",
    "Administration",
    "Research & Development",
    "Quality Assurance",
] as const;

export const COUNTRIES = [
    "United States", "United Kingdom", "Canada", "Germany", "France", "Australia",
    "India", "China", "Japan", "Brazil", "Mexico", "Russia", "South Korea",
    "Italy", "Spain", "Netherlands", "Switzerland", "Sweden", "Poland",
    "Belgium", "Austria", "Norway", "Denmark", "Finland", "Ireland",
    "New Zealand", "Singapore", "United Arab Emirates", "Saudi Arabia",
    "South Africa", "Egypt", "Turkey", "Thailand", "Vietnam", "Indonesia",
    "Malaysia", "Philippines", "Pakistan", "Bangladesh", "Argentina", "Chile",
    "Colombia", "Peru", "Portugal", "Greece", "Czech Republic", "Hungary",
    "Romania", "Ukraine", "Israel", "Qatar", "Kuwait"
].sort();

export const CURRENCIES = [
    { code: "USD", symbol: "$", name: "United States Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound Sterling" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
    { code: "AUD", symbol: "A$", name: "Australian Dollar" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
    { code: "INR", symbol: "₹", name: "Indian Rupee" },
    { code: "PKR", symbol: "Rs", name: "Pakistani Rupee" },
    { code: "RUB", symbol: "₽", name: "Russian Ruble" },
    { code: "BRL", symbol: "R$", name: "Brazilian Real" },
    { code: "KRW", symbol: "₩", name: "South Korean Won" },
    { code: "CHF", symbol: "Fr", name: "Swiss Franc" },
    { code: "SEK", symbol: "kr", name: "Swedish Krona" },
    { code: "NOK", symbol: "kr", name: "Norwegian Krone" },
    { code: "DKK", symbol: "kr", name: "Danish Krone" },
    { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
    { code: "HKD", symbol: "HK$", name: "Hong Kong Dollar" },
    { code: "NZD", symbol: "NZ$", name: "New Zealand Dollar" },
    { code: "MXN", symbol: "$", name: "Mexican Peso" },
    { code: "ZAR", symbol: "R", name: "South African Rand" },
    { code: "AED", symbol: "د.إ", name: "United Arab Emirates Dirham" },
    { code: "SAR", symbol: "﷼", name: "Saudi Riyal" },
    { code: "TRY", symbol: "₺", name: "Turkish Lira" },
];

export const JOB_TYPES = [
    "Full-time",
    "Part-time",
    "Contract",
    "Freelance",
    "Internship",
    "Temporary",
    "Volunteer",
] as const;

export const EXPERIENCE_LEVELS = [
    { value: "entry", label: "Entry Level (0-2 years)" },
    { value: "mid", label: "Mid Level (2-5 years)" },
    { value: "senior", label: "Senior Level (5+ years)" },
    { value: "lead", label: "Lead/Principal (8+ years)" },
    { value: "executive", label: "Executive" },
] as const;

export const WORK_MODES = [
    { value: "remote", label: "Remote" },
    { value: "onsite", label: "On-site" },
    { value: "hybrid", label: "Hybrid" },
] as const;
