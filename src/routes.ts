import { MediumController } from "./controller/MediumController";
import { UserController } from "./controller/UserController";

export const Routes = [
  {
    controller: UserController,
    method: "get",
    action: "all",
    route: "/users",
  },
  {
    controller: UserController,
    method: "get",
    action: "one",
    route: "/users/:id",
  },
  {
    controller: UserController,
    method: "post",
    action: "save",
    route: "/users",
  },
  {
    controller: UserController,
    method: "delete",
    action: "remove",
    route: "/users/:id",
  },
  {
    controller: MediumController,
    method: "get",
    action: "all",
    route: "/media",
  },
];
