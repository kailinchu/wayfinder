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
const allowedLocations = [
"Food Court",
"Family Birthing Center",
"Emergency",
"Fracture Clinic",
"Diagnostic Imaging",
"Arrhythmia Clinic Cardiac Diagnostics",
"Intensive Care Unit (ICU)",
"Cath lab Code STEMI",
"Worship &#38; Meditation",
"Surgical Specialty Clinics",
"Endoscopy Clinic",
"Pulmonary Function Test (PFT) Lab",
"SHN Foundation Office",
"Life Labs",
"Registration Kiosks",
"Patient Registration",
"Lifemark Physiotherapy Sports Desk",
"Information Desk",
"Same Day Surgery",
"Gynecology",
"Maternal Fetal Medicine Clinic",
"Obstetetric Medicine Clinic",
"Neonatal Intensive Care Unit (NICU)",
"Retail Pharmacy (Shoppers Drug Mart)",
"Gift Shop",
"Washroom Southwest",
"Small Bathroom West",
"South Bathroom",
"Washroom East",
"North Bathroom",
"Elevator South",
"Elevator West",
"Elevator North",
"Stairs West",
"West Stairs Big",
"Stairs South",
"Stairs North",
"Stairs Southwest",
"Parking Office",
"North Parking",
"ATM Machine",
];

console.log(site);
  const MapContext = `
    Here is the link to the map: ${locationOrigin}/${site}/map\n

    From this point onward, the instructions are only for "centenary" hospital. use ${site} to figure out which hospital it is. 
    Do not say you can provide a link base off of a start and end location

    if the user needs furthur direction, ask them for a start and end location then, Create a custom link using: ${locationOrigin}/${site}/map?start=Start&end=End
    IMPORTANT: Base ALL responses on the actual hospital data provided above. Do not invent or assume information not present in the context.
    IMPORTANT: the custom link is only for "centenary" hospital, look use ${site} to figure out which one it is for. In case of "birchmount" do not say you can create a custom link, 
    do not as for starting and ending locations for custom link creation purposes.


    Conditions for custom link:
    1. if the user provides a start and end location, once you see two locations in ${allowedLocations}
    2. the first one is Start the second one is End, then give them a link in ${locationOrigin}/${site}/map?start=Start&end=End. Only accept locations on this list ${allowedLocations}
    3. when a link is made do not include any punctuation at the end of the link
    4. if the location has multiple words make sure the link is in a valid format, use %20 as separators between words and %28 for brackets
    5. if you do not understand a request just give them ${locationOrigin}/${site}/map

    Here are the allowed locations for the map: ${allowedLocations}
    `

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
    const { message, site, locationOrigin } = req.body;

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
      model: "gpt-4.1-nano",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 100,
      temperature: 0.3, 
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