require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../models/Product");

const products = [
  {
    name: "AUTO GUN + JET Automatic Water Pump Controller",
    category: "Single Phase",
    shortDescription:
      "Automatic pump control for domestic water systems with gunjet technology",
    description:
      "The AUTO GUN + JET controller provides automatic water pump control suitable for domestic water systems. Features auto ON/OFF based on water level, dry run protection, and overflow prevention. Easy installation with terminal block connections.",
    features: [
      "Auto ON/OFF",
      "Dry Run Protection",
      "Overflow Prevention",
      "LED Indicators",
      "Easy Installation",
    ],
    keywords: [
      "gun jet pump controller",
      "automatic pump controller",
      "water pump controller",
    ],
    isFeatured: true,
    isActive: true,
    sortOrder: 1,
  },
  {
    name: "L10SS Single Phase Automatic Water Level Controller",
    category: "Single Phase",
    shortDescription:
      "Smart single-phase motor automation with precision level sensing",
    description:
      "The L10SS is our flagship single-phase automatic water level controller. Uses copper electrodes to detect water levels in both sump and overhead tank. Automatically controls the motor to prevent overflow and dry run conditions.",
    features: [
      "Level Sensing",
      "Motor Protection",
      "LED Indicators",
      "Overflow Prevention",
      "Dry Run Cut-off",
    ],
    keywords: [
      "L10SS",
      "single phase water level controller",
      "automatic motor controller",
    ],
    isFeatured: true,
    isActive: true,
    sortOrder: 2,
  },
  {
    name: "L30SS Three Phase Automatic Water Level Controller",
    category: "Three Phase",
    shortDescription:
      "Heavy-duty three-phase automation for industrial and apartment use",
    description:
      "The L30SS handles three-phase motors for larger water systems. Built-in phase failure protection, phase reversal protection, and voltage monitoring ensure your expensive three-phase motor is fully protected.",
    features: [
      "3-Phase Control",
      "Phase Failure Protection",
      "Phase Reversal",
      "Timer Function",
      "Digital Display",
    ],
    keywords: [
      "L30SS",
      "three phase water level controller",
      "industrial pump controller",
    ],
    isFeatured: true,
    isActive: true,
    sortOrder: 3,
  },
  {
    name: "Wireless Water Level Controller",
    category: "Wireless",
    shortDescription:
      "No wire installation — 100% wireless tank monitoring system",
    description:
      "Our wireless water level controller eliminates the need for any wiring between the sump and overhead tank. Uses RF technology for reliable signal transmission. Includes transmitter and receiver units.",
    features: [
      "No Wiring Needed",
      "RF Technology",
      "Easy Setup",
      "Battery Powered Sensors",
      "Weatherproof",
    ],
    keywords: ["wireless water level controller", "no wire tank controller"],
    isFeatured: true,
    isActive: true,
    sortOrder: 4,
  },
  {
    name: "Wireless Transmitter – 500 Meter Range",
    category: "Wireless",
    shortDescription:
      "Long-range 500m wireless signal transmitter for remote tanks",
    description:
      "The 500-meter wireless transmitter unit sends water level signals from your tank to the control panel without any wires. IP65 weatherproof housing suitable for outdoor installation.",
    features: [
      "500m Range",
      "Battery Powered",
      "Weatherproof IP65",
      "RF Transmission",
      "5-Level Signal",
    ],
    keywords: ["wireless transmitter", "500 meter water controller"],
    isActive: true,
    sortOrder: 5,
  },
  {
    name: "Wireless Receiver – 500 Meter Range",
    category: "Wireless",
    shortDescription: "Paired receiver for the 500m wireless controller system",
    description:
      "Companion receiver unit for our 500-meter wireless transmitter. Includes motor control relay output, signal strength indicator, and automatic reconnection feature if signal is lost.",
    features: [
      "500m Range",
      "Signal Indicator",
      "Auto Reconnect",
      "Relay Output",
      "DIN Rail Mount",
    ],
    keywords: ["wireless receiver", "500m receiver unit"],
    isActive: true,
    sortOrder: 6,
  },
  {
    name: "Wireless Transmitter – 1000 Meter Range",
    category: "Wireless",
    shortDescription:
      "Extended 1KM range transmitter for large properties and farms",
    description:
      "Our 1000-meter wireless transmitter is ideal for large agricultural and industrial properties where the tank and pump are far apart. Built-in signal booster for reliable 1km range.",
    features: [
      "1000m Range",
      "Signal Booster",
      "Farm Suitable",
      "Long Battery Life",
      "Directional Antenna",
    ],
    keywords: [
      "1km wireless transmitter",
      "long range water controller",
      "agricultural transmitter",
    ],
    isFeatured: true,
    isActive: true,
    sortOrder: 7,
  },
  {
    name: "Wireless Receiver – 1000 Meter Range",
    category: "Wireless",
    shortDescription:
      "Extended range paired receiver for 1km wireless controller",
    description:
      "The 1000-meter receiver unit pairs with our long-range transmitter for farms and industrial sites. Features heavy-duty relay for large motor control and includes status LED display.",
    features: [
      "1000m Range",
      "Weatherproof",
      "Heavy-duty Relay",
      "Status Display",
      "Multiple Input",
    ],
    keywords: ["1km receiver", "long range receiver"],
    isActive: true,
    sortOrder: 8,
  },
  {
    name: "Borewell Dry Run Protection System",
    category: "Protection",
    shortDescription:
      "Critical protection system for expensive borewell pump motors",
    description:
      "Our borewell dry run protection system immediately cuts off the motor when water level in borewell drops below the pump intake. Prevents costly motor burnout and extends pump lifespan significantly.",
    features: [
      "Dry Run Sensing",
      "Instant Cut-off",
      "Motor Saver",
      "Adjustable Timer",
      "LED Alarm",
    ],
    keywords: [
      "borewell dry run protection",
      "borewell motor protection",
      "pump protection",
    ],
    isFeatured: true,
    isActive: true,
    sortOrder: 9,
  },
  {
    name: "Digital Water Level Indicator",
    category: "Accessories",
    shortDescription:
      "Clear 5-level digital display panel for overhead tank monitoring",
    description:
      "The digital water level indicator shows the exact water level in your overhead tank using 5 LED levels. Includes a buzzer alert for full and empty tank conditions. Suitable for all tank types.",
    features: [
      "5-Level Display",
      "Buzzer Alert",
      "AC Powered",
      "Any Tank Type",
      "Wall Mount",
    ],
    keywords: [
      "digital water level indicator",
      "tank level display",
      "water level panel",
    ],
    isActive: true,
    sortOrder: 10,
  },
  {
    name: "Single Phase Motor Protection Panel",
    category: "Protection",
    shortDescription:
      "Complete protection panel for single-phase electric motors",
    description:
      "A comprehensive motor protection panel that safeguards single-phase motors from overload, overcurrent, and voltage fluctuations. Includes MCB, contactor, overload relay, and indicator lights in a powder-coated enclosure.",
    features: [
      "Overload Protection",
      "Volt Guard",
      "IP54 Enclosure",
      "MCB & Contactor",
      "Ready to Wire",
    ],
    keywords: [
      "motor protection panel",
      "single phase panel",
      "pump control panel",
    ],
    isActive: true,
    sortOrder: 11,
  },
  {
    name: "Three Phase Motor Protection Panel",
    category: "Protection",
    shortDescription:
      "Industrial-grade three-phase motor protection control panel",
    description:
      "Industrial-grade three-phase motor protection panel with built-in phase sequence relay, overload protection, digital voltmeter and ammeter. Suitable for industrial pump installations.",
    features: [
      "3-Phase Protection",
      "Phase Sequence Relay",
      "Digital Meter",
      "IP65 Panel",
      "Heavy Duty",
    ],
    keywords: [
      "three phase motor protection",
      "industrial pump panel",
      "3 phase panel",
    ],
    isActive: true,
    sortOrder: 12,
  },
  {
    name: "Underground Sump Automation Controller",
    category: "Single Phase",
    shortDescription:
      "Dedicated underground sump level monitoring and pump automation",
    description:
      "Specifically designed for underground sump management. Monitors sump water level and automatically fills the overhead tank by controlling the pump motor. Prevents sump overflow and overhead tank dry conditions.",
    features: [
      "Dual Tank Control",
      "Auto Fill",
      "Overflow Stop",
      "Submersible Compatible",
      "Stainless Probes",
    ],
    keywords: [
      "sump automation",
      "underground tank controller",
      "dual tank controller",
    ],
    isActive: true,
    sortOrder: 13,
  },
  {
    name: "Apartment Water Automation System",
    category: "Industrial",
    shortDescription:
      "Centralized water management system for multi-floor apartment buildings",
    description:
      "Our apartment water automation system manages multiple tanks across multiple floors from a central control panel. Includes pump scheduling, individual floor monitoring, and master control for apartment managers.",
    features: [
      "Multi-tank Control",
      "Central Panel",
      "Floor-wise Control",
      "Override Switch",
      "Usage Monitoring",
    ],
    keywords: [
      "apartment water controller",
      "building water automation",
      "multi-floor water system",
    ],
    isFeatured: true,
    isActive: true,
    sortOrder: 14,
  },
  {
    name: "Industrial Water Automation System",
    category: "Industrial",
    shortDescription:
      "Complete industrial water process control and automation",
    description:
      "Our industrial water automation system handles complex multi-pump, multi-tank setups for manufacturing and processing plants. Includes SCADA-ready outputs, data logging, and remote monitoring capabilities.",
    features: [
      "Multi-pump Control",
      "SCADA Ready",
      "Data Logging",
      "Remote Monitoring",
      "Modbus Protocol",
    ],
    keywords: [
      "industrial water automation",
      "plant water control",
      "industrial pump controller",
    ],
    isActive: true,
    sortOrder: 15,
  },
  {
    name: "Agricultural Pump Automation Controller",
    category: "Agricultural",
    shortDescription:
      "Farm-ready irrigation pump automation with timer and GSM control",
    description:
      "Designed for agricultural irrigation, this controller allows scheduled pump operation, GSM-based remote control, and solar panel compatibility. Protects expensive submersible pumps used in bore well irrigation.",
    features: [
      "Timer Control",
      "GSM Alert",
      "Solar Compatible",
      "Waterproof Casing",
      "Remote Start/Stop",
    ],
    keywords: [
      "agricultural pump controller",
      "irrigation automation",
      "farm pump controller",
    ],
    isFeatured: true,
    isActive: true,
    sortOrder: 16,
  },
  {
    name: "Smart IoT Water Level Controller",
    category: "IoT/Smart",
    shortDescription:
      "WiFi-enabled smart controller with mobile app monitoring and control",
    description:
      "The Smart IoT controller connects to your home WiFi and allows real-time monitoring and control of your water management system through a smartphone app. Includes voice assistant compatibility.",
    features: [
      "WiFi Connected",
      "Mobile App",
      "Voice Control",
      "Alexa/Google",
      "Usage Analytics",
    ],
    keywords: [
      "IoT water controller",
      "smart water level controller",
      "WiFi pump controller",
      "app controlled water",
    ],
    isFeatured: true,
    isActive: true,
    sortOrder: 17,
  },
  {
    name: "GSM Mobile Pump Controller",
    category: "IoT/Smart",
    shortDescription:
      "Control your irrigation or home pump from anywhere via SMS",
    description:
      "The GSM controller lets you start, stop, and monitor your pump using SMS from any mobile phone — no internet required. Receives status alerts for dry run, overflow, and power failure conditions.",
    features: [
      "SMS Control",
      "Status Alerts",
      "Any Mobile Phone",
      "No Internet Needed",
      "Power Failure Alert",
    ],
    keywords: [
      "GSM pump controller",
      "SMS water controller",
      "remote pump control",
    ],
    isActive: true,
    sortOrder: 18,
  },
  {
    name: "Float Switch Water Level Controller",
    category: "Accessories",
    shortDescription:
      "Reliable and time-tested float switch based water level controller",
    description:
      "The traditional and highly reliable float switch based controller. Uses buoyancy to detect water levels mechanically — no electricity near water. Ideal for simple installations requiring proven, no-maintenance technology.",
    features: [
      "Float Switch",
      "No Maintenance",
      "Simple Setup",
      "Long Life 10+ Yrs",
      "Any Tank Size",
    ],
    keywords: [
      "float switch controller",
      "mechanical water controller",
      "float valve",
    ],
    isActive: true,
    sortOrder: 19,
  },
  {
    name: "Customized Automation Solutions",
    category: "Industrial",
    shortDescription:
      "Bespoke water automation systems engineered for your specific needs",
    description:
      "When off-the-shelf products don't meet your specific water management challenge, our engineering team designs and manufactures custom solutions. On-site survey, custom panel design, installation, and full after-sales support included.",
    features: [
      "Custom Design",
      "On-site Survey",
      "Full Fabrication",
      "Installation Support",
      "1-Year Warranty",
    ],
    keywords: [
      "custom water automation",
      "bespoke pump controller",
      "custom water management",
    ],
    isFeatured: true,
    isActive: true,
    sortOrder: 20,
  },
];

async function seed() {
  try {
    await mongoose.connect(
      process.env.MONGO_URI || "mongodb://localhost:27017/laksh-automations",
    );
    console.log("Connected to MongoDB");

    await Product.deleteMany({});
    console.log("Cleared existing products");

    const productsWithSlugs = products.map((product) => ({
      ...product,
      slug: product.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, ""),
    }));

    const inserted = await Product.insertMany(productsWithSlugs);
    console.log(`✅ Seeded ${inserted.length} products successfully`);

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
}

seed();
