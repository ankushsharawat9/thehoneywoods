from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import asyncio
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import resend


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Resend
RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
SENDER_EMAIL = os.environ.get('SENDER_EMAIL', 'onboarding@resend.dev')
OWNER_EMAIL = os.environ.get('OWNER_EMAIL', 'owner@example.com')
if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

app = FastAPI(title="The Honey Woods API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ==================== MODELS ====================
class InquiryCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    email: EmailStr
    phone: str = Field(..., min_length=6, max_length=30)
    guests: int = Field(default=2, ge=1, le=20)
    check_in: Optional[str] = None
    check_out: Optional[str] = None
    package_id: Optional[str] = None
    message: Optional[str] = ""


class Inquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    phone: str
    guests: int
    check_in: Optional[str] = None
    check_out: Optional[str] = None
    package_id: Optional[str] = None
    message: Optional[str] = ""
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    email_sent: bool = False


class Package(BaseModel):
    id: str
    title: str
    subtitle: str
    duration: str
    hero_image: str
    inclusions: List[str]
    exclusions: List[str]
    itinerary: List[dict]
    note: str


class Room(BaseModel):
    id: str
    name: str
    description: str
    image: str
    features: List[str]


class Review(BaseModel):
    id: str
    author: str
    location: str
    rating: float
    text: str
    date: str


# ==================== STATIC CONTENT ====================
PACKAGES: List[dict] = [
    {
        "id": "manali-5d4n",
        "title": "The Manali Volvo Journey",
        "subtitle": "Delhi → Manali → Delhi",
        "duration": "5 Days · 4 Nights",
        "hero_image": "https://images.unsplash.com/photo-1613551356451-22d6cb1503aa?crop=entropy&cs=srgb&fm=jpg&q=85",
        "inclusions": [
            "Business Class Volvo — Delhi to Manali & return",
            "3 Nights stay at The Honey Woods (3-star Luxury) or similar",
            "2 Nights overnight travel",
            "3 Days Breakfast",
            "3 Days Dinner",
            "All sightseeing by Private Cab in Manali",
        ],
        "exclusions": [
            "Any fun activities",
            "Any snow games",
            "Emergency expenses",
            "Medical emergency",
            "Own shopping expenses",
        ],
        "itinerary": [
            {"day": "01", "title": "Delhi → Manali", "detail": "Overnight Volvo journey through the plains into the pines."},
            {"day": "02", "title": "Local Manali Sightseeing", "detail": "Hadimba Temple, Van Vihar, Mall Road, Club House, Old Manali, Vashisht Temple & the Hot Water Spring."},
            {"day": "03", "title": "Solang Valley", "detail": "A full day among the higher ridges, meadows and adventure country."},
            {"day": "04", "title": "Kullu Sightseeing", "detail": "River drives, temples, and the wide open Kullu valley."},
            {"day": "05", "title": "Manali → Delhi", "detail": "Leave in the evening. Reach Delhi by night, carrying the mountains with you."},
        ],
        "note": "Check-in 11:30 AM · Check-out 10:00 AM",
    },
    {
        "id": "manali-weekend",
        "title": "The Weekend Retreat",
        "subtitle": "3 Days · 2 Nights",
        "duration": "3 Days · 2 Nights",
        "hero_image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?crop=entropy&cs=srgb&fm=jpg&q=85",
        "inclusions": [
            "2 Nights stay at The Honey Woods",
            "Daily breakfast",
            "Airport / bus stand pickup",
            "Local Manali half-day tour",
        ],
        "exclusions": [
            "Transport to Manali",
            "Snow activities",
            "Personal expenses",
        ],
        "itinerary": [
            {"day": "01", "title": "Arrival & Old Manali", "detail": "Check-in, unwind, an evening walk down Old Manali's cafés."},
            {"day": "02", "title": "Solang & Vashisht", "detail": "Half-day cab covering Solang Valley and Vashisht hot springs."},
            {"day": "03", "title": "Slow Morning & Departure", "detail": "A slow breakfast, checkout by 10:00 AM."},
        ],
        "note": "Ideal for couples & short escapes.",
    },
]

ROOMS: List[dict] = [
    {
        "id": "deluxe-woodland",
        "name": "Deluxe Woodland",
        "description": "Hand-finished pine panelling, an olive-mustard accent wall, and a king bed that faces the light.",
        "image": "https://customer-assets-rejwkqb3.emergentagent.net/job_004327b5-5ee8-49b8-9f46-78b4f336246c/artifacts/dr5aty8w_unnamed.jpg",
        "features": ["King Bed", "Mountain View", "Wooden Interiors", "Private Bath"],
    },
    {
        "id": "premium-cedar",
        "name": "Premium Cedar Suite",
        "description": "The larger sibling. Cedar walls, a wine-red throw, and a sitting nook for slow Himalayan mornings.",
        "image": "https://customer-assets-rejwkqb3.emergentagent.net/job_004327b5-5ee8-49b8-9f46-78b4f336246c/artifacts/p3ywh286_unnamed%20%284%29.jpg",
        "features": ["King Bed", "Sitting Area", "Rug & Wood Floor", "Ensuite Marble Bath"],
    },
    {
        "id": "marble-bath",
        "name": "The Marble Bath",
        "description": "Every room opens into a marble-clad bathroom with a rain shower and full-length vanity mirror.",
        "image": "https://customer-assets-rejwkqb3.emergentagent.net/job_004327b5-5ee8-49b8-9f46-78b4f336246c/artifacts/8hdceg8a_unnamed%20%285%29.jpg",
        "features": ["Rain Shower", "Marble Vanity", "24×7 Hot Water", "Toiletries"],
    },
]

REVIEWS: List[dict] = [
    {"id": "r1", "author": "Aarav Mehta", "location": "New Delhi", "rating": 5.0,
     "text": "The wood, the smell of pine at check-in, the mustard walls — it felt like a magazine spread. Staff remembered our chai order by day two.",
     "date": "November 2025"},
    {"id": "r2", "author": "Priya & Rohan", "location": "Bengaluru", "rating": 4.8,
     "text": "The Volvo package was seamless. Rooms were spotless, breakfast was hot, and the private cab driver was a Manali encyclopedia.",
     "date": "October 2025"},
    {"id": "r3", "author": "Sneha Kapoor", "location": "Mumbai", "rating": 4.7,
     "text": "The marble bath was a surprise. Rain shower after a full day at Solang — nothing like it. Will absolutely return.",
     "date": "September 2025"},
    {"id": "r4", "author": "The Iyer Family", "location": "Chennai", "rating": 5.0,
     "text": "Travelled with kids and elderly parents. The hotel was patient, warm, and made a mountain trip feel effortless.",
     "date": "August 2025"},
    {"id": "r5", "author": "Kabir Singh", "location": "Chandigarh", "rating": 4.9,
     "text": "Old Manali is a 6 minute walk. The location is unreasonably good. And the rooms — quiet, wooden, warm.",
     "date": "July 2025"},
]


# ==================== HELPERS ====================
def build_inquiry_email_html(inq: dict) -> str:
    rows = "".join([
        f'<tr><td style="padding:8px 12px;color:#4A4A4A;font-family:Arial,sans-serif;font-size:13px;border-bottom:1px solid #EAEADF;width:140px;">{k}</td>'
        f'<td style="padding:8px 12px;color:#121212;font-family:Arial,sans-serif;font-size:14px;border-bottom:1px solid #EAEADF;">{v or "—"}</td></tr>'
        for k, v in [
            ("Name", inq.get("name")),
            ("Email", inq.get("email")),
            ("Phone", inq.get("phone")),
            ("Guests", inq.get("guests")),
            ("Check-in", inq.get("check_in")),
            ("Check-out", inq.get("check_out")),
            ("Package", inq.get("package_id")),
            ("Message", inq.get("message")),
        ]
    ])
    return f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="background:#F9F9F6;padding:32px 16px;">
      <tr><td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #EAEADF;">
          <tr><td style="padding:28px 32px;border-bottom:1px solid #EAEADF;">
            <div style="font-family:Georgia,serif;font-size:22px;color:#121212;letter-spacing:-0.5px;">The Honey Woods</div>
            <div style="font-family:Arial,sans-serif;font-size:12px;color:#C59B27;letter-spacing:2px;text-transform:uppercase;margin-top:4px;">New Booking Inquiry</div>
          </td></tr>
          <tr><td style="padding:20px 20px 28px 20px;">
            <table width="100%" cellpadding="0" cellspacing="0">{rows}</table>
          </td></tr>
          <tr><td style="padding:16px 32px;background:#121212;color:#F9F9F6;font-family:Arial,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Making Lives Worth Living · Est 2020</td></tr>
        </table>
      </td></tr>
    </table>
    """


async def send_owner_email(inq: dict) -> bool:
    if not RESEND_API_KEY:
        logger.info("RESEND_API_KEY not set; skipping email send.")
        return False
    try:
        params = {
            "from": SENDER_EMAIL,
            "to": [OWNER_EMAIL],
            "subject": f"New Inquiry — {inq.get('name')} · {inq.get('guests')} guests",
            "html": build_inquiry_email_html(inq),
        }
        result = await asyncio.to_thread(resend.Emails.send, params)
        logger.info(f"Resend email sent: {result}")
        return True
    except Exception as e:
        logger.error(f"Resend send failed: {e}")
        return False


# ==================== ROUTES ====================
@api_router.get("/")
async def root():
    return {"message": "The Honey Woods API"}


@api_router.get("/packages", response_model=List[Package])
async def get_packages():
    return PACKAGES


@api_router.get("/packages/{package_id}", response_model=Package)
async def get_package(package_id: str):
    for p in PACKAGES:
        if p["id"] == package_id:
            return p
    raise HTTPException(404, "Package not found")


@api_router.get("/rooms", response_model=List[Room])
async def get_rooms():
    return ROOMS


@api_router.get("/reviews", response_model=List[Review])
async def get_reviews():
    return REVIEWS


@api_router.post("/inquiries", response_model=Inquiry)
async def create_inquiry(payload: InquiryCreate):
    inq = Inquiry(**payload.model_dump())
    doc = inq.model_dump()
    await db.inquiries.insert_one(doc)
    sent = await send_owner_email(doc)
    if sent:
        await db.inquiries.update_one({"id": inq.id}, {"$set": {"email_sent": True}})
        inq.email_sent = True
    return inq


@api_router.get("/inquiries", response_model=List[Inquiry])
async def list_inquiries():
    docs = await db.inquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    return docs


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
