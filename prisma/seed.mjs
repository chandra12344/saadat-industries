import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import bcrypt from 'bcryptjs';
import Database from 'better-sqlite3';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, 'dev.db');
const db = new Database(dbPath);

function cuid() {
  return 'c' + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

const now = new Date().toISOString();

// Create admin user
const hashedPassword = bcrypt.hashSync('admin@123', 12);
const existingUser = db.prepare('SELECT id FROM User WHERE email = ?').get('admin@saadatindustries.com');
if (!existingUser) {
  db.prepare('INSERT INTO User (id, email, password, name, role, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)').run(
    cuid(), 'admin@saadatindustries.com', hashedPassword, 'Admin', 'admin', now, now
  );
  console.log('Admin user created');
}

// Create categories
const categories = [
  { name: 'Conveyor Belts', slug: 'conveyor-belts', description: 'High-quality conveyor belts for industrial applications', order: 1 },
  { name: 'Idler Rollers', slug: 'idler-rollers', description: 'Precision-engineered idler rollers for smooth conveyor operation', order: 2 },
  { name: 'Idler Frames', slug: 'idler-frames', description: 'Durable idler frames for conveyor systems', order: 3 },
  { name: 'Return Rollers', slug: 'return-rollers', description: 'Return rollers for conveyor belt return side support', order: 4 },
  { name: 'Carrying Rollers', slug: 'carrying-rollers', description: 'Heavy-duty carrying rollers for material transport', order: 5 },
  { name: 'Guide Rollers', slug: 'guide-rollers', description: 'Guide rollers for belt alignment and tracking', order: 6 },
  { name: 'Impact Rollers', slug: 'impact-rollers', description: 'Impact rollers for absorbing shock at loading points', order: 7 },
  { name: 'Drum Pulleys', slug: 'drum-pulleys', description: 'Drum pulleys for conveyor belt drive and redirection', order: 8 },
  { name: 'Gear Boxes', slug: 'gear-boxes', description: 'Industrial gear boxes for power transmission', order: 9 },
  { name: 'Pedestal Bearings', slug: 'pedestal-bearings', description: 'Pedestal bearings for shaft support', order: 10 },
  { name: 'Sleeve with Bearing', slug: 'sleeve-with-bearing', description: 'Sleeve bearings for rotating equipment', order: 11 },
  { name: 'Suspended Magnets', slug: 'suspended-magnets', description: 'Suspended magnets for metal separation', order: 12 },
  { name: 'Metal Detectors', slug: 'metal-detectors', description: 'Industrial metal detectors for conveyor systems', order: 13 },
  { name: 'Cold Vulcanizing Solutions', slug: 'cold-vulcanizing-solutions', description: 'Cold vulcanizing solutions for belt repair', order: 14 },
  { name: 'Belt Fasteners', slug: 'belt-fasteners', description: 'Mechanical belt fasteners for quick belt joining', order: 15 },
  { name: 'Readymade Conveyors', slug: 'readymade-conveyors', description: 'Complete readymade conveyor systems', order: 16 },
  { name: 'Vibrater Springs', slug: 'vibrater-springs', description: 'Vibrating springs for screening equipment', order: 17 },
  { name: 'Bucket Repair', slug: 'bucket-repair', description: 'Bucket elevator repair services', order: 18 },
];

const insertCat = db.prepare('INSERT OR IGNORE INTO Category (id, name, slug, description, "order", createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?)');
for (const cat of categories) {
  insertCat.run(cuid(), cat.name, cat.slug, cat.description, cat.order, now, now);
}
console.log('Categories created');

// Get category IDs
const catRows = db.prepare('SELECT id, slug FROM Category').all();
const catMap = Object.fromEntries(catRows.map(c => [c.slug, c.id]));

// Create products
const products = [
  { name: 'EP 315/3 Conveyor Belt', slug: 'ep-315-3-conveyor-belt', description: 'EP 315/3 grade conveyor belt suitable for medium-duty applications. Available in various widths from 500mm to 1800mm.', features: 'EP 315/3 Grade|Width: 500mm - 1800mm|3 Ply Construction|Abrasion Resistant|Temperature Range: -25°C to +60°C', categorySlug: 'conveyor-belts', featured: 1, order: 1 },
  { name: 'EP 500/4 Conveyor Belt', slug: 'ep-500-4-conveyor-belt', description: 'Heavy-duty EP 500/4 conveyor belt for mining and quarry operations. Superior tensile strength.', features: 'EP 500/4 Grade|Width: 600mm - 2000mm|4 Ply Construction|High Tensile Strength|Oil & Grease Resistant', categorySlug: 'conveyor-belts', featured: 1, order: 2 },
  { name: 'Chevron Conveyor Belt', slug: 'chevron-conveyor-belt', description: 'V-pattern chevron conveyor belt for inclined conveying. Prevents material rollback on steep angles.', features: 'Chevron Pattern|Incline Angle up to 40°|Multiple Profile Heights|Anti-Slip Surface|For Grain, Sand, Gravel', categorySlug: 'conveyor-belts', featured: 0, order: 3 },
  { name: 'Standard Idler Roller 89mm', slug: 'standard-idler-roller-89mm', description: '89mm diameter standard idler roller with precision bearings for smooth conveyor operation.', features: 'Diameter: 89mm|Bearing: 6204/6205|Shaft: 20mm|Low Noise|Grease Sealed Bearings', categorySlug: 'idler-rollers', featured: 1, order: 1 },
  { name: 'Heavy Duty Idler Roller 127mm', slug: 'heavy-duty-idler-roller-127mm', description: '127mm heavy-duty idler roller for high-capacity conveyor systems.', features: 'Diameter: 127mm|Bearing: 6305/6306|Shaft: 25mm|Heavy Duty|Dust & Water Sealed', categorySlug: 'idler-rollers', featured: 0, order: 2 },
  { name: '3-Roll Troughing Frame', slug: '3-roll-troughing-frame', description: 'Standard 3-roll troughing frame for carrying side idler support. Available in 20°, 30°, and 35° trough angles.', features: '3-Roll Config|Trough Angle: 20°/30°/35°|Belt Width: 600-1800mm|Hot Rolled Steel|Painted/Galvanized', categorySlug: 'idler-frames', featured: 1, order: 1 },
  { name: 'Flat Return Frame', slug: 'flat-return-frame', description: 'Single roller flat return frame for belt return side support.', features: 'Single Roller|Belt Width: 600-1800mm|Easy Install|Low Maintenance|Standard & Heavy Duty', categorySlug: 'idler-frames', featured: 0, order: 2 },
  { name: 'Standard Return Roller', slug: 'standard-return-roller', description: 'Standard return roller with rubber disc or full rubber coating for belt return side.', features: 'Diameter: 89mm/108mm|Full Rubber Coated|Precision Bearings|Low Friction|Long Service Life', categorySlug: 'return-rollers', featured: 1, order: 1 },
  { name: 'Carrying Roller Set', slug: 'carrying-roller-set', description: 'Complete carrying roller set for conveyor carrying side.', features: '3-Roller Set|Multiple Trough Angles|Precision Balanced|Sealed Bearings|Corrosion Resistant', categorySlug: 'carrying-rollers', featured: 0, order: 1 },
  { name: 'Rubber Disc Guide Roller', slug: 'rubber-disc-guide-roller', description: 'Self-aligning guide roller with rubber disc design for belt tracking.', features: 'Self-Aligning|Rubber Disc|Auto Belt Tracking|Easy Installation|Reduces Belt Damage', categorySlug: 'guide-rollers', featured: 0, order: 1 },
  { name: 'Rubber Ring Impact Roller', slug: 'rubber-ring-impact-roller', description: 'Impact roller with replaceable rubber rings for shock absorption at loading zones.', features: 'Replaceable Rings|High Impact Absorption|Protects Belt|Diameter: 133/159mm|Multiple Lengths', categorySlug: 'impact-rollers', featured: 1, order: 1 },
  { name: 'Rubber Lagged Drum Pulley', slug: 'rubber-lagged-drum-pulley', description: 'Drum pulley with diamond-pattern rubber lagging for improved traction.', features: 'Diamond Lagging|Diameter: 250-800mm|Shaft: 50-100mm|Dynamic Balanced|Crowned or Flat', categorySlug: 'drum-pulleys', featured: 1, order: 1 },
  { name: 'Plain Drum Pulley', slug: 'plain-drum-pulley', description: 'Plain steel drum pulley for non-drive applications. Precision manufactured.', features: 'Plain Steel Face|Diameter: 200-600mm|Precision Machined|MS/EN8 Shaft|Heavy Duty Bearings', categorySlug: 'drum-pulleys', featured: 0, order: 2 },
  { name: 'Helical Gear Box', slug: 'helical-gear-box', description: 'Industrial helical gear box for conveyor drive systems. High efficiency power transmission.', features: 'Helical Design|Ratio: 5:1 to 60:1|Foot/Flange Mount|Oil Bath Lube|Efficiency >95%', categorySlug: 'gear-boxes', featured: 1, order: 1 },
  { name: 'UCP Pedestal Bearing', slug: 'ucp-pedestal-bearing', description: 'UCP series pedestal bearing (pillow block) for shaft support.', features: 'UCP Series|Cast Iron Housing|Chrome Steel Insert|Self-Aligning|Grease Fitting', categorySlug: 'pedestal-bearings', featured: 0, order: 1 },
  { name: 'Adapter Sleeve with Bearing', slug: 'adapter-sleeve-with-bearing', description: 'Adapter sleeve assembly with spherical roller bearing for plain shafts.', features: 'Adapter Sleeve|Spherical Roller Bearing|Easy Mounting|Multiple Sizes|Lock Nut Included', categorySlug: 'sleeve-with-bearing', featured: 0, order: 1 },
  { name: 'Overband Suspended Magnet', slug: 'overband-suspended-magnet', description: 'Electromagnetic overband suspended magnet for tramp iron removal.', features: 'Electromagnetic|Self-Cleaning Belt|Height: Up to 400mm|High Gauss|Continuous Operation', categorySlug: 'suspended-magnets', featured: 1, order: 1 },
  { name: 'Conveyor Belt Metal Detector', slug: 'conveyor-belt-metal-detector', description: 'Industrial metal detector for conveyor belt systems.', features: 'Ferrous & Non-Ferrous|Adjustable Sensitivity|Digital Display|Auto-Stop|Belt Width: Up to 1800mm', categorySlug: 'metal-detectors', featured: 0, order: 1 },
  { name: 'SC 2000 Cold Vulcanizing Solution', slug: 'sc-2000-cold-vulcanizing-solution', description: 'SC 2000 cold vulcanizing cement for belt splicing and repair.', features: 'Two-Component|High Bond Strength|Cold Application|All Belt Types|Fast Curing', categorySlug: 'cold-vulcanizing-solutions', featured: 0, order: 1 },
  { name: 'Plate Type Belt Fastener', slug: 'plate-type-belt-fastener', description: 'Mechanical plate type belt fastener for quick belt joining.', features: 'Plate Type|Quick Install|No Special Tools|Belt: 6-16mm Thick|Galvanized Steel', categorySlug: 'belt-fasteners', featured: 0, order: 1 },
  { name: 'Portable Conveyor System', slug: 'portable-conveyor-system', description: 'Complete readymade portable conveyor system for material handling.', features: 'Portable|Width: 500-1000mm|Length: 3-15m|Electric Motor|Adjustable Height & Angle', categorySlug: 'readymade-conveyors', featured: 1, order: 1 },
];

const insertProd = db.prepare('INSERT OR IGNORE INTO Product (id, name, slug, description, features, categoryId, featured, active, "order", createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?, ?, ?)');
for (const p of products) {
  insertProd.run(cuid(), p.name, p.slug, p.description, p.features, catMap[p.categorySlug], p.featured, p.order, now, now);
}
console.log('Products created');
console.log('Seed completed successfully!');
db.close();
