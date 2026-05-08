import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getDailyDeals } from "../controllers/ShopItemsControllers/getDailyDeals.controller.js";
import { getShopItems } from "../controllers/ShopItemsControllers/getShopItems.controller.js";
import { getBundles } from "../controllers/ShopItemsControllers/getBundles.controller.js";

const shopPageRouter = Router();

// GET api/shop/dailyDeals
shopPageRouter.get("/dailyDeals", protect, getDailyDeals);

// GET api/shop/shopItems
shopPageRouter.get("/shopItems", protect, getShopItems);

// GET api/shop/bundles
shopPageRouter.get("/bundles", protect, getBundles);

export default shopPageRouter;
