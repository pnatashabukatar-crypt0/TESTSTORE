async function createDesign() {
  const page = figma.currentPage;
  
  // Color palette
  const colors = {
    primary: { r: 0.2, g: 0.4, b: 0.8 },
    secondary: { r: 0.1, g: 0.2, b: 0.5 },
    accent: { r: 1, g: 0.6, b: 0.2 },
    neutral: { r: 0.95, g: 0.95, b: 0.95 },
    text: { r: 0.1, g: 0.1, b: 0.1 },
    border: { r: 0.8, g: 0.8, b: 0.8 }
  };

  // DESKTOP WIREFRAME (1920px)
  const desktopFrame = figma.createFrame();
  desktopFrame.name = "Desktop Wireframe - 1920px";
  desktopFrame.width = 1920;
  desktopFrame.height = 3200;
  desktopFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  page.appendChild(desktopFrame);

  // Navigation Bar
  const navBar = figma.createFrame();
  navBar.name = "Navigation Bar";
  navBar.width = 1920;
  navBar.height = 80;
  navBar.fills = [{ type: 'SOLID', color: colors.primary }];
  navBar.x = 0;
  navBar.y = 0;
  desktopFrame.appendChild(navBar);

  const logoText = figma.createText();
  logoText.characters = "GAMING STORE";
  logoText.fontSize = 28;
  logoText.fontWeight = 700;
  logoText.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  logoText.x = 40;
  logoText.y = 25;
  navBar.appendChild(logoText);

  // Hero Section
  const heroSection = figma.createFrame();
  heroSection.name = "Hero Section";
  heroSection.width = 1920;
  heroSection.height = 500;
  heroSection.fills = [{ type: 'SOLID', color: colors.secondary }];
  heroSection.x = 0;
  heroSection.y = 80;
  desktopFrame.appendChild(heroSection);

  const heroText = figma.createText();
  heroText.characters = "FEATURED GAMES";
  heroText.fontSize = 48;
  heroText.fontWeight = 700;
  heroText.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  heroText.x = 100;
  heroText.y = 200;
  heroSection.appendChild(heroText);

  // Featured Games Slider Section
  const gamesSection = figma.createFrame();
  gamesSection.name = "Featured Games Slider";
  gamesSection.width = 1920;
  gamesSection.height = 600;
  gamesSection.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  gamesSection.x = 0;
  gamesSection.y = 580;
  desktopFrame.appendChild(gamesSection);

  const gamesSectionTitle = figma.createText();
  gamesSectionTitle.characters = "FEATURED GAMES";
  gamesSectionTitle.fontSize = 32;
  gamesSectionTitle.fontWeight = 700;
  gamesSectionTitle.fills = [{ type: 'SOLID', color: colors.text }];
  gamesSectionTitle.x = 60;
  gamesSectionTitle.y = 40;
  gamesSection.appendChild(gamesSectionTitle);

  // Game cards (3 visible)
  for (let i = 0; i < 3; i++) {
    const gameCard = figma.createFrame();
    gameCard.name = `Game Card ${i + 1}`;
    gameCard.width = 520;
    gameCard.height = 400;
    gameCard.fills = [{ type: 'SOLID', color: colors.neutral }];
    gameCard.strokes = [{ type: 'SOLID', color: colors.border }];
    gameCard.strokeWeight = 2;
    gameCard.x = 60 + (i * 580);
    gameCard.y = 120;
    gamesSection.appendChild(gameCard);

    const gameImage = figma.createFrame();
    gameImage.name = `Game Image ${i + 1}`;
    gameImage.width = 520;
    gameImage.height = 280;
    gameImage.fills = [{ type: 'SOLID', color: colors.primary }];
    gameImage.x = 0;
    gameImage.y = 0;
    gameCard.appendChild(gameImage);

    const gameTitle = figma.createText();
    gameTitle.characters = `Game Title ${i + 1}`;
    gameTitle.fontSize = 18;
    gameTitle.fontWeight = 600;
    gameTitle.fills = [{ type: 'SOLID', color: colors.text }];
    gameTitle.x = 20;
    gameTitle.y = 300;
    gameCard.appendChild(gameTitle);

    const gamePrice = figma.createText();
    gamePrice.characters = "$59.99";
    gamePrice.fontSize = 16;
    gamePrice.fontWeight = 700;
    gamePrice.fills = [{ type: 'SOLID', color: colors.accent }];
    gamePrice.x = 20;
    gamePrice.y = 350;
    gameCard.appendChild(gamePrice);
  }

  // Slider controls
  const prevBtn = figma.createFrame();
  prevBtn.name = "Previous Button";
  prevBtn.width = 50;
  prevBtn.height = 50;
  prevBtn.fills = [{ type: 'SOLID', color: colors.primary }];
  prevBtn.x = 20;
  prevBtn.y = 280;
  gamesSection.appendChild(prevBtn);

  const nextBtn = figma.createFrame();
  nextBtn.name = "Next Button";
  nextBtn.width = 50;
  nextBtn.height = 50;
  nextBtn.fills = [{ type: 'SOLID', color: colors.primary }];
  nextBtn.x = 1850;
  nextBtn.y = 280;
  gamesSection.appendChild(nextBtn);

  // Promotions Section
  const promoSection = figma.createFrame();
  promoSection.name = "Promotions Section";
  promoSection.width = 1920;
  promoSection.height = 400;
  promoSection.fills = [{ type: 'SOLID', color: colors.neutral }];
  promoSection.x = 0;
  promoSection.y = 1180;
  desktopFrame.appendChild(promoSection);

  const promoTitle = figma.createText();
  promoTitle.characters = "SPECIAL PROMOTIONS";
  promoTitle.fontSize = 32;
  promoTitle.fontWeight = 700;
  promoTitle.fills = [{ type: 'SOLID', color: colors.text }];
  promoTitle.x = 60;
  promoTitle.y = 40;
  promoSection.appendChild(promoTitle);

  // Promo cards (2 visible)
  for (let i = 0; i < 2; i++) {
    const promoCard = figma.createFrame();
    promoCard.name = `Promo Card ${i + 1}`;
    promoCard.width = 850;
    promoCard.height = 250;
    promoCard.fills = [{ type: 'SOLID', color: colors.primary }];
    promoCard.x = 60 + (i * 920);
    promoCard.y = 120;
    promoSection.appendChild(promoCard);

    const promoText = figma.createText();
    promoText.characters = `SAVE UP TO ${50 + i * 10}%`;
    promoText.fontSize = 36;
    promoText.fontWeight = 700;
    promoText.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    promoText.x = 40;
    promoText.y = 80;
    promoCard.appendChild(promoText);

    const promoDesc = figma.createText();
    promoDesc.characters = "Limited Time Offer";
    promoDesc.fontSize = 18;
    promoDesc.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
    promoDesc.x = 40;
    promoDesc.y = 150;
    promoCard.appendChild(promoDesc);
  }

  // Customer Reviews Section
  const reviewsSection = figma.createFrame();
  reviewsSection.name = "Customer Reviews Section";
  reviewsSection.width = 1920;
  reviewsSection.height = 500;
  reviewsSection.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  reviewsSection.x = 0;
  reviewsSection.y = 1580;
  desktopFrame.appendChild(reviewsSection);

  const reviewsTitle = figma.createText();
  reviewsTitle.characters = "CUSTOMER REVIEWS";
  reviewsTitle.fontSize = 32;
  reviewsTitle.fontWeight = 700;
  reviewsTitle.fills = [{ type: 'SOLID', color: colors.text }];
  reviewsTitle.x = 60;
  reviewsTitle.y = 40;
  reviewsSection.appendChild(reviewsTitle);

  // Review cards (3 visible)
  for (let i = 0; i < 3; i++) {
    const reviewCard = figma.createFrame();
    reviewCard.name = `Review Card ${i + 1}`;
    reviewCard.width = 580;
    reviewCard.height = 300;
    reviewCard.fills = [{ type: 'SOLID', color: colors.neutral }];
    reviewCard.strokes = [{ type: 'SOLID', color: colors.border }];
    reviewCard.strokeWeight = 2;
    reviewCard.x = 60 + (i * 620);
    reviewCard.y = 120;
    reviewsSection.appendChild(reviewCard);

    const reviewerName = figma.createText();
    reviewerName.characters = `Customer ${i + 1}`;
    reviewerName.fontSize = 16;
    reviewerName.fontWeight = 600;
    reviewerName.fills = [{ type: 'SOLID', color: colors.text }];
    reviewerName.x = 20;
    reviewerName.y = 20;
    reviewCard.appendChild(reviewerName);

    const rating = figma.createText();
    rating.characters = "★★★★★";
    rating.fontSize = 14;
    rating.fills = [{ type: 'SOLID', color: colors.accent }];
    rating.x = 20;
    rating.y = 50;
    reviewCard.appendChild(rating);

    const reviewText = figma.createText();
    reviewText.characters = "Great selection and fast delivery!";
    reviewText.fontSize = 14;
    reviewText.fills = [{ type: 'SOLID', color: colors.text }];
    reviewText.x = 20;
    reviewText.y = 90;
    reviewCard.appendChild(reviewText);
  }

  // Footer
  const footer = figma.createFrame();
  footer.name = "Footer";
  footer.width = 1920;
  footer.height = 200;
  footer.fills = [{ type: 'SOLID', color: colors.secondary }];
  footer.x = 0;
  footer.y = 2080;
  desktopFrame.appendChild(footer);

  const footerText = figma.createText();
  footerText.characters = "© 2024 Gaming Store. All rights reserved.";
  footerText.fontSize = 14;
  footerText.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  footerText.x = 60;
  footerText.y = 90;
  footer.appendChild(footerText);

  // MOBILE WIREFRAME (375px)
  const mobileFrame = figma.createFrame();
  mobileFrame.name = "Mobile Wireframe - 375px";
  mobileFrame.width = 375;
  mobileFrame.height = 3600;
  mobileFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  mobileFrame.x = 2100;
  mobileFrame.y = 0;
  page.appendChild(mobileFrame);

  // Mobile Navigation
  const mobileNav = figma.createFrame();
  mobileNav.name = "Mobile Navigation";
  mobileNav.width = 375;
  mobileNav.height = 70;
  mobileNav.fills = [{ type: 'SOLID', color: colors.primary }];
  mobileNav.x = 0;
  mobileNav.y = 0;
  mobileFrame.appendChild(mobileNav);

  const mobileLogoText = figma.createText();
  mobileLogoText.characters = "GAMING";
  mobileLogoText.fontSize = 20;
  mobileLogoText.fontWeight = 700;
  mobileLogoText.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  mobileLogoText.x = 20;
  mobileLogoText.y = 22;
  mobileNav.appendChild(mobileLogoText);

  // Mobile Hero
  const mobileHero = figma.createFrame();
  mobileHero.name = "Mobile Hero";
  mobileHero.width = 375;
  mobileHero.height = 300;
  mobileHero.fills = [{ type: 'SOLID', color: colors.secondary }];
  mobileHero.x = 0;
  mobileHero.y = 70;
  mobileFrame.appendChild(mobileHero);

  const mobileHeroText = figma.createText();
  mobileHeroText.characters = "FEATURED\nGAMES";
  mobileHeroText.fontSize = 32;
  mobileHeroText.fontWeight = 700;
  mobileHeroText.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  mobileHeroText.x = 20;
  mobileHeroText.y = 100;
  mobileHero.appendChild(mobileHeroText);

  // Mobile Featured Games (stacked)
  const mobileGamesSection = figma.createFrame();
  mobileGamesSection.name = "Mobile Featured Games";
  mobileGamesSection.width = 375;
  mobileGamesSection.height = 1200;
  mobileGamesSection.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
  mobileGamesSection.x = 0;
  mobileGamesSection.y = 370;
  mobileFrame.appendChild(mobileGamesSection);

  const mobileGamesTitle = figma.createText();
  mobileGamesTitle.characters = "FEATURED";
  mobileGamesTitle.fontSize = 24;
  mobileGamesTitle.fontWeight = 700;
  mobileGamesTitle.fills = [{ type: 'SOLID', color: colors.text }];
  mobileGamesTitle.x = 20;