import React from "react";
import { Link } from "react-router-dom";
import { BaseLayout } from "./layouts/BaseLayout";
import { Checkout } from "./Checkout/Checkout";

const productData = {
  id: 1,
  title: "Small Bets - Lifetime Membership",
  price: 37500,
  banner: "https://public-files.gumroad.com/f2j01umg4977clc8naxdw0qpiw5z",
  creator: {
    firstName: "Daniel",
    lastName: "Vassallo",
    photo: "https://public-files.gumroad.com/6vthes6eqagxjs98m7fx4ze8ujtp",
  },
  rating: 4.9,
  numRatings: 154,
  ratingDistributions: [1, 1, 1, 1, 96],
  numSales: 4421,
  offer: {
    percent: 50,
    title: "50% OFF ❄ WINTER HOLIDAYS DEAL",
  },
  showProofEvents: true,
  description: `## Interested in entrepreneurship?

  ### Forget about starting a company.
  
  Try making $1,000 with a small project first. We learn a lot more from small wins than from big failures. When you join **Small Bets** you'll find a support network ready to help you get your first small wins, along with regular live workshops to teach and inspire you.
  
  Sign up now to become a lifetime member of the Small Bets community. Pay once, member forever. No recurring fees.`,
};

export default () => (
  <BaseLayout>
    <Checkout product={productData} />
  </BaseLayout>
);
