const { check, validationResult } = require('express-validator');

const generateUserValidators = () => [
    check('name').notEmpty().isLength({ max: 50 }).withMessage("Invalid name"),
    check('lastname').notEmpty().isLength({ max: 50 }).withMessage("Invalid lastname"),
    check('phone').notEmpty().isLength({ min: 10, max: 50 }).isNumeric().withMessage("Invalid phone"),
    check('address').notEmpty().isLength({ max: 150 }).withMessage("Invalid adrress")
]
const generateIdValidators = () => [
    check('id').notEmpty().isNumeric().withMessage("Invalid Id")
]
const updateUserValidators = () => [
    check('id').notEmpty().isNumeric().withMessage("Invalid Id"),
    check('name').isLength({ max: 50 }).withMessage("Invalid name"),
    check('lastname').isLength({ max: 50 }).withMessage("Invalid lastname"),
    check('phone').isLength({ min: 10, max: 50 }).isNumeric().withMessage("Invalid phone"),
    check('address').isLength({ max: 150 }).withMessage("Invalid adrress")
]


const reporter = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(404).json({
            "succes": false,
            "code": 404,
            "menssage": errors,
            "data": []
        });
    }
    next();

}
module.exports = {
    add: [
        generateUserValidators(),
        reporter
    ],
    id: [
        generateIdValidators(),
        reporter
    ],
    update: [
        updateUserValidators(),
        reporter
    ]
};