from marshmallow import Schema, fields, validate

class UserSignupSchema(Schema):
    username = fields.Str(required=True, validate=validate.Length(min=3, max=80))
    email = fields.Email(required=True)
    password = fields.Str(required=True, validate=validate.Length(min=6))

class UserLoginSchema(Schema):
    email = fields.Email(required=True)
    password = fields.Str(required=True)

class UserResponseSchema(Schema):
    id = fields.Int()
    username = fields.Str()
    email = fields.Str()
    created_at = fields.Str()
