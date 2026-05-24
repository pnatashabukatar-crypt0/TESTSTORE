async function createDesign() {
  const page = figma.currentPage;
  
  // Load fonts
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
  await figma.loadFontAsync({ family: "Inter", style: "SemiBold" });
  
  // Color palette
  const colors = {
    primary: { r: 0.2, g: 0.4, b: 0.8 },
    secondary: { r: 0.1, g: 0.2, b: 0.5 },
    accent: { r: 1, g: 0.4, b: 0.2 },
    neutral: { r: 0.95, g: 0.95, b: 0.95 },
    dark: { r: 0.1, g: 0.1, b: 0.1 },
    white: { r: 1, g: 1, b: 1 }
  };
  
  // DESKTOP WIREFRAME (1920px)
  const desktopFrame = figma.createFrame();
  desktopFrame.name = "Desktop Wireframe (1920px)";
  desktopFrame.resize(1920, 2400);
  desktopFrame.fills = [{ type: "SOLID", color: colors.white }];
  page.appendChild(desktopFrame);
  
  // Desktop Header/Navigation
  const desktopHeader = figma.createFrame();
  desktopHeader.name = "Header";
  desktopHeader.resize(1920, 80);
  desktopHeader.fills = [{ type: "SOLID", color: colors.primary }];
  desktopHeader.x = 0;
  desktopHeader.y = 0;
  desktopFrame.appendChild(desktopHeader);
  
  const desktopLogo = figma.createText();
  desktopLogo.characters = "GAME STORE";
  desktopLogo.fontName = { family: "Inter", style: "Bold" };
  desktopLogo.fontSize = 24;
  desktopLogo.fills = [{ type: "SOLID", color: colors.white }];
  desktopLogo.x = 40;
  desktopLogo.y = 28;
  desktopHeader.appendChild(desktopLogo);
  
  // Desktop Featured Games Section
  const desktopFeatured = figma.createFrame();
  desktopFeatured.name = "Featured Games Slider";
  desktopFeatured.resize(1920, 400);
  desktopFeatured.fills = [{ type: "SOLID", color: colors.neutral }];
  desktopFeatured.x = 0;
  desktopFeatured.y = 80;
  desktopFrame.appendChild(desktopFeatured);
  
  const desktopFeaturedTitle = figma.createText();
  desktopFeaturedTitle.characters = "Featured Games";
  desktopFeaturedTitle.fontName = { family: "Inter", style: "Bold" };
  desktopFeaturedTitle.fontSize = 28;
  desktopFeaturedTitle.fills = [{ type: "SOLID", color: colors.dark }];
  desktopFeaturedTitle.x = 40;
  desktopFeaturedTitle.y = 20;
  desktopFeatured.appendChild(desktopFeaturedTitle);
  
  // Featured game cards (3 visible)
  for (let i = 0; i < 3; i++) {
    const gameCard = figma.createFrame();
    gameCard.name = `Game Card ${i + 1}`;
    gameCard.resize(560, 300);
    gameCard.fills = [{ type: "SOLID", color: colors.white }];
    gameCard.x = 40 + i * 600;
    gameCard.y = 80;
    desktopFeatured.appendChild(gameCard);
    
    const gameImage = figma.createFrame();
    gameImage.name = "Game Image";
    gameImage.resize(560, 200);
    gameImage.fills = [{ type: "SOLID", color: colors.secondary }];
    gameImage.x = 0;
    gameImage.y = 0;
    gameCard.appendChild(gameImage);
    
    const gameName = figma.createText();
    gameName.characters = `Game ${i + 1}`;
    gameName.fontName = { family: "Inter", style: "SemiBold" };
    gameName.fontSize = 16;
    gameName.fills = [{ type: "SOLID", color: colors.dark }];
    gameName.x = 10;
    gameName.y = 210;
    gameCard.appendChild(gameName);
  }
  
  // Slider controls
  const prevBtn = figma.createFrame();
  prevBtn.name = "Prev Button";
  prevBtn.resize(40, 40);
  prevBtn.fills = [{ type: "SOLID", color: colors.primary }];
  prevBtn.x = 20;
  prevBtn.y = 200;
  desktopFeatured.appendChild(prevBtn);
  
  const nextBtn = figma.createFrame();
  nextBtn.name = "Next Button";
  nextBtn.resize(40, 40);
  nextBtn.fills = [{ type: "SOLID", color: colors.primary }];
  nextBtn.x = 1860;
  nextBtn.y = 200;
  desktopFeatured.appendChild(nextBtn);
  
  // Desktop Promotions Section
  const desktopPromo = figma.createFrame();
  desktopPromo.name = "Promotions Section";
  desktopPromo.resize(1920, 300);
  desktopPromo.fills = [{ type: "SOLID", color: colors.white }];
  desktopPromo.x = 0;
  desktopPromo.y = 480;
  desktopFrame.appendChild(desktopPromo);
  
  const desktopPromoTitle = figma.createText();
  desktopPromoTitle.characters = "Current Promotions";
  desktopPromoTitle.fontName = { family: "Inter", style: "Bold" };
  desktopPromoTitle.fontSize = 28;
  desktopPromoTitle.fills = [{ type: "SOLID", color: colors.dark }];
  desktopPromoTitle.x = 40;
  desktopPromoTitle.y = 20;
  desktopPromo.appendChild(desktopPromoTitle);
  
  // Promo cards (2 visible)
  for (let i = 0; i < 2; i++) {
    const promoCard = figma.createFrame();
    promoCard.name = `Promo Card ${i + 1}`;
    promoCard.resize(880, 200);
    promoCard.fills = [{ type: "SOLID", color: colors.accent }];
    promoCard.x = 40 + i * 920;
    promoCard.y = 80;
    desktopPromo.appendChild(promoCard);
    
    const promoText = figma.createText();
    promoText.characters = `${50 + i * 10}% OFF`;
    promoText.fontName = { family: "Inter", style: "Bold" };
    promoText.fontSize = 32;
    promoText.fills = [{ type: "SOLID", color: colors.white }];
    promoText.x = 40;
    promoText.y = 70;
    promoCard.appendChild(promoText);
  }
  
  // Desktop Reviews Section
  const desktopReviews = figma.createFrame();
  desktopReviews.name = "Customer Reviews";
  desktopReviews.resize(1920, 400);
  desktopReviews.fills = [{ type: "SOLID", color: colors.neutral }];
  desktopReviews.x = 0;
  desktopReviews.y = 780;
  desktopFrame.appendChild(desktopReviews);
  
  const desktopReviewsTitle = figma.createText();
  desktopReviewsTitle.characters = "Customer Reviews";
  desktopReviewsTitle.fontName = { family: "Inter", style: "Bold" };
  desktopReviewsTitle.fontSize = 28;
  desktopReviewsTitle.fills = [{ type: "SOLID", color: colors.dark }];
  desktopReviewsTitle.x = 40;
  desktopReviewsTitle.y = 20;
  desktopReviews.appendChild(desktopReviewsTitle);
  
  // Review cards (3 visible)
  for (let i = 0; i < 3; i++) {
    const reviewCard = figma.createFrame();
    reviewCard.name = `Review Card ${i + 1}`;
    reviewCard.resize(560, 280);
    reviewCard.fills = [{ type: "SOLID", color: colors.white }];
    reviewCard.x = 40 + i * 600;
    reviewCard.y = 80;
    desktopReviews.appendChild(reviewCard);
    
    const reviewAuthor = figma.createText();
    reviewAuthor.characters = `User ${i + 1}`;
    reviewAuthor.fontName = { family: "Inter", style: "SemiBold" };
    reviewAuthor.fontSize = 14;
    reviewAuthor.fills = [{ type: "SOLID", color: colors.dark }];
    reviewAuthor.x = 20;
    reviewAuthor.y = 20;
    reviewCard.appendChild(reviewAuthor);
    
    const reviewText = figma.createText();
    reviewText.characters = "Great games and fast delivery!";
    reviewText.fontName = { family: "Inter", style: "Regular" };
    reviewText.fontSize = 12;
    reviewText.fills = [{ type: "SOLID", color: colors.dark }];
    reviewText.x = 20;
    reviewText.y = 50;
    reviewCard.appendChild(reviewText);
    
    const rating = figma.createText();
    rating.characters = "★★★★★";
    rating.fontName = { family: "Inter", style: "Regular" };
    rating.fontSize = 14;
    rating.fills = [{ type: "SOLID", color: colors.accent }];
    rating.x = 20;
    rating.y = 240;
    reviewCard.appendChild(rating);
  }
  
  // Desktop Footer
  const desktopFooter = figma.createFrame();
  desktopFooter.name = "Footer";
  desktopFooter.resize(1920, 120);
  desktopFooter.fills = [{ type: "SOLID", color: colors.secondary }];
  desktopFooter.x = 0;
  desktopFooter.y = 1180;
  desktopFrame.appendChild(desktopFooter);
  
  const footerText = figma.createText();
  footerText.characters = "© 2024 Game Store. All rights reserved.";
  footerText.fontName = { family: "Inter", style: "Regular" };
  footerText.fontSize = 14;
  footerText.fills = [{ type: "SOLID", color: colors.white }];
  footerText.x = 40;
  footerText.y = 50;
  desktopFooter.appendChild(footerText);
  
  // MOBILE WIREFRAME (375px)
  const mobileFrame = figma.createFrame();
  mobileFrame.name = "Mobile Wireframe (375px)";
  mobileFrame.resize(375, 2200);
  mobileFrame.fills = [{ type: "SOLID", color: colors.white }];
  mobileFrame.x = 2100;
  mobileFrame.y = 0;
  page.appendChild(mobileFrame);
  
  // Mobile Header
  const mobileHeader = figma.createFrame();
  mobileHeader.name = "Header";
  mobileHeader.resize(375, 70);
  mobileHeader.fills = [{ type: "SOLID", color: colors.primary }];
  mobileHeader.x = 0;
  mobileHeader.y = 0;
  mobileFrame.appendChild(mobileHeader);
  
  const mobileLogo = figma.createText();
  mobileLogo.characters = "GAME";
  mobileLogo.fontName = { family: "Inter", style: "Bold" };
  mobileLogo.fontSize = 18;
  mobileLogo.fills = [{ type: "SOLID", color: colors.white }];
  mobileLogo.x = 20;
  mobileLogo.y = 24;
  mobileHeader.appendChild(mobileLogo);
  
  // Mobile Featured Games
  const mobileFeatured = figma.createFrame();
  mobileFeatured.name = "Featured Games";
  mobileFeatured.resize(375, 350);
  mobileFeatured.fills = [{ type: "SOLID", color: colors.neutral }];
  mobileFeatured.x = 0;
  mobileFeatured.y = 70;
  mobileFrame.appendChild(mobileFeatured);
  
  const mobileFeaturedTitle = figma.createText();
  mobileFeaturedTitle.characters = "Featured";
  mobileFeaturedTitle.fontName = { family: "Inter", style: "Bold" };
  mobileFeaturedTitle.fontSize = 20;
  mobileFeaturedTitle.fills = [{ type: "SOLID", color: colors.dark }];
  mobileFeaturedTitle.x = 20;
  mobileFeaturedTitle.y = 15;
  mobileFeatured.appendChild(mobileFeaturedTitle);
  
  // Mobile game card (1 visible, scrollable)
  const mobileGameCard = figma.createFrame();
  mobileGameCard.name = "Game Card";
  mobileGameCard.resize(335, 280);
  mobileGameCard.fills = [{ type: "SOLID", color: colors.white }];
  mobileGameCard.x = 20;
  mobileGameCard.y = 55;
  mobileFeatured.appendChild(mobileGameCard);
  
  const mobileGameImage = figma.createFrame();
  mobileGameImage.name = "Image";
  mobileGameImage.resize(335, 180);
  mobileGameImage.fills = [{ type: "SOLID", color: colors.secondary }];
  mobileGameImage.x = 0;
  mobileGameImage.y = 0;
  mobileGameCard.appendChild(mobileGameImage);
  
  const mobileGameName = figma.createText();
  mobileGameName.characters = "Game Title";
  mobileGameName.fontName = { family: "Inter", style: "SemiBold" };
  mobileGameName.fontSize = 14;
  mobileGameName.fills = [{ type: "SOLID", color: colors.dark }];
  mobileGameName.x = 10;
  mobileGameName.y = 190;
  mobileGameCard.appendChild(mobileGameName);
  
  // Mobile Promotions
  const mobilePromo = figma.createFrame();
  mobilePromo.name = "Promotions";
  mobilePromo.resize(375, 280);
  mobilePromo.fills = [{ type: "SOLID", color: colors.white }];
  mobilePromo.x = 0;
  mobilePromo.y = 420;
  mobileFrame.appendChild(mobilePromo);
  
  const mobilePromoTitle = figma.createText();
  mobilePromoTitle.characters = "Promotions";
  mobilePromoTitle.fontName = { family: "Inter", style: "Bold" };
  mobilePromoTitle.fontSize = 20;
  mobilePromoTitle.fills = [{ type: "SOLID", color: colors.dark }];
  mobilePromoTitle.x = 20;
  mobilePromoTitle.y = 15;
  mobilePromo.appendChild(mobilePromoTitle);
  
  const mobilePromoCard = figma.createFrame();
  mobilePromoCard.name = "Promo Card";
  mobilePromoCard.resize(335, 200);
  mobilePromoCard.fills = [{ type: "SOLID", color: colors.accent }];
  mobilePromoCard.x = 20;
  mobilePromoCard.y = 60;
  mobilePromo.appendChild(mobilePromoCard);
  
  const mobilePromoText = figma.createText();
  mobilePromoText.characters = "50% OFF";
  mobilePromoText.fontName = { family: "Inter", style: "Bold" };
  mobilePromoText.fontSize = 28;
  mobilePromoText.fills = [{ type: "SOLID", color: colors.white }];
  mobilePromoText.x = 20;
  mobilePromoText.y = 75;
  mobilePromoCard.appendChild(mobilePromoText);
  
  // Mobile Reviews
  const mobileReviews = figma.createFrame();
  mobileReviews.name = "Reviews";
  mobileReviews.resize(375, 600);
  mobileReviews.fills = [{ type: "SOLID", color: colors.neutral }];
  mobileReviews.x = 0;
  mobileReviews.y = 700;
  mobileFrame.appendChild(mobileReviews);
  
  const mobileReviewsTitle = figma.createText();
  mobileReviewsTitle.characters = "Reviews";
  mobileReviewsTitle.fontName = { family: "Inter", style: "Bold" };
  mobileReviewsTitle.fontSize = 20;
  mobileReviewsTitle.fills = [{ type: "SOLID", color: colors.dark }];
  mobileReviewsTitle.x = 20;
  mobileReviewsTitle.y = 15;
  mobileReviews.appendChild(mobileReviewsTitle);
  
  // Mobile review cards (stacked)
  for (let i = 0; i < 2; i++) {
    const mobileReviewCard = figma.createFrame();
    mobileReviewCard.name = `Review ${i + 1}`;
    mobileReviewCard.resize(335, 240);
    mobileReviewCard.fills = [{ type: "SOLID", color: colors.white }];
    mobileReviewCard.x = 20;
    mobileReviewCard.y = 60 + i * 260;
    mobileReviews.appendChild(mobileReviewCard);
    
    const mobileReviewAuthor = figma.createText();
    mobileReviewAuthor.characters = `User ${i + 1}`;
    mobileReviewAuthor.fontName = { family: "Inter", style: "SemiBold" };
    mobileReviewAuthor.fontSize = 12;
    mobileReviewAuthor.fills = [{ type: "SOLID", color: colors.dark }];
    mobileReviewAuthor.x = 15;
    mobileReviewAuthor.y = 15;
    mobileReviewCard.appendChild(mobileReviewAuthor);
    
    const mobileReviewText = figma.createText();
    mobileReviewText.characters = "Great experience!";
    mobileReviewText.fontName = { family: "Inter", style: "Regular" };
    mobileReviewText.fontSize = 11;
    mobileReviewText.fills = [{ type: "SOLID", color: colors.dark }];
    mobileReviewText.x = 15;
    mobileReviewText.y = 40;
    mobileReviewCard.appendChild(mobileReviewText);
    
    const mobileRating = figma.createText();
    mobileRating.characters = "★★★★★";
    mobileRating.fontName = { family: "Inter", style: "Regular" };
    mobileRating.fontSize = 12;
    mobileRating.fills = [{ type: "SOLID", color: colors.accent }];
    mobileRating.x = 15;
    mobileRating.y = 200;
    mobileReviewCard.appendChild(mobileRating);
  }
  
  // Mobile Footer
  const mobileFooter = figma.createFrame();
  mobileFooter.name = "Footer";
  mobileFooter.resize(375, 100);
  mobileFooter.fills = [{ type: "SOLID", color: colors.secondary }];
  mobileFooter.x = 0;
  mobileFooter.y = 1300;
  mobileFrame.appendChild(mobileFooter);
  
  const mobileFooterText = figma.createText();
  mobileFooterText.characters = "© 2024 Game Store";
  mobileFooterText.fontName = { family: "Inter", style: "Regular" };
  mobileFooterText.fontSize = 11;
  mobileFooterText.fills = [{ type: "SOLID", color: colors.white }];
  mobileFooterText.x = 20;
  mobileFooterText.y = 40;
  mobileFooter.appendChild(mobileFooterText);
  
  // Add annotation frame
  const annotationFrame = figma.createFrame();
  annotationFrame.name = "Wireframe Notes";
  annotationFrame.resize(800, 400);
  annotationFrame.fills = [{ type: "SOLID", color: colors.white }];
  annotationFrame.x = 2100;
  annotationFrame.y = 2300;
  page.appendChild(annotationFrame);
  
  const notesTitle = figma.createText();
  notesTitle.characters = "Wireframe Documentation";
  notesTitle.fontName = { family: "Inter", style: "Bold" };
  notesTitle.fontSize = 18;
  notesTitle.fills = [{ type: "SOLID", color: colors.primary }];
  notesTitle.x = 20;
  notesTitle.y = 20;
  annotationFrame.appendChild(notesTitle);
  
  const notes = figma.createText();
  notes.characters = "• Desktop: 1920px responsive layout\n• Mobile: 375px-480px responsive layout\n• Blue primary color (#3366CC)\n• Featured games slider with prev/next controls\n• Promotions section with discount cards\n• Customer reviews with star ratings\n• Responsive navigation and footer\n• Ready for design system implementation";
  notes.fontName = { family: "Inter", style: "Regular" };
  notes.fontSize = 12;
  notes.fills = [{ type: "SOLID", color: colors.dark }];
  notes.x = 20;
  notes.y = 60;
  annotationFrame.appendChild(notes);
}
createDesign().catch(e => console.error(e));