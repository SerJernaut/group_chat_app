/**
 *
 * @param {Joi} schema
 * @return {function(ActionType): function(...[*]=)}
 */
function createValidationMW (schema) {

    return async (req, res, next) => {
        try {
            console.log('hi')
            req.body = await schema.validateAsync( req.body );
            next();
        } catch (e) {
            next( e );
        }
    };
}

module.exports = createValidationMW;