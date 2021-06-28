export const env = {
  PORT: 8000,

  NODE_ENV: "development",

  INVENTORY_CATEGORY_ROUTE: "/api/inventory/categories",
  INVENTORY_PRODUCT_ROUTE: "/api/inventory/products", 
  INVENTORY_ORDER_ROUTE: '/api/inventory/orders',

  SIRHOOD_PRODUCT_ROUTE: "/api/sirhood/products",
  SIRHOOD_CATEGORY_ROUTE: "/api/sirhood/categories",
  SIRHOOD_ORDER_ROUTE: "/api/sirhood/orders",

  CART_ROUTE: "/api/cart",
  FAVORITES_ROUTE: "/api/favorites",
  
  USER_ROUTE: "/api/users",

  SESSION_ROUTE: "/api/session",
  ACCESS_TOKEN_SECRET: "ACCES_SECRET",
  REFRESH_TOKEN_SECRET: "REFRESH_SECRET",

  MONGO_URL: "mongodb://127.0.0.1:27017",
  DB_NAME: "inventory",
};
