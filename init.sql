-- Initialize the database with any additional setup if needed
-- This file is automatically executed when the PostgreSQL container starts

-- Create extensions if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE blogdb TO bloguser;
