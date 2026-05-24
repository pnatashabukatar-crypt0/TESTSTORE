async function createDesign() {
  const page = figma.currentPage;
  
  // Load fonts
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
  
  // Color palette
  const colors = {
    primary: { r: 0.2, g: 0.4, b: 0.8 },
    darkBg: { r: 0.95, g: 0.95, b: 0.95 },
    text: { r: 0.1, g: 0.1, b: 0.1 },
    lightText: { r: 0.5, g: 0.5, b: 0.5},
    white: { r: 1, g: 1, b: 1 },
    accent: { r: 1, g: 0.4, b: 0.2 }
  };
  
  // DESKTOP VIEW (1920px)
  const desktopFrame = figma.createFrame();
  desktopFrame.name = "Desktop Wireframe - 1920px";
  desktopFrame.width = 1920;
  desktopFrame.height = 3200;
  desktopFrame.fills = [{ type: "SOLID", color: colors.white }];
  page.appendChild(desktopFrame);
  
  // Desktop Header/Navigation
  const desktopHeader = figma.createFrame();
  desktopHeader.name = "Header";
  desktopHeader.width = 1920;
  desktopHeader.height = 80;
  desktopHeader.fills = [{ type: "SOLID", color: colors.primary }];
  desktopHeader.x = 0;
  desktopHeader.y = 0;
  desktopFrame.appendChild(desktopHeader);
  
  const desktopLogo = figma.createText();
  desktopLogo.characters = "GAME STORE";
  desktopLogo.fontSize = 28;
  desktopLogo.fontFamily = "Inter";
  desktopLogo.fontWeight = 700;
  desktopLogo.fills = [{ type: "SOLID", color: colors.white }];
  desktopLogo.x = 40;
  desktopLogo.y = 25;
  desktopHeader.appendChild(desktopLogo);
  
  // Desktop Hero Section
  const desktopHero = figma.createFrame();
  desktopHero.name = "Hero Section";
  desktopHero.width = 1920;
  desktopHero.height = 500;
  desktopHero.fills = [{ type: "SOLID", color: colors.darkBg }];
  desktopHero.x = 0;
  desktopHero.y = 80;
  desktopFrame.appendChild(desktopHero);
  
  const desktopHeroText = figma.createText();
  desktopHeroText.characters = "Featured Games Slider";
  desktopHeroText.fontSize = 32;
  desktopHeroText.fontFamily = "Inter";
  desktopHeroText.fontWeight = 700;
  desktopHeroText.fills = [{ type: "SOLID", color: colors.text }];
  desktopHeroText.x = 100;
  desktopHeroText.y = 200;
  desktopHero.appendChild(desktopHeroText);
  
  const desktopHeroSubtext = figma.createText();
  desktopHeroSubtext.characters = "[Carousel with game images, titles, and CTA buttons]";
  desktopHeroSubtext.fontSize = 16;
  desktopHeroSubtext.fontFamily = "Inter";
  desktopHeroSubtext.fills = [{ type: "SOLID", color: colors.lightText }];
  desktopHeroSubtext.x = 100;
  desktopHeroSubtext.y = 250;
  desktopHero.appendChild(desktopHeroSubtext);
  
  // Desktop Featured Games Grid
  const desktopFeatured = figma.createFrame();
  desktopFeatured.name = "Featured Games Grid";
  desktopFeatured.width = 1920;
  desktopFeatured.height = 600;
  desktopFeatured.fills = [{ type: "SOLID", color: colors.white }];
  desktopFeatured.x = 0;
  desktopFeatured.y = 580;
  desktopFrame.appendChild(desktopFeatured);
  
  const desktopFeaturedTitle = figma.createText();
  desktopFeaturedTitle.characters = "Featured Games";
  desktopFeaturedTitle.fontSize = 28;
  desktopFeaturedTitle.fontFamily = "Inter";
  desktopFeaturedTitle.fontWeight = 700;
  desktopFeaturedTitle.fills = [{ type: "SOLID", color: colors.text }];
  desktopFeaturedTitle.x = 100;
  desktopFeaturedTitle.y = 40;
  desktopFeatured.appendChild(desktopFeaturedTitle);
  
  // 4 game cards in grid
  for (let i = 0; i < 4; i++) {
    const gameCard = figma.createFrame();
    gameCard.name = `Game Card ${i + 1}`;
    gameCard.width = 380;
    gameCard.height = 480;
    gameCard.fills = [{ type: "SOLID", color: colors.darkBg }];
    gameCard.x = 100 + (i * 420);
    gameCard.y = 120;
    desktopFeatured.appendChild(gameCard);
    
    const gameImage = figma.createFrame();
    gameImage.width = 360;
    gameImage.height = 300;
    gameImage.fills = [{ type: "SOLID", color: colors.primary }];
    gameImage.x = 10;
    gameImage.y = 10;
    gameCard.appendChild(gameImage);
    
    const gameTitle = figma.createText();
    gameTitle.characters = `Game ${i + 1}`;
    gameTitle.fontSize = 18;
    gameTitle.fontFamily = "Inter";
    gameTitle.fontWeight = 700;
    gameTitle.fills = [{ type: "SOLID", color: colors.text }];
    gameTitle.x = 10;
    gameTitle.y = 320;
    gameCard.appendChild(gameTitle);
    
    const gamePrice = figma.createText();
    gamePrice.characters = "$29.99";
    gamePrice.fontSize = 16;
    gamePrice.fontFamily = "Inter";
    gamePrice.fills = [{ type: "SOLID", color: colors.accent }];
    gamePrice.x = 10;
    gamePrice.y = 360;
    gameCard.appendChild(gamePrice);
  }
  
  // Desktop Promotions Section
  const desktopPromo = figma.createFrame();
  desktopPromo.name = "Promotions Section";
  desktopPromo.width = 1920;
  desktopPromo.height = 300;
  desktopPromo.fills = [{ type: "SOLID", color: colors.primary }];
  desktopPromo.x = 0;
  desktopPromo.y = 1180;
  desktopFrame.appendChild(desktopPromo);
  
  const desktopPromoTitle = figma.createText();
  desktopPromoTitle.characters = "Special Promotions";
  desktopPromoTitle.fontSize = 28;
  desktopPromoTitle.fontFamily = "Inter";
  desktopPromoTitle.fontWeight = 700;
  desktopPromoTitle.fills = [{ type: "SOLID", color: colors.white }];
  desktopPromoTitle.x = 100;
  desktopPromoTitle.y = 50;
  desktopPromo.appendChild(desktopPromoTitle);
  
  const desktopPromoText = figma.createText();
  desktopPromoText.characters = "Up to 50% off on selected titles | Free shipping on orders over $50";
  desktopPromoText.fontSize = 18;
  desktopPromoText.fontFamily = "Inter";
  desktopPromoText.fills = [{ type: "SOLID", color: colors.white }];
  desktopPromoText.x = 100;
  desktopPromoText.y = 120;
  desktopPromo.appendChild(desktopPromoText);
  
  // Desktop Reviews Section
  const desktopReviews = figma.createFrame();
  desktopReviews.name = "Customer Reviews";
  desktopReviews.width = 1920;
  desktopReviews.height = 500;
  desktopReviews.fills = [{ type: "SOLID", color: colors.white }];
  desktopReviews.x = 0;
  desktopReviews.y = 1480;
  desktopFrame.appendChild(desktopReviews);
  
  const desktopReviewsTitle = figma.createText();
  desktopReviewsTitle.characters = "Customer Reviews";
  desktopReviewsTitle.fontSize = 28;
  desktopReviewsTitle.fontFamily = "Inter";
  desktopReviewsTitle.fontWeight = 700;
  desktopReviewsTitle.fills = [{ type: "SOLID", color: colors.text }];
  desktopReviewsTitle.x = 100;
  desktopReviewsTitle.y = 40;
  desktopReviews.appendChild(desktopReviewsTitle);
  
  // 3 review cards
  for (let i = 0; i < 3; i++) {
    const reviewCard = figma.createFrame();
    reviewCard.name = `Review ${i + 1}`;
    reviewCard.width = 560;
    reviewCard.height = 200;
    reviewCard.fills = [{ type: "SOLID", color: colors.darkBg }];
    reviewCard.x = 100 + (i * 600);
    reviewCard.y = 120;
    desktopReviews.appendChild(reviewCard);
    
    const reviewText = figma.createText();
    reviewText.characters = `"Great selection and fast delivery!" - Customer ${i + 1}`;
    reviewText.fontSize = 14;
    reviewText.fontFamily = "Inter";
    reviewText.fills = [{ type: "SOLID", color: colors.text }];
    reviewText.x = 20;
    reviewText.y = 20;
    reviewCard.appendChild(reviewText);
    
    const rating = figma.createText();
    rating.characters = "★★★★★";
    rating.fontSize = 16;
    rating.fontFamily = "Inter";
    rating.fills = [{ type: "SOLID", color: colors.accent }];
    rating.x = 20;
    rating.y = 100;
    reviewCard.appendChild(rating);
  }
  
  // Desktop Footer
  const desktopFooter = figma.createFrame();
  desktopFooter.name = "Footer";
  desktopFooter.width = 1920;
  desktopFooter.height = 200;
  desktopFooter.fills = [{ type: "SOLID", color: colors.text }];
  desktopFooter.x = 0;
  desktopFooter.y = 1980;
  desktopFrame.appendChild(desktopFooter);
  
  const desktopFooterText = figma.createText();
  desktopFooterText.characters = "© 2024 Game Store. All rights reserved.";
  desktopFooterText.fontSize = 14;
  desktopFooterText.fontFamily = "Inter";
  desktopFooterText.fills = [{ type: "SOLID", color: colors.white }];
  desktopFooterText.x = 100;
  desktopFooterText.y = 90;
  desktopFooter.appendChild(desktopFooterText);
  
  // MOBILE VIEW (375px)
  const mobileFrame = figma.createFrame();
  mobileFrame.name = "Mobile Wireframe - 375px";
  mobileFrame.width = 375;
  mobileFrame.height = 2400;
  mobileFrame.fills = [{ type: "SOLID", color: colors.white }];
  mobileFrame.x = 2100;
  mobileFrame.y = 0;
  page.appendChild(mobileFrame);
  
  // Mobile Header
  const mobileHeader = figma.createFrame();
  mobileHeader.name = "Header";
  mobileHeader.width = 375;
  mobileHeader.height = 70;
  mobileHeader.fills = [{ type: "SOLID", color: colors.primary }];
  mobileHeader.x = 0;
  mobileHeader.y = 0;
  mobileFrame.appendChild(mobileHeader);
  
  const mobileLogo = figma.createText();
  mobileLogo.characters = "GAME";
  mobileLogo.fontSize = 20;
  mobileLogo.fontFamily = "Inter";
  mobileLogo.fontWeight = 700;
  mobileLogo.fills = [{ type: "SOLID", color: colors.white }];
  mobileLogo.x = 20;
  mobileLogo.y = 22;
  mobileHeader.appendChild(mobileLogo);
  
  // Mobile Hero
  const mobileHero = figma.createFrame();
  mobileHero.name = "Hero Section";
  mobileHero.width = 375;
  mobileHero.height = 300;
  mobileHero.fills = [{ type: "SOLID", color: colors.darkBg }];
  mobileHero.x = 0;
  mobileHero.y = 70;
  mobileFrame.appendChild(mobileHero);
  
  const mobileHeroText = figma.createText();
  mobileHeroText.characters = "Featured Games";
  mobileHeroText.fontSize = 20;
  mobileHeroText.fontFamily = "Inter";
  mobileHeroText.fontWeight = 700;
  mobileHeroText.fills = [{ type: "SOLID", color: colors.text }];
  mobileHeroText.x = 20;
  mobileHeroText.y = 100;
  mobileHero.appendChild(mobileHeroText);
  
  const mobileHeroSubtext = figma.createText();
  mobileHeroSubtext.characters = "[Vertical carousel]";
  mobileHeroSubtext.fontSize = 12;
  mobileHeroSubtext.fontFamily = "Inter";
  mobileHeroSubtext.fills = [{ type: "SOLID", color: colors.lightText }];
  mobileHeroSubtext.x = 20;
  mobileHeroSubtext.y = 140;
  mobileHero.appendChild(mobileHeroSubtext);
  
  // Mobile Game Cards (stacked)
  for (let i = 0; i < 3; i++) {
    const mobileGameCard = figma.createFrame();
    mobileGameCard.name = `Game Card ${i + 1}`;
    mobileGameCard.width = 335;
    mobileGameCard.height = 280;
    mobileGameCard.fills = [{ type: "SOLID", color: colors.darkBg }];
    mobileGameCard.x = 20;
    mobileGameCard.y = 370 + (i * 300);
    mobileFrame.appendChild(mobileGameCard);
    
    const mobileGameImage = figma.createFrame();
    mobileGameImage.width = 315;
    mobileGameImage.height = 180;
    mobileGameImage.fills = [{ type: "SOLID", color: colors.primary }];
    mobileGameImage.x = 10;
    mobileGameImage.y = 10;
    mobileGameCard.appendChild(mobileGameImage);
    
    const mobileGameTitle = figma.createText();
    mobileGameTitle.characters = `Game ${i + 1}`;
    mobileGameTitle.fontSize = 16;
    mobileGameTitle.fontFamily = "Inter";
    mobileGameTitle.fontWeight = 700;
    mobileGameTitle.fills = [{ type: "SOLID", color: colors.text }];
    mobileGameTitle.x = 10;
    mobileGameTitle.y = 200;
    mobileGameCard.appendChild(mobileGameTitle);
    
    const mobileGamePrice = figma.createText();
    mobileGamePrice.characters = "$29.99";
    mobileGamePrice.fontSize = 14;
    mobileGamePrice.fontFamily = "Inter";
    mobileGamePrice.fills = [{ type: "SOLID", color: colors.accent }];
    mobileGamePrice.x = 10;
    mobileGamePrice.y = 235;
    mobileGameCard.appendChild(mobileGamePrice);
  }
  
  // Mobile Promotions
  const mobilePromo = figma.createFrame();
  mobilePromo.name = "Promotions";
  mobilePromo.width = 375;
  mobilePromo.height = 200;
  mobilePromo.fills = [{ type: "SOLID", color: colors.primary }];
  mobilePromo.x = 0;
  mobilePromo.y = 1270;
  mobileFrame.appendChild(mobilePromo);
  
  const mobilePromoTitle = figma.createText();
  mobilePromoTitle.characters = "Special Offer";
  mobilePromoTitle.fontSize = 18;
  mobilePromoTitle.fontFamily = "Inter";
  mobilePromoTitle.fontWeight = 700;
  mobilePromoTitle.fills = [{ type: "SOLID", color: colors.white }];
  mobilePromoTitle.x = 20;
  mobilePromoTitle.y = 30;
  mobilePromo.appendChild(mobilePromoTitle);
  
  const mobilePromoText = figma.createText();
  mobilePromoText.characters = "50% off selected games";
  mobilePromoText.fontSize = 14;
  mobilePromoText.fontFamily = "Inter";
  mobilePromoText.fills = [{ type: "SOLID", color: colors.white }];
  mobilePromoText.x = 20;
  mobilePromoText.y = 80;
  mobilePromo.appendChild(mobilePromoText);
  
  // Mobile Reviews
  const mobileReviews = figma.createFrame();
  mobileReviews.name = "Reviews";
  mobileReviews.width = 375;
  mobileReviews.height = 400;
  mobileReviews.fills = [{ type: "SOLID", color: colors.white }];
  mobileReviews.x = 0;
  mobileReviews.y = 1470;
  mobileFrame.appendChild(mobileReviews);
  
  const mobileReviewsTitle = figma.createText();
  mobileReviewsTitle.characters = "Reviews";
  mobileReviewsTitle.fontSize = 18;
  mobileReviewsTitle.fontFamily = "Inter";
  mobileReviewsTitle.fontWeight = 700;
  mobileReviewsTitle.fills = [{ type: "SOLID", color: colors.text }];
  mobileReviewsTitle.x = 20;
  mobileReviewsTitle.y = 20;
  mobileReviews.appendChild(mobileReviewsTitle);
  
  for (let i = 0; i < 2; i++) {
    const mobileReviewCard = figma.createFrame();
    mobileReviewCard.name = `Review ${i + 1}`;
    mobileReviewCard.width = 335;
    mobileReviewCard.height = 140;
    mobileReviewCard.fills = [{ type: "SOLID", color: colors.darkBg }];
    mobileReviewCard.x = 20;
    mobileReviewCard.y = 70 + (i * 160);
    mobileReviews.appendChild(mobileReviewCard);
    
    const mobileReviewText = figma.createText();
    mobileReviewText.characters = `"Great app!" - User ${i + 1}`;
    mobileReviewText.fontSize = 12;
    mobileReviewText.fontFamily = "Inter";
    mobileReviewText.fills = [{ type: "SOLID", color: colors.text }];
    mobileReviewText.x = 15;
    mobileReviewText.y = 15;
    mobileReviewCard.appendChild(mobileReviewText);
    
    const mobileRating = figma.createText();
    mobileRating.characters = "★★★★★";
    mobileRating.fontSize = 12;
    mobileRating.fontFamily = "Inter";
    mobileRating.fills = [{ type: "SOLID", color: colors.accent }];
    mobileRating.x = 15;
    mobileRating.y = 80;
    mobileReviewCard.appendChild(mobileRating);
  }
  
  // Mobile Footer
  const mobileFooter = figma.createFrame();
  mobileFooter.name = "Footer";
  mobileFooter.width = 375;
  mobileFooter.height = 150;
  mobileFooter.fills = [{ type: "SOLID", color: colors.text }];
  mobileFooter.x = 0;
  mobileFooter.y = 1870;
  mobileFrame.appendChild(mobileFooter);
  
  const mobileFooterText = figma.createText();
  mobileFooterText.characters = "© 2024 Game Store";
  mobileFooterText.fontSize = 12;
  mobileFooterText.fontFamily = "Inter";
  mobileFooterText.fills = [{ type: "SOLID", color: colors.white }];
  mobileFooterText.x = 20;
  mobileFooterText.y = 60;
  mobileFooter.appendChild(mobileFooterText);
}
createDesign().catch(e => console.error(e));