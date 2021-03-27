import { addNewUser, confirmUser, getOneUser, updateOneUser, authenticate } from "../controller/userController"

export const userRoutes = (app) => {
    app.route("/api/users/register")
        .post(addNewUser);

    app.route("/api/users/confirm/:confirmationHash")
        .put(confirmUser);

    app.route("/api/users/:userID")
        .get(getOneUser);

    app.route("/api/users/update/:userID")
        .put(updateOneUser)

    app.route("/api/login")
        .post(authenticate)

}