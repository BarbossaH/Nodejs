/**
 * passing in the roles as parameter,and using jwt.verify to check the roles, because some pages needs special
 * authorization to access
 */

const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    // console.log('allowedRoles: ', allowedRoles);
    const rolesArray = [...allowedRoles];
    // console.log('rolesArray ', rolesArray);
    // console.log('req.roles', req.roles);
    // const rolesExistence = req.roles.map((role) => rolesArray.includes(role));
    // console.log('rolesExistence', rolesExistence);
    // const isAllowed = rolesExistence.find((val) => val === true);
    // console.log('isAllowed=', isAllowed);
    const isAllowed = req.roles
      .map((role) => allowedRoles.includes(role))
      .find((val) => val === true);
    if (!isAllowed) return res.sendStatus(401);
    next();
  };
};
module.exports = verifyRoles;
