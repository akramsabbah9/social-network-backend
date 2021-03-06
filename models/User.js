/* models/User.js: define User schema */
const { Schema, model } = require("mongoose");

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: "This username is already taken.",
            required: "A username must be provided.",
            trim: true
        },
        email: {
            type: String,
            unique: "This email is already in use.",
            required: "An email must be provided.",
            match: [
                /([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})/,
                "This is not a valid email address."
            ]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: "Thought"
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: "User" // self-reference
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

UserSchema.virtual("friendCount").get(function() {
    return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;