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