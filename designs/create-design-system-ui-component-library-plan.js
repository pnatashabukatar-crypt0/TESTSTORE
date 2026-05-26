async function createDesign() {
  const page = figma.currentPage;
  
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });
  await figma.loadFontAsync({ family: "Inter", style: "Bold" });
  
  // Main container
  const mainFrame = figma.createFrame();
  mainFrame.name = "Candy Shop Design System";
  mainFrame.resize(1440, 3200);
  mainFrame.fills = [{ type: "SOLID", color: { r: 0.98, g: 0.98, b: 0.98 } }];
  page.appendChild(mainFrame);
  
  // Header
  const header = figma.createFrame();
  header.name = "Header";
  header.resize(1440, 80);
  header.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.1, b: 0.3 } }];
  header.y = 0;
  mainFrame.appendChild(header);
  
  const headerTitle = figma.createText();
  headerTitle.characters = "Candy Shop Design System & Component Library";
  headerTitle.fontName = { family: "Inter", style: "Bold" };
  headerTitle.fontSize = 28;
  headerTitle.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  headerTitle.x = 40;
  headerTitle.y = 20;
  header.appendChild(headerTitle);
  
  // Section 1: Design Tokens
  const tokensSection = figma.createFrame();
  tokensSection.name = "Design Tokens Section";
  tokensSection.resize(1400, 600);
  tokensSection.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  tokensSection.y = 100;
  tokensSection.x = 20;
  mainFrame.appendChild(tokensSection);
  
  const tokensTitle = figma.createText();
  tokensTitle.characters = "1. DESIGN TOKENS";
  tokensTitle.fontName = { family: "Inter", style: "Bold" };
  tokensTitle.fontSize = 24;
  tokensTitle.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.1, b: 0.3 } }];
  tokensTitle.x = 20;
  tokensTitle.y = 20;
  tokensSection.appendChild(tokensTitle);
  
  // Color Palette
  const colorPaletteTitle = figma.createText();
  colorPaletteTitle.characters = "Color Palette:";
  colorPaletteTitle.fontName = { family: "Inter", style: "Bold" };
  colorPaletteTitle.fontSize = 16;
  colorPaletteTitle.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
  colorPaletteTitle.x = 20;
  colorPaletteTitle.y = 70;
  tokensSection.appendChild(colorPaletteTitle);
  
  const colors = [
    { name: "Primary", hex: "#FF6B9D", r: 1, g: 0.42, b: 0.61 },
    { name: "Secondary", hex: "#FFD93D", r: 1, g: 0.85, b: 0.24 },
    { name: "Accent", hex: "#6BCB77", r: 0.42, g: 0.8, b: 0.47 },
    { name: "Dark", hex: "#2D1B3D", r: 0.18, g: 0.11, b: 0.24 },
    { name: "Light", hex: "#F8F8F8", r: 0.97, g: 0.97, b: 0.97 }
  ];
  
  let colorX = 20;
  for (const color of colors) {
    const colorBox = figma.createFrame();
    colorBox.resize(80, 80);
    colorBox.fills = [{ type: "SOLID", color: { r: color.r, g: color.g, b: color.b } }];
    colorBox.x = colorX;
    colorBox.y = 110;
    tokensSection.appendChild(colorBox);
    
    const colorLabel = figma.createText();
    colorLabel.characters = color.name;
    colorLabel.fontName = { family: "Inter", style: "Regular" };
    colorLabel.fontSize = 12;
    colorLabel.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
    colorLabel.x = colorX;
    colorLabel.y = 200;
    tokensSection.appendChild(colorLabel);
    
    const hexLabel = figma.createText();
    hexLabel.characters = color.hex;
    hexLabel.fontName = { family: "Inter", style: "Regular" };
    hexLabel.fontSize = 11;
    hexLabel.fills = [{ type: "SOLID", color: { r: 0.5, g: 0.5, b: 0.5 } }];
    hexLabel.x = colorX;
    hexLabel.y = 218;
    tokensSection.appendChild(hexLabel);
    
    colorX += 110;
  }
  
  // Typography
  const typographyTitle = figma.createText();
  typographyTitle.characters = "Typography:";
  typographyTitle.fontName = { family: "Inter", style: "Bold" };
  typographyTitle.fontSize = 16;
  typographyTitle.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
  typographyTitle.x = 20;
  typographyTitle.y = 280;
  tokensSection.appendChild(typographyTitle);
  
  const typographies = [
    { name: "H1", size: 32, weight: "Bold" },
    { name: "H2", size: 24, weight: "Bold" },
    { name: "Body", size: 16, weight: "Regular" },
    { name: "Small", size: 12, weight: "Regular" }
  ];
  
  let typY = 320;
  for (const typo of typographies) {
    const typoText = figma.createText();
    typoText.characters = typo.name + " - " + typo.size + "px (" + typo.weight + ")";
    typoText.fontName = { family: "Inter", style: typo.weight };
    typoText.fontSize = typo.size;
    typoText.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
    typoText.x = 20;
    typoText.y = typY;
    tokensSection.appendChild(typoText);
    typY += 50;
  }
  
  // Spacing & Shadows
  const spacingText = figma.createText();
  spacingText.characters = "Spacing: 4px, 8px, 12px, 16px, 24px, 32px, 48px";
  spacingText.fontName = { family: "Inter", style: "Regular" };
  spacingText.fontSize = 14;
  spacingText.fills = [{ type: "SOLID", color: { r: 0.3, g: 0.3, b: 0.3 } }];
  spacingText.x = 20;
  spacingText.y = 520;
  tokensSection.appendChild(spacingText);
  
  const shadowText = figma.createText();
  shadowText.characters = "Shadows: Subtle (0 2px 4px), Medium (0 4px 8px), Large (0 8px 16px)";
  shadowText.fontName = { family: "Inter", style: "Regular" };
  shadowText.fontSize = 14;
  shadowText.fills = [{ type: "SOLID", color: { r: 0.3, g: 0.3, b: 0.3 } }];
  shadowText.x = 20;
  shadowText.y = 545;
  tokensSection.appendChild(shadowText);
  
  // Section 2: Components
  const componentsSection = figma.createFrame();
  componentsSection.name = "Components Section";
  componentsSection.resize(1400, 1200);
  componentsSection.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  componentsSection.y = 720;
  componentsSection.x = 20;
  mainFrame.appendChild(componentsSection);
  
  const componentsTitle = figma.createText();
  componentsTitle.characters = "2. CORE UI COMPONENTS (10+)";
  componentsTitle.fontName = { family: "Inter", style: "Bold" };
  componentsTitle.fontSize = 24;
  componentsTitle.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.1, b: 0.3 } }];
  componentsTitle.x = 20;
  componentsTitle.y = 20;
  componentsSection.appendChild(componentsTitle);
  
  const components = [
    { name: "Button (Primary)", width: 120, height: 44, bgR: 1, bgG: 0.42, bgB: 0.61 },
    { name: "Button (Secondary)", width: 120, height: 44, bgR: 1, bgG: 0.85, bgB: 0.24 },
    { name: "Input Field", width: 280, height: 44, bgR: 0.97, bgG: 0.97, bgB: 0.97 },
    { name: "Card", width: 200, height: 240, bgR: 0.99, bgG: 0.99, bgB: 0.99 },
    { name: "Badge", width: 80, height: 28, bgR: 0.42, bgG: 0.8, bgB: 0.47 },
    { name: "Chip", width: 100, height: 32, bgR: 1, bgG: 0.85, bgB: 0.24 },
    { name: "Toggle", width: 50, height: 28, bgR: 0.8, bgG: 0.8, bgB: 0.8 },
    { name: "Dropdown", width: 200, height: 44, bgR: 0.97, bgG: 0.97, bgB: 0.97 },
    { name: "Modal", width: 320, height: 200, bgR: 1, bgG: 1, bgB: 1 },
    { name: "Navigation Bar", width: 375, height: 56, bgR: 0.18, bgG: 0.11, bgB: 0.24 },
    { name: "Product Card", width: 160, height: 220, bgR: 0.99, bgG: 0.99, bgB: 0.99 },
    { name: "Rating Stars", width: 100, height: 20, bgR: 1, bgG: 0.85, bgB: 0.24 }
  ];
  
  let compX = 20;
  let compY = 80;
  let compCount = 0;
  
  for (const comp of components) {
    const compFrame = figma.createFrame();
    compFrame.resize(comp.width, comp.height);
    compFrame.fills = [{ type: "SOLID", color: { r: comp.bgR, g: comp.bgG, b: comp.bgB } }];
    compFrame.x = compX;
    compFrame.y = compY;
    componentsSection.appendChild(compFrame);
    
    const compLabel = figma.createText();
    compLabel.characters = comp.name;
    compLabel.fontName = { family: "Inter", style: "Regular" };
    compLabel.fontSize = 11;
    compLabel.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
    compLabel.x = compX;
    compLabel.y = compY + comp.height + 8;
    componentsSection.appendChild(compLabel);
    
    compX += comp.width + 20;
    compCount += 1;
    
    if (compCount % 3 === 0) {
      compX = 20;
      compY += comp.height + 50;
    }
  }
  
  // Section 3: Wireframes
  const wireframesSection = figma.createFrame();
  wireframesSection.name = "Wireframes Section";
  wireframesSection.resize(1400, 1000);
  wireframesSection.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  wireframesSection.y = 1940;
  wireframesSection.x = 20;
  mainFrame.appendChild(wireframesSection);
  
  const wireframesTitle = figma.createText();
  wireframesTitle.characters = "3. KEY PAGE WIREFRAMES (5 Pages)";
  wireframesTitle.fontName = { family: "Inter", style: "Bold" };
  wireframesTitle.fontSize = 24;
  wireframesTitle.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.1, b: 0.3 } }];
  wireframesTitle.x = 20;
  wireframesTitle.y = 20;
  wireframesSection.appendChild(wireframesTitle);
  
  const pages = ["Home", "Product Listing", "Product Detail", "Shopping Cart", "Checkout"];
  
  let pageX = 20;
  for (const pageName of pages) {
    const wireframe = figma.createFrame();
    wireframe.resize(240, 320);
    wireframe.fills = [{ type: "SOLID", color: { r: 0.95, g: 0.95, b: 0.95 } }];
    wireframe.x = pageX;
    wireframe.y = 80;
    wireframesSection.appendChild(wireframe);
    
    const wireframeTitle = figma.createText();
    wireframeTitle.characters = pageName;
    wireframeTitle.fontName = { family: "Inter", style: "Bold" };
    wireframeTitle.fontSize = 14;
    wireframeTitle.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
    wireframeTitle.x = pageX;
    wireframeTitle.y = 330;
    wireframesSection.appendChild(wireframeTitle);
    
    // Placeholder wireframe elements
    const headerWire = figma.createFrame();
    headerWire.resize(220, 40);
    headerWire.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.1, b: 0.3 } }];
    headerWire.x = pageX + 10;
    headerWire.y = 90;
    wireframe.appendChild(headerWire);
    
    const contentWire = figma.createFrame();
    contentWire.resize(220, 200);
    contentWire.fills = [{ type: "SOLID", color: { r: 0.9, g: 0.9, b: 0.9 } }];
    contentWire.x = pageX + 10;
    contentWire.y = 140;
    wireframe.appendChild(contentWire);
    
    const footerWire = figma.createFrame();
    footerWire.resize(220, 40);
    footerWire.fills = [{ type: "SOLID", color: { r: 0.8, g: 0.8, b: 0.8 } }];
    footerWire.x = pageX + 10;
    footerWire.y = 260;
    wireframe.appendChild(footerWire);
    
    pageX += 260;
  }
  
  // Section 4: Responsive Breakpoints
  const responsiveSection = figma.createFrame();
  responsiveSection.name = "Responsive Section";
  responsiveSection.resize(1400, 300);
  responsiveSection.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  responsiveSection.y = 2960;
  responsiveSection.x = 20;
  mainFrame.appendChild(responsiveSection);
  
  const responsiveTitle = figma.createText();
  responsiveTitle.characters = "4. RESPONSIVE DESIGN BREAKPOINTS (Mobile-First)";
  responsiveTitle.fontName = { family: "Inter", style: "Bold" };
  responsiveTitle.fontSize = 24;
  responsiveTitle.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.1, b: 0.3 } }];
  responsiveTitle.x = 20;
  responsiveTitle.y = 20;
  responsiveSection.appendChild(responsiveTitle);
  
  const breakpoints = [
    "Mobile: 320px - 480px (Primary target)",
    "Tablet: 481px - 768px",
    "Desktop: 769px - 1024px",
    "Large Desktop: 1025px+"
  ];
  
  let bpY = 80;
  for (const bp of breakpoints) {
    const bpText = figma.createText();
    bpText.characters = bp;
    bpText.fontName = { family: "Inter", style: "Regular" };
    bpText.fontSize = 14;
    bpText.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }];
    bpText.x = 20;
    bpText.y = bpY;
    responsiveSection.appendChild(bpText);
    bpY += 40;
  }
  
  // Section 5: Accessibility
  const a11ySection = figma.createFrame();
  a11ySection.name = "Accessibility Section";
  a11ySection.resize(1400, 250);
  a11ySection.fills = [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }];
  a11ySection.y = 3280;
  a11ySection.x = 20;
  mainFrame.appendChild(a11ySection);
  
  const a11yTitle = figma.createText();
  a11yTitle.characters = "5. ACCESSIBILITY GUIDELINES (WCAG 2.1 AA)";
  a11yTitle.fontName = { family: "Inter", style: "Bold" };
  a11yTitle.fontSize = 24;
  a11yTitle.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.1, b: 0.3 } }];
  a11yTitle.x = 20;
  a11yTitle.y = 20;
  a11ySection.appendChild(a11yTitle);
  
  const a11yGuidelines = [
    "• Color contrast ratio: 4.5:1 minimum for text",
    "• Focus indicators: Visible on all interactive elements",
    "• Alt text: All images must have descriptive alt text",
    "• Keyboard navigation: All features accessible via keyboard",
    "• ARIA labels: Used for screen reader compatibility",
    "• Touch targets: Minimum 44x44px for mobile interactions"
  ];
  
  let a11yY = 80;
  for (const guideline of a11yGuidelines) {
    const guideText = figma.createText();
    guideText.characters = guideline;
    guideText.fontName = { family: "Inter", style: "Regular" };
    guideText.fontSize = 13;
    guideText.fills = [{ type: "SOLID", color: { r: 0.2, g: 0.2, b: 0.2 } }];
    guideText.x = 20;
    guideText.y = a11yY;
    a11ySection.appendChild(guideText);
    a11yY += 28;
  }
}
createDesign().catch(e => console.error(e));