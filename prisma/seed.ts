import bcrypt from "bcryptjs";

const { PrismaClient } = require("../src/generated/prisma") as { PrismaClient: new () => any };

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("admin@123", 12);

  await prisma.user.upsert({
    where: { email: "admin@saadatindustries.com" },
    update: {},
    create: {
      email: "admin@saadatindustries.com",
      password: hashedPassword,
      name: "Admin",
      role: "admin",
    },
  });

  const categories = [
    { name: "Conveyor Belts", slug: "conveyor-belts", description: "High-quality conveyor belts for industrial applications", order: 1 },
    { name: "Idler Rollers", slug: "idler-rollers", description: "Precision-engineered idler rollers for smooth conveyor operation", order: 2 },
    { name: "Idler Frames", slug: "idler-frames", description: "Durable idler frames for conveyor systems", order: 3 },
    { name: "Return Rollers", slug: "return-rollers", description: "Return rollers for conveyor belt return side support", order: 4 },
    { name: "Carrying Rollers", slug: "carrying-rollers", description: "Heavy-duty carrying rollers for material transport", order: 5 },
    { name: "Guide Rollers", slug: "guide-rollers", description: "Guide rollers for belt alignment and tracking", order: 6 },
    { name: "Impact Rollers", slug: "impact-rollers", description: "Impact rollers for absorbing shock at loading points", order: 7 },
    { name: "Drum Pulleys", slug: "drum-pulleys", description: "Drum pulleys for conveyor belt drive and redirection", order: 8 },
    { name: "Gear Boxes", slug: "gear-boxes", description: "Industrial gear boxes for power transmission", order: 9 },
    { name: "Pedestal Bearings", slug: "pedestal-bearings", description: "Pedestal bearings for shaft support", order: 10 },
    { name: "Sleeve with Bearing", slug: "sleeve-with-bearing", description: "Sleeve bearings for rotating equipment", order: 11 },
    { name: "Suspended Magnets", slug: "suspended-magnets", description: "Suspended magnets for metal separation from conveyed materials", order: 12 },
    { name: "Metal Detectors", slug: "metal-detectors", description: "Industrial metal detectors for conveyor systems", order: 13 },
    { name: "Cold Vulcanizing Solutions", slug: "cold-vulcanizing-solutions", description: "Cold vulcanizing solutions for belt repair and splicing", order: 14 },
    { name: "Belt Fasteners", slug: "belt-fasteners", description: "Mechanical belt fasteners for quick belt joining", order: 15 },
    { name: "Readymade Conveyors", slug: "readymade-conveyors", description: "Complete readymade conveyor systems for various industries", order: 16 },
    { name: "Vibrater Springs", slug: "vibrater-springs", description: "Vibrating springs for screening and sorting equipment", order: 17 },
    { name: "Bucket Repair", slug: "bucket-repair", description: "Bucket elevator repair and maintenance services", order: 18 },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  const allCategories = await prisma.category.findMany();
  const catMap = Object.fromEntries(allCategories.map((c) => [c.slug, c.id]));

  const products = [
    { name: "EP 315/3 Conveyor Belt", slug: "ep-315-3-conveyor-belt", description: "EP 315/3 grade conveyor belt suitable for medium-duty applications. Available in various widths from 500mm to 1800mm. Excellent resistance to abrasion and impact.", features: "EP 315/3 Grade|Width: 500mm - 1800mm|3 Ply Construction|Abrasion Resistant|Temperature Range: -25°C to +60°C", categoryId: catMap["conveyor-belts"], featured: true, order: 1 },
    { name: "EP 500/4 Conveyor Belt", slug: "ep-500-4-conveyor-belt", description: "Heavy-duty EP 500/4 conveyor belt for mining and quarry operations. Superior tensile strength and long service life.", features: "EP 500/4 Grade|Width: 600mm - 2000mm|4 Ply Construction|High Tensile Strength|Oil & Grease Resistant", categoryId: catMap["conveyor-belts"], featured: true, order: 2 },
    { name: "Chevron Conveyor Belt", slug: "chevron-conveyor-belt", description: "V-pattern chevron conveyor belt for inclined conveying of bulk materials. Prevents material rollback on steep angles.", features: "Chevron Pattern|Incline Angle up to 40°|Multiple Profile Heights|Anti-Slip Surface|Suitable for Grain, Sand, Gravel", categoryId: catMap["conveyor-belts"], featured: false, order: 3 },
    { name: "Standard Idler Roller 89mm", slug: "standard-idler-roller-89mm", description: "89mm diameter standard idler roller with precision bearings. Designed for smooth and quiet operation in conveyor systems.", features: "Diameter: 89mm|Bearing: 6204/6205|Shaft: 20mm|Low Noise Operation|Grease Sealed Bearings", categoryId: catMap["idler-rollers"], featured: true, order: 1 },
    { name: "Heavy Duty Idler Roller 127mm", slug: "heavy-duty-idler-roller-127mm", description: "127mm heavy-duty idler roller for high-capacity conveyor systems. Built for maximum load-bearing capacity.", features: "Diameter: 127mm|Bearing: 6305/6306|Shaft: 25mm|Heavy Duty Construction|Dust & Water Sealed", categoryId: catMap["idler-rollers"], featured: false, order: 2 },
    { name: "3-Roll Troughing Frame", slug: "3-roll-troughing-frame", description: "Standard 3-roll troughing frame for carrying side idler support. Available in 20°, 30°, and 35° trough angles.", features: "3-Roll Configuration|Trough Angle: 20°/30°/35°|Belt Width: 600mm - 1800mm|Hot Rolled Steel|Painted/Galvanized Finish", categoryId: catMap["idler-frames"], featured: true, order: 1 },
    { name: "Flat Return Frame", slug: "flat-return-frame", description: "Single roller flat return frame for belt return side support. Simple design ensures easy maintenance.", features: "Single Roller Design|Belt Width: 600mm - 1800mm|Easy Installation|Low Maintenance|Standard & Heavy Duty Options", categoryId: catMap["idler-frames"], featured: false, order: 2 },
    { name: "Standard Return Roller", slug: "standard-return-roller", description: "Standard return roller with rubber disc or full rubber coating. Supports belt on the return side of conveyor.", features: "Diameter: 89mm/108mm|Full Rubber Coated|Precision Bearings|Low Friction Design|Long Service Life", categoryId: catMap["return-rollers"], featured: true, order: 1 },
    { name: "Carrying Roller Set", slug: "carrying-roller-set", description: "Complete carrying roller set for conveyor carrying side. Available in standard and heavy-duty variants.", features: "3-Roller Set|Multiple Trough Angles|Precision Balanced|Sealed Bearings|Corrosion Resistant", categoryId: catMap["carrying-rollers"], featured: false, order: 1 },
    { name: "Rubber Disc Guide Roller", slug: "rubber-disc-guide-roller", description: "Self-aligning guide roller with rubber disc design for automatic belt tracking and alignment.", features: "Self-Aligning Design|Rubber Disc Construction|Automatic Belt Tracking|Easy Installation|Reduces Belt Damage", categoryId: catMap["guide-rollers"], featured: false, order: 1 },
    { name: "Rubber Ring Impact Roller", slug: "rubber-ring-impact-roller", description: "Impact roller with replaceable rubber rings for absorbing shock at loading zones. Protects belt and structure.", features: "Replaceable Rubber Rings|High Impact Absorption|Protects Belt Structure|Diameter: 133mm/159mm|Multiple Lengths Available", categoryId: catMap["impact-rollers"], featured: true, order: 1 },
    { name: "Rubber Lagged Drum Pulley", slug: "rubber-lagged-drum-pulley", description: "Drum pulley with diamond-pattern rubber lagging for improved traction. Available in various diameters.", features: "Diamond Pattern Lagging|Diameter: 250mm - 800mm|Shaft: 50mm - 100mm|Dynamic Balanced|Crowned or Flat Face", categoryId: catMap["drum-pulleys"], featured: true, order: 1 },
    { name: "Plain Drum Pulley", slug: "plain-drum-pulley", description: "Plain steel drum pulley for non-drive applications. Precision manufactured for smooth operation.", features: "Plain Steel Face|Diameter: 200mm - 600mm|Precision Machined|MS/EN8 Shaft|Heavy Duty Bearings", categoryId: catMap["drum-pulleys"], featured: false, order: 2 },
    { name: "Helical Gear Box", slug: "helical-gear-box", description: "Industrial helical gear box for conveyor drive systems. High efficiency power transmission with low noise.", features: "Helical Gear Design|Ratio: 5:1 to 60:1|Foot/Flange Mounted|Oil Bath Lubrication|High Efficiency >95%", categoryId: catMap["gear-boxes"], featured: true, order: 1 },
    { name: "UCP Pedestal Bearing", slug: "ucp-pedestal-bearing", description: "UCP series pedestal bearing (pillow block) for shaft support in conveyor systems. Cast iron housing with chrome steel insert.", features: "UCP Series|Cast Iron Housing|Chrome Steel Insert Bearing|Self-Aligning|Grease Fitting Included", categoryId: catMap["pedestal-bearings"], featured: false, order: 1 },
    { name: "Adapter Sleeve with Bearing", slug: "adapter-sleeve-with-bearing", description: "Adapter sleeve assembly with spherical roller bearing. For mounting bearings on plain shafts.", features: "Adapter Sleeve Type|Spherical Roller Bearing|Easy Mounting|Multiple Sizes|Lock Nut & Washer Included", categoryId: catMap["sleeve-with-bearing"], featured: false, order: 1 },
    { name: "Overband Suspended Magnet", slug: "overband-suspended-magnet", description: "Electromagnetic overband suspended magnet for tramp iron removal from conveyed materials. Self-cleaning type.", features: "Electromagnetic Type|Self-Cleaning Belt|Suspension Height: Up to 400mm|High Gauss Rating|Continuous Operation", categoryId: catMap["suspended-magnets"], featured: true, order: 1 },
    { name: "Conveyor Belt Metal Detector", slug: "conveyor-belt-metal-detector", description: "Industrial metal detector for conveyor belt systems. Detects ferrous, non-ferrous, and stainless steel contaminants.", features: "Ferrous & Non-Ferrous Detection|Adjustable Sensitivity|Digital Display|Auto-Stop Feature|Belt Width: Up to 1800mm", categoryId: catMap["metal-detectors"], featured: false, order: 1 },
    { name: "SC 2000 Cold Vulcanizing Solution", slug: "sc-2000-cold-vulcanizing-solution", description: "SC 2000 cold vulcanizing cement for conveyor belt splicing and repair. Two-component system for strong, permanent bonds.", features: "Two-Component System|High Bond Strength|Cold Application|Suitable for All Belt Types|Fast Curing Time", categoryId: catMap["cold-vulcanizing-solutions"], featured: false, order: 1 },
    { name: "Plate Type Belt Fastener", slug: "plate-type-belt-fastener", description: "Mechanical plate type belt fastener for quick conveyor belt joining. Easy installation without special tools.", features: "Plate Type Design|Quick Installation|No Special Tools Needed|Suitable for Belt Thickness 6-16mm|Galvanized Steel", categoryId: catMap["belt-fasteners"], featured: false, order: 1 },
    { name: "Portable Conveyor System", slug: "portable-conveyor-system", description: "Complete readymade portable conveyor system. Ideal for material handling in construction, mining, and agriculture.", features: "Portable Design|Belt Width: 500mm - 1000mm|Length: 3m - 15m|Electric Motor Drive|Adjustable Height & Angle", categoryId: catMap["readymade-conveyors"], featured: true, order: 1 },
  ];

  for (const prod of products) {
    await prisma.product.upsert({
      where: { slug: prod.slug },
      update: {},
      create: prod,
    });
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
