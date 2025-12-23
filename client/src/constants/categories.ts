export interface Category {
  id: string;
  name: string;
  parentId?: string;
  icon: string;
}

export const CATEGORIES: Category[] = [
  // FOOD & DRINKS
  { id: "food", name: "Food & Drinks", icon: "🍔" },
  { id: "food_groceries", name: "Groceries", parentId: "food", icon: "🛒" },
  { id: "food_cafe", name: "Cafe", parentId: "food", icon: "☕" },
  { id: "food_restaurant", name: "Restaurant", parentId: "food", icon: "🍽" },
  { id: "food_bar", name: "Bar", parentId: "food", icon: "🍺" },

  // SHOPPING
  { id: "shopping", name: "Shopping", icon: "🛍" },
  { id: "shopping_clothes", name: "Clothes", parentId: "shopping", icon: "👗" },
  { id: "shopping_shoes", name: "Shoes", parentId: "shopping", icon: "👟" },
  { id: "shopping_electronics", name: "Electronics", parentId: "shopping", icon: "📱" },

  // TRANSPORT
  { id: "transport", name: "Transport", icon: "🚗" },
  { id: "transport_fuel", name: "Fuel", parentId: "transport", icon: "⛽" },
  { id: "transport_bus", name: "Bus / Train", parentId: "transport", icon: "🚌" },
  { id: "transport_taxi", name: "Taxi", parentId: "transport", icon: "🚕" },

  // FINANCIAL
  { id: "financial", name: "Financial Expenses", icon: "💳" },
  { id: "financial_rent", name: "Rent", parentId: "financial", icon: "🏠" },
  { id: "financial_bills", name: "Bills", parentId: "financial", icon: "📄" },
  { id: "financial_insurance", name: "Insurance", parentId: "financial", icon: "🛡" },

  // ENTERTAINMENT
  { id: "entertainment", name: "Entertainment", icon: "🎉" },
  { id: "entertainment_movies", name: "Movies", parentId: "entertainment", icon: "🎬" },
  { id: "entertainment_games", name: "Games", parentId: "entertainment", icon: "🎮" },
];

export const CATEGORY_MAP = {
  // FOOD
  food_groceries: {
    label: "Groceries",
    emoji: "🛒",
    parent: "Food & Drinks",
  },
  food_cafe: {
    label: "Cafe",
    emoji: "☕",
    parent: "Food & Drinks",
  },
  food_restaurant: {
    label: "Restaurant",
    emoji: "🍽",
    parent: "Food & Drinks",
  },
  food_bar: {
    label: "Bar",
    emoji: "🍺",
    parent: "Food & Drinks",
  },

  // SHOPPING
  shopping_clothes: {
    label: "Clothes",
    emoji: "👗",
    parent: "Shopping",
  },
  shopping_shoes: {
    label: "Shoes",
    emoji: "👟",
    parent: "Shopping",
  },
  shopping_electronics: {
    label: "Electronics",
    emoji: "📱",
    parent: "Shopping",
  },

  // TRANSPORT
  transport_fuel: {
    label: "Fuel",
    emoji: "⛽",
    parent: "Transport",
  },
  transport_bus: {
    label: "Bus / Train",
    emoji: "🚌",
    parent: "Transport",
  },
  transport_taxi: {
    label: "Taxi",
    emoji: "🚕",
    parent: "Transport",
  },

  // FINANCIAL
  financial_rent: {
    label: "Rent",
    emoji: "🏠",
    parent: "Financial Expenses",
  },
  financial_bills: {
    label: "Bills",
    emoji: "📄",
    parent: "Financial Expenses",
  },
  financial_insurance: {
    label: "Insurance",
    emoji: "🛡",
    parent: "Financial Expenses",
  },

  // ENTERTAINMENT
  entertainment_movies: {
    label: "Movies",
    emoji: "🎬",
    parent: "Entertainment",
  },
  entertainment_games: {
    label: "Games",
    emoji: "🎮",
    parent: "Entertainment",
  },

  // FALLBACK
  other: {
    label: "Other",
    emoji: "📦",
    parent: "Other",
  },
} as const;
