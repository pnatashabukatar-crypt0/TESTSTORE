async function createDesign() {
  const page = figma.currentPage;
  
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
  
  // Main container
  const mainFrame = figma.createFrame();
  mainFrame.name = "TEST SHOP Design System";
  mainFrame.resize(1920, 2400);
  mainFrame.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  page.appendChild(mainFrame);
  
  // Color Palette Section
  const colorSection = figma.createFrame();
  colorSection.name = "Color Palette";
  colorSection.resize(1880, 320);
  colorSection.x = 20;
  colorSection.y = 20;
  colorSection.fills = [{ type: "SOLID", color: { r: 0.98, g: 0.98, b: 0.98 } }];
  mainFrame.appendChild(colorSection);
  
  const colorTitle = figma.createText();
  colorTitle.characters = "Color Palette";
  colorTitle.fontName = { family: "Inter", style: "Bold" };
  colorTitle.fontSize = 24;
  colorTitle.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
  colorTitle.x = 20;
  colorTitle.y = 20;
  colorSection.appendChild(colorTitle);
  
  const colors = [
    { name: "Primary Pink", r: 1, g: 0.2, b: 0.5, x: 20 },
    { name: "Secondary Purple", r: 0.7, g: 0.3, b: 0.8, x: 280 },
    { name: "Accent Yellow", r: 1, g: 0.85, b: 0.2, x: 540 },
    { name: "Success Green", r: 0.2, g: 0.8, b: 0.4, x: 800 },
    { name: "Error Red", r: 1, g: 0.2, b: 0.2, x: 1060 },
    { name: "Neutral Dark", r: 0.2, g: 0.2, b: 0.2, x: 1320 },
    { name: "Neutral Light", r: 0.95, g: 0.95, b: 0.95, x: 1580 }
  ];
  
  for (const color of colors) {
    const colorBox = figma.createFrame();
    colorBox.resize(200, 120);
    colorBox.x = color.x;
    colorBox.y = 80;
    colorBox.fills = [{ type: "SOLID", color: { r: color.r, g: color.g, b: color.b } }];
    colorSection.appendChild(colorBox);
    
    const colorLabel = figma.createText();
    colorLabel.characters = color.name;
    colorLabel.fontName = { family: "Inter", style: "Regular" };
    colorLabel.fontSize = 12;
    colorLabel.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
    colorLabel.x = color.x;
    colorLabel.y = 210;
    colorSection.appendChild(colorLabel);
  }
  
  // Typography Section
  const typographySection = figma.createFrame();
  typographySection.name = "Typography";
  typographySection.resize(1880, 280);
  typographySection.x = 20;
  typographySection.y = 360;
  typographySection.fills = [{ type: "SOLID", color: { r: 0.98, g: 0.98, b: 0.98 } }];
  mainFrame.appendChild(typographySection);
  
  const typographyTitle = figma.createText();
  typographyTitle.characters = "Typography System";
  typographyTitle.fontName = { family: "Inter", style: "Bold" };
  typographyTitle.fontSize = 24;
  typographyTitle.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
  typographyTitle.x = 20;
  typographyTitle.y = 20;
  typographySection.appendChild(typographyTitle);
  
  const typographies = [
    { label: "H1 - 32px Bold", size: 32, style: "Bold", y: 80 },
    { label: "H2 - 24px Bold", size: 24, style: "Bold", y: 130 },
    { label: "Body - 16px Regular", size: 16, style: "Regular", y: 180 }
  ];
  
  for (const typo of typographies) {
    const typoText = figma.createText();
    typoText.characters = typo.label;
    typoText.fontName = { family: "Inter", style: typo.style };
    typoText.fontSize = typo.size;
    typoText.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
    typoText.x = 20;
    typoText.y = typo.y;
    typographySection.appendChild(typoText);
  }
  
  // Spacing System Section
  const spacingSection = figma.createFrame();
  spacingSection.name = "Spacing System";
  spacingSection.resize(1880, 200);
  spacingSection.x = 20;
  spacingSection.y = 660;
  spacingSection.fills = [{ type: "SOLID", color: { r: 0.98, g: 0.98, b: 0.98 } }];
  mainFrame.appendChild(spacingSection);
  
  const spacingTitle = figma.createText();
  spacingTitle.characters = "Spacing Scale (4px base unit)";
  spacingTitle.fontName = { family: "Inter", style: "Bold" };
  spacingTitle.fontSize = 24;
  spacingTitle.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
  spacingTitle.x = 20;
  spacingTitle.y = 20;
  spacingSection.appendChild(spacingTitle);
  
  const spacings = [
    { label: "xs: 4px", value: 4, x: 20 },
    { label: "sm: 8px", value: 8, x: 120 },
    { label: "md: 16px", value: 16, x: 220 },
    { label: "lg: 24px", value: 24, x: 320 },
    { label: "xl: 32px", value: 32, x: 420 }
  ];
  
  for (const spacing of spacings) {
    const spacingBox = figma.createFrame();
    spacingBox.resize(spacing.value * 2, 40);
    spacingBox.x = spacing.x;
    spacingBox.y = 80;
    spacingBox.fills = [{ type: "SOLID", color: { r: 1, g: 0.2, b: 0.5 } }];
    spacingSection.appendChild(spacingBox);
    
    const spacingLabel = figma.createText();
    spacingLabel.characters = spacing.label;
    spacingLabel.fontName = { family: "Inter", style: "Regular" };
    spacingLabel.fontSize = 12;
    spacingLabel.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
    spacingLabel.x = spacing.x;
    spacingLabel.y = 130;
    spacingSection.appendChild(spacingLabel);
  }
  
  // Button Component Section
  const buttonSection = figma.createFrame();
  buttonSection.name = "Button Components";
  buttonSection.resize(1880, 300);
  buttonSection.x = 20;
  buttonSection.y = 880;
  buttonSection.fills = [{ type: "SOLID", color: { r: 0.98, g: 0.98, b: 0.98 } }];
  mainFrame.appendChild(buttonSection);
  
  const buttonTitle = figma.createText();
  buttonTitle.characters = "Button States";
  buttonTitle.fontName = { family: "Inter", style: "Bold" };
  buttonTitle.fontSize = 24;
  buttonTitle.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
  buttonTitle.x = 20;
  buttonTitle.y = 20;
  buttonSection.appendChild(buttonTitle);
  
  const buttonStates = [
    { label: "Default", color: { r: 1, g: 0.2, b: 0.5 }, x: 20 },
    { label: "Hover", color: { r: 0.9, g: 0.1, b: 0.4 }, x: 280 },
    { label: "Active", color: { r: 0.8, g: 0.05, b: 0.3 }, x: 540 },
    { label: "Disabled", color: { r: 0.8, g: 0.8, b: 0.8 }, x: 800 }
  ];
  
  for (const state of buttonStates) {
    const button = figma.createFrame();
    button.resize(200, 48);
    button.x = state.x;
    button.y = 80;
    button.fills = [{ type: "SOLID", color: state.color }];
    button.cornerRadius = 8;
    buttonSection.appendChild(button);
    
    const buttonText = figma.createText();
    buttonText.characters = "Button";
    buttonText.fontName = { family: "Inter", style: "Bold" };
    buttonText.fontSize = 14;
    buttonText.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    buttonText.x = state.x + 50;
    buttonText.y = 95;
    buttonSection.appendChild(buttonText);
    
    const stateLabel = figma.createText();
    stateLabel.characters = state.label;
    stateLabel.fontName = { family: "Inter", style: "Regular" };
    stateLabel.fontSize = 12;
    stateLabel.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
    stateLabel.x = state.x;
    stateLabel.y = 150;
    buttonSection.appendChild(stateLabel);
  }
  
  // Input Component Section
  const inputSection = figma.createFrame();
  inputSection.name = "Input Components";
  inputSection.resize(1880, 280);
  inputSection.x = 20;
  inputSection.y = 1200;
  inputSection.fills = [{ type: "SOLID", color: { r: 0.98, g: 0.98, b: 0.98 } }];
  mainFrame.appendChild(inputSection);
  
  const inputTitle = figma.createText();
  inputTitle.characters = "Input Field States";
  inputTitle.fontName = { family: "Inter", style: "Bold" };
  inputTitle.fontSize = 24;
  inputTitle.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
  inputTitle.x = 20;
  inputTitle.y = 20;
  inputSection.appendChild(inputTitle);
  
  const inputStates = [
    { label: "Default", borderColor: { r: 0.8, g: 0.8, b: 0.8 }, x: 20 },
    { label: "Focus", borderColor: { r: 1, g: 0.2, b: 0.5 }, x: 380 },
    { label: "Error", borderColor: { r: 1, g: 0.2, b: 0.2 }, x: 740 },
    { label: "Disabled", borderColor: { r: 0.9, g: 0.9, b: 0.9 }, x: 1100 }
  ];
  
  for (const state of inputStates) {
    const inputBox = figma.createFrame();
    inputBox.resize(320, 48);
    inputBox.x = state.x;
    inputBox.y = 80;
    inputBox.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    inputBox.strokeWeight = 2;
    inputBox.strokes = [{ type: "SOLID", color: state.borderColor }];
    inputBox.cornerRadius = 6;
    inputSection.appendChild(inputBox);
    
    const inputPlaceholder = figma.createText();
    inputPlaceholder.characters = "Enter text...";
    inputPlaceholder.fontName = { family: "Inter", style: "Regular" };
    inputPlaceholder.fontSize = 14;
    inputPlaceholder.fills = [{ type: "SOLID", color: { r: 0.7, g: 0.7, b: 0.7 } }];
    inputPlaceholder.x = state.x + 12;
    inputPlaceholder.y = 95;
    inputSection.appendChild(inputPlaceholder);
    
    const inputLabel = figma.createText();
    inputLabel.characters = state.label;
    inputLabel.fontName = { family: "Inter", style: "Regular" };
    inputLabel.fontSize = 12;
    inputLabel.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
    inputLabel.x = state.x;
    inputLabel.y = 140;
    inputSection.appendChild(inputLabel);
  }
  
  // Card Component Section
  const cardSection = figma.createFrame();
  cardSection.name = "Card Components";
  cardSection.resize(1880, 320);
  cardSection.x = 20;
  cardSection.y = 1500;
  cardSection.fills = [{ type: "SOLID", color: { r: 0.98, g: 0.98, b: 0.98 } }];
  mainFrame.appendChild(cardSection);
  
  const cardTitle = figma.createText();
  cardTitle.characters = "Card Component";
  cardTitle.fontName = { family: "Inter", style: "Bold" };
  cardTitle.fontSize = 24;
  cardTitle.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
  cardTitle.x = 20;
  cardTitle.y = 20;
  cardSection.appendChild(cardTitle);
  
  // Product Card
  const productCard = figma.createFrame();
  productCard.resize(280, 240);
  productCard.x = 20;
  productCard.y = 80;
  productCard.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  productCard.strokeWeight = 1;
  productCard.strokes = [{ type: "SOLID", color: { r: 0.9, g: 0.9, b: 0.9 } }];
  productCard.cornerRadius = 12;
  cardSection.appendChild(productCard);
  
  const cardImage = figma.createFrame();
  cardImage.resize(280, 140);
  cardImage.x = 0;
  cardImage.y = 0;
  cardImage.fills = [{ type: "SOLID", color: { r: 1, g: 0.85, b: 0.2 } }];
  cardImage.cornerRadius = 12;
  productCard.appendChild(cardImage);
  
  const cardProductName = figma.createText();
  cardProductName.characters = "Candy Product";
  cardProductName.fontName = { family: "Inter", style: "Bold" };
  cardProductName.fontSize = 14;
  cardProductName.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
  cardProductName.x = 12;
  cardProductName.y = 150;
  productCard.appendChild(cardProductName);
  
  const cardPrice = figma.createText();
  cardPrice.characters = "$9.99";
  cardPrice.fontName = { family: "Inter", style: "Bold" };
  cardPrice.fontSize = 16;
  cardPrice.fills = [{ type: "SOLID", color: { r: 1, g: 0.2, b: 0.5 } }];
  cardPrice.x = 12;
  cardPrice.y = 175;
  productCard.appendChild(cardPrice);
  
  // Navigation Header Section
  const navSection = figma.createFrame();
  navSection.name = "Navigation Components";
  navSection.resize(1880, 200);
  navSection.x = 20;
  navSection.y = 1840;
  navSection.fills = [{ type: "SOLID", color: { r: 0.98, g: 0.98, b: 0.98 } }];
  mainFrame.appendChild(navSection);
  
  const navTitle = figma.createText();
  navTitle.characters = "Header Navigation";
  navTitle.fontName = { family: "Inter", style: "Bold" };
  navTitle.fontSize = 24;
  navTitle.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
  navTitle.x = 20;
  navTitle.y = 20;
  navSection.appendChild(navTitle);
  
  const header = figma.createFrame();
  header.resize(1840, 80);
  header.x = 20;
  header.y = 80;
  header.fills = [{ type: "SOLID", color: { r: 1, g: 0.2, b: 0.5 } }];
  navSection.appendChild(header);
  
  const logo = figma.createText();
  logo.characters = "TEST SHOP";
  logo.fontName = { family: "Inter", style: "Bold" };
  logo.fontSize = 20;
  logo.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  logo.x = 20;
  logo.y = 30;
  header.appendChild(logo);
  
  const navItems = ["Shop", "About", "Contact", "Cart"];
  for (let i = 0; i < navItems.length; i++) {
    const navItem = figma.createText();
    navItem.characters = navItems[i];
    navItem.fontName = { family: "Inter", style: "Regular" };
    navItem.fontSize = 14;
    navItem.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
    navItem.x = 1400 + (i * 100);
    navItem.y = 33;
    header.appendChild(navItem);
  }
  
  // Responsive Breakpoints Section
  const breakpointSection = figma.createFrame();
  breakpointSection.name = "Responsive Breakpoints";
  breakpointSection.resize(1880, 200);
  breakpointSection.x = 20;
  breakpointSection.y = 2060;
  breakpointSection.fills = [{ type: "SOLID", color: { r: 0.98, g: 0.98, b: 0.98 } }];
  mainFrame.appendChild(breakpointSection);
  
  const breakpointTitle = figma.createText();
  breakpointTitle.characters = "Responsive Breakpoints";
  breakpointTitle.fontName = { family: "Inter", style: "Bold" };
  breakpointTitle.fontSize = 24;
  breakpointTitle.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
  breakpointTitle.x = 20;
  breakpointTitle.y = 20;
  breakpointSection.appendChild(breakpointTitle);
  
  const breakpoints = [
    { label: "Mobile: 320px - 767px", x: 20 },
    { label: "Tablet: 768px - 1023px", x: 500 },
    { label: "Desktop: 1024px+", x: 1000 }
  ];
  
  for (const bp of breakpoints) {
    const bpText = figma.createText();
    bpText.characters = bp.label;
    bpText.fontName = { family: "Inter", style: "Regular" };
    bpText.fontSize = 14;
    bpText.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
    bpText.x = bp.x;
    bpText.y = 80;
    breakpointSection.appendChild(bpText);
  }
  
  // Accessibility Guidelines Section
  const a11ySection = figma.createFrame();
  a11ySection.name = "Accessibility Guidelines";
  a11ySection.resize(1880, 200);
  a11ySection.x = 20;
  a11ySection.y = 2280;
  a11ySection.fills = [{ type: "SOLID", color: { r: 0.98, g: 0.98, b: 0.98 } }];
  mainFrame.appendChild(a11ySection);
  
  const a11yTitle = figma.createText();
  a11yTitle.characters = "Accessibility Guidelines";
  a11yTitle.fontName = { family: "Inter", style: "Bold" };
  a11yTitle.fontSize = 24;
  a11yTitle.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
  a11yTitle.x = 20;
  a11yTitle.y = 20;
  a11ySection.appendChild(a11yTitle);
  
  const a11yGuidelines = [
    "• Minimum contrast ratio 4.5:1 for text",
    "• Focus states visible on all interactive elements",
    "• Keyboard navigation support required",
    "• ARIA labels for icon-only buttons"
  ];
  
  for (let i = 0; i < a11yGuidelines.length; i++) {
    const guideline = figma.createText();
    guideline.characters = a11yGuidelines[i];
    guideline.fontName = { family: "Inter", style: "Regular" };
    guideline.fontSize = 12;
    guideline.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
    guideline.x = 20;
    guideline.y = 80 + (i * 25);
    a11ySection.appendChild(guideline);
  }
}
createDesign().catch(e => console.error(e));