import express from "express";

import auth_routes from "./auth.routes.js";
import user_routes from "./user.routes.js";
import contact_routes from "./contact.routes.js";
import customized_trip_routes from "./custTrip.routes.js";
import myst_dest_routes from "./mystDest.routes.js";
import reservation_routes from "./reservation.routes.js";

const router = express.Router();

router.use("/api/v1/auth", auth_routes);
router.use("/api/v1/user", user_routes);
router.use("/api/v1/contact", contact_routes);
router.use("/api/v1/customized-trip", customized_trip_routes);
router.use("/api/v1/myst-dest", myst_dest_routes);
router.use("/api/v1/reservation", reservation_routes);

router.get("*", (req, res) => {
  res.status(404).json({ msg: "Page not found" });
});

export default router;
