// api.js
const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

let csvCache = {};

function readCSVFile(filePath) {
  if (csvCache[filePath]) {
    return csvCache[filePath];
  }
  
  try {
    const fullPath = path.join(process.cwd(), 'client', 'public', 'data', filePath);
    const fileContent = fs.readFileSync(fullPath, 'utf-8');
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });
    csvCache[filePath] = records;
    return records;
  } catch (error) {
    console.error(`Error reading CSV file ${filePath}:`, error);
    return [];
  }
}

function prepareMapContext(site, locationOrigin){
const Floor1allowedLocations = [
'Security',
'Hemodialysis',
'Registration Kiosks',
'Breast Clinic / Bone Mineral Density & Laboratory Reception and Waiting Room',
'Occupational Therapy & Physiotherapy',
'Speech & Audiology',
'Patient Registration',
'MRI',
'Palliative Hub',
'G.A.I.N. Clinic',
'Volunteer Services',
'Patient Billing & Payroll',
'Medical Device Reprocessing Department (MDRD)',
'Diabetes Program',
'Health Records',
'Workspace',
'Health & Safety',
'Diabetes Education Theatre',
'Tunnel to Shoniker Building',
'Cancer Care & Hematology Clinic',
'Thyroid Rapid Diagnostic Clinic',
'Human Resources',
'Medical Mall',
'North Parking',
'South Parking Office',
'South Stairs',
'South Bathroom',
'South Elevator',
'West Stairs',
'West Bathroom',
'West Elevator',
'East Stairs',
'North Elevator',
'North Bathroom',
'North Stairs'
];

const Floor2allowedLocations = [
        'Emergency',
        'Fracture Clinic',
        'Cath Lab Code STEMI',
        'Intensive Care Unit (ICU)',
        'Arrhythmia Clinic Cardiac Diagnostics',
        'Diagnostic Imaging',
        'Surgical Specialty Clinics',
        'Worship & Meditation',
        'Endoscopy Clinic',
        'Pulmonary Function Test (PFT) Lab',
        'Life Labs',
        'SHN Foundation Office',
        'Same Day Surgery',
        'Gynecology',
        'Maternal Fetal Medicine Clinic',
        'Obstetric Medicine Clinic',
        'Neonatal Intensive Care Unit (NICU)',
        'Information Desk',
        'Gift Shop',
        'Lifemark Physiotherapy Sports Medicine',
        'Parking Office',
        'Retail Pharmacy (Shoppers Drug Mart)',
        'Family Birthing Centre',
        'Food Court',
        'South Bathroom',
        'West Bathroom',
        'North Bathroom',
        'South Elevator',
        'East Elevator',
        'North Elevator',
        'South Stairs',
        'Southeast Stairs',
        'Small East Stairs',
        'East Stairs',
        'North Stairs',
        'East Bathroom',
        'Small East Bathroom'
];

const Floor3allowedLocations = [
        "Restorative Rehabilitation Unit 3E",
        "Restorative Rehabilitation Unit 3W",
        "Administration",
        "Nutrition and Food Services",
        "Board Room C3D",
        "Meeting Room C3B",
        "Conference Room C3A",
        "Atrium Lounge Area",
        "South Elevator",
        'South Stairs',
        'West Stairs',
        'Tower Elevator',
        'North Stairs',
        'East Bathroom (Female)',
        'East Bathroom (Male)',
        'East Stairs'
];

const Floor4allowedLocationsTower = [ // split tower and MBW
        "Dietian's Office",
        "South Stairs",
        "Medicine Clinic",
        "Hemodialysis Zone B",
        "Ortho Rapid Access Clinic (ORAC)",
        "West Stairs",
        "East Stairs",
        "East Elevator",
        "Genetics Clinic",
        "West Bathroom"
];

const Floor4allowedLocationsMBW = [
        "Cardiology Unit",
        "Coronary Care Unit",
        "South Bathroom",
        "West Elevator",
        "North Stairs"
];

const Floor5allowedLocations = [
        "Nursing Station",
        "Rehabilitation Unit 5E",
        "Lounge Area",
        "Surgical Unit 5W",
        "Rehab Gym",
        "East Stairs",
        "South Elevator",
        "South Bathroom",
        "West Bathroom",
        "West Stairs"
]

const Floor6allowedLocations = [
        'Mood & Anxiety Clinic',
        'Outpatient Mental Health 6W',
        'West Stairs',
        'West Bathroom',
        'South Elevator',
        'East Elevator'
]
const Floor7allowedLocations = [
        'Newborn Assessment Clinic',
        'Kids Care Clinic',
        'Kids Care Unit 7W',
        'Healthy Outcome Pediatric Program of Scarborough (HOPPS) Clinic',
        'Kids Care (POGO) Clinic',
        'Acute Care',
        'West Stairs',
        'West Bathroom',
        'South Bathroom',
        'South Elevator',
        'East Stairs'
]
const Floor8allowedLocations = [
        'Medicine Unit 8E',
        'Medicine Unit 8SW',
        'Child & Adolescent Mental Health Unit 8NW',
        'West Stairs',
        'West Bathroom',
        'East Bathroom',
        'South Bathroom',
        'South Elevator',
        'East Stairs'
]
const Floor9allowedLocations = [
        'Medicine Unit 9E',
        'Medicine Unit 9W',
        'West Stairs',
        'West Bathroom',
        'South Bathroom',
        'South Elevator',
        'East Elevator',
        'East Stairs'
]
const Floor10allowedLocations = [
        'Psychiatric Intensive Care Unit (PICU) 10E',
        'Mental Health & Psychiatric Intensive Care Unit (PICU) 10W',
        '10W Care Station',
        'West Stairs',
        'South Elevator',
        'East Stairs'
]
const Floor11allowedLocations = [
        'Finance Procurement',
        'Lounge Area',
        'Kandhal & Singh Cardiovascular Education Theatre C11A',
        'Labraico Cardiovascular Rehabilitation',
        'Cardiac Program Call Centre',
        'South Elevator',
        'North Bathroom (Male)',
        'North Bathroom (Female)',
        'East Stairs'
]
const Floor12allowedLocations = [
        'Kids and Teens Care Specialty Clinics',
        'Patient Safety',
        'Privacy & Risk Management',
        'Professional Practice',
        'Quality Office',
        'Strategy & Transformation',
        'Trillium Gift of Life',
        'West Stairs',
        'North Elevator',
        'South Bathroom',
        'East Stairs'
]
const Floor14allowedLocations = [
        'Payroll Office',
        'Patient Billing',
        'Enterprise Analytics',
        'Digital Services',
        'Biomedical Engineering',
        'Support Services / Resource Centre',
        'Environmental Services (EVS)',
        'Plant & Facilities Operations',
        'West Stairs',
        'East Elevator',
        'East Bathroom (Female)',
        'East Bathroom (Male)',
        'East Stairs',
        'East Bathroom'
]

const baseMapContext = `
<map_general>
Hospital map: ${locationOrigin}/${site}/map
Base all answers on the hospital data provided above. Do not invent or assume information that is not in the context.
If a request is unclear, give the general map link above.
</map_general>
`;

const centenaryMapContext = `
${baseMapContext}

<custom_link_feature>
You can generate a custom directions link for this hospital.

WHEN TO GENERATE ONE
Generate a link whenever the user wants to get somewhere or find something in the hospital, including phrasing like "how do I get to", "where is", "directions to", "take me to", "I'm at X and need Y", or "find the X". Don't wait for them to say "link" or "map".

WORKFLOW
1. Identify the START location, END location, and FLOOR from the conversation. Use anything already stated; don't re-ask.
2. If any of the three is missing, ask only for what's missing (always ask for the floor if they haven't given it).
3. Validate: both locations must appear in the allowed list for that floor, and both must be on the same floor.
   - Floor 4 has two maps (Tower and Margret Birch Wing). Both locations must be on the same one.
4. If valid, output the link. If not, explain briefly what's wrong and ask for a correction.
5. If you can see both locations are on the same floor, then don't ask to clarify the room, just create the appropriate link.

LINK FORMAT
${locationOrigin}/${site}/map?start=START&end=END&floor=FLOOR

- Replace spaces with %20 and "(" / ")" with %28 / %29.
- Do not include any punctuation or brackets when generating a link, and put it on its own line.
- Supported floors: 1-12 and 14.
</custom_link_feature>

<allowed_locations>
<floor n="1">${Floor1allowedLocations}</floor>
<floor n="2">${Floor2allowedLocations}</floor>
<floor n="3">${Floor3allowedLocations}</floor>
<floor n="4" map="Tower">${Floor4allowedLocationsTower}</floor>
<floor n="4" map="Margret Birch Wing">${Floor4allowedLocationsMBW}</floor>
<floor n="5">${Floor5allowedLocations}</floor>
<floor n="6">${Floor6allowedLocations}</floor>
<floor n="7">${Floor7allowedLocations}</floor>
<floor n="8">${Floor8allowedLocations}</floor>
<floor n="9">${Floor9allowedLocations}</floor>
<floor n="10">${Floor10allowedLocations}</floor>
<floor n="11">${Floor11allowedLocations}</floor>
<floor n="12">${Floor12allowedLocations}</floor>
<floor n="14">${Floor14allowedLocations}</floor>
</allowed_locations>

<examples>
User: How do I get from security to the the thyroid clinic? I'm on floor 1.
Assistant: Here's your route:
${locationOrigin}/${site}/map?start=Security&end=Thyroid%20Rapid%20Diagnostic%20Clinic&floor=1

User: Where is radiology?
Assistant: Happy to help. Which floor are you on, and where are you starting from?

User: how do I get from the food court to the emergency room?
Assistant: Here's your route on floor 2:
${locationOrigin}/${site}/map?start=Food%20Court&end=Emergency&floor=2

User: I'm on floor 2 at Elevator A, take me to Room 2%28B%29 on floor 3.
Assistant: Both locations need to be on the same floor for a route. Which floor is your destination on, or do you want directions to an elevator first?
</examples>
`;

const birchmountMapContext = baseMapContext; // no custom links

const MapContext = site === "centenary" ? centenaryMapContext : birchmountMapContext;

    
  return MapContext;
}

function prepareHospitalContext(site) {
  let contextInfo = `This is ${site.charAt(0).toUpperCase() + site.slice(1)} Hospital - part of Scarborough Health Network (SHN).\n\n`;

  const dataFile = `${site}_data.csv`;
  const faqFile = `${site}_faq.csv`;
  
  const hospitalData = readCSVFile(dataFile);
  const faqData = readCSVFile(faqFile);

  if (hospitalData.length > 0) {
    contextInfo += "HOSPITAL DEPARTMENTS AND SERVICES:\n";
    hospitalData.forEach(item => {
      if (item.Name || item.name) {
        const name = item.Name || item.name;
        const description = item.Description || item.description || '';
        const location = item.Location || item.location || '';
        const floor = item.Floor || item.floor || '';
        const phone = item.Phone || item.phone || item['Phone Number'] || '';
        const hours = item.Hours || item.hours || item['Operating Hours'] || '';
        const category = item.Category || item.category || item.Type || item.type || '';

        contextInfo += `- ${name}`;
        if (category) contextInfo += ` (${category})`;
        contextInfo += `\n`;
        
        if (description) contextInfo += `  Description: ${description}\n`;
        if (location) contextInfo += `  Location: ${location}\n`;
        if (floor) contextInfo += `  Floor: ${floor}\n`;
        if (phone) contextInfo += `  Phone: ${phone}\n`;
        if (hours) contextInfo += `  Hours: ${hours}\n`;
        contextInfo += `\n`;
      }
    });
  }

  if (faqData.length > 0) {
    contextInfo += "FREQUENTLY ASKED QUESTIONS:\n";
    faqData.forEach(faq => {
      const question = faq.Question || faq.question || faq.Q;
      const answer = faq.Answer || faq.answer || faq.A;
      
      if (question && answer) {
        contextInfo += `Q: ${question}\n`;
        contextInfo += `A: ${answer}\n\n`;
      }
    });
  }

  if (site === 'birchmount') {
    contextInfo += "BIRCHMOUNT HOSPITAL SPECIFIC INFO:\n";
    contextInfo += "- Part of Scarborough Health Network\n";
    contextInfo += "- Located at 3030 Birchmount Road, Scarborough, ON\n";
    contextInfo += "- Main Phone: (416) 495-2400\n";
    contextInfo += "- Emergency Department available 24/7\n";
    contextInfo += "- Parking available on-site\n\n";
    
    contextInfo += "AVAILABLE MAPS AND LOCATIONS:\n";
    contextInfo += "- ATM locations\n";
    contextInfo += "- Cafe and dining areas\n";
    contextInfo += "- Cardiac Diagnostics\n";
    contextInfo += "- Diagnostic Imaging\n";
    contextInfo += "- EEG/EMG services\n";
    contextInfo += "- Elevators and stairs\n";
    contextInfo += "- Emergency Department\n";
    contextInfo += "- Fracture and Medicine clinics\n";
    contextInfo += "- Gift Shop\n";
    contextInfo += "- ICU (Intensive Care Unit)\n";
    contextInfo += "- Information desk\n";
    contextInfo += "- Kids Care/Pediatrics\n";
    contextInfo += "- Laboratory services\n";
    contextInfo += "- Parking office\n";
    contextInfo += "- Pharmacy\n";
    contextInfo += "- Pre-admissions\n";
    contextInfo += "- Registration\n";
    contextInfo += "- Same Day Surgery\n";
    contextInfo += "- Security\n";
    contextInfo += "- SHN Foundation\n";
    contextInfo += "- Spiritual and Religious Care\n";
    contextInfo += "- Surgical Specialty clinics\n";
    contextInfo += "- Waiting areas\n";
    contextInfo += "- Washrooms\n";
    contextInfo += "- Worship room\n\n";
  } else if (site === 'centenary') {
    contextInfo += "CENTENARY HOSPITAL SPECIFIC INFO:\n";
    contextInfo += "- Part of Scarborough Health Network\n";
    contextInfo += "- Located at 2867 Ellesmere Road, Scarborough, ON\n";
    contextInfo += "- Main Phone: (416) 284-8131\n";
    contextInfo += "- Specialized in rehabilitation and complex continuing care\n";
    contextInfo += "- Parking available on-site\n\n";
  }

  contextInfo += "GENERAL HOSPITAL POLICIES:\n";
  contextInfo += "- Visitor hours may vary by department - check with nursing staff\n";
  contextInfo += "- Masks may be required in certain areas\n";
  contextInfo += "- Please sanitize hands when entering and leaving patient areas\n";
  contextInfo += "- Emergency situations: Call 911 or go to nearest Emergency Department\n";
  contextInfo += "- For medical emergencies within the hospital: Call hospital security or Code Team\n\n";

  return contextInfo;
}

async function chatHandler(req, res) {
  try {
    const { message, site, locationOrigin } = req.body;// send array  of the past 5 messages to the AI

    if (!message || !site) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const contextInfo = prepareHospitalContext(site);
    const MapContext = prepareMapContext(site, locationOrigin);

    const systemPrompt = `You are a helpful hospital assistant for ${site.charAt(0).toUpperCase() + site.slice(1)} Hospital, part of Scarborough Health Network (SHN). Your role is to help patients, visitors, and staff with:

1. Finding locations and departments within the hospital
2. Providing information about services and facilities  
3. Answering questions about visiting hours, parking, and policies
4. Giving directions and navigation help
5. General hospital information and FAQs
6. if some one askes for directions:
${MapContext}

Hospital Context (REAL DATA FROM HOSPITAL SYSTEMS):
${contextInfo}

Guidelines:
- Be friendly, professional, and empathetic
- Provide clear, concise, and accurate information based ONLY on the hospital data provided
- If you don't know something specific, acknowledge it and suggest they contact the information desk at the main phone number
- Always prioritize patient safety and direct medical emergencies to appropriate channels
- Use ONLY the hospital data provided above - do not make up or guess information
- Keep responses helpful but not overly long (max 3-4 sentences unless listing specific information)
- If asked about medical advice, remind users to consult with healthcare professionals
- For directions, mention that interactive maps are available on the website
- If asked about specific room numbers or detailed directions, suggest they visit the information desk

IMPORTANT: Base ALL responses on the actual hospital data provided above. Do not invent or assume information not present in the context.

Remember: You are representing ${site.charAt(0).toUpperCase() + site.slice(1)} Hospital, so maintain a professional and helpful tone at all times.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-6-luna",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_completion_tokens: 1000,
      temperature: 1, 
    });

    const responseMessage = completion.choices[0].message.content;

    res.status(200).json({ message: responseMessage });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ 
      message: 'I apologize, but I\'m experiencing technical difficulties. Please try again in a moment or contact the information desk for immediate assistance.' 
    });
  }
}

module.exports = chatHandler;