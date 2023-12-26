

// SETTINGS ===================================================================

let sulfur_ore_per_scrap = 8;    // LW Users Have Spoken!
let fairness_radius = 0.25;      // 25%
let research_fraction = 2.0/3.0; // 66.67%
let wipe_start = new Date();     // set by initialize_dates() function
let today = new Date();          // set by initialize_dates() function

initialize_dates(true);

// RAW TRADE TABLE ============================================================

let trade_table = [ { csk: 0, category: "Resources", name: "animal fat", no_qty: false, dep_per_day: 0, scrap_per: 0.666666666666667, qty_1_research: -1, justification: "4/3 LGF" },
{ csk: 0, category: "Resources", name: "bone fragments", no_qty: false, dep_per_day: 0, scrap_per: 0.0285714285714286, qty_1_research: -1, justification: "average of stone and wood ?" },
{ csk: 0, category: "Resources", name: "charcoal", no_qty: false, dep_per_day: 0, scrap_per: 0.02452777778, qty_1_research: -1, justification: "poll of LW users" },
{ csk: 0, category: "Resources", name: "cloth", no_qty: false, dep_per_day: 0, scrap_per: 0.125, qty_1_research: -1, justification: "Bandit pricing" },
{ csk: 0, category: "Resources", name: "crude oil", no_qty: false, dep_per_day: 0, scrap_per: 1.45553333333333, qty_1_research: -1, justification: "Smelting cost vs yield, 3 crude + 6.67 wood = 9 lgf" },
{ csk: 0, category: "Resources", name: "diesel", no_qty: false, dep_per_day: 0, scrap_per: 109.722222222222, qty_1_research: -1, justification: "poll of LW users" },
{ csk: 0, category: "Resources", name: "explosives", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 19.0952842377261, qty_1_research: 333.333333333333, justification: "Crafting" },
{ csk: 0, category: "Resources", name: "fertilizer", no_qty: false, dep_per_day: 0, scrap_per: 1.5, qty_1_research: -1, justification: "Bandit pricing" },
{ csk: 0, category: "Resources", name: "frags", no_qty: false, dep_per_day: 0, scrap_per: 0.0581395348837209, qty_1_research: -1, justification: "LW users chose this valuation" },
{ csk: 0, category: "Resources", name: "gunpowder", no_qty: false, dep_per_day: 0, scrap_per: 0.3125, qty_1_research: -1, justification: "LW users chose this valuation" },
{ csk: 0, category: "Resources", name: "horse dung", no_qty: false, dep_per_day: 0, scrap_per: 15, qty_1_research: -1, justification: "10x fertilizer" },
{ csk: 0, category: "Resources", name: "hqm", no_qty: false, dep_per_day: 0, scrap_per: 7.5, qty_1_research: -1, justification: "16x scope costs 300 scrap, recycles for 40 hqm" },
{ csk: 0, category: "Resources", name: "hqm ore", no_qty: false, dep_per_day: 0, scrap_per: 6.81818181818182, qty_1_research: -1, justification: "HQM -10% value" },
{ csk: 0, category: "Resources", name: "human skull", no_qty: false, dep_per_day: 0, scrap_per: 0.571428571428571, qty_1_research: -1, justification: "20 bone fragments" },
{ csk: 0, category: "Resources", name: "leather", no_qty: false, dep_per_day: 0, scrap_per: 0.25, qty_1_research: -1, justification: "cloth x 2 ?" },
{ csk: 0, category: "Resources", name: "lgf", no_qty: false, dep_per_day: 0, scrap_per: 0.5, qty_1_research: -1, justification: "Outpost pricing" },
{ csk: 0, category: "Resources", name: "metal ore", no_qty: false, dep_per_day: 0, scrap_per: 0.0528541226215645, qty_1_research: -1, justification: "Frags -10% value" },
{ csk: 0, category: "Resources", name: "scrap", no_qty: false, dep_per_day: 0, scrap_per: 1, qty_1_research: -1, justification: "unit value" },
{ csk: 0, category: "Resources", name: "stone", no_qty: false, dep_per_day: 0, scrap_per: 0.05, qty_1_research: -1, justification: "Outpost pricing" },
{ csk: 0, category: "Resources", name: "sulfur", no_qty: false, dep_per_day: 0, scrap_per: 0.138888888888889, qty_1_research: -1, justification: "Ore +10% value" },
{ csk: 0, category: "Resources", name: "sulfur ore", no_qty: false, dep_per_day: 0, scrap_per: 0.125, qty_1_research: -1, justification: "LW users chose this valuation" },
{ csk: 0, category: "Resources", name: "wolf skull", no_qty: false, dep_per_day: 0, scrap_per: 0.571428571428571, qty_1_research: -1, justification: "20 bone fragments" },
{ csk: 0, category: "Resources", name: "wood", no_qty: false, dep_per_day: 0, scrap_per: 0.02, qty_1_research: -1, justification: "Outpost pricing" },
{ csk: 1, category: "Components", name: "blades", no_qty: false, dep_per_day: 0, scrap_per: 5, qty_1_research: -1, justification: "avg crafting + recycling *commonality" },
{ csk: 1, category: "Components", name: "cctv camera", no_qty: false, dep_per_day: 0, scrap_per: 140, qty_1_research: -1, justification: "recycling , adjusted for rarity" },
{ csk: 1, category: "Components", name: "electric fuse", no_qty: false, dep_per_day: 0, scrap_per: 20, qty_1_research: -1, justification: "recycling *commonality" },
{ csk: 1, category: "Components", name: "gears", no_qty: false, dep_per_day: 0, scrap_per: 50, qty_1_research: -1, justification: "avg crafting + recycling *commonality" },
{ csk: 1, category: "Components", name: "laptop", no_qty: false, dep_per_day: 0, scrap_per: 125, qty_1_research: -1, justification: "recycling , adjusted for rarity" },
{ csk: 1, category: "Components", name: "pipes", no_qty: false, dep_per_day: 0, scrap_per: 20, qty_1_research: -1, justification: "avg crafting + recycling *commonality" },
{ csk: 1, category: "Components", name: "propane tanks", no_qty: false, dep_per_day: 0, scrap_per: 10, qty_1_research: -1, justification: "avg crafting + recycling *commonality" },
{ csk: 1, category: "Components", name: "rifle body", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 60, qty_1_research: -1, justification: "recycling , adjusted for rarity" },
{ csk: 1, category: "Components", name: "road signs", no_qty: false, dep_per_day: 0, scrap_per: 20, qty_1_research: -1, justification: "avg crafting + recycling *commonality" },
{ csk: 1, category: "Components", name: "rope", no_qty: false, dep_per_day: 0, scrap_per: 2, qty_1_research: -1, justification: "recycling" },
{ csk: 1, category: "Components", name: "semi auto body", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 30, qty_1_research: -1, justification: "recycling *commonality" },
{ csk: 1, category: "Components", name: "sewing kits", no_qty: false, dep_per_day: 0, scrap_per: 5, qty_1_research: -1, justification: "avg crafting + recycling *commonality" },
{ csk: 1, category: "Components", name: "sheet metal", no_qty: false, dep_per_day: 0, scrap_per: 20, qty_1_research: -1, justification: "recycling *commonality" },
{ csk: 1, category: "Components", name: "smg body", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 45, qty_1_research: -1, justification: "recycling , adjusted for rarity" },
{ csk: 1, category: "Components", name: "springs", no_qty: false, dep_per_day: 0, scrap_per: 55, qty_1_research: -1, justification: "avg crafting + recycling *commonality" },
{ csk: 1, category: "Components", name: "tarp", no_qty: false, dep_per_day: 0, scrap_per: 15.6818181818182, qty_1_research: -1, justification: "poll of LW users" },
{ csk: 1, category: "Components", name: "tech trash", no_qty: false, dep_per_day: 0, scrap_per: 25, qty_1_research: -1, justification: "recycling *commonality" },
{ csk: 2, category: "Tools", name: "binoculars", no_qty: false, dep_per_day: 0, scrap_per: 25, qty_1_research: -1, justification: "crafting * commonality" },
{ csk: 2, category: "Tools", name: "building plan", no_qty: false, dep_per_day: 0, scrap_per: 0.2, qty_1_research: -1, justification: "crafting" },
{ csk: 2, category: "Tools", name: "chainsaw", no_qty: false, dep_per_day: 0, scrap_per: 125, qty_1_research: -1, justification: "outpost pricing" },
{ csk: 2, category: "Tools", name: "fishing rod", no_qty: false, dep_per_day: 0, scrap_per: 4, qty_1_research: -1, justification: "crafting" },
{ csk: 2, category: "Tools", name: "flare", no_qty: false, dep_per_day: 0, scrap_per: 3.70639534883721, qty_1_research: -1, justification: "crafting" },
{ csk: 2, category: "Tools", name: "flashlight", no_qty: false, dep_per_day: 0, scrap_per: 1.74418604651163, qty_1_research: -1, justification: "crafting" },
{ csk: 2, category: "Tools", name: "hammer", no_qty: false, dep_per_day: 0, scrap_per: 2, qty_1_research: -1, justification: "crafting" },
{ csk: 2, category: "Tools", name: "hatchet", no_qty: false, dep_per_day: 0, scrap_per: 6.36046511627907, qty_1_research: -1, justification: "crafting" },
{ csk: 2, category: "Tools", name: "instant camera", no_qty: false, dep_per_day: 0, scrap_per: 54.3604651162791, qty_1_research: -1, justification: "crafting" },
{ csk: 2, category: "Tools", name: "jackhammer", no_qty: false, dep_per_day: 0, scrap_per: 150, qty_1_research: -1, justification: "outpost pricing" },
{ csk: 2, category: "Tools", name: "pickaxe", no_qty: false, dep_per_day: 0, scrap_per: 9.26744186046512, qty_1_research: -1, justification: "crafting" },
{ csk: 2, category: "Tools", name: "rock", no_qty: false, dep_per_day: 0, scrap_per: 0.5, qty_1_research: -1, justification: "crafting" },
{ csk: 2, category: "Tools", name: "salvaged axe", no_qty: false, dep_per_day: 0, scrap_per: 45, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 2, category: "Tools", name: "salvaged icepick", no_qty: false, dep_per_day: 0, scrap_per: 45, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 2, category: "Tools", name: "spray can", no_qty: false, dep_per_day: 0, scrap_per: 5.81395348837209, qty_1_research: -1, justification: "crafting" },
{ csk: 2, category: "Tools", name: "stash", no_qty: false, dep_per_day: 0, scrap_per: 1.25, qty_1_research: -1, justification: "crafting" },
{ csk: 2, category: "Tools", name: "stone hatchet", no_qty: false, dep_per_day: 0, scrap_per: 9, qty_1_research: -1, justification: "crafting" },
{ csk: 2, category: "Tools", name: "stone pickaxe", no_qty: false, dep_per_day: 0, scrap_per: 6.75, qty_1_research: -1, justification: "crafting" },
{ csk: 2, category: "Tools", name: "supply signal", no_qty: false, dep_per_day: 0, scrap_per: 225, qty_1_research: -1, justification: "polled lone wolf users, average" },
{ csk: 2, category: "Tools", name: "torch", no_qty: false, dep_per_day: 0, scrap_per: 1.225, qty_1_research: -1, justification: "crafting" },
{ csk: 2, category: "Tools", name: "water bucket", no_qty: false, dep_per_day: 0, scrap_per: 1.16279069767442, qty_1_research: -1, justification: "crafting" },
{ csk: 3, category: "Grenades", name: "40mm he grenade", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 12.2738210594315, qty_1_research: -1, justification: "recycling" },
{ csk: 3, category: "Grenades", name: "40mm smoke grenade", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 7.5, qty_1_research: -1, justification: "recycling" },
{ csk: 3, category: "Grenades", name: "beancan grenade", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 19.9127906976744, qty_1_research: 50, justification: "crafting" },
{ csk: 3, category: "Grenades", name: "f1 grenade", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 8, qty_1_research: 50, justification: "bandit pricing" },
{ csk: 3, category: "Grenades", name: "flashbang", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 10.719476744186, qty_1_research: 50, justification: "crafting" },
{ csk: 3, category: "Grenades", name: "molotov cocktail", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 26.25, qty_1_research: 50, justification: "crafting" },
{ csk: 3, category: "Grenades", name: "smoke grenade", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 5, qty_1_research: 50, justification: "outpost pricing" },
{ csk: 4, category: "AmmoExplo", name: "12 gauge buckshot", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 3.4156976744186, qty_1_research: 50, justification: "crafting" },
{ csk: 4, category: "AmmoExplo", name: "12 gauge incendiary shell", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 6.19347545219638, qty_1_research: 50, justification: "crafting" },
{ csk: 4, category: "AmmoExplo", name: "12 gauge slug", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 3.4156976744186, qty_1_research: 50, justification: "crafting" },
{ csk: 4, category: "AmmoExplo", name: "40mm shotgun round", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 2.5, qty_1_research: -1, justification: "bandit pricing" },
{ csk: 4, category: "AmmoExplo", name: "5.56 rifle ammo", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 2.14389534883721, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 4, category: "AmmoExplo", name: "arrow", no_qty: false, dep_per_day: 0, scrap_per: 1, qty_1_research: -1, justification: "crafting" },
{ csk: 4, category: "AmmoExplo", name: "bone arrow", no_qty: false, dep_per_day: 0, scrap_per: 0.785714285714286, qty_1_research: -1, justification: "crafting" },
{ csk: 4, category: "AmmoExplo", name: "c4", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 432.530684754522, qty_1_research: -1, justification: "crafting" },
{ csk: 4, category: "AmmoExplo", name: "explosive 5.56 rifle ammo", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 8.2202842377261, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 4, category: "AmmoExplo", name: "fire arrow", no_qty: false, dep_per_day: 0, scrap_per: 5.65, qty_1_research: -1, justification: "crafting" },
{ csk: 4, category: "AmmoExplo", name: "handmade shell", no_qty: false, dep_per_day: 0, scrap_per: 1.8125, qty_1_research: -1, justification: "crafting" },
{ csk: 4, category: "AmmoExplo", name: "high velocity arrow", no_qty: false, dep_per_day: 0, scrap_per: 0.690697674418605, qty_1_research: -1, justification: "crafting" },
{ csk: 4, category: "AmmoExplo", name: "high velocity rocket", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 51.25, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 4, category: "AmmoExplo", name: "homing missile", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 96.25, qty_1_research: -1, justification: "crafting" },
{ csk: 4, category: "AmmoExplo", name: "hv 5.56 rifle ammo", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 6.83139534883721, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 4, category: "AmmoExplo", name: "hv pistol bullet", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 6.83139534883721, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 4, category: "AmmoExplo", name: "incendiary 5.56 rifle ammo", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 4.40083979328165, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 4, category: "AmmoExplo", name: "incendiary pistol bullet", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 4.40083979328165, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 4, category: "AmmoExplo", name: "incendiary rocket", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 576.458333333333, qty_1_research: -1, justification: "crafting" },
{ csk: 4, category: "AmmoExplo", name: "mlrs aiming module", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 200, qty_1_research: -1, justification: "lone wolf poll" },
{ csk: 4, category: "AmmoExplo", name: "mlrs rocket", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 100, qty_1_research: -1, justification: "lone wolf poll" },
{ csk: 4, category: "AmmoExplo", name: "nailgun nails", no_qty: false, dep_per_day: 0, scrap_per: 0.0930232558139535, qty_1_research: -1, justification: "crafting" },
{ csk: 4, category: "AmmoExplo", name: "pistol bullet", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 2.14389534883721, qty_1_research: 50, justification: "crafting" },
{ csk: 4, category: "AmmoExplo", name: "rocket", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 277.827842377261, qty_1_research: -1, justification: "crafting" },
{ csk: 4, category: "AmmoExplo", name: "sam ammo", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 8.69791666666667, qty_1_research: 50, justification: "avg crafting and pricing" },
{ csk: 4, category: "AmmoExplo", name: "satchel charge", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 82.9011627906977, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 4, category: "AmmoExplo", name: "speargun spear", no_qty: false, dep_per_day: 0, scrap_per: 2.90697674418605, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 4, category: "AmmoExplo", name: "torpedo", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 23.6458333333333, qty_1_research: 50, justification: "avg crafting and pricing" },
{ csk: 5, category: "Attachments", name: "16x zoom scope", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 300, qty_1_research: -1, justification: "bandit pricing" },
{ csk: 5, category: "Attachments", name: "8x zoom scope", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 375, qty_1_research: -1, justification: "crafting" },
{ csk: 5, category: "Attachments", name: "burst module", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 75, qty_1_research: -1, justification: "2x recycling" },
{ csk: 5, category: "Attachments", name: "extended magazine", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 75, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 5, category: "Attachments", name: "holosight", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 115, qty_1_research: -1, justification: "crafting" },
{ csk: 5, category: "Attachments", name: "muzzle boost", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 75, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 5, category: "Attachments", name: "muzzle brake", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 60, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 5, category: "Attachments", name: "silencer", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 15, qty_1_research: 50, justification: "crafting" },
{ csk: 5, category: "Attachments", name: "simple handmade sight", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 45, qty_1_research: -1, justification: "crafting" },
{ csk: 5, category: "Attachments", name: "weapon flashlight", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 22.5, qty_1_research: 50, justification: "crafting" },
{ csk: 5, category: "Attachments", name: "weapon lasersight", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 47.5, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 6, category: "Guns", name: "assault rifle", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 659, qty_1_research: -1, justification: "crafting" },
{ csk: 6, category: "Guns", name: "bolt action rifle", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 325, qty_1_research: 333.333333333333, justification: "crafting" },
{ csk: 6, category: "Guns", name: "custom smg", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 160, qty_1_research: -1, justification: "crafting" },
{ csk: 6, category: "Guns", name: "double barrel shotgun", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 50.1744186046512, qty_1_research: 83.3333333333333, justification: "crafting, bandit pricing off 5x (ignored)" },
{ csk: 6, category: "Guns", name: "eoka", no_qty: false, dep_per_day: 0, scrap_per: 3.24418604651163, qty_1_research: -1, justification: "crafting" },
{ csk: 6, category: "Guns", name: "flame thrower", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 302.5, qty_1_research: -1, justification: "crafting" },
{ csk: 6, category: "Guns", name: "hmlmg", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 825, qty_1_research: -1, justification: "crafting" },
{ csk: 6, category: "Guns", name: "homing missile launcher", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 375, qty_1_research: -1, justification: "crafting" },
{ csk: 6, category: "Guns", name: "l96 rifle", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 406.25, qty_1_research: -1, justification: "125% bolt action" },
{ csk: 6, category: "Guns", name: "lr-300 assault rifle", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 500, qty_1_research: -1, justification: "bandit pricing" },
{ csk: 6, category: "Guns", name: "m249", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 1318, qty_1_research: -1, justification: "2x AK-47, per LW user poll" },
{ csk: 6, category: "Guns", name: "m39 rifle", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 400, qty_1_research: -1, justification: "bandit pricing" },
{ csk: 6, category: "Guns", name: "m92 pistol", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 200, qty_1_research: -1, justification: "avg recycling + bandit pricing" },
{ csk: 6, category: "Guns", name: "mp5a4", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 267.5, qty_1_research: 333.333333333333, justification: "crafting" },
{ csk: 6, category: "Guns", name: "multiple grenade launcher", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 275, qty_1_research: -1, justification: "2x recycling" },
{ csk: 6, category: "Guns", name: "nailgun", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 19.3604651162791, qty_1_research: -1, justification: "crafting" },
{ csk: 6, category: "Guns", name: "prototype 17", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 300, qty_1_research: -1, justification: "1.5 x m92" },
{ csk: 6, category: "Guns", name: "pump shotgun", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 207.5, qty_1_research: -1, justification: "crafting" },
{ csk: 6, category: "Guns", name: "python", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 190, qty_1_research: -1, justification: "crafting" },
{ csk: 6, category: "Guns", name: "revolver", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 30.3924418604651, qty_1_research: 50, justification: "crafting" },
{ csk: 6, category: "Guns", name: "rocket launcher", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 380, qty_1_research: -1, justification: "crafting" },
{ csk: 6, category: "Guns", name: "semi-automatic pistol", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 80, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 6, category: "Guns", name: "semi-automatic rifle", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 141.162790697674, qty_1_research: -1, justification: "crafting" },
{ csk: 6, category: "Guns", name: "spas-12 shotgun", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 250, qty_1_research: -1, justification: "bandit pricing" },
{ csk: 6, category: "Guns", name: "speargun", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 14.3604651162791, qty_1_research: -1, justification: "crafting" },
{ csk: 6, category: "Guns", name: "thompson", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 177, qty_1_research: -1, justification: "crafting" },
{ csk: 6, category: "Guns", name: "waterpipe shotgun", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 7.36046511627907, qty_1_research: 50, justification: "crafting" },
{ csk: 7, category: "PrimWeapons", name: "bone club", no_qty: false, dep_per_day: 0, scrap_per: 0.571428571428571, qty_1_research: -1, justification: "crafting" },
{ csk: 7, category: "PrimWeapons", name: "bone knife", no_qty: false, dep_per_day: 0, scrap_per: 0.857142857142857, qty_1_research: -1, justification: "crafting" },
{ csk: 7, category: "PrimWeapons", name: "combat knife", no_qty: false, dep_per_day: 0, scrap_per: 8.95348837209302, qty_1_research: -1, justification: "crafting" },
{ csk: 7, category: "PrimWeapons", name: "compound bow", no_qty: false, dep_per_day: 0, scrap_per: 10.3604651162791, qty_1_research: -1, justification: "crafting" },
{ csk: 7, category: "PrimWeapons", name: "crossbow", no_qty: false, dep_per_day: 0, scrap_per: 12.3604651162791, qty_1_research: -1, justification: "crafting" },
{ csk: 7, category: "PrimWeapons", name: "hunting bow", no_qty: false, dep_per_day: 0, scrap_per: 10.25, qty_1_research: -1, justification: "crafting" },
{ csk: 7, category: "PrimWeapons", name: "longsword", no_qty: false, dep_per_day: 0, scrap_per: 15.8139534883721, qty_1_research: -1, justification: "crafting" },
{ csk: 7, category: "PrimWeapons", name: "mace", no_qty: false, dep_per_day: 0, scrap_per: 4.90697674418605, qty_1_research: -1, justification: "crafting" },
{ csk: 7, category: "PrimWeapons", name: "machete", no_qty: false, dep_per_day: 0, scrap_per: 4.32558139534884, qty_1_research: -1, justification: "crafting" },
{ csk: 7, category: "PrimWeapons", name: "paddle", no_qty: false, dep_per_day: 0, scrap_per: 9.87209302325581, qty_1_research: -1, justification: "crafting" },
{ csk: 7, category: "PrimWeapons", name: "salvaged cleaver", no_qty: false, dep_per_day: 0, scrap_per: 22.906976744186, qty_1_research: -1, justification: "crafting" },
{ csk: 7, category: "PrimWeapons", name: "salvaged sword", no_qty: false, dep_per_day: 0, scrap_per: 5.87209302325581, qty_1_research: -1, justification: "crafting" },
{ csk: 7, category: "PrimWeapons", name: "stone spear", no_qty: false, dep_per_day: 0, scrap_per: 7, qty_1_research: -1, justification: "crafting" },
{ csk: 7, category: "PrimWeapons", name: "wooden spear", no_qty: false, dep_per_day: 0, scrap_per: 6, qty_1_research: -1, justification: "crafting" },
{ csk: 8, category: "Construction", name: "armored door", no_qty: false, dep_per_day: 0, scrap_per: 400, qty_1_research: -1, justification: "crafting" },
{ csk: 8, category: "Construction", name: "armored double door", no_qty: false, dep_per_day: 0, scrap_per: 437.5, qty_1_research: -1, justification: "crafting" },
{ csk: 8, category: "Construction", name: "barbed wooden barricade", no_qty: false, dep_per_day: 0, scrap_per: 10.906976744186, qty_1_research: 50, justification: "crafting" },
{ csk: 8, category: "Construction", name: "chainlink fence", no_qty: false, dep_per_day: 0, scrap_per: 4.36046511627907, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 8, category: "Construction", name: "chainlink fence gate", no_qty: false, dep_per_day: 0, scrap_per: 4.36046511627907, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 8, category: "Construction", name: "code lock", no_qty: false, dep_per_day: 0, scrap_per: 5.81395348837209, qty_1_research: -1, justification: "crafting" },
{ csk: 8, category: "Construction", name: "concrete barricade", no_qty: false, dep_per_day: 0, scrap_per: 10, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 8, category: "Construction", name: "floor grill", no_qty: false, dep_per_day: 0, scrap_per: 4.36046511627907, qty_1_research: 50, justification: "crafting" },
{ csk: 8, category: "Construction", name: "floor triangle grill", no_qty: false, dep_per_day: 0, scrap_per: 4.36046511627907, qty_1_research: 50, justification: "crafting" },
{ csk: 8, category: "Construction", name: "garage door", no_qty: false, dep_per_day: 0, scrap_per: 117.441860465116, qty_1_research: -1, justification: "crafting" },
{ csk: 8, category: "Construction", name: "high external stone gate", no_qty: false, dep_per_day: 0, scrap_per: 400, qty_1_research: -1, justification: "crafting" },
{ csk: 8, category: "Construction", name: "high external stone wall", no_qty: false, dep_per_day: 0, scrap_per: 75, qty_1_research: 333.333333333333, justification: "crafting" },
{ csk: 8, category: "Construction", name: "high external wooden gate", no_qty: false, dep_per_day: 0, scrap_per: 160, qty_1_research: -1, justification: "crafting" },
{ csk: 8, category: "Construction", name: "high external wooden wall", no_qty: false, dep_per_day: 0, scrap_per: 30, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 8, category: "Construction", name: "key lock", no_qty: false, dep_per_day: 0, scrap_per: 1.5, qty_1_research: -1, justification: "crafting" },
{ csk: 8, category: "Construction", name: "ladder hatch", no_qty: false, dep_per_day: 0, scrap_per: 179.441860465116, qty_1_research: -1, justification: "crafting" },
{ csk: 8, category: "Construction", name: "large water catcher", no_qty: false, dep_per_day: 0, scrap_per: 52.9915433403805, qty_1_research: -1, justification: "crafting" },
{ csk: 8, category: "Construction", name: "metal barricade", no_qty: false, dep_per_day: 0, scrap_per: 21.6279069767442, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 8, category: "Construction", name: "metal horizontal embrasure", no_qty: false, dep_per_day: 0, scrap_per: 5.81395348837209, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 8, category: "Construction", name: "metal shop front", no_qty: false, dep_per_day: 0, scrap_per: 14.5348837209302, qty_1_research: -1, justification: "crafting" },
{ csk: 8, category: "Construction", name: "metal vertical embrasure", no_qty: false, dep_per_day: 0, scrap_per: 5.81395348837209, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 8, category: "Construction", name: "metal window bars", no_qty: false, dep_per_day: 0, scrap_per: 1.45348837209302, qty_1_research: 50, justification: "crafting" },
{ csk: 8, category: "Construction", name: "netting", no_qty: false, dep_per_day: 0, scrap_per: 2, qty_1_research: -1, justification: "crafting" },
{ csk: 8, category: "Construction", name: "prison cell gate", no_qty: false, dep_per_day: 0, scrap_per: 8.72093023255814, qty_1_research: 50, justification: "crafting" },
{ csk: 8, category: "Construction", name: "prison cell wall", no_qty: false, dep_per_day: 0, scrap_per: 8.72093023255814, qty_1_research: 50, justification: "crafting" },
{ csk: 8, category: "Construction", name: "reinforced glass window", no_qty: false, dep_per_day: 0, scrap_per: 30, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 8, category: "Construction", name: "sandbag barricade", no_qty: false, dep_per_day: 0, scrap_per: 6.25, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 8, category: "Construction", name: "sheet metal door", no_qty: false, dep_per_day: 0, scrap_per: 8.72093023255814, qty_1_research: -1, justification: "crafting" },
{ csk: 8, category: "Construction", name: "sheet metal double door", no_qty: false, dep_per_day: 0, scrap_per: 11.6279069767442, qty_1_research: -1, justification: "crafting" },
{ csk: 8, category: "Construction", name: "shop front", no_qty: false, dep_per_day: 0, scrap_per: 3, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 8, category: "Construction", name: "small water catcher", no_qty: false, dep_per_day: 0, scrap_per: 20.5887949260042, qty_1_research: -1, justification: "crafting" },
{ csk: 8, category: "Construction", name: "stone barricade", no_qty: false, dep_per_day: 0, scrap_per: 5, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 8, category: "Construction", name: "strengthened glass window", no_qty: false, dep_per_day: 0, scrap_per: 2.90697674418605, qty_1_research: 50, justification: "crafting" },
{ csk: 8, category: "Construction", name: "tool cupboard", no_qty: false, dep_per_day: 0, scrap_per: 20, qty_1_research: -1, justification: "crafting" },
{ csk: 8, category: "Construction", name: "triangle ladder hatch", no_qty: false, dep_per_day: 0, scrap_per: 179.441860465116, qty_1_research: -1, justification: "crafting" },
{ csk: 8, category: "Construction", name: "watchtower", no_qty: false, dep_per_day: 0, scrap_per: 5, qty_1_research: 50, justification: "crafting" },
{ csk: 8, category: "Construction", name: "wood double door", no_qty: false, dep_per_day: 0, scrap_per: 7, qty_1_research: -1, justification: "crafting" },
{ csk: 8, category: "Construction", name: "wood shutters", no_qty: false, dep_per_day: 0, scrap_per: 4, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 8, category: "Construction", name: "wooden barricade", no_qty: false, dep_per_day: 0, scrap_per: 8, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 8, category: "Construction", name: "wooden barricade cover", no_qty: false, dep_per_day: 0, scrap_per: 5, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 8, category: "Construction", name: "wooden door", no_qty: false, dep_per_day: 0, scrap_per: 6, qty_1_research: -1, justification: "crafting" },
{ csk: 8, category: "Construction", name: "wooden ladder", no_qty: false, dep_per_day: 0, scrap_per: 12, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 8, category: "Construction", name: "wooden window bars", no_qty: false, dep_per_day: 0, scrap_per: 1, qty_1_research: -1, justification: "crafting" },
{ csk: 9, category: "Items", name: "barbecue", no_qty: false, dep_per_day: 0, scrap_per: 4.32558139534884, qty_1_research: -1, justification: "crafting" },
{ csk: 9, category: "Items", name: "bed", no_qty: false, dep_per_day: 0, scrap_per: 23.3139534883721, qty_1_research: 50, justification: "crafting" },
{ csk: 9, category: "Items", name: "chair", no_qty: false, dep_per_day: 0, scrap_per: 5.36046511627907, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 9, category: "Items", name: "chinese lantern", no_qty: false, dep_per_day: 0, scrap_per: 5.625, qty_1_research: -1, justification: "crafting" },
{ csk: 9, category: "Items", name: "christmas door wreath", no_qty: false, dep_per_day: 0, scrap_per: 2.5, qty_1_research: -1, justification: "crafting" },
{ csk: 9, category: "Items", name: "christmas lights", no_qty: false, dep_per_day: 0, scrap_per: 11.453488372093, qty_1_research: -1, justification: "crafting" },
{ csk: 9, category: "Items", name: "composter", no_qty: false, dep_per_day: 0, scrap_per: 35.3636363636364, qty_1_research: -1, justification: "crafting" },
{ csk: 9, category: "Items", name: "dragon door knocker", no_qty: false, dep_per_day: 0, scrap_per: 1.16279069767442, qty_1_research: -1, justification: "crafting" },
{ csk: 9, category: "Items", name: "drop box", no_qty: false, dep_per_day: 0, scrap_per: 11.6279069767442, qty_1_research: 50, justification: "crafting" },
{ csk: 9, category: "Items", name: "easter door wreath", no_qty: false, dep_per_day: 0, scrap_per: 2.5, qty_1_research: -1, justification: "crafting" },
{ csk: 9, category: "Items", name: "festive doorway garland", no_qty: false, dep_per_day: 0, scrap_per: 3.125, qty_1_research: -1, justification: "crafting" },
{ csk: 9, category: "Items", name: "festive double doorway garland", no_qty: false, dep_per_day: 0, scrap_per: 3.125, qty_1_research: -1, justification: "crafting" },
{ csk: 9, category: "Items", name: "festive window garland", no_qty: false, dep_per_day: 0, scrap_per: 3.125, qty_1_research: -1, justification: "crafting" },
{ csk: 9, category: "Items", name: "fridge", no_qty: false, dep_per_day: 0, scrap_per: 4.36046511627907, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 9, category: "Items", name: "furnace", no_qty: false, dep_per_day: 0, scrap_per: 37, qty_1_research: -1, justification: "crafting" },
{ csk: 9, category: "Items", name: "lantern", no_qty: false, dep_per_day: 0, scrap_per: 8.95348837209302, qty_1_research: -1, justification: "crafting" },
{ csk: 9, category: "Items", name: "large furnace", no_qty: false, dep_per_day: 0, scrap_per: 74.5, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 9, category: "Items", name: "large planter box", no_qty: false, dep_per_day: 0, scrap_per: 35.3636363636364, qty_1_research: -1, justification: "crafting" },
{ csk: 9, category: "Items", name: "large wood box", no_qty: false, dep_per_day: 0, scrap_per: 7.90697674418605, qty_1_research: -1, justification: "crafting" },
{ csk: 9, category: "Items", name: "locker", no_qty: false, dep_per_day: 0, scrap_per: 6.81395348837209, qty_1_research: 50, justification: "crafting" },
{ csk: 9, category: "Items", name: "mixing table", no_qty: false, dep_per_day: 0, scrap_per: 16.6279069767442, qty_1_research: 50, justification: "crafting" },
{ csk: 9, category: "Items", name: "pookie bear", no_qty: false, dep_per_day: 0, scrap_per: 100, qty_1_research: -1, justification: "guess" },
{ csk: 9, category: "Items", name: "repair bench", no_qty: false, dep_per_day: 0, scrap_per: 7.26744186046512, qty_1_research: -1, justification: "crafting" },
{ csk: 9, category: "Items", name: "research table", no_qty: false, dep_per_day: 0, scrap_per: 31.6279069767442, qty_1_research: -1, justification: "crafting" },
{ csk: 9, category: "Items", name: "rug", no_qty: false, dep_per_day: 0, scrap_per: 3.125, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 9, category: "Items", name: "rug bear skin", no_qty: false, dep_per_day: 0, scrap_per: 5, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 9, category: "Items", name: "skull door knocker", no_qty: false, dep_per_day: 0, scrap_per: 1.16279069767442, qty_1_research: -1, justification: "crafting" },
{ csk: 9, category: "Items", name: "skull fire pit", no_qty: false, dep_per_day: 0, scrap_per: 2.57142857142857, qty_1_research: -1, justification: "crafting" },
{ csk: 9, category: "Items", name: "sleeping bag", no_qty: false, dep_per_day: 0, scrap_per: 3.75, qty_1_research: -1, justification: "crafting" },
{ csk: 9, category: "Items", name: "small oil refinery", no_qty: false, dep_per_day: 0, scrap_per: 125, qty_1_research: -1, justification: "outpost pricing" },
{ csk: 9, category: "Items", name: "small planter box", no_qty: false, dep_per_day: 0, scrap_per: 17.6818181818182, qty_1_research: -1, justification: "crafting" },
{ csk: 9, category: "Items", name: "sofa", no_qty: false, dep_per_day: 0, scrap_per: 5.75, qty_1_research: -1, justification: "crafting" },
{ csk: 9, category: "Items", name: "vending machine", no_qty: false, dep_per_day: 0, scrap_per: 300, qty_1_research: -1, justification: "crafting" },
{ csk: 9, category: "Items", name: "water barrel", no_qty: false, dep_per_day: 0, scrap_per: 20.6818181818182, qty_1_research: -1, justification: "crafting" },
{ csk: 9, category: "Items", name: "wood storage box", no_qty: false, dep_per_day: 0, scrap_per: 2, qty_1_research: -1, justification: "crafting" },
{ csk: 9, category: "Items", name: "workbench level 1", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 65.8139534883721, qty_1_research: -1, justification: "crafting" },
{ csk: 9, category: "Items", name: "workbench level 2", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 679.06976744186, qty_1_research: -1, justification: "crafting" },
{ csk: 9, category: "Items", name: "workbench level 3", no_qty: false, dep_per_day: 0.0142857142857143, scrap_per: 2058.13953488372, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "bandana mask", no_qty: false, dep_per_day: 0, scrap_per: 0.625, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "baseball cap", no_qty: false, dep_per_day: 0, scrap_per: 0.625, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "basic horse shoes", no_qty: false, dep_per_day: 0, scrap_per: 2.90697674418605, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "beenie hat", no_qty: false, dep_per_day: 0, scrap_per: 1.875, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "bone armor", no_qty: false, dep_per_day: 0, scrap_per: 3.875, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "bone helmet", no_qty: false, dep_per_day: 0, scrap_per: 2.73214285714286, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "boonie hat", no_qty: false, dep_per_day: 0, scrap_per: 1.25, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "boots", no_qty: false, dep_per_day: 0, scrap_per: 10.8720930232558, qty_1_research: 50, justification: "crafting" },
{ csk: 10, category: "Attire", name: "bucket helmet", no_qty: false, dep_per_day: 0, scrap_per: 2.03488372093023, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "burlap gloves", no_qty: false, dep_per_day: 0, scrap_per: 0.625, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "burlap headwrap", no_qty: false, dep_per_day: 0, scrap_per: 1.25, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "burlap shirt", no_qty: false, dep_per_day: 0, scrap_per: 2.5, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "burlap shoes", no_qty: false, dep_per_day: 0, scrap_per: 1.25, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "burlap trousers", no_qty: false, dep_per_day: 0, scrap_per: 2.5, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "candle hat", no_qty: false, dep_per_day: 0, scrap_per: 4.375, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "clatter helmet", no_qty: false, dep_per_day: 0, scrap_per: 2.03488372093023, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "coffee can helmet", no_qty: false, dep_per_day: 0, scrap_per: 10.3633720930233, qty_1_research: 50, justification: "crafting" },
{ csk: 10, category: "Attire", name: "diving fins", no_qty: false, dep_per_day: 0, scrap_per: 25, qty_1_research: -1, justification: "fishing village pricing" },
{ csk: 10, category: "Attire", name: "diving mask", no_qty: false, dep_per_day: 0, scrap_per: 15, qty_1_research: -1, justification: "fishing village pricing" },
{ csk: 10, category: "Attire", name: "diving tank", no_qty: false, dep_per_day: 0, scrap_per: 35, qty_1_research: -1, justification: "fishing village pricing" },
{ csk: 10, category: "Attire", name: "dragon mask", no_qty: false, dep_per_day: 0, scrap_per: 25, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "frog boots", no_qty: false, dep_per_day: 0, scrap_per: 15.6818181818182, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "hazmat suit", no_qty: false, dep_per_day: 0, scrap_per: 148.409090909091, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "headset", no_qty: false, dep_per_day: 0, scrap_per: 1.25, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "heavy plate helmet", no_qty: false, dep_per_day: 0, scrap_per: 50, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 10, category: "Attire", name: "heavy plate jacket", no_qty: false, dep_per_day: 0, scrap_per: 70, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 10, category: "Attire", name: "heavy plate pants", no_qty: false, dep_per_day: 0, scrap_per: 50, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 10, category: "Attire", name: "hide boots", no_qty: false, dep_per_day: 0, scrap_per: 2.5, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "hide halterneck", no_qty: false, dep_per_day: 0, scrap_per: 2.5, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "hide pants", no_qty: false, dep_per_day: 0, scrap_per: 2.5, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "hide poncho", no_qty: false, dep_per_day: 0, scrap_per: 3.75, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "hide skirt", no_qty: false, dep_per_day: 0, scrap_per: 2.5, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "hide vest", no_qty: false, dep_per_day: 0, scrap_per: 2.5, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "high quality horse shoes", no_qty: false, dep_per_day: 0, scrap_per: 30, qty_1_research: 50, justification: "crafting" },
{ csk: 10, category: "Attire", name: "hoodie", no_qty: false, dep_per_day: 0, scrap_per: 10, qty_1_research: 50, justification: "crafting" },
{ csk: 10, category: "Attire", name: "horse saddle", no_qty: false, dep_per_day: 0, scrap_per: 75, qty_1_research: -1, justification: "barn/ranch pricing" },
{ csk: 10, category: "Attire", name: "improvised balaclava", no_qty: false, dep_per_day: 0, scrap_per: 1.875, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "jacket", no_qty: false, dep_per_day: 0, scrap_per: 16.25, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "leather gloves", no_qty: false, dep_per_day: 0, scrap_per: 10, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 10, category: "Attire", name: "longsleeve t-shirt", no_qty: false, dep_per_day: 0, scrap_per: 3.75, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "metal chest plate", no_qty: false, dep_per_day: 0, scrap_per: 240, qty_1_research: 333.333333333333, justification: "crafting" },
{ csk: 10, category: "Attire", name: "metal facemask", no_qty: false, dep_per_day: 0, scrap_per: 155, qty_1_research: 333.333333333333, justification: "crafting" },
{ csk: 10, category: "Attire", name: "miners hat", no_qty: false, dep_per_day: 0, scrap_per: 9.78197674418605, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 10, category: "Attire", name: "night vision goggles", no_qty: false, dep_per_day: 0, scrap_per: 125, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "ox mask", no_qty: false, dep_per_day: 0, scrap_per: 1.82142857142857, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "pants", no_qty: false, dep_per_day: 0, scrap_per: 10, qty_1_research: 50, justification: "crafting" },
{ csk: 10, category: "Attire", name: "parachute", no_qty: false, dep_per_day: 0, scrap_per: 47.6136363636364, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 10, category: "Attire", name: "rabbit mask", no_qty: false, dep_per_day: 0, scrap_per: 1.82142857142857, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "rat mask", no_qty: false, dep_per_day: 0, scrap_per: 1.82142857142857, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "riot helmet", no_qty: false, dep_per_day: 0, scrap_per: 4.15697674418605, qty_1_research: 50, justification: "crafting" },
{ csk: 10, category: "Attire", name: "road sign gloves", no_qty: false, dep_per_day: 0, scrap_per: 35, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "road sign horse armor", no_qty: false, dep_per_day: 0, scrap_per: 90, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "road sign jacket", no_qty: false, dep_per_day: 0, scrap_per: 55, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "road sign kilt", no_qty: false, dep_per_day: 0, scrap_per: 32.5, qty_1_research: 50, justification: "crafting" },
{ csk: 10, category: "Attire", name: "saddle bag", no_qty: false, dep_per_day: 0, scrap_per: 5, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "santa beard", no_qty: false, dep_per_day: 0, scrap_per: 1.25, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "shirt", no_qty: false, dep_per_day: 0, scrap_per: 3.125, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "shorts", no_qty: false, dep_per_day: 0, scrap_per: 3.75, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "snow jacket", no_qty: false, dep_per_day: 0, scrap_per: 12.5, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 10, category: "Attire", name: "snowman helmet", no_qty: false, dep_per_day: 0, scrap_per: 1.25, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "sunglasses", no_qty: false, dep_per_day: 0, scrap_per: 1.74418604651163, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "tactical gloves", no_qty: false, dep_per_day: 0, scrap_per: 40, qty_1_research: -1, justification: "outpost pricing" },
{ csk: 10, category: "Attire", name: "tank top", no_qty: false, dep_per_day: 0, scrap_per: 2.5, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "tiger mask", no_qty: false, dep_per_day: 0, scrap_per: 1.82142857142857, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "t-shirt", no_qty: false, dep_per_day: 0, scrap_per: 3.125, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "wetsuit", no_qty: false, dep_per_day: 0, scrap_per: 20, qty_1_research: -1, justification: "fishing village pricing" },
{ csk: 10, category: "Attire", name: "wolf headdress", no_qty: false, dep_per_day: 0, scrap_per: 1.82142857142857, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "wood armor helmet", no_qty: false, dep_per_day: 0, scrap_per: 5.875, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "wood armor pants", no_qty: false, dep_per_day: 0, scrap_per: 6, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "wood chestplate", no_qty: false, dep_per_day: 0, scrap_per: 8, qty_1_research: -1, justification: "crafting" },
{ csk: 10, category: "Attire", name: "wooded horse armor", no_qty: false, dep_per_day: 0, scrap_per: 10, qty_1_research: -1, justification: "crafting" },
{ csk: 11, category: "MedTeas", name: "advanced anti-rad tea", no_qty: false, dep_per_day: 0, scrap_per: 1.25, qty_1_research: -1, justification: "nobody wants this" },
{ csk: 11, category: "MedTeas", name: "advanced healing tea", no_qty: false, dep_per_day: 0, scrap_per: 18.75, qty_1_research: -1, justification: "PD's pricing" },
{ csk: 11, category: "MedTeas", name: "advanced max health tea", no_qty: false, dep_per_day: 0, scrap_per: 28.125, qty_1_research: -1, justification: "PD's pricing" },
{ csk: 11, category: "MedTeas", name: "advanced ore tea", no_qty: false, dep_per_day: 0, scrap_per: 28.125, qty_1_research: -1, justification: "PD's pricing" },
{ csk: 11, category: "MedTeas", name: "advanced scrap tea", no_qty: false, dep_per_day: 0, scrap_per: 18.75, qty_1_research: -1, justification: "PD's pricing" },
{ csk: 11, category: "MedTeas", name: "advanced wood tea", no_qty: false, dep_per_day: 0, scrap_per: 18.75, qty_1_research: -1, justification: "PD's pricing" },
{ csk: 11, category: "MedTeas", name: "anti-radiation pills", no_qty: false, dep_per_day: 0, scrap_per: 1, qty_1_research: -1, justification: "bandit pricing" },
{ csk: 11, category: "MedTeas", name: "bandage", no_qty: false, dep_per_day: 0, scrap_per: 0.5, qty_1_research: -1, justification: "crafting" },
{ csk: 11, category: "MedTeas", name: "basic anti-rad tea", no_qty: false, dep_per_day: 0, scrap_per: 0.3125, qty_1_research: -1, justification: "nobody wants this" },
{ csk: 11, category: "MedTeas", name: "basic healing tea", no_qty: false, dep_per_day: 0, scrap_per: 4.6875, qty_1_research: -1, justification: "PD's pricing" },
{ csk: 11, category: "MedTeas", name: "basic max health tea", no_qty: false, dep_per_day: 0, scrap_per: 7.03125, qty_1_research: -1, justification: "PD's pricing" },
{ csk: 11, category: "MedTeas", name: "basic ore tea", no_qty: false, dep_per_day: 0, scrap_per: 7.03125, qty_1_research: -1, justification: "PD's pricing" },
{ csk: 11, category: "MedTeas", name: "basic scrap tea", no_qty: false, dep_per_day: 0, scrap_per: 4.6875, qty_1_research: -1, justification: "PD's pricing" },
{ csk: 11, category: "MedTeas", name: "basic wood tea", no_qty: false, dep_per_day: 0, scrap_per: 4.6875, qty_1_research: -1, justification: "PD's pricing" },
{ csk: 11, category: "MedTeas", name: "large medkit", no_qty: false, dep_per_day: 0, scrap_per: 19.9127906976744, qty_1_research: 50, justification: "crafting" },
{ csk: 11, category: "MedTeas", name: "medical syringe", no_qty: false, dep_per_day: 0, scrap_per: 7.45639534883721, qty_1_research: 50, justification: "crafting" },
{ csk: 11, category: "MedTeas", name: "pure anti-rad tea", no_qty: false, dep_per_day: 0, scrap_per: 5, qty_1_research: -1, justification: "nobody wants this" },
{ csk: 11, category: "MedTeas", name: "pure healing tea", no_qty: false, dep_per_day: 0, scrap_per: 75, qty_1_research: -1, justification: "PD's pricing" },
{ csk: 11, category: "MedTeas", name: "pure max health tea", no_qty: false, dep_per_day: 0, scrap_per: 112.5, qty_1_research: -1, justification: "PD's pricing" },
{ csk: 11, category: "MedTeas", name: "pure ore tea", no_qty: false, dep_per_day: 0, scrap_per: 112.5, qty_1_research: -1, justification: "PD's pricing" },
{ csk: 11, category: "MedTeas", name: "pure scrap tea", no_qty: false, dep_per_day: 0, scrap_per: 75, qty_1_research: -1, justification: "PD's pricing" },
{ csk: 11, category: "MedTeas", name: "pure wood tea", no_qty: false, dep_per_day: 0, scrap_per: 75, qty_1_research: -1, justification: "PD's pricing" },
{ csk: 12, category: "Food", name: "anchovy", no_qty: false, dep_per_day: 0, scrap_per: 1.70380952380952, qty_1_research: -1, justification: "bait + gut value" },
{ csk: 12, category: "Food", name: "apple", no_qty: false, dep_per_day: 0, scrap_per: 0.410222222222222, qty_1_research: -1, justification: "nutritive value vs corn/tuna" },
{ csk: 12, category: "Food", name: "black raspberries", no_qty: false, dep_per_day: 0, scrap_per: 3.09066666666667, qty_1_research: -1, justification: "nutritive value vs corn/tuna" },
{ csk: 12, category: "Food", name: "blue berry", no_qty: false, dep_per_day: 0, scrap_per: 1.46484375, qty_1_research: -1, justification: "based on tea values" },
{ csk: 12, category: "Food", name: "blueberries", no_qty: false, dep_per_day: 0, scrap_per: 3.07466666666667, qty_1_research: -1, justification: "nutritive value vs corn/tuna" },
{ csk: 12, category: "Food", name: "cactus flesh", no_qty: false, dep_per_day: 0, scrap_per: 0.341333333333333, qty_1_research: -1, justification: "nutritive value vs corn/tuna" },
{ csk: 12, category: "Food", name: "can of beans", no_qty: false, dep_per_day: 0, scrap_per: 0.584444444444444, qty_1_research: -1, justification: "nutritive value vs corn/tuna" },
{ csk: 12, category: "Food", name: "can of tuna", no_qty: false, dep_per_day: 0, scrap_per: 2, qty_1_research: -1, justification: "bandit pricing" },
{ csk: 12, category: "Food", name: "catfish", no_qty: false, dep_per_day: 0, scrap_per: 32.5, qty_1_research: -1, justification: "fishing village pricing" },
{ csk: 12, category: "Food", name: "chocolate bar", no_qty: false, dep_per_day: 0, scrap_per: 0.234222222222222, qty_1_research: -1, justification: "nutritive value vs corn/tuna" },
{ csk: 12, category: "Food", name: "cooked bear meat", no_qty: false, dep_per_day: 0, scrap_per: 0.327555555555556, qty_1_research: -1, justification: "nutritive value vs corn/tuna" },
{ csk: 12, category: "Food", name: "cooked chicken", no_qty: false, dep_per_day: 0, scrap_per: 0.411111111111111, qty_1_research: -1, justification: "nutritive value vs corn/tuna" },
{ csk: 12, category: "Food", name: "cooked deer meat", no_qty: false, dep_per_day: 0, scrap_per: 0.411111111111111, qty_1_research: -1, justification: "nutritive value vs corn/tuna" },
{ csk: 12, category: "Food", name: "cooked fish", no_qty: false, dep_per_day: 0, scrap_per: 0.431555555555556, qty_1_research: -1, justification: "nutritive value vs corn/tuna" },
{ csk: 12, category: "Food", name: "cooked horse meat", no_qty: false, dep_per_day: 0, scrap_per: 0.356888888888889, qty_1_research: -1, justification: "nutritive value vs corn/tuna" },
{ csk: 12, category: "Food", name: "cooked human meat", no_qty: false, dep_per_day: 0, scrap_per: 0, qty_1_research: -1, justification: "nutritive value vs corn/tuna" },
{ csk: 12, category: "Food", name: "cooked pork", no_qty: false, dep_per_day: 0, scrap_per: 0.263555555555556, qty_1_research: -1, justification: "nutritive value vs corn/tuna" },
{ csk: 12, category: "Food", name: "cooked wolf meat", no_qty: false, dep_per_day: 0, scrap_per: 0.263555555555556, qty_1_research: -1, justification: "nutritive value vs corn/tuna" },
{ csk: 12, category: "Food", name: "corn", no_qty: false, dep_per_day: 0, scrap_per: 0.125, qty_1_research: -1, justification: "bandit pricing" },
{ csk: 12, category: "Food", name: "granola bar", no_qty: false, dep_per_day: 0, scrap_per: 0.251555555555556, qty_1_research: -1, justification: "nutritive value vs corn/tuna" },
{ csk: 12, category: "Food", name: "green berry", no_qty: false, dep_per_day: 0, scrap_per: 0.078125, qty_1_research: -1, justification: "based on tea values" },
{ csk: 12, category: "Food", name: "grub", no_qty: false, dep_per_day: 0, scrap_per: 0.2448, qty_1_research: -1, justification: "nutritive value vs corn/tuna" },
{ csk: 12, category: "Food", name: "herring", no_qty: false, dep_per_day: 0, scrap_per: 2.2952380952381, qty_1_research: -1, justification: "bait + gut value" },
{ csk: 12, category: "Food", name: "minnows", no_qty: false, dep_per_day: 0, scrap_per: 0.179111111111111, qty_1_research: -1, justification: "nutritive value vs corn/tuna" },
{ csk: 12, category: "Food", name: "mushroom", no_qty: false, dep_per_day: 0, scrap_per: 0.177333333333333, qty_1_research: -1, justification: "nutritive value vs corn/tuna" },
{ csk: 12, category: "Food", name: "orange roughy", no_qty: false, dep_per_day: 0, scrap_per: 37.5, qty_1_research: -1, justification: "fishing village pricing" },
{ csk: 12, category: "Food", name: "pickles", no_qty: false, dep_per_day: 0, scrap_per: 0.166666666666667, qty_1_research: -1, justification: "bandit pricing" },
{ csk: 12, category: "Food", name: "potato", no_qty: false, dep_per_day: 0, scrap_per: 0.25, qty_1_research: -1, justification: "PD's pricing" },
{ csk: 12, category: "Food", name: "pumpkin", no_qty: false, dep_per_day: 0, scrap_per: 1, qty_1_research: -1, justification: "PD's pricing" },
{ csk: 12, category: "Food", name: "raw bear meat", no_qty: false, dep_per_day: 0, scrap_per: 0.589777777777778, qty_1_research: -1, justification: "nutritive value vs corn/tuna" },
{ csk: 12, category: "Food", name: "raw chicken breast", no_qty: false, dep_per_day: 0, scrap_per: 0.352, qty_1_research: -1, justification: "nutritive value vs corn/tuna" },
{ csk: 12, category: "Food", name: "raw deer meat", no_qty: false, dep_per_day: 0, scrap_per: 0.352, qty_1_research: -1, justification: "nutritive value vs corn/tuna" },
{ csk: 12, category: "Food", name: "raw fish", no_qty: false, dep_per_day: 0, scrap_per: 0.62, qty_1_research: -1, justification: "nutritive value vs corn/tuna" },
{ csk: 12, category: "Food", name: "raw horse meat", no_qty: false, dep_per_day: 0, scrap_per: 0.352, qty_1_research: -1, justification: "nutritive value vs corn/tuna" },
{ csk: 12, category: "Food", name: "raw human meat", no_qty: false, dep_per_day: 0, scrap_per: 0, qty_1_research: -1, justification: "nutritive value vs corn/tuna" },
{ csk: 12, category: "Food", name: "raw pork", no_qty: false, dep_per_day: 0, scrap_per: 0.633777777777778, qty_1_research: -1, justification: "nutritive value vs corn/tuna" },
{ csk: 12, category: "Food", name: "raw wolf meat", no_qty: false, dep_per_day: 0, scrap_per: 0.352, qty_1_research: -1, justification: "nutritive value vs corn/tuna" },
{ csk: 12, category: "Food", name: "red berry", no_qty: false, dep_per_day: 0, scrap_per: 1.044921875, qty_1_research: -1, justification: "based on tea values" },
{ csk: 12, category: "Food", name: "salmon", no_qty: false, dep_per_day: 0, scrap_per: 27.5, qty_1_research: -1, justification: "fishing village pricing" },
{ csk: 12, category: "Food", name: "sardine", no_qty: false, dep_per_day: 0, scrap_per: 4.34190476190476, qty_1_research: -1, justification: "nutritive value vs corn/tuna" },
{ csk: 12, category: "Food", name: "small shark", no_qty: false, dep_per_day: 0, scrap_per: 45, qty_1_research: -1, justification: "fishing village pricing" },
{ csk: 12, category: "Food", name: "small trout", no_qty: false, dep_per_day: 0, scrap_per: 6, qty_1_research: -1, justification: "fishing village pricing" },
{ csk: 12, category: "Food", name: "small water bottle", no_qty: false, dep_per_day: 0, scrap_per: 1.44, qty_1_research: -1, justification: "hydrative value" },
{ csk: 12, category: "Food", name: "water jug", no_qty: false, dep_per_day: 0, scrap_per: 2.90697674418605, qty_1_research: -1, justification: "recycling" },
{ csk: 12, category: "Food", name: "white berry", no_qty: false, dep_per_day: 0, scrap_per: 1.171875, qty_1_research: -1, justification: "based on tea values" },
{ csk: 12, category: "Food", name: "worm", no_qty: false, dep_per_day: 0, scrap_per: 0.1816, qty_1_research: -1, justification: "nutritive value (shop pricing off by 50x -- ignored)" },
{ csk: 12, category: "Food", name: "yellow berry", no_qty: false, dep_per_day: 0, scrap_per: 1.5625, qty_1_research: -1, justification: "based on tea values" },
{ csk: 12, category: "Food", name: "yellow perch", no_qty: false, dep_per_day: 0, scrap_per: 10, qty_1_research: -1, justification: "fishing village pricing" },
{ csk: 13, category: "Traps", name: "flame turret", no_qty: false, dep_per_day: 0, scrap_per: 81.6279069767442, qty_1_research: -1, justification: "crafting" },
{ csk: 13, category: "Traps", name: "homemade landmine", no_qty: false, dep_per_day: 0, scrap_per: 12.281976744186, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 13, category: "Traps", name: "sam site", no_qty: false, dep_per_day: 0, scrap_per: 500, qty_1_research: -1, justification: "outpost pricing" },
{ csk: 13, category: "Traps", name: "shotgun trap", no_qty: false, dep_per_day: 0, scrap_per: 128.53488372093, qty_1_research: -1, justification: "crafting" },
{ csk: 13, category: "Traps", name: "snap trap", no_qty: false, dep_per_day: 0, scrap_per: 52.906976744186, qty_1_research: -1, justification: "crafting" },
{ csk: 13, category: "Traps", name: "wooden floor spikes", no_qty: false, dep_per_day: 0, scrap_per: 3, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 14, category: "Misc", name: "blue keycard", no_qty: false, dep_per_day: 0, scrap_per: 100, qty_1_research: -1, justification: "bandit pricing" },
{ csk: 14, category: "Misc", name: "fogger-3000", no_qty: false, dep_per_day: 0, scrap_per: 40.8139534883721, qty_1_research: -1, justification: "crafting" },
{ csk: 14, category: "Misc", name: "green keycard", no_qty: false, dep_per_day: 0, scrap_per: 37.5, qty_1_research: -1, justification: "bandit pricing (ratio based on blue card buy vs sell)" },
{ csk: 14, category: "Misc", name: "hot air balloon armor", no_qty: false, dep_per_day: 0, scrap_per: 11.6279069767442, qty_1_research: -1, justification: "crafting" },
{ csk: 14, category: "Misc", name: "note", no_qty: false, dep_per_day: 0, scrap_per: 0.2, qty_1_research: -1, justification: "crafting" },
{ csk: 14, category: "Misc", name: "red keycard", no_qty: false, dep_per_day: 0, scrap_per: 200, qty_1_research: -1, justification: "bandit pricing (ratio based on blue card buy vs sell)" },
{ csk: 14, category: "Misc", name: "snow machine", no_qty: false, dep_per_day: 0, scrap_per: 42.2674418604651, qty_1_research: -1, justification: "crafting" },
{ csk: 14, category: "Misc", name: "spooky speaker", no_qty: false, dep_per_day: 0, scrap_per: 16.3139534883721, qty_1_research: -1, justification: "crafting" },
{ csk: 15, category: "Farming", name: "blue berry clone", no_qty: true, dep_per_day: 0, scrap_per: 187.5, qty_1_research: -1, justification: "PD's Pricing, takes into account breeding effort" },
{ csk: 15, category: "Farming", name: "blue berry seed", no_qty: false, dep_per_day: 0, scrap_per: 0.5, qty_1_research: -1, justification: "Same as Corn" },
{ csk: 15, category: "Farming", name: "corn clone", no_qty: true, dep_per_day: 0, scrap_per: 187.5, qty_1_research: -1, justification: "PD's Pricing, takes into account breeding effort" },
{ csk: 15, category: "Farming", name: "corn seed", no_qty: false, dep_per_day: 0, scrap_per: 0.5, qty_1_research: -1, justification: "Bandit Pricing" },
{ csk: 15, category: "Farming", name: "green berry clone", no_qty: true, dep_per_day: 0, scrap_per: 187.5, qty_1_research: -1, justification: "PD's Pricing, takes into account breeding effort" },
{ csk: 15, category: "Farming", name: "green berry seed", no_qty: false, dep_per_day: 0, scrap_per: 0.3125, qty_1_research: -1, justification: "Nobody Wants This" },
{ csk: 15, category: "Farming", name: "hemp clone", no_qty: true, dep_per_day: 0, scrap_per: 187.5, qty_1_research: -1, justification: "PD's Pricing, takes into account breeding effort" },
{ csk: 15, category: "Farming", name: "hemp seed", no_qty: false, dep_per_day: 0, scrap_per: 0.75, qty_1_research: -1, justification: "Rarity (hemp clones produce no seeds)" },
{ csk: 15, category: "Farming", name: "potato clone", no_qty: true, dep_per_day: 0, scrap_per: 187.5, qty_1_research: -1, justification: "PD's Pricing, takes into account breeding effort" },
{ csk: 15, category: "Farming", name: "potato seed", no_qty: false, dep_per_day: 0, scrap_per: 0.5, qty_1_research: -1, justification: "Same as Corn" },
{ csk: 15, category: "Farming", name: "pumpkin clone", no_qty: true, dep_per_day: 0, scrap_per: 187.5, qty_1_research: -1, justification: "PD's Pricing, takes into account breeding effort" },
{ csk: 15, category: "Farming", name: "pumpkin seed", no_qty: false, dep_per_day: 0, scrap_per: 0.5, qty_1_research: -1, justification: "Same as Corn" },
{ csk: 15, category: "Farming", name: "red berry clone", no_qty: true, dep_per_day: 0, scrap_per: 187.5, qty_1_research: -1, justification: "PD's Pricing, takes into account breeding effort" },
{ csk: 15, category: "Farming", name: "red berry seed", no_qty: false, dep_per_day: 0, scrap_per: 0.5, qty_1_research: -1, justification: "Same as Corn" },
{ csk: 15, category: "Farming", name: "white berry clone", no_qty: true, dep_per_day: 0, scrap_per: 187.5, qty_1_research: -1, justification: "PD's Pricing, takes into account breeding effort" },
{ csk: 15, category: "Farming", name: "white berry seed", no_qty: false, dep_per_day: 0, scrap_per: 0.5, qty_1_research: -1, justification: "Same as Corn" },
{ csk: 15, category: "Farming", name: "yellow berry clone", no_qty: true, dep_per_day: 0, scrap_per: 187.5, qty_1_research: -1, justification: "PD's Pricing, takes into account breeding effort" },
{ csk: 15, category: "Farming", name: "yellow berry seed", no_qty: false, dep_per_day: 0, scrap_per: 0.5, qty_1_research: -1, justification: "Same as Corn" },
{ csk: 16, category: "Automotive", name: "armored cockpit vehicle module", no_qty: false, dep_per_day: 0, scrap_per: 46.2209302325581, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 16, category: "Automotive", name: "armored passenger vehicle module", no_qty: false, dep_per_day: 0, scrap_per: 46.2209302325581, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 16, category: "Automotive", name: "camper vehicle module", no_qty: false, dep_per_day: 0, scrap_per: 12.6744186046512, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 16, category: "Automotive", name: "cockpit vehicle module", no_qty: false, dep_per_day: 0, scrap_per: 10.7209302325581, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 16, category: "Automotive", name: "cockpit with engine vehicle module", no_qty: false, dep_per_day: 0, scrap_per: 48.2209302325581, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 16, category: "Automotive", name: "engine vehicle module", no_qty: false, dep_per_day: 0, scrap_per: 28.3139534883721, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 16, category: "Automotive", name: "flatbed vehicle module", no_qty: false, dep_per_day: 0, scrap_per: 7.81395348837209, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 16, category: "Automotive", name: "fuel tank vehicle module", no_qty: false, dep_per_day: 0, scrap_per: 12.1744186046512, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 16, category: "Automotive", name: "high quality carburetor", no_qty: false, dep_per_day: 0, scrap_per: 9.88372093023256, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 16, category: "Automotive", name: "high quality crankshaft", no_qty: false, dep_per_day: 0, scrap_per: 6.97674418604651, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 16, category: "Automotive", name: "high quality pistons", no_qty: false, dep_per_day: 0, scrap_per: 6.97674418604651, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 16, category: "Automotive", name: "high quality spark plugs", no_qty: false, dep_per_day: 0, scrap_per: 6.97674418604651, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 16, category: "Automotive", name: "high quality valves", no_qty: false, dep_per_day: 0, scrap_per: 6.97674418604651, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 16, category: "Automotive", name: "large flatbed vehicle module", no_qty: false, dep_per_day: 0, scrap_per: 11.7209302325581, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 16, category: "Automotive", name: "low quality carburetor", no_qty: false, dep_per_day: 0, scrap_per: 2.32558139534884, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 16, category: "Automotive", name: "low quality crankshaft", no_qty: false, dep_per_day: 0, scrap_per: 1.45348837209302, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 16, category: "Automotive", name: "low quality pistons", no_qty: false, dep_per_day: 0, scrap_per: 1.45348837209302, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 16, category: "Automotive", name: "low quality spark plugs", no_qty: false, dep_per_day: 0, scrap_per: 1.45348837209302, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 16, category: "Automotive", name: "low quality valves", no_qty: false, dep_per_day: 0, scrap_per: 1.45348837209302, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 16, category: "Automotive", name: "medium quality carburetor", no_qty: false, dep_per_day: 0, scrap_per: 5.81395348837209, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 16, category: "Automotive", name: "medium quality crankshaft", no_qty: false, dep_per_day: 0, scrap_per: 4.06976744186047, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 16, category: "Automotive", name: "medium quality pistons", no_qty: false, dep_per_day: 0, scrap_per: 4.06976744186047, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 16, category: "Automotive", name: "medium quality spark plugs", no_qty: false, dep_per_day: 0, scrap_per: 4.06976744186047, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 16, category: "Automotive", name: "medium quality valves", no_qty: false, dep_per_day: 0, scrap_per: 4.06976744186047, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 16, category: "Automotive", name: "modular car lift", no_qty: false, dep_per_day: 0, scrap_per: 99.1279069767442, qty_1_research: -1, justification: "crafting" },
{ csk: 16, category: "Automotive", name: "passenger vehicle module", no_qty: false, dep_per_day: 0, scrap_per: 12.6744186046512, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 16, category: "Automotive", name: "rear seats vehicle module", no_qty: false, dep_per_day: 0, scrap_per: 10.7209302325581, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 16, category: "Automotive", name: "storage vehicle module", no_qty: false, dep_per_day: 0, scrap_per: 5.40697674418605, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 16, category: "Automotive", name: "taxi vehicle module", no_qty: false, dep_per_day: 0, scrap_per: 50.1744186046512, qty_1_research: 83.3333333333333, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "and switch", no_qty: false, dep_per_day: 0, scrap_per: 5.81395348837209, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "audio alarm", no_qty: false, dep_per_day: 0, scrap_per: 4.36046511627907, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "auto turret", no_qty: false, dep_per_day: 0, scrap_per: 340, qty_1_research: -1, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "blocker", no_qty: false, dep_per_day: 0, scrap_per: 4.36046511627907, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "button", no_qty: false, dep_per_day: 0, scrap_per: 4.36046511627907, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "ceiling light", no_qty: false, dep_per_day: 0, scrap_per: 2.90697674418605, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "computer station", no_qty: false, dep_per_day: 0, scrap_per: 224.127906976744, qty_1_research: -1, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "counter", no_qty: false, dep_per_day: 0, scrap_per: 4.36046511627907, qty_1_research: 50, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "deluxe christmas lights", no_qty: false, dep_per_day: 0, scrap_per: 2.90697674418605, qty_1_research: -1, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "door controller", no_qty: false, dep_per_day: 0, scrap_per: 4.36046511627907, qty_1_research: 50, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "drone", no_qty: false, dep_per_day: 0, scrap_per: 201.627906976744, qty_1_research: -1, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "electric furnace", no_qty: false, dep_per_day: 0, scrap_per: 49.1279069767442, qty_1_research: 50, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "electric heater", no_qty: false, dep_per_day: 0, scrap_per: 11.6279069767442, qty_1_research: 50, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "electrical branch", no_qty: false, dep_per_day: 0, scrap_per: 4.36046511627907, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "elevator", no_qty: false, dep_per_day: 0, scrap_per: 84.1279069767442, qty_1_research: -1, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "flasher light", no_qty: false, dep_per_day: 0, scrap_per: 6.97674418604651, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "fluid combiner", no_qty: false, dep_per_day: 0, scrap_per: 4.36046511627907, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "fluid splitter", no_qty: false, dep_per_day: 0, scrap_per: 4.36046511627907, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "fluid switch & pump", no_qty: false, dep_per_day: 0, scrap_per: 8.72093023255814, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "green industrial wall light", no_qty: false, dep_per_day: 0, scrap_per: 1.74418604651163, qty_1_research: -1, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "hbhf sensor", no_qty: false, dep_per_day: 0, scrap_per: 4.36046511627907, qty_1_research: 50, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "hose tool", no_qty: false, dep_per_day: 0, scrap_per: 15, qty_1_research: -1, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "igniter", no_qty: false, dep_per_day: 0, scrap_per: 4.36046511627907, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "industrial combiner", no_qty: false, dep_per_day: 0, scrap_per: 4.36046511627907, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "industrial conveyor", no_qty: false, dep_per_day: 0, scrap_per: 4.36046511627907, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "industrial crafter", no_qty: false, dep_per_day: 0, scrap_per: 72.5, qty_1_research: -1, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "industrial splitter", no_qty: false, dep_per_day: 0, scrap_per: 4.36046511627907, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "industrial wall light", no_qty: false, dep_per_day: 0, scrap_per: 1.74418604651163, qty_1_research: -1, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "large animated neon sign", no_qty: false, dep_per_day: 0, scrap_per: 57.8488372093023, qty_1_research: -1, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "large neon sign", no_qty: false, dep_per_day: 0, scrap_per: 14.5348837209302, qty_1_research: -1, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "large rechargeable battery", no_qty: false, dep_per_day: 0, scrap_per: 125, qty_1_research: -1, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "large solar panel", no_qty: false, dep_per_day: 0, scrap_per: 62.5, qty_1_research: -1, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "laser detector", no_qty: false, dep_per_day: 0, scrap_per: 4.36046511627907, qty_1_research: 50, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "medium animated neon sign", no_qty: false, dep_per_day: 0, scrap_per: 32.4418604651163, qty_1_research: -1, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "medium neon sign", no_qty: false, dep_per_day: 0, scrap_per: 11.6279069767442, qty_1_research: -1, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "medium rechargeable battery", no_qty: false, dep_per_day: 0, scrap_per: 62.5, qty_1_research: -1, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "memory cell", no_qty: false, dep_per_day: 0, scrap_per: 4.36046511627907, qty_1_research: 50, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "or switch", no_qty: false, dep_per_day: 0, scrap_per: 5.81395348837209, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "powered water purifier", no_qty: false, dep_per_day: 0, scrap_per: 21.9418604651163, qty_1_research: 50, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "pressure pad", no_qty: false, dep_per_day: 0, scrap_per: 108, qty_1_research: -1, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "ptz camera", no_qty: false, dep_per_day: 0, scrap_per: 148.720930232558, qty_1_research: -1, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "rand switch", no_qty: false, dep_per_day: 0, scrap_per: 4.36046511627907, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "reactive target", no_qty: false, dep_per_day: 0, scrap_per: 60.7209302325581, qty_1_research: -1, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "red industrial wall light", no_qty: false, dep_per_day: 0, scrap_per: 1.74418604651163, qty_1_research: -1, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "rf broadcaster", no_qty: false, dep_per_day: 0, scrap_per: 30.8139534883721, qty_1_research: -1, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "rf receiver", no_qty: false, dep_per_day: 0, scrap_per: 30.8139534883721, qty_1_research: -1, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "rf transmitter", no_qty: false, dep_per_day: 0, scrap_per: 62.5, qty_1_research: -1, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "root combiner", no_qty: false, dep_per_day: 0, scrap_per: 4.36046511627907, qty_1_research: 50, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "search light", no_qty: false, dep_per_day: 0, scrap_per: 21.6279069767442, qty_1_research: 50, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "siren light", no_qty: false, dep_per_day: 0, scrap_per: 6.97674418604651, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "small generator", no_qty: false, dep_per_day: 0, scrap_per: 137.5, qty_1_research: -1, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "small neon sign", no_qty: false, dep_per_day: 0, scrap_per: 8.72093023255814, qty_1_research: -1, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "small rechargeable battery", no_qty: false, dep_per_day: 0, scrap_per: 37.5, qty_1_research: -1, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "smart alarm", no_qty: false, dep_per_day: 0, scrap_per: 47.5, qty_1_research: 50, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "smart switch", no_qty: false, dep_per_day: 0, scrap_per: 47.5, qty_1_research: -1, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "splitter", no_qty: false, dep_per_day: 0, scrap_per: 5.81395348837209, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "sprinkler", no_qty: false, dep_per_day: 0, scrap_per: 4.36046511627907, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "storage monitor", no_qty: false, dep_per_day: 0, scrap_per: 47.5, qty_1_research: 50, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "switch", no_qty: false, dep_per_day: 0, scrap_per: 5.81395348837209, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "tesla coil", no_qty: false, dep_per_day: 0, scrap_per: 47.5, qty_1_research: -1, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "timer", no_qty: false, dep_per_day: 0, scrap_per: 4.36046511627907, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "water pump", no_qty: false, dep_per_day: 0, scrap_per: 66.6279069767442, qty_1_research: -1, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "wind turbine", no_qty: false, dep_per_day: 0, scrap_per: 295, qty_1_research: -1, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "wire tool", no_qty: false, dep_per_day: 0, scrap_per: 15, qty_1_research: -1, justification: "crafting" },
{ csk: 17, category: "Electrical", name: "xor switch", no_qty: false, dep_per_day: 0, scrap_per: 5.81395348837209, qty_1_research: 13.3333333333333, justification: "crafting" },
{ csk: 18, category: "Fun", name: "above ground pool", no_qty: false, dep_per_day: 0, scrap_per: 68.6733615221987, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "acoustic guitar", no_qty: false, dep_per_day: 0, scrap_per: 3.25, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "beach chair", no_qty: false, dep_per_day: 0, scrap_per: 5.36046511627907, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "beach parasol", no_qty: false, dep_per_day: 0, scrap_per: 6.86046511627907, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "beach table", no_qty: false, dep_per_day: 0, scrap_per: 2, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "beach towel", no_qty: false, dep_per_day: 0, scrap_per: 3.75, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "blue boomer", no_qty: false, dep_per_day: 0, scrap_per: 18.328488372093, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "blue roman candle", no_qty: false, dep_per_day: 0, scrap_per: 6.45348837209302, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "boogie board", no_qty: false, dep_per_day: 0, scrap_per: 20.0422832980973, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "boom box", no_qty: false, dep_per_day: 0, scrap_per: 12.3139534883721, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "canbourine", no_qty: false, dep_per_day: 0, scrap_per: 1.45348837209302, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "cassette-long", no_qty: false, dep_per_day: 0, scrap_per: 5.81395348837209, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "cassette-medium", no_qty: false, dep_per_day: 0, scrap_per: 4.36046511627907, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "cassette-short", no_qty: false, dep_per_day: 0, scrap_per: 2.90697674418605, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "cassette recorder", no_qty: false, dep_per_day: 0, scrap_per: 4.36046511627907, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "champagne boomer", no_qty: false, dep_per_day: 0, scrap_per: 40.1816860465116, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "connected speaker", no_qty: false, dep_per_day: 0, scrap_per: 4.36046511627907, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "cowbell", no_qty: false, dep_per_day: 0, scrap_per: 2.03488372093023, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "cursed cauldron", no_qty: false, dep_per_day: 0, scrap_per: 2, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "disco ball", no_qty: false, dep_per_day: 0, scrap_per: 2.90697674418605, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "disco floor", no_qty: false, dep_per_day: 0, scrap_per: 4.36046511627907, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "giant candy decor", no_qty: false, dep_per_day: 0, scrap_per: 3.75, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "giant lollipop decor", no_qty: false, dep_per_day: 0, scrap_per: 2.5, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "green boomer", no_qty: false, dep_per_day: 0, scrap_per: 18.328488372093, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "green roman candle", no_qty: false, dep_per_day: 0, scrap_per: 6.45348837209302, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "hobo barrel", no_qty: false, dep_per_day: 0, scrap_per: 2, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "inner tube", no_qty: false, dep_per_day: 0, scrap_per: 20.0422832980973, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "jerry can guitar", no_qty: false, dep_per_day: 0, scrap_per: 3.40697674418605, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "junkyard drum kit", no_qty: false, dep_per_day: 0, scrap_per: 9.81395348837209, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "large candle set", no_qty: false, dep_per_day: 0, scrap_per: 14.5833333333333, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "laser light", no_qty: false, dep_per_day: 0, scrap_per: 5.81395348837209, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "megaphone", no_qty: false, dep_per_day: 0, scrap_per: 5.36046511627907, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "microphone stand", no_qty: false, dep_per_day: 0, scrap_per: 4.36046511627907, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "mobile phone", no_qty: false, dep_per_day: 0, scrap_per: 7.26744186046512, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "new year gong", no_qty: false, dep_per_day: 0, scrap_per: 4.90697674418605, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "orange boomer", no_qty: false, dep_per_day: 0, scrap_per: 18.328488372093, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "paddling pool", no_qty: false, dep_per_day: 0, scrap_per: 28.1818181818182, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "pan flute", no_qty: false, dep_per_day: 0, scrap_per: 1.78779069767442, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "pattern boomer", no_qty: false, dep_per_day: 0, scrap_per: 19.781976744186, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "plumber's trumpet", no_qty: false, dep_per_day: 0, scrap_per: 4.36046511627907, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "portable boom box", no_qty: false, dep_per_day: 0, scrap_per: 6.97674418604651, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "red boomer", no_qty: false, dep_per_day: 0, scrap_per: 18.328488372093, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "red roman candle", no_qty: false, dep_per_day: 0, scrap_per: 6.45348837209302, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "red volcano firework", no_qty: false, dep_per_day: 0, scrap_per: 5.85029069767442, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "scarecrow", no_qty: false, dep_per_day: 0, scrap_per: 5.25, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "shovel bass", no_qty: false, dep_per_day: 0, scrap_per: 5.36046511627907, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "skull spikes", no_qty: false, dep_per_day: 0, scrap_per: 3.57142857142857, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "skull trophy", no_qty: false, dep_per_day: 0, scrap_per: 3.45348837209302, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "sky lantern", no_qty: false, dep_per_day: 0, scrap_per: 3.75, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "sled", no_qty: false, dep_per_day: 0, scrap_per: 42.5, qty_1_research: -1, justification: "recycling" },
{ csk: 18, category: "Fun", name: "small candle set", no_qty: false, dep_per_day: 0, scrap_per: 7.29166666666667, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "snowman", no_qty: false, dep_per_day: 0, scrap_per: 4.88917958667442, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "sound light", no_qty: false, dep_per_day: 0, scrap_per: 5.81395348837209, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "sousaphone", no_qty: false, dep_per_day: 0, scrap_per: 5.81395348837209, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "telephone", no_qty: false, dep_per_day: 0, scrap_per: 31.8139534883721, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "violet boomer", no_qty: false, dep_per_day: 0, scrap_per: 18.328488372093, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "violet roman candle", no_qty: false, dep_per_day: 0, scrap_per: 6.45348837209302, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "violet volcano firework", no_qty: false, dep_per_day: 0, scrap_per: 5.85029069767442, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "wheelbarrow piano", no_qty: false, dep_per_day: 0, scrap_per: 9.81395348837209, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "white volcano firework", no_qty: false, dep_per_day: 0, scrap_per: 5.85029069767442, qty_1_research: -1, justification: "crafting" },
{ csk: 18, category: "Fun", name: "xylobone", no_qty: false, dep_per_day: 0, scrap_per: 1.42857142857143, qty_1_research: -1, justification: "crafting" },
{ csk: 19, category: "Horses", name: "appaloosa", no_qty: false, dep_per_day: 0, scrap_per: 115, qty_1_research: -1, justification: "ranch/farm pricing & vital statistics" },
{ csk: 19, category: "Horses", name: "bay", no_qty: false, dep_per_day: 0, scrap_per: 135, qty_1_research: -1, justification: "ranch/farm pricing & vital statistics" },
{ csk: 19, category: "Horses", name: "black thoroughbred", no_qty: false, dep_per_day: 0, scrap_per: 200, qty_1_research: -1, justification: "ranch/farm pricing & vital statistics" },
{ csk: 19, category: "Horses", name: "buckskin", no_qty: false, dep_per_day: 0, scrap_per: 115, qty_1_research: -1, justification: "ranch/farm pricing & vital statistics" },
{ csk: 19, category: "Horses", name: "chestnut", no_qty: false, dep_per_day: 0, scrap_per: 150, qty_1_research: -1, justification: "ranch/farm pricing & vital statistics" },
{ csk: 19, category: "Horses", name: "dapple grey", no_qty: false, dep_per_day: 0, scrap_per: 80, qty_1_research: -1, justification: "ranch/farm pricing & vital statistics" },
{ csk: 19, category: "Horses", name: "piebald", no_qty: false, dep_per_day: 0, scrap_per: 150, qty_1_research: -1, justification: "ranch/farm pricing & vital statistics" },
{ csk: 19, category: "Horses", name: "pinto", no_qty: false, dep_per_day: 0, scrap_per: 115, qty_1_research: -1, justification: "ranch/farm pricing & vital statistics" },
{ csk: 19, category: "Horses", name: "red roan", no_qty: false, dep_per_day: 0, scrap_per: 80, qty_1_research: -1, justification: "ranch/farm pricing & vital statistics" },
{ csk: 19, category: "Horses", name: "white thoroughbred", no_qty: false, dep_per_day: 0, scrap_per: 200, qty_1_research: -1, justification: "ranch/farm pricing & vital statistics" } ];


// TRADE ITEMS (sorted by name) ===============================================

let trade_items = trade_table.map((x) => x);

trade_items.sort(function(a, b){return (a.name < b.name ? -1 : 1)});

// search the trade items for a given name and return the item index.
//
function binary_search(arr, item_name)
{
    let m = 0;
    let n = arr.length - 1;

    while (m <= n) {
        let k = (n + m) >> 1;

        if (item_name > arr[k].name) {
            m = k + 1;
        } else if (item_name < arr[k].name) {
            n = k - 1;
        } else {
            return k;
        }
    }

    return -1 * m - 1;
}

// populate the displayed price table for the user
//
function pop_table()
{
    let dayOfWipe = date_diff(document.getElementById("today").value, document.getElementById("wipe_start").value);
    let tableRows = "<TR><TD colspan=2 rowspan=2 bgcolor=black></td><td colspan=5 bgcolor=yellow align=middle><b>Day " + (1+dayOfWipe) + " of Wipe</b></td></TR>\n";

    tableRows += "<TR><td colspan=2 bgcolor=#E2EFDA align=middle><b>(item value)</b></td><td colspan=2 bgcolor=#DDEBF7 align=middle><b>(research trade)</b></td><td rowspan=2 bgcolor=lightyellow align=middle><b>Justification</b></td></TR>\n";
    tableRows += "<TR><td bgcolor=white align=middle><b>Category</b></td><td bgcolor=white align=middle><b>Item</b></td><td bgcolor=#E2EFDA align=middle><b>Scrap</b></td><td bgcolor=#C6E0B4 align=middle><b>Sulfur</b></td><td bgcolor=#DDEBF7 align=middle><b>Scrap</b></td><td bgcolor=#BDD7EE align=middle><b>Sulfur</b></td></TR>\n";

    let prevCat = "";

    for (item of trade_table)
    {
        if (item.category != prevCat)
        {
            prevCat = item.category
            tableRows += "<TR height=5px><td bgcolor=black colspan=7></td></TR>\n";
        }

        tableRows += "<TR><td bgcolor=white>" + item.category + "</td>";
        tableRows += "<td bgcolor=white>" + item.name + "</td>";

        let dep = (1 - (dayOfWipe * item.dep_per_day));
        let itemVal = dep * item.scrap_per;

        tableRows += "<td bgcolor=#E2EFDA align=right><font size=2>" + itemVal.toFixed(4) + "</font></td>"
        tableRows += "<td bgcolor=#C6E0B4 align=right><font size=2>" + (sulfur_ore_per_scrap * itemVal).toFixed(4) + "</font></td>"

        if (item.qty_1_research < 0)
        {
            tableRows += "<td bgcolor=#DDEBF7 align=middle><font size=2>---</font></td>"
            tableRows += "<td bgcolor=#BDD7EE align=middle><font size=2>---</font></td>"
        }
        else
        {
            let researchVal = dep * item.qty_1_research;

            tableRows += "<td bgcolor=#DDEBF7 align=right><font size=2>" + researchVal.toFixed(4) + "</font></td>"
            tableRows += "<td bgcolor=#BDD7EE align=right><font size=2>" + (sulfur_ore_per_scrap * researchVal).toFixed(4) + "</font></td>"
        }

        tableRows += "<td bgcolor=lightyellow align=left><font size=1><i>" + item.justification + "</i></font></td>"

        tableRows += "</TR>\n"
    }

    tableRows += "<TR height=5px><td bgcolor=black colspan=7></td></TR>\n";
    document.getElementById("price_table").innerHTML = tableRows;
}


// set the start of wipe date based on current date
//
function initialize_dates(first_pass)
{
    wipe_start.setDate(1);

    let d = wipe_start.getDay();

    if (d < 4)
    {
        wipe_start.setDate(1+4-d);
    }
    else if (d > 4)
    {
        wipe_start.setDate(1+11-d);
    }

    if (first_pass && (wipe_start > today))
    {
        if (today.getMonth() == 0)
        {
            wipe_start.setMonth(11);
            wipe_start.setYear(1900 + today.getYear()-1);
        }
        else
        {
            wipe_start.setMonth(today.getMonth()-1);
        }

        initialize_dates(false);
    }
}

// compute difference between two dates (used to determine what day of wipe this is)
//
function date_diff(s1, s2)
{
    let d1 = new Date(s1);
    let d2 = new Date(s2);

    let difference = d1.getTime() - d2.getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

    return TotalDays;
}

// compute the value (in scrap) of the trade offer described in string offer
// if use_dow is true, apply depreciation as appropriate, if false, assume day 0 of wipe (no depreciation).
// If the user has altered the date fields, calling this function will recompute the day of wipe if use_dow is true.
//
function trade_value(offer, use_dow, permit_research)
{
    let day_of_wipe = 1;

    if (use_dow)
    {
        day_of_wipe = date_diff(document.getElementById("today").value, document.getElementById("wipe_start").value);
        document.getElementById("day_of_wipe").innerHTML = "Day of wipe = " + (1+day_of_wipe);
    }

    let scrap_val = 0.0;

    if (offer=="") { return scrap_val; }

    offer = offer.replace(/, /g,",")

    let items = offer.split(",");

    for (item of items) {
        let words = item.split(" ");

        let qty = parseInt(words[0], 10);
        if (isNaN(qty))
        {
            qty = 1;
        }
        else
        {
            item = item.substring(words[0].length + 1, item.length);
        }

        // find the item

        let idx = binary_search(trade_items, item);

        if (idx < 0)
        {
            alert("Cannot find item '" + item + "'.  It may be in the index under a different name?");
        }
        else
        {
            // if item is quantityless (clones) set qty to 1

            if (trade_items[idx].no_qty)
            {
                qty=1;
            }

            let item_value = qty * trade_items[idx].scrap_per;

            // if qty is 1 and the item has a research value, use that
            // value if it is greater than the base value

            if ((qty == 1) && (permit_research) && (item_value < trade_items[idx].qty_1_research))
            {
                item_value = trade_items[idx].qty_1_research;
            }

            // apply depreciation

            let dep = (1 - (day_of_wipe * trade_items[idx].dep_per_day));
            item_value *= dep;

            // add this item to the total scrap value

            scrap_val += item_value;
        }
    }

    return scrap_val;
}

// Given the two offers in a trade, determine if the trade is fair.
//
function evaluate_trade()
{
   let RTP = document.getElementById("research_trades_enabled").checked

   let p1_offer = document.getElementById("p1_offer").value;
   let p1_scrap = trade_value(p1_offer, true, RTP);
   document.getElementById("p1_offer_scrap_val").innerHTML = "<br>&nbsp;&nbsp;&nbsp;<font size=1 color=blue><i>" + p1_scrap.toFixed(4) + " scrap</i></font>";

   let p2_offer = document.getElementById("p2_offer").value;
   let p2_scrap = trade_value(p2_offer, true, RTP);
   document.getElementById("p2_offer_scrap_val").innerHTML = "<br>&nbsp;&nbsp;&nbsp;<font size=1 color=blue><i>" + p2_scrap.toFixed(4) + " scrap</i></font>";

   p1_min = p1_scrap * (1 - fairness_radius);
   p1_max = p1_scrap * (1 + fairness_radius);

   p2_min = p2_scrap * (1 - fairness_radius);
   p2_max = p2_scrap * (1 + fairness_radius);

   overlap = (((p1_min >= p2_min) && (p1_min <= p2_max))
       || ((p1_max >= p2_min) && (p1_max <= p2_max))
       || ((p2_min >= p1_min) && (p2_min <= p1_max))
       || ((p2_max >= p1_min) && (p2_max <= p1_max)));

   if (overlap)
   {
      document.getElementById("evaluation").innerHTML = "This trade is fair.";
   }
   else if (p1_scrap < p2_scrap)
   {
      document.getElementById("evaluation").innerHTML = "Player 1 should offer more.";
   }
   else
   {
      document.getElementById("evaluation").innerHTML = "Player 2 should offer more.";
   }
}

// Convert an offer to a specified commodity (such as: what is the value of "2 pipes, 100 gunpowder, 250 wood" in "frags")
//
function convert_offer()
{
   let RTP = document.getElementById("research_trades_enabled").checked

   let offer = document.getElementById("offer").value;
   let offer_scrap = trade_value(offer, true, RTP);
   document.getElementById("offer_scrap_val").innerHTML = "<br>&nbsp;&nbsp;&nbsp;<font size=1 color=blue><i>" + offer_scrap.toFixed(4) + " scrap</i></font>";

   let conversion = document.getElementById("convert_to").value;
   let conversion_scrap = trade_value(conversion, true, false);
   document.getElementById("convert_to_scrap_val").innerHTML = "<br>&nbsp;&nbsp;&nbsp;<font size=1 color=blue><i>" + conversion_scrap.toFixed(4) + " scrap</i></font>";

   let conversion_qty = 0;

   if (conversion_scrap != 0)
   {
      conversion_qty = offer_scrap / conversion_scrap;
   }

   document.getElementById("conversion").innerHTML = offer + "&nbsp;=<br>" + conversion_qty.toFixed(4) + "&nbsp;" + conversion;
}

// Set the initial values of the date fields.
//
function set_up_dates()
{
    document.getElementById("wipe_start").value = wipe_start.toLocaleDateString('en-US');
    document.getElementById("today").value = today.toLocaleDateString('en-US');
    recompute_dow();
}

// Recompute day of wipe based on user modified date fields.
//
function recompute_dow()
{
    wipe_start = new Date(document.getElementById("wipe_start").value);
    today = new Date(document.getElementById("today").value);

    document.getElementById("day_of_wipe").innerHTML = "Day of wipe = " + (1+date_diff(document.getElementById("today").value, document.getElementById("wipe_start").value));

    pop_table();
}

// Re-evaluate the current trade and conversion in light of research trading being enabled or disabled.
//
function reevaluate()
{
    evaluate_trade();
    convert_offer();
}

