from marshmallow import Schema, fields, validate

class BlogCreateSchema(Schema):
    title = fields.Str(required=True, validate=validate.Length(min=1, max=200))
    content = fields.Str(required=True, validate=validate.Length(min=1))

class BlogUpdateSchema(Schema):
    title = fields.Str(validate=validate.Length(min=1, max=200))
    content = fields.Str(validate=validate.Length(min=1))

class BlogResponseSchema(Schema):
    id = fields.Int()
    title = fields.Str()
    content = fields.Str()
    created_at = fields.Str()
    updated_at = fields.Str()
    user_id = fields.Int()
    author = fields.Str()
