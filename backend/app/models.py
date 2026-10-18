import os
from datetime import datetime
from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, Text
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(BASE_DIR, "crop_doctor.db")
DATABASE_URL = f"sqlite:///{DB_PATH}"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class ScanHistory(Base):
    __tablename__ = "scan_history"

    id = Column(Integer, primary_key=True, index=True)
    crop_name = Column(String(100), nullable=False)
    predicted_disease = Column(String(200), nullable=False)
    confidence = Column(Float, nullable=False)
    severity = Column(String(50), default="Moderate")
    image_filename = Column(String(255), nullable=False)
    image_url = Column(String(255), nullable=False)
    symptoms = Column(Text, nullable=True)
    treatment_organic = Column(Text, nullable=True)
    treatment_chemical = Column(Text, nullable=True)
    prevention = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

def init_db():
    Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
