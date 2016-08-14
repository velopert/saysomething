/**
 * Creates Random Color
 * @return {Array} RGB value in a array format: [r,g,b]
 */
function generateColor() {
    const r = Math.floor((Math.random() * 255));
    const g = Math.floor((Math.random() * 255));
    const b = Math.floor((Math.random() * 255));
    return [r,g,b];
}

// RETURNS OR CREATES A SESSION (WHICH IS IN A RANDOM COLOR)
const session = (req, res) => {
    const session = req.session;

    // if color is not set, set a new color
    if(!session.color) {
        session.color = generateColor();
    }

    // return the color
    return res.json({
        color: session.color
    });
};

export default session;
