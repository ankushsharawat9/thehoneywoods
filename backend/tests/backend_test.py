"""Backend API tests for The Honey Woods Hotel."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://alpine-luxury-stay-1.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="session")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---------------- Packages ----------------
class TestPackages:
    def test_get_packages_returns_two(self, client):
        r = client.get(f"{API}/packages", timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        assert len(data) == 2
        ids = {p["id"] for p in data}
        assert ids == {"manali-5d4n", "manali-weekend"}
        for p in data:
            assert p["title"] and p["subtitle"] and p["duration"]
            assert isinstance(p["inclusions"], list) and len(p["inclusions"]) > 0
            assert isinstance(p["exclusions"], list) and len(p["exclusions"]) > 0
            assert isinstance(p["itinerary"], list) and len(p["itinerary"]) > 0
            for it in p["itinerary"]:
                assert "day" in it and "title" in it and "detail" in it

    def test_get_package_by_id(self, client):
        r = client.get(f"{API}/packages/manali-5d4n", timeout=30)
        assert r.status_code == 200
        assert r.json()["id"] == "manali-5d4n"

    def test_get_package_404(self, client):
        r = client.get(f"{API}/packages/nonexistent", timeout=30)
        assert r.status_code == 404


# ---------------- Rooms ----------------
class TestRooms:
    def test_get_rooms(self, client):
        r = client.get(f"{API}/rooms", timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert len(data) == 3
        for room in data:
            assert room["name"] and room["description"]
            assert room["image"].startswith("http")
            assert isinstance(room["features"], list) and len(room["features"]) > 0


# ---------------- Reviews ----------------
class TestReviews:
    def test_get_reviews(self, client):
        r = client.get(f"{API}/reviews", timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert len(data) == 5
        for rv in data:
            assert rv["author"] and rv["text"]
            assert 0 <= rv["rating"] <= 5


# ---------------- Inquiries ----------------
class TestInquiries:
    def test_create_inquiry_valid(self, client):
        payload = {
            "name": "TEST_John Doe",
            "email": "test_john@example.com",
            "phone": "+91 9999999999",
            "guests": 3,
            "check_in": "2026-02-01",
            "check_out": "2026-02-05",
            "package_id": "manali-5d4n",
            "message": "TEST inquiry",
        }
        r = client.post(f"{API}/inquiries", json=payload, timeout=30)
        assert r.status_code == 200, r.text
        data = r.json()
        assert "id" in data and data["id"]
        assert data["email_sent"] is False  # no RESEND_API_KEY
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["guests"] == 3
        # Verify persistence via list
        list_r = client.get(f"{API}/inquiries", timeout=30)
        assert list_r.status_code == 200
        ids = [i["id"] for i in list_r.json()]
        assert data["id"] in ids

    def test_create_inquiry_invalid_email(self, client):
        payload = {
            "name": "TEST_Invalid",
            "email": "not-an-email",
            "phone": "+91 9999999999",
            "guests": 2,
        }
        r = client.post(f"{API}/inquiries", json=payload, timeout=30)
        assert r.status_code == 422

    def test_create_inquiry_missing_required(self, client):
        r = client.post(f"{API}/inquiries", json={"name": "x"}, timeout=30)
        assert r.status_code == 422

    def test_list_inquiries_descending(self, client):
        # Create two inquiries
        for i in range(2):
            client.post(
                f"{API}/inquiries",
                json={
                    "name": f"TEST_Order{i}",
                    "email": f"test_order{i}@example.com",
                    "phone": "+91 9999999999",
                    "guests": 2,
                },
                timeout=30,
            )
        r = client.get(f"{API}/inquiries", timeout=30)
        assert r.status_code == 200
        data = r.json()
        assert len(data) >= 2
        # Verify created_at descending
        created_ats = [i["created_at"] for i in data]
        assert created_ats == sorted(created_ats, reverse=True)
        # ensure no _id leaking
        for i in data:
            assert "_id" not in i
