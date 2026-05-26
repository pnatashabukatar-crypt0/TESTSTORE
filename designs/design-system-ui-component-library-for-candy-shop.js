async function createDesign() {
  const page = figma.currentPage;
  
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
  
  // Color Palette Frame
  const colorFrame = figma.createFrame();
  colorFrame.name = "Design System - Colors";
  colorFrame.resize(1200, 800);
  colorFrame.x = 0;
  colorFrame.y = 0;
  colorFrame.fills = [{ type: "SOLID", color: { r: 0.98, g: 0.98, b: 0.98 } }];
  page.appendChild(colorFrame);
  
  const colorTitle = figma.createText();
  colorTitle.characters = "Color Palette";
  colorTitle.fontName = { family: "Inter", style: "Bold" };
  colorTitle.fontSize = 32;
  colorTitle.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
  colorTitle.x = 40;
  colorTitle.y = 40;
  colorFrame.appendChild(colorTitle);
  
  const colors = [
    { name: "Primary", hex: "#FF6B9D", r: 1, g: 0.42, b: 0.61 },
    { name: "Secondary", hex: "#FFA500", r: 1, g: 0.65, b: 0 },
    { name: "Success", hex: "#4CAF50", r: 0.3, g: 0.68, b: 0.31 },
    { name: "Error", hex: "#F44336", r: 0.96, g: 0.26, b: 0.21 },
    { name: "Warning", hex: "#FF9800", r: 1, g: 0.6, b: 0 },
    { name: "Info", hex: "#2196F3", r: 0.13, g: 0.59, b: 0.95 },
    { name: "Dark", hex: "#1A1A1A", r: 0.1, g: 0.1, b: 0.1 },
    { name: "Light", hex: "#F5F5F5", r: 0.96, g: 0.96, b: 0.96 }
  ];
  
  for (let i = 0; i < colors.length; i++) {
    const col = colors[i];
    const colorBox = figma.createFrame();
    colorBox.resize(120, 120);
    colorBox.x = 40 + (i % 4) * 280;
    colorBox.y = 120 + Math.floor(i / 4) * 160;
    colorBox.fills = [{ type: "SOLID", color: { r: col.r, g: col.g, b: col.b } }];
    colorFrame.appendChild(colorBox);
    
    const colorLabel = figma.createText();
    colorLabel.characters = col.name;
    colorLabel.fontName = { family: "Inter", style: "Bold" };
    colorLabel.fontSize = 14;
    colorLabel.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
    colorLabel.x = 40 + (i % 4) * 280;
    colorLabel.y = 250 + Math.floor(i / 4) * 160;
    colorFrame.appendChild(colorLabel);
    
    const hexLabel = figma.createText();
    hexLabel.characters = col.hex;
    hexLabel.fontName = { family: "Inter", style: "Regular" };
    hexLabel.fontSize = 12;
    hexLabel.fills = [{ type: "SOLID", color: { r: 0.5, g: 0.5, b: 0.5 } }];
    hexLabel.x = 40 + (i % 4) * 280;
    hexLabel.y = 270 + Math.floor(i / 4) * 160;
    colorFrame.appendChild(hexLabel);
  }
  
  // Typography Frame
  const typographyFrame = figma.createFrame();
  typographyFrame.name = "Design System - Typography";
  typographyFrame.resize(1200, 600);
  typographyFrame.x = 0;
  typographyFrame.y = 850;
  typographyFrame.fills = [{ type: "SOLID", color: { r: 0.98, g: 0.98, b: 0.98 } }];
  page.appendChild(typographyFrame);
  
  const typTitle = figma.createText();
  typTitle.characters = "Typography System";
  typTitle.fontName = { family: "Inter", style: "Bold" };
  typTitle.fontSize = 32;
  typTitle.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
  typTitle.x = 40;
  typTitle.y = 40;
  typographyFrame.appendChild(typTitle);
  
  const typographies = [
    { name: "H1", size: 48, weight: "Bold" },
    { name: "H2", size: 36, weight: "Bold" },
    { name: "H3", size: 28, weight: "Bold" },
    { name: "Body", size: 16, weight: "Regular" },
    { name: "Small", size: 14, weight: "Regular" }
  ];
  
  for (let i = 0; i < typographies.length; i++) {
    const typ = typographies[i];
    const typLabel = figma.createText();
    typLabel.characters = typ.name + " - " + typ.size + "px";
    typLabel.fontName = { family: "Inter", style: typ.weight };
    typLabel.fontSize = typ.size;
    typLabel.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
    typLabel.x = 40;
    typLabel.y = 120 + i * 80;
    typographyFrame.appendChild(typLabel);
  }
  
  // Spacing Grid Frame
  const spacingFrame = figma.createFrame();
  spacingFrame.name = "Design System - Spacing";
  spacingFrame.resize(1200, 400);
  spacingFrame.x = 0;
  spacingFrame.y = 1500;
  spacingFrame.fills = [{ type: "SOLID", color: { r: 0.98, g: 0.98, b: 0.98 } }];
  page.appendChild(spacingFrame);
  
  const spacingTitle = figma.createText();
  spacingTitle.characters = "Spacing & Grid System (8px base)";
  spacingTitle.fontName = { family: "Inter", style: "Bold" };
  spacingTitle.fontSize = 32;
  spacingTitle.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
  spacingTitle.x = 40;
  spacingTitle.y = 40;
  spacingFrame.appendChild(spacingTitle);
  
  const spacings = [
    { name: "XS", value: 4 },
    { name: "S", value: 8 },
    { name: "M", value: 16 },
    { name: "L", value: 24 },
    { name: "XL", value: 32 }
  ];
  
  for (let i = 0; i < spacings.length; i++) {
    const space = spacings[i];
    const spacingBox = figma.createFrame();
    spacingBox.resize(space.value * 4, 40);
    spacingBox.x = 40;
    spacingBox.y = 120 + i * 50;
    spacingBox.fills = [{ type: "SOLID", color: { r: 1, g: 0.42, b: 0.61 } }];
    spacingFrame.appendChild(spacingBox);
    
    const spacingLabel = figma.createText();
    spacingLabel.characters = space.name + " (" + space.value + "px)";
    spacingLabel.fontName = { family: "Inter", style: "Regular" };
    spacingLabel.fontSize = 14;
    spacingLabel.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
    spacingLabel.x = space.value * 4 + 60;
    spacingLabel.y = 125 + i * 50;
    spacingFrame.appendChild(spacingLabel);
  }
  
  // Button Components Frame
  const buttonFrame = figma.createFrame();
  buttonFrame.name = "Components - Buttons";
  buttonFrame.resize(1200, 500);
  buttonFrame.x = 1300;
  buttonFrame.y = 0;
  buttonFrame.fills = [{ type: "SOLID", color: { r: 0.98, g: 0.98, b: 0.98 } }];
  page.appendChild(buttonFrame);
  
  const buttonTitle = figma.createText();
  buttonTitle.characters = "Button Components";
  buttonTitle.fontName = { family: "Inter", style: "Bold" };
  buttonTitle.fontSize = 32;
  buttonTitle.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
  buttonTitle.x = 40;
  buttonTitle.y = 40;
  buttonFrame.appendChild(buttonTitle);
  
  const buttonStates = [
    { label: "Primary", bg: { r: 1, g: 0.42, b: 0.61 }, text: { r: 1, g: 1, b: 1 } },
    { label: "Secondary", bg: { r: 1, g: 0.65, b: 0 }, text: { r: 1, g: 1, b: 1 } },
    { label: "Disabled", bg: { r: 0.9, g: 0.9, b: 0.9 }, text: { r: 0.6, g: 0.6, b: 0.6 } }
  ];
  
  for (let i = 0; i < buttonStates.length; i++) {
    const btn = buttonStates[i];
    const buttonBox = figma.createFrame();
    buttonBox.resize(200, 48);
    buttonBox.x = 40 + i * 240;
    buttonBox.y = 120;
    buttonBox.fills = [{ type: "SOLID", color: btn.bg }];
    buttonBox.cornerRadius = 8;
    buttonFrame.appendChild(buttonBox);
    
    const buttonText = figma.createText();
    buttonText.characters = btn.label;
    buttonText.fontName = { family: "Inter", style: "Bold" };
    buttonText.fontSize = 16;
    buttonText.fills = [{ type: "SOLID", color: btn.text }];
    buttonText.x = 40 + i * 240;
    buttonText.y = 120;
    buttonFrame.appendChild(buttonText);
  }
  
  // Input Components Frame
  const inputFrame = figma.createFrame();
  inputFrame.name = "Components - Inputs";
  inputFrame.resize(1200, 400);
  inputFrame.x = 1300;
  inputFrame.y = 550;
  inputFrame.fills = [{ type: "SOLID", color: { r: 0.98, g: 0.98, b: 0.98 } }];
  page.appendChild(inputFrame);
  
  const inputTitle = figma.createText();
  inputTitle.characters = "Input Components";
  inputTitle.fontName = { family: "Inter", style: "Bold" };
  inputTitle.fontSize = 32;
  inputTitle.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
  inputTitle.x = 40;
  inputTitle.y = 40;
  inputFrame.appendChild(inputTitle);
  
  const inputStates = [
    { label: "Default", border: { r: 0.8, g: 0.8, b: 0.8 } },
    { label: "Focus", border: { r: 1, g: 0.42, b: 0.61 } },
    { label: "Error", border: { r: 0.96, g: 0.26, b: 0.21 } }
  ];
  
  for (let i = 0; i < inputStates.length; i++) {
    const inp = inputStates[i];
    const inputBox = figma.createFrame();
    inputBox.resize(300, 48);
    inputBox.x = 40 + i * 340;
    inputBox.y = 120;
    inputBox.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    inputBox.strokeWeight = 2;
    inputBox.strokes = [{ type: "SOLID", color: inp.border }];
    inputBox.cornerRadius = 6;
    inputFrame.appendChild(inputBox);
    
    const inputLabel = figma.createText();
    inputLabel.characters = inp.label;
    inputLabel.fontName = { family: "Inter", style: "Regular" };
    inputLabel.fontSize = 14;
    inputLabel.fills = [{ type: "SOLID", color: { r: 0.5, g: 0.5, b: 0.5 } }];
    inputLabel.x = 40 + i * 340;
    inputLabel.y = 125;
    inputFrame.appendChild(inputLabel);
  }
  
  // Card Components Frame
  const cardFrame = figma.createFrame();
  cardFrame.name = "Components - Cards";
  cardFrame.resize(1200, 450);
  cardFrame.x = 1300;
  cardFrame.y = 1000;
  cardFrame.fills = [{ type: "SOLID", color: { r: 0.98, g: 0.98, b: 0.98 } }];
  page.appendChild(cardFrame);
  
  const cardTitle = figma.createText();
  cardTitle.characters = "Card Components";
  cardTitle.fontName = { family: "Inter", style: "Bold" };
  cardTitle.fontSize = 32;
  cardTitle.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
  cardTitle.x = 40;
  cardTitle.y = 40;
  cardFrame.appendChild(cardTitle);
  
  for (let i = 0; i < 3; i++) {
    const card = figma.createFrame();
    card.resize(280, 320);
    card.x = 40 + i * 320;
    card.y = 120;
    card.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    card.cornerRadius = 12;
    card.strokeWeight = 1;
    card.strokes = [{ type: "SOLID", color: { r: 0.9, g: 0.9, b: 0.9 } }];
    cardFrame.appendChild(card);
    
    const cardImage = figma.createFrame();
    cardImage.resize(280, 160);
    cardImage.x = 40 + i * 320;
    cardImage.y = 120;
    cardImage.fills = [{ type: "SOLID", color: { r: 0.95, g: 0.7, b: 0.8 } }];
    cardFrame.appendChild(cardImage);
    
    const cardText = figma.createText();
    cardText.characters = "Product " + (i + 1);
    cardText.fontName = { family: "Inter", style: "Bold" };
    cardText.fontSize = 16;
    cardText.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
    cardText.x = 50 + i * 320;
    cardText.y = 290;
    cardFrame.appendChild(cardText);
    
    const cardPrice = figma.createText();
    cardPrice.characters = "$9.99";
    cardPrice.fontName = { family: "Inter", style: "Bold" };
    cardPrice.fontSize = 18;
    cardPrice.fills = [{ type: "SOLID", color: { r: 1, g: 0.42, b: 0.61 } }];
    cardPrice.x = 50 + i * 320;
    cardPrice.y = 315;
    cardFrame.appendChild(cardPrice);
  }
  
  // Product Listing Wireframe
  const productListFrame = figma.createFrame();
  productListFrame.name = "Wireframe - Product Listing";
  productListFrame.resize(375, 812);
  productListFrame.x = 2650;
  productListFrame.y = 0;
  productListFrame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  page.appendChild(productListFrame);
  
  const headerBar = figma.createFrame();
  headerBar.resize(375, 60);
  headerBar.x = 2650;
  headerBar.y = 0;
  headerBar.fills = [{ type: "SOLID", color: { r: 1, g: 0.42, b: 0.61 } }];
  productListFrame.appendChild(headerBar);
  
  const headerText = figma.createText();
  headerText.characters = "Candy Shop";
  headerText.fontName = { family: "Inter", style: "Bold" };
  headerText.fontSize = 20;
  headerText.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  headerText.x = 2670;
  headerText.y = 15;
  productListFrame.appendChild(headerText);
  
  for (let i = 0; i < 4; i++) {
    const productCard = figma.createFrame();
    productCard.resize(160, 200);
    productCard.x = 2660 + (i % 2) * 170;
    productCard.y = 80 + Math.floor(i / 2) * 220;
    productCard.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    productCard.strokeWeight = 1;
    productCard.strokes = [{ type: "SOLID", color: { r: 0.9, g: 0.9, b: 0.9 } }];
    productListFrame.appendChild(productCard);
    
    const productImg = figma.createFrame();
    productImg.resize(160, 100);
    productImg.x = 2660 + (i % 2) * 170;
    productImg.y = 80 + Math.floor(i / 2) * 220;
    productImg.fills = [{ type: "SOLID", color: { r: 0.95, g: 0.7, b: 0.8 } }];
    productListFrame.appendChild(productImg);
    
    const productName = figma.createText();
    productName.characters = "Candy " + (i + 1);
    productName.fontName = { family: "Inter", style: "Bold" };
    productName.fontSize = 12;
    productName.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
    productName.x = 2665 + (i % 2) * 170;
    productName.y = 190 + Math.floor(i / 2) * 220;
    productListFrame.appendChild(productName);
  }
  
  // Product Detail Wireframe
  const productDetailFrame = figma.createFrame();
  productDetailFrame.name = "Wireframe - Product Detail";
  productDetailFrame.resize(375, 812);
  productDetailFrame.x = 3100;
  productDetailFrame.y = 0;
  productDetailFrame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  page.appendChild(productDetailFrame);
  
  const detailHeader = figma.createFrame();
  detailHeader.resize(375, 60);
  detailHeader.x = 3100;
  detailHeader.y = 0;
  detailHeader.fills = [{ type: "SOLID", color: { r: 1, g: 0.42, b: 0.61 } }];
  productDetailFrame.appendChild(detailHeader);
  
  const detailHeaderText = figma.createText();
  detailHeaderText.characters = "Product Detail";
  detailHeaderText.fontName = { family: "Inter", style: "Bold" };
  detailHeaderText.fontSize = 20;
  detailHeaderText.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  detailHeaderText.x = 3120;
  detailHeaderText.y = 15;
  productDetailFrame.appendChild(detailHeaderText);
  
  const detailImage = figma.createFrame();
  detailImage.resize(375, 250);
  detailImage.x = 3100;
  detailImage.y = 70;
  detailImage.fills = [{ type: "SOLID", color: { r: 0.95, g: 0.7, b: 0.8 } }];
  productDetailFrame.appendChild(detailImage);
  
  const detailName = figma.createText();
  detailName.characters = "Premium Candy";
  detailName.fontName = { family: "Inter", style: "Bold" };
  detailName.fontSize = 24;
  detailName.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
  detailName.x = 3120;
  detailName.y = 330;
  productDetailFrame.appendChild(detailName);
  
  const detailPrice = figma.createText();
  detailPrice.characters = "$19.99";
  detailPrice.fontName = { family: "Inter", style: "Bold" };
  detailPrice.fontSize = 28;
  detailPrice.fills = [{ type: "SOLID", color: { r: 1, g: 0.42, b: 0.61 } }];
  detailPrice.x = 3120;
  detailPrice.y = 365;
  productDetailFrame.appendChild(detailPrice);
  
  const detailDesc = figma.createText();
  detailDesc.characters = "Description goes here...";
  detailDesc.fontName = { family: "Inter", style: "Regular" };
  detailDesc.fontSize = 14;
  detailDesc.fills = [{ type: "SOLID", color: { r: 0.5, g: 0.5, b: 0.5 } }];
  detailDesc.x = 3120;
  detailDesc.y = 410;
  productDetailFrame.appendChild(detailDesc);
  
  const addToCartBtn = figma.createFrame();
  addToCartBtn.resize(335, 48);
  addToCartBtn.x = 3120;
  addToCartBtn.y = 700;
  addToCartBtn.fills = [{ type: "SOLID", color: { r: 1, g: 0.42, b: 0.61 } }];
  addToCartBtn.cornerRadius = 8;
  productDetailFrame.appendChild(addToCartBtn);
  
  const addToCartText = figma.createText();
  addToCartText.characters = "Add to Cart";
  addToCartText.fontName = { family: "Inter", style: "Bold" };
  addToCartText.fontSize = 16;
  addToCartText.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  addToCartText.x = 3120;
  addToCartText.y = 700;
  productDetailFrame.appendChild(addToCartText);
  
  // Shopping Cart Wireframe
  const cartFrame = figma.createFrame();
  cartFrame.name = "Wireframe - Shopping Cart";
  cartFrame.resize(375, 812);
  cartFrame.x = 3550;
  cartFrame.y = 0;
  cartFrame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  page.appendChild(cartFrame);
  
  const cartHeader = figma.createFrame();
  cartHeader.resize(375, 60);
  cartHeader.x = 3550;
  cartHeader.y = 0;
  cartHeader.fills = [{ type: "SOLID", color: { r: 1, g: 0.42, b: 0.61 } }];
  cartFrame.appendChild(cartHeader);
  
  const cartHeaderText = figma.createText();
  cartHeaderText.characters = "Shopping Cart";
  cartHeaderText.fontName = { family: "Inter", style: "Bold" };
  cartHeaderText.fontSize = 20;
  cartHeaderText.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  cartHeaderText.x = 3570;
  cartHeaderText.y = 15;
  cartFrame.appendChild(cartHeaderText);
  
  for (let i = 0; i < 3; i++) {
    const cartItem = figma.createFrame();
    cartItem.resize(335, 100);
    cartItem.x = 3570;
    cartItem.y = 80 + i * 120;
    cartItem.fills = [{ type: "SOLID", color: { r: 0.98, g: 0.98, b: 0.98 } }];
    cartItem.cornerRadius = 8;
    cartFrame.appendChild(cartItem);
    
    const itemImg = figma.createFrame();
    itemImg.resize(80, 80);
    itemImg.x = 3580;
    itemImg.y = 90 + i * 120;
    itemImg.fills = [{ type: "SOLID", color: { r: 0.95, g: 0.7, b: 0.8 } }];
    cartFrame.appendChild(itemImg);
    
    const itemName = figma.createText();
    itemName.characters = "Candy " + (i + 1);
    itemName.fontName = { family: "Inter", style: "Bold" };
    itemName.fontSize = 14;
    itemName.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
    itemName.x = 3670;
    itemName.y = 95 + i * 120;
    cartFrame.appendChild(itemName);
    
    const itemPrice = figma.createText();
    itemPrice.characters = "$9.99";
    itemPrice.fontName = { family: "Inter", style: "Bold" };
    itemPrice.fontSize = 14;
    itemPrice.fills = [{ type: "SOLID", color: { r: 1, g: 0.42, b: 0.61 } }];
    itemPrice.x = 3670;
    itemPrice.y = 115 + i * 120;
    cartFrame.appendChild(itemPrice);
  }
  
  const cartTotal = figma.createText();
  cartTotal.characters = "Total: $29.97";
  cartTotal.fontName = { family: "Inter", style: "Bold" };
  cartTotal.fontSize = 18;
  cartTotal.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
  cartTotal.x = 3570;
  cartTotal.y = 520;
  cartFrame.appendChild(cartTotal);
  
  const checkoutBtn = figma.createFrame();
  checkoutBtn.resize(335, 48);
  checkoutBtn.x = 3570;
  checkoutBtn.y = 700;
  checkoutBtn.fills = [{ type: "SOLID", color: { r: 1, g: 0.42, b: 0.61 } }];
  checkoutBtn.cornerRadius = 8;
  cartFrame.appendChild(checkoutBtn);
  
  const checkoutText = figma.createText();
  checkoutText.characters = "Proceed to Checkout";
  checkoutText.fontName = { family: "Inter", style: "Bold" };
  checkoutText.fontSize = 16;
  checkoutText.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  checkoutText.x = 3570;
  checkoutText.y = 700;
  cartFrame.appendChild(checkoutText);
  
  // Checkout Wireframe
  const checkoutFrame = figma.createFrame();
  checkoutFrame.name = "Wireframe - Checkout";
  checkoutFrame.resize(375, 812);
  checkoutFrame.x = 4000;
  checkoutFrame.y = 0;
  checkoutFrame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  page.appendChild(checkoutFrame);
  
  const checkoutHeader = figma.createFrame();
  checkoutHeader.resize(375, 60);
  checkoutHeader.x = 4000;
  checkoutHeader.y = 0;
  checkoutHeader.fills = [{ type: "SOLID", color: { r: 1, g: 0.42, b: 0.61 } }];
  checkoutFrame.appendChild(checkoutHeader);
  
  const checkoutHeaderText = figma.createText();
  checkoutHeaderText.characters = "Checkout";
  checkoutHeaderText.fontName = { family: "Inter", style: "Bold" };
  checkoutHeaderText.fontSize = 20;
  checkoutHeaderText.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  checkoutHeaderText.x = 4020;
  checkoutHeaderText.y = 15;
  checkoutFrame.appendChild(checkoutHeaderText);
  
  const sections = ["Shipping Address", "Payment Method", "Order Review"];
  for (let i = 0; i < sections.length; i++) {
    const section = figma.createText();
    section.characters = sections[i];
    section.fontName = { family: "Inter", style: "Bold" };
    section.fontSize = 16;
    section.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
    section.x = 4020;
    section.y = 80 + i * 180;
    checkoutFrame.appendChild(section);
    
    const sectionBox = figma.createFrame();
    sectionBox.resize(335, 140);
    sectionBox.x = 4020;