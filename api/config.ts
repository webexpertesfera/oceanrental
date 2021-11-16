const config = {
  databaseUrl:
    process.env.DATABASE_URL ||
    'mysql://root:rgb2@localhost:3306/ocean_premium',
  jwtSecret: 'eac28d46-34f7-4a82-875d-64ba7efa4b32',
};

export default config;
