"""create account table

Revision ID: 84117799c9ba
Revises: 
Create Date: 2022-02-18 11:48:32.636495

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '84117799c9ba'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'account',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('name', sa.String(50), nullable=False),
        sa.Column('description', sa.Unicode(200)),
    )

def downgrade():
    op.drop_table('account')