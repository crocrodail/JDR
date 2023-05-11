const Home = require("../controllers/http/HomeController.js");
const Auth = require("../controllers/http/AuthController.js");
const User = require("../controllers/http/UserController.js");

const configRoute = [
  { method: "GET", path: "/", controller: Home.getAll },

  /*--- AUTH ---*/
  { method: "POST", path: "/auth/login", controller: Auth.login },
  { method: "POST", path: "/auth/register", controller: Auth.register },
  { method: "POST", path: "/auth/forgetpassword", controller: Auth.forgetPassword,},
  { method: "POST", path: "/auth/reset", controller: Auth.resetPassword },
  { method: "POST", path: "/auth/changePassword", role: ["*"], controller: Auth.changePassword },
  /*--- AUTH ---*/

  /*--- User ---*/
  { method: "GET", path: "/user/info", role: ["*"], controller: User.info },
  { method: "GET", path: "/user", role: ["*"], controller: User.getAll },
  { method: "PUT", path: "/user", role: ["*"], controller: User.update },
  { method: "PUT", path: "/user/:id", role: ["*"], controller: User.update },
  { method: "GET", path: "/user/:id", role: ["admin"], controller: User.getOne },
  { method: "POST", path: "/user/delete", role: ["*"], controller: User.deleteOne },
  /*--- User ---*/
];

module.exports = [
  (app) => {
    for (const key in configRoute) {
      switch (configRoute[key].method) {
        case "GET":
          app.get(configRoute[key].path, configRoute[key].controller);
          break;
        case "POST":
          app.post(configRoute[key].path, configRoute[key].controller);
          break;
        case "PUT":
          app.put(configRoute[key].path, configRoute[key].controller);
          break;
        case "DELETE":
          app.delete(configRoute[key].path, configRoute[key].controller);
          break;
        default:
          break;
      }
    }
  },
  configRoute,
];
