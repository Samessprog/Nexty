from sqlalchemy import Column, String, Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
import uuid
from db.session import Base
import enum
from sqlalchemy import Enum

class EmploymentStatusEnum(str, enum.Enum):
    ACTIVE = "active"
    ON_LEAVE = "on_leave"
    TERMINATED = "terminated"

class ContractTypeEnum(str, enum.Enum):
    EMPLOYMENT_CONTRACT = "employment_contract"
    B2B = "b2b"
    MANDATE_CONTRACT = "mandate_contract"
    SPECIFIC_TASK_CONTRACT = "specific_task_contract"

class RoleEnum(str, enum.Enum):
    WORKER = "worker"
    MANAGER = "manager"
    ADMIN = "admin"


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    cognito_sub = Column(String, unique=True, index=True, nullable=False)
    employee_code = Column(String, unique=True, nullable=False)
    name = Column(String(30), nullable=False)
    surname = Column(String(50), nullable=False)
    role = Column(Enum(RoleEnum), nullable=False, default=RoleEnum.WORKER)
    employment_status = Column(Enum(EmploymentStatusEnum), nullable=False, default=EmploymentStatusEnum.ACTIVE)
    contract_type = Column(Enum(ContractTypeEnum), nullable=False)
    position_id = Column(UUID(as_uuid=True), ForeignKey("positions.id"), nullable=True)
    area_id = Column(UUID(as_uuid=True), ForeignKey("areas.id"), nullable=True)
    has_accepted_rules = Column(Boolean, default=False)
    email = Column(String(250), unique=True)

