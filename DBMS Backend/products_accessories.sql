-- SoulDrops accessories catalog: 11 sub-categories × 4 products = 44 rows.
-- Run against your `ecommerce_system` database AFTER backing up old data.
-- Adjust column names if your schema differs (e.g. Categories_Id vs Category_Id).

-- If you use a Categories table, insert 11 rows first (names for viva / reports).
-- Example (uncomment and fix table/column names to match your ER diagram):
/*
INSERT INTO Categories (Category_Name) VALUES
  ('Men Goggles'),
  ('Men Bracelet'),
  ('Men Wallet'),
  ('Men Cap'),
  ('Women Tote Bag'),
  ('Women Goggles'),
  ('Women Bracelet'),
  ('Women Necklace'),
  ('Home Decor Flower Vase'),
  ('Home Decor Centre Table'),
  ('Home Decor Lamp & Painting');
*/

-- Clear old clothing products (disable FK checks if your DB requires it for TRUNCATE).
DELETE FROM Products;

-- Optional: reset auto-increment so product_id 1..44 matches script.js
ALTER TABLE Products AUTO_INCREMENT = 1;

-- Price is numeric (rupees). Category_Id 1..11 lines up with the INSERT block above.

INSERT INTO Products (Products_Name, Price, Category_Id) VALUES
  -- Category 1 — Men Goggles
  ('Sport Shield Goggles', 1299, 1),
  ('Retro Frame Goggles', 1099, 1),
  ('Mirror Lens Goggles', 1399, 1),
  ('Ski Style Goggles', 1499, 1),
  -- Category 2 — Men Bracelet
  ('Leather Strap Bracelet', 899, 2),
  ('Metal Link Bracelet', 1199, 2),
  ('Beaded Charm Bracelet', 799, 2),
  ('Braided Rope Bracelet', 649, 2),
  -- Category 3 — Men Wallet
  ('Classic Bifold Wallet', 1599, 3),
  ('Slim Card Wallet', 1299, 3),
  ('Zip Coin Wallet', 1099, 3),
  ('RFID Safe Wallet', 1899, 3),
  -- Category 4 — Men Cap
  ('Classic Baseball Cap', 799, 4),
  ('Trucker Mesh Cap', 899, 4),
  ('Winter Beanie Cap', 699, 4),
  ('Snapback Street Cap', 999, 4),
  -- Category 5 — Women Tote Bag
  ('Canvas Tote Bag', 1299, 5),
  ('Leather Tote Bag', 2499, 5),
  ('Printed Shopper Tote', 1099, 5),
  ('Mini Everyday Tote', 999, 5),
  -- Category 6 — Women Goggles
  ('Cat-Eye Goggles', 1249, 6),
  ('Oversized Fashion Goggles', 1399, 6),
  ('Round Frame Goggles', 1199, 6),
  ('Tinted Lens Goggles', 1349, 6),
  -- Category 7 — Women Bracelet
  ('Charm Bracelet Set', 1599, 7),
  ('Crystal Line Bracelet', 1899, 7),
  ('Open Cuff Bracelet', 1299, 7),
  ('Pearl Strand Bracelet', 1499, 7),
  -- Category 8 — Women Necklace
  ('Delicate Pendant Necklace', 1799, 8),
  ('Layered Chain Necklace', 1999, 8),
  ('Velvet Choker Necklace', 899, 8),
  ('Gold Tone Chain Necklace', 2199, 8),
  -- Category 9 — Home Decor Flower Vase
  ('Ceramic Flower Vase', 1899, 9),
  ('Glass Bud Vase', 1299, 9),
  ('Rustic Clay Vase', 2099, 9),
  ('Tall Floor Vase', 3499, 9),
  -- Category 10 — Home Decor Centre Table
  ('Round Wooden Centre Table', 8999, 10),
  ('Glass Top Centre Table', 12499, 10),
  ('Compact Centre Table', 7499, 10),
  ('Nesting Centre Table Set', 10999, 10),
  -- Category 11 — Home Decor (lamps + paintings; one HTML section on site)
  ('Desk Light Lamp', 2299, 11),
  ('Arc Floor Light Lamp', 3899, 11),
  ('Abstract Canvas Painting', 4499, 11),
  ('Landscape Wall Painting', 5299, 11);

-- No Category_Id column? Re-run DELETE + AUTO_INCREMENT, then paste the same 44 rows using
-- INSERT INTO Products (Products_Name, Price) VALUES ('Sport Shield Goggles', 1299), ... ;
-- Order must stay identical so Products_Id 1..44 matches script.js.
