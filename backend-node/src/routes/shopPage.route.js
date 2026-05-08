import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getDailyDeals } from "../controllers/ShopItemsControllers/getDailyDeals.controller.js";
import { getSeasonSpotlights } from "../controllers/ShopItemsControllers/getSeasonSpotlights.controller.js";
import { getBundles } from "../controllers/ShopItemsControllers/getBundles.controller.js";
import { getSeasonEndDate } from "../controllers/ShopItemsControllers/getSeasonEndDate.controller.js";
import { putPurchasedItems } from "../controllers/ShopItemsControllers/putPurchasedItems.controller.js";

const shopPageRouter = Router();

// GET api/shop/dailyDeals
shopPageRouter.get("/dailyDeals", protect, getDailyDeals);

// GET api/shop/seasonSpotlights
shopPageRouter.get("/seasonSpotlights", protect, getSeasonSpotlights);

// GET api/shop/bundles
shopPageRouter.get("/bundles", protect, getBundles);

// GET api/shop/seasonEndDate
shopPageRouter.get("/seasonEndDate", protect, getSeasonEndDate);

// put api/shop/purchase
shopPageRouter.put("/purchase", protect, putPurchasedItems);

export default shopPageRouter;
