"""testfromfastapi7

Revision ID: 368a17eedcbb
Revises: 07ccaa75b92b
Create Date: 2022-02-18 14:38:50.292867

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '368a17eedcbb'
down_revision = '07ccaa75b92b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user', sa.String(), nullable=True),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('hashed_password', sa.String(), nullable=True),
    sa.Column('active', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_users_email'), 'users', ['email'], unique=False)
    op.create_index(op.f('ix_users_id'), 'users', ['id'], unique=False)
    op.create_index(op.f('ix_users_user'), 'users', ['user'], unique=False)
    op.create_table('contents',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=True),
    sa.Column('content_url', sa.String(), nullable=False),
    sa.Column('content_metadata', sa.String(), nullable=True),
    sa.Column('shortened_url', sa.String(), nullable=False),
    sa.Column('backbutton_url', sa.String(), nullable=True),
    sa.Column('display_ad_url', sa.String(), nullable=True),
    sa.Column('click_count', sa.Integer(), nullable=True),
    sa.Column('active', sa.Boolean(), nullable=True),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_contents_content_url'), 'contents', ['content_url'], unique=False)
    op.create_index(op.f('ix_contents_id'), 'contents', ['id'], unique=False)
    op.create_index(op.f('ix_contents_shortened_url'), 'contents', ['shortened_url'], unique=False)
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_contents_shortened_url'), table_name='contents')
    op.drop_index(op.f('ix_contents_id'), table_name='contents')
    op.drop_index(op.f('ix_contents_content_url'), table_name='contents')
    op.drop_table('contents')
    op.drop_index(op.f('ix_users_user'), table_name='users')
    op.drop_index(op.f('ix_users_id'), table_name='users')
    op.drop_index(op.f('ix_users_email'), table_name='users')
    op.drop_table('users')
    # ### end Alembic commands ###
