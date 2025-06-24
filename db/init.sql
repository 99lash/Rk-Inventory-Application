CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS models (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    layout VARCHAR(20) NOT NULL,
    connectivity VARCHAR(100),
    switch_support VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(21) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    category_id INTEGER REFERENCES categories(id),
    model_id INTEGER REFERENCES models(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS inventory (
    id SERIAL PRIMARY KEY,
    product_id VARCHAR(21) REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- seeds categories
INSERT INTO categories (name, description) VALUES 
    ('keyboards', 'Mechanical keyboards (60%, 65%, 75%, TKL, 96%, Full-size)'),
    ('switches', 'Mechanical keyboard switches (linear, tactile, clicky)'),
    ('keycaps', 'Keycap sets (PBT, ABS, various profiles)'),
    ('accessories', 'Other accessories (wrist rests, cables, pullers, etc.)')
ON CONFLICT (name) DO NOTHING;

-- seeds models
INSERT INTO models (name, layout, connectivity, switch_support) VALUES
    ('RK61', '60%', 'Bluetooth / 2.4GHz / Wired', 'Hot-swap, 3-pin/5-pin'),
    ('RK68', '65%', 'Bluetooth / 2.4GHz / Wired', 'Hot-swap'),
    ('RK71', '71 Keys', 'Bluetooth / 2.4GHz / Wired', 'Hot-swap'),
    ('RK84', '75%', 'Bluetooth / 2.4GHz / Wired', 'Hot-swap'),
    ('RK96', '96%', 'Bluetooth / 2.4GHz / Wired', 'Hot-swap'),
    ('RK98', '98 Keys', 'Bluetooth / 2.4GHz / Wired', 'Hot-swap'),
    ('RK100', '100% / Full-size', 'Bluetooth / 2.4GHz / Wired', 'Hot-swap'),
    ('L75', '75%', 'Bluetooth / 2.4GHz / Wired', 'Gasket-mounted'),
    ('M75', '75%', 'Bluetooth / 2.4GHz / Wired', 'Gasket-mounted'),
    ('R75', '75%', 'Bluetooth / 2.4GHz / Wired', 'Gasket-mounted'),
    ('S98', '98 Keys', 'Bluetooth / 2.4GHz / Wired', 'Gasket-mounted'),
    ('S108', 'Full-size', 'Bluetooth / 2.4GHz / Wired', 'Retro Typewriter-style')
ON CONFLICT (name) DO NOTHING;