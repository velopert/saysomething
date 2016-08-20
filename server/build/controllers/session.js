"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * Creates Random Color
 * @return {Array} RGB value in a array format: [r,g,b]
 */
function generateColor() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return [r, g, b];
}

/*
    API: GET /
    description: Returns or creates a session, which is in a random color format
*/
var session = function session(req, res) {
    var session = req.session;
    // if color is not set, set a new color
    if (!session.color) {
        session.color = generateColor();
    }

    // return the color
    return res.json({
        color: session.color
    });
};

exports.default = session;